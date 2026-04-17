import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { AppShell } from "./components/AppShell";
import { hasSupabaseEnv, supabase, type PortfolioItem } from "./lib/supabase";
import type { EditablePortfolioItem } from "./sections/AdminSections";

type PageView = "home" | "portfolio" | "admin";

function getCurrentPage(): PageView {
  if (typeof window === "undefined") {
    return "home";
  }

  const page = new URLSearchParams(window.location.search).get("page");
  if (page === "portfolio" || page === "admin") {
    return page;
  }

  return "home";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageView>(getCurrentPage);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleLocationChange = () => setCurrentPage(getCurrentPage());

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const refreshPortfolioItems = async (activeSession: Session | null = session) => {
    if (!supabase) {
      setPortfolioItems([]);
      setIsAdmin(false);
      return;
    }

    setIsPortfolioLoading(true);

    try {
      let admin = false;

      if (activeSession?.user) {
        const { data } = await supabase
          .from("admin_users")
          .select("user_id")
          .eq("user_id", activeSession.user.id)
          .maybeSingle();

        admin = Boolean(data);
      }

      setIsAdmin(admin);

      let query = supabase
        .from("portfolio_items")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (!admin) {
        query = query.eq("is_published", true);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setPortfolioItems((data ?? []) as PortfolioItem[]);
    } catch (error) {
      console.error("Unable to load portfolio items", error);
      setPortfolioItems([]);
      setIsAdmin(false);
    } finally {
      setIsPortfolioLoading(false);
    }
  };

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      void refreshPortfolioItems(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      void refreshPortfolioItems(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const navigateToPage = (page: PageView) => {
    const url = new URL(window.location.href);

    if (page === "home") {
      url.searchParams.delete("page");
      url.hash = "";
    } else {
      url.searchParams.set("page", page);
    }

    window.history.pushState({}, "", url);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      throw new Error("Supabase is not configured yet.");
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return "Signed in successfully.";
  };

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      throw new Error("Supabase is not configured yet.");
    }

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return "Account created. If confirmation is enabled, check your email next.";
  };

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  };

  const claimAdminAccess = async () => {
    if (!supabase || !session?.user) {
      throw new Error("Sign in first.");
    }

    const { error } = await supabase.from("admin_users").insert({
      user_id: session.user.id,
      email: session.user.email ?? null,
    });

    if (error) {
      throw new Error(
        error.message.includes("row-level")
          ? "Initial admin access has already been claimed. Use an approved admin account or whitelist this user in Supabase."
          : error.message,
      );
    }

    await refreshPortfolioItems(session);
    return "Admin access granted.";
  };

  const savePortfolioItem = async (item: EditablePortfolioItem) => {
    if (!supabase || !session?.user) {
      throw new Error("Admin access is required.");
    }

    const title = item.title.trim();
    if (!title) {
      throw new Error("Title is required.");
    }

    const payload = {
      content_type: item.content_type,
      title,
      slug: slugify(title),
      description: item.description.trim() || null,
      media_url: item.media_url.trim() || null,
      thumbnail_url: item.thumbnail_url.trim() || null,
      external_url: item.external_url.trim() || null,
      tags: item.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      sort_order: item.sort_order,
      is_featured: item.is_featured,
      is_published: item.is_published,
      created_by: session.user.id,
    };

    const response = item.id
      ? await supabase.from("portfolio_items").update(payload).eq("id", item.id)
      : await supabase.from("portfolio_items").insert(payload);

    if (response.error) {
      throw new Error(response.error.message);
    }

    await refreshPortfolioItems(session);
    return item.id ? "Portfolio item updated." : "Portfolio item added.";
  };

  const deletePortfolioItem = async (id: string) => {
    if (!supabase) {
      throw new Error("Supabase is not configured yet.");
    }

    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }

    await refreshPortfolioItems(session);
    return "Portfolio item deleted.";
  };

  const togglePublished = async (item: PortfolioItem) => {
    if (!supabase) {
      throw new Error("Supabase is not configured yet.");
    }

    const { error } = await supabase
      .from("portfolio_items")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);

    if (error) {
      throw new Error(error.message);
    }

    await refreshPortfolioItems(session);
    return item.is_published ? "Item unpublished." : "Item published.";
  };

  return AppShell({
    currentPage,
    isScrolled,
    isContactModalOpen,
    isAdmin,
    isSupabaseConfigured: hasSupabaseEnv,
    isPortfolioLoading,
    portfolioItems,
    userEmail: session?.user.email,
    onOpenContactModal: openContactModal,
    onCloseContactModal: closeContactModal,
    onNavigateHome: () => navigateToPage("home"),
    onNavigatePortfolio: () => navigateToPage("portfolio"),
    onNavigateAdmin: () => navigateToPage("admin"),
    onSignIn: signIn,
    onSignUp: signUp,
    onSignOut: signOut,
    onClaimAdmin: claimAdminAccess,
    onSaveItem: savePortfolioItem,
    onDeleteItem: deletePortfolioItem,
    onTogglePublished: togglePublished,
  });
}
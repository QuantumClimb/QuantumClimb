import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { AppShell } from "./components/AppShell";
import {
  getBucketForContentType,
  hasSupabaseEnv,
  sanitizeFileName,
  supabase,
  type PortfolioItem,
} from "./lib/supabase";
import type { EditablePortfolioItem } from "./sections/AdminSections";

type PageView = "home" | "portfolio" | "admin";

function getCurrentPage(): PageView {
  if (typeof globalThis.window === "undefined") {
    return "home";
  }

  const page = new URLSearchParams(globalThis.location.search).get("page");
  if (page === "portfolio" || page === "admin") {
    return page;
  }

  return "home";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
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
    const handleScroll = () => setIsScrolled(globalThis.scrollY > 50);
    const handleLocationChange = () => setCurrentPage(getCurrentPage());

    globalThis.addEventListener("scroll", handleScroll);
    globalThis.addEventListener("popstate", handleLocationChange);

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      globalThis.removeEventListener("popstate", handleLocationChange);
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
    const url = new URL(globalThis.location.href);

    if (page === "home") {
      url.searchParams.delete("page");
      url.hash = "";
    } else {
      url.searchParams.set("page", page);
    }

    globalThis.history.pushState({}, "", url);
    setCurrentPage(page);
    globalThis.scrollTo({ top: 0, behavior: "smooth" });
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      throw new Error("Supabase is not configured yet.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    const signedInUserId = data.user?.id;
    if (!signedInUserId) {
      throw new Error("Sign-in completed but no user session was returned.");
    }

    const { count, error: countError } = await supabase
      .from("admin_users")
      .select("user_id", { count: "exact", head: true });

    if (countError) {
      throw new Error(countError.message);
    }

    const { data: adminRow, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", signedInUserId)
      .maybeSingle();

    if (adminError) {
      throw new Error(adminError.message);
    }

    if ((count ?? 0) > 0 && !adminRow) {
      await supabase.auth.signOut();
      throw new Error("This email is not on the approved uploader list.");
    }

    if ((count ?? 0) === 0) {
      return "Signed in. This is the first admin bootstrap session — claim access below.";
    }

    return "Signed in successfully.";
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

  const uploadPortfolioFile = async (
    file: File,
    contentType: PortfolioItem["content_type"],
    variant: "media" | "thumbnail",
  ) => {
    if (!supabase || !session?.user) {
      throw new Error("Admin access is required.");
    }

    const effectiveType = variant === "thumbnail" ? "image" : contentType;
    const bucket = getBucketForContentType(effectiveType);
    const filePath = `${session.user.id}/${Date.now()}-${sanitizeFileName(file.name)}`;

    const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
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
    onSignOut: signOut,
    onClaimAdmin: claimAdminAccess,
    onSaveItem: savePortfolioItem,
    onDeleteItem: deletePortfolioItem,
    onTogglePublished: togglePublished,
    onUploadFile: uploadPortfolioFile,
  });
}
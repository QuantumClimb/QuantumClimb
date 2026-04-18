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
  if (globalThis.window === undefined) {
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

const uploadSizeLimits = {
  image: 50 * 1024 * 1024,
  music: 150 * 1024 * 1024,
  video: 500 * 1024 * 1024,
} as const;

function formatUploadLimit(bytes: number) {
  return `${Math.round(bytes / (1024 * 1024))} MB`;
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
    const mediaUrl = item.media_url.trim();
    const thumbnailUrl = item.thumbnail_url.trim();
    const externalUrl = item.external_url.trim();

    if (!title) {
      throw new Error("Title is required.");
    }

    if (item.content_type === "website" && !externalUrl) {
      throw new Error("Website items need an external URL before they can be saved.");
    }

    if (item.content_type !== "website" && !mediaUrl && !externalUrl) {
      throw new Error("Upload the media file or paste an external media link before saving this item.");
    }

    const payload = {
      content_type: item.content_type,
      title,
      slug: slugify(title),
      description: item.description.trim() || null,
      media_url: mediaUrl || null,
      thumbnail_url: thumbnailUrl || null,
      external_url: externalUrl || null,
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
    onProgress?: (progress: number) => void,
  ) => {
    if (!supabase || !session?.user) {
      throw new Error("Admin access is required.");
    }

    const effectiveType = variant === "thumbnail" ? "image" : contentType;
    const bucket = getBucketForContentType(effectiveType);
    const filePath = `${session.user.id}/${Date.now()}-${sanitizeFileName(file.name)}`;
    const maxSize = uploadSizeLimits[effectiveType as keyof typeof uploadSizeLimits];
    const normalizedType = file.type?.trim().toLowerCase();
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    if (maxSize && file.size > maxSize) {
      throw new Error(
        `This ${effectiveType} file is too large (${formatUploadLimit(file.size)}). The limit is ${formatUploadLimit(maxSize)}.`,
      );
    }

    if (!supabaseUrl || !publishableKey || !session.access_token) {
      throw new Error("Your upload session is not ready. Please sign in again and retry.");
    }

    onProgress?.(0);

    try {
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${supabaseUrl}/storage/v1/object/${bucket}/${filePath}`);
        xhr.setRequestHeader("apikey", publishableKey);
        xhr.setRequestHeader("Authorization", `Bearer ${session.access_token}`);
        xhr.setRequestHeader("x-upsert", "false");
        xhr.setRequestHeader("cache-control", "3600");

        if (normalizedType) {
          xhr.setRequestHeader("Content-Type", normalizedType);
        }

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable && event.total > 0) {
            onProgress?.(Math.min(99, Math.round((event.loaded / event.total) * 100)));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Upload failed due to a network error."));
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            onProgress?.(100);
            resolve();
            return;
          }

          try {
            const parsed = JSON.parse(xhr.responseText) as { error?: string; message?: string };
            reject(new Error(parsed.error ?? parsed.message ?? `Upload failed with status ${xhr.status}.`));
          } catch {
            reject(new Error(`Upload failed with status ${xhr.status}.`));
          }
        };

        xhr.send(file);
      });
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : "";

      if (message.includes("mime") || message.includes("content type")) {
        throw new Error("This file type was blocked by storage rules. Please try the upload again.");
      }

      if (message.includes("size") || message.includes("large")) {
        throw new Error(`This ${effectiveType} file is too large for the current upload limit.`);
      }

      throw new Error(error instanceof Error ? `Upload failed: ${error.message}` : "Upload failed.");
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
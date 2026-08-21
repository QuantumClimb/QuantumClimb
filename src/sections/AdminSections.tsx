import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Globe,
  ImageIcon,
  Lock,
  LogOut,
  Music4,
  Pencil,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import type { PortfolioContentType, PortfolioItem, SiteVideo } from "../lib/supabase";

type AdminDashboardProps = Readonly<{
  isConfigured: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  userEmail?: string;
  items: PortfolioItem[];
  siteVideos: SiteVideo[];
  onSignIn: (email: string, password: string) => Promise<string>;
  onSignOut: () => Promise<void>;
  onClaimAdmin: () => Promise<string>;
  onSaveItem: (item: EditablePortfolioItem) => Promise<string>;
  onDeleteItem: (id: string) => Promise<string>;
  onTogglePublished: (item: PortfolioItem) => Promise<string>;
  onUploadFile: (
    file: File,
    contentType: PortfolioContentType,
    variant: "media" | "thumbnail" | "logo",
    onProgress?: (progress: number) => void,
  ) => Promise<string>;
  onSaveSiteVideo: (video: EditableSiteVideo) => Promise<string>;
  onDeleteSiteVideo: (id: string) => Promise<string>;
  onUploadSiteVideo: (
    file: File,
    section: string,
    variant: "video" | "thumbnail",
    onProgress?: (progress: number) => void,
  ) => Promise<string>;
}>;

export type EditablePortfolioItem = {
  id?: string;
  content_type: PortfolioContentType;
  title: string;
  description: string;
  media_url: string;
  thumbnail_url: string;
  external_url: string;
  logo_url: string;
  case_study: string;
  tags: string;
  sort_order: number;
  is_featured: boolean;
  is_published: boolean;
};

export type EditableSiteVideo = {
  id?: string;
  section: string;
  video_url: string;
  thumbnail_url: string;
  title: string;
  description: string;
  sort_order: number;
};

type DropVariant = "media" | "thumbnail" | "logo";
type UploadVariant = DropVariant | "video";

type UploadState = {
  variant: UploadVariant;
  fileName: string;
  progress: number;
};

const emptyForm: EditablePortfolioItem = {
  content_type: "video",
  title: "",
  description: "",
  media_url: "",
  thumbnail_url: "",
  external_url: "",
  logo_url: "",
  case_study: "",
  tags: "",
  sort_order: 0,
  is_featured: false,
  is_published: false,
};

const contentTypeMeta = {
  video: { label: "Video", icon: Video },
  image: { label: "Image", icon: ImageIcon },
  music: { label: "Music", icon: Music4 },
  website: { label: "Website", icon: Globe },
} satisfies Record<PortfolioContentType, { label: string; icon: typeof Video }>;

function toEditableItem(item: PortfolioItem): EditablePortfolioItem {
  return {
    id: item.id,
    content_type: item.content_type,
    title: item.title,
    description: item.description ?? "",
    media_url: item.media_url ?? "",
    thumbnail_url: item.thumbnail_url ?? "",
    external_url: item.external_url ?? "",
    logo_url: item.metadata?.logo_url ?? "",
    case_study: item.metadata?.case_study ?? "",
    tags: item.tags.join(", "),
    sort_order: item.sort_order ?? 0,
    is_featured: item.is_featured,
    is_published: item.is_published,
  };
}

function sortItems(items: PortfolioItem[]) {
  return [...items].sort((left, right) => {
    if (left.is_featured !== right.is_featured) {
      return left.is_featured ? -1 : 1;
    }

    if (left.sort_order !== right.sort_order) {
      return left.sort_order - right.sort_order;
    }

    return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
  });
}

function getAcceptValue(contentType: PortfolioContentType) {
  if (contentType === "image") {
    return "image/*";
  }

  if (contentType === "music") {
    return "audio/*";
  }

  if (contentType === "video") {
    return "video/*";
  }

  return "*/*";
}

function PreviewCard({ form }: Readonly<{ form: EditablePortfolioItem }>) {
  const previewTitle = form.title.trim() || "Untitled portfolio item";
  const previewDescription = form.description.trim() || "Add a description to see how your content will read before publishing.";
  const previewTags = form.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  const previewUrl = form.thumbnail_url || form.media_url;
  const Icon = contentTypeMeta[form.content_type].icon;

  return (
    <div className="overflow-hidden border border-white/10 bg-black/40">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-purple-300">Draft preview</p>
          <p className="text-sm text-zinc-500">How this card may appear on the portfolio page</p>
        </div>
        <span className="border border-white/10 px-2 py-1 text-xs text-zinc-300">
          {form.is_featured ? "Featured" : `Order ${form.sort_order}`}
        </span>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex aspect-video items-center justify-center overflow-hidden border border-white/10 bg-zinc-950">
          {form.content_type === "image" && previewUrl ? (
            <img src={previewUrl} alt={previewTitle} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          ) : form.content_type === "video" && form.thumbnail_url ? (
            <img src={form.thumbnail_url} alt={previewTitle} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          ) : form.content_type === "music" ? (
            <div className="flex flex-col items-center gap-3 text-zinc-300">
              <Music4 className="h-10 w-10 text-purple-400" />
              <span className="text-sm">Audio preview ready</span>
            </div>
          ) : form.content_type === "website" ? (
            <div className="flex flex-col items-center gap-3 text-zinc-300">
              <Globe className="h-10 w-10 text-purple-400" />
              <span className="text-sm">Website card preview</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-zinc-300">
              <Icon className="h-10 w-10 text-purple-400" />
              <span className="text-sm">Upload media to preview</span>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-purple-300">{contentTypeMeta[form.content_type].label}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{previewTitle}</h3>
          <p className="mt-2 text-sm text-zinc-400">{previewDescription}</p>
        </div>

        {previewTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {previewTags.map((tag) => (
              <span key={tag} className="bg-purple-500/10 px-2 py-1 text-xs text-purple-300">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function AdminDashboardSection({
  isConfigured,
  isLoading,
  isAdmin,
  userEmail,
  items,
  siteVideos,
  onSignIn,
  onSignOut,
  onClaimAdmin,
  onSaveItem,
  onDeleteItem,
  onTogglePublished,
  onUploadFile,
  onSaveSiteVideo,
  onDeleteSiteVideo,
  onUploadSiteVideo,
}: AdminDashboardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<EditablePortfolioItem>(emptyForm);
  const [siteVideoForm, setSiteVideoForm] = useState<EditableSiteVideo>({ 
    section: "media_player", 
    video_url: "", 
    thumbnail_url: "", 
    title: "", 
    description: "",
    sort_order: 0
  });
  const [activeTab, setActiveTab] = useState<"site-videos" | "dubbing-media" | "websites">("dubbing-media");
  const [dragTarget, setDragTarget] = useState<DropVariant | null>(null);
  const [uploadState, setUploadState] = useState<UploadState | null>(null);
  const mediaInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  const groupedCount = useMemo(() => ({
    video: items.filter((item) => item.content_type === "video").length,
    image: items.filter((item) => item.content_type === "image").length,
    music: items.filter((item) => item.content_type === "music").length,
    website: items.filter((item) => item.content_type === "website").length,
  }), [items]);

  const sortedItems = useMemo(() => sortItems(items), [items]);
  const featuredItems = useMemo(() => sortedItems.filter((item) => item.is_featured), [sortedItems]);

  useEffect(() => {
    if (activeTab === "websites") {
      setForm((current) => {
        if (current.content_type !== "website") {
          return { ...emptyForm, content_type: "website" };
        }
        return current;
      });
    } else if (activeTab === "dubbing-media") {
      setForm((current) => {
        if (current.content_type === "website") {
          return { ...emptyForm, content_type: "video" };
        }
        return current;
      });
    }
  }, [activeTab]);

  const handleAction = async (action: () => Promise<string>) => {
    try {
      setIsSubmitting(true);
      const message = await action();
      setStatus(message);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (item: PortfolioItem) => {
    setForm(toEditableItem(item));
    setStatus(`Editing ${item.title}`);
    if (item.content_type === "website") {
      setActiveTab("websites");
    } else {
      setActiveTab("dubbing-media");
    }
    globalThis.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEditingSiteVideo = (video: SiteVideo) => {
    setSiteVideoForm({
      id: video.id,
      section: video.section,
      video_url: video.video_url ?? "",
      thumbnail_url: video.thumbnail_url ?? "",
      title: video.title ?? "",
      description: video.description ?? "",
      sort_order: video.sort_order,
    });
    setStatus(`Editing site video: ${video.title || "Untitled"}`);
    setActiveTab("site-videos");
    globalThis.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setStatus("Editor reset.");
  };

  const handleFileUpload = async (file: File | undefined, variant: DropVariant) => {
    if (!file) {
      return;
    }

    try {
      setIsSubmitting(true);
      setUploadState({ variant, fileName: file.name, progress: 0 });
      setStatus(variant === "media" ? `Uploading media: ${file.name}` : variant === "logo" ? `Uploading logo: ${file.name}` : `Uploading thumbnail: ${file.name}`);

      const uploadedUrl = await onUploadFile(file, form.content_type, variant, (progress) => {
        setUploadState({ variant, fileName: file.name, progress });
      });

      setForm((current) => {
        if (variant === "media") {
          return { ...current, media_url: uploadedUrl };
        }
        if (variant === "logo") {
          return { ...current, logo_url: uploadedUrl };
        }
        return { ...current, thumbnail_url: uploadedUrl };
      });

      setUploadState({ variant, fileName: file.name, progress: 100 });
      setStatus(variant === "media" ? "Media uploaded successfully." : variant === "logo" ? "Logo uploaded successfully." : "Thumbnail uploaded successfully.");
    } catch (error) {
      setUploadState(null);
      setStatus(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsSubmitting(false);
      globalThis.setTimeout(() => {
        setUploadState((current) => (current?.fileName === file.name ? null : current));
      }, 1200);
    }
  };

  const handleSiteVideoUpload = async (file: File | undefined, variant: "video" | "thumbnail") => {
    if (!file) {
      return;
    }

    try {
      setIsSubmitting(true);
      setUploadState({ variant, fileName: file.name, progress: 0 });
      setStatus(variant === "video" ? `Uploading video: ${file.name}` : `Uploading thumbnail: ${file.name}`);

      const uploadedUrl = await onUploadSiteVideo(file, siteVideoForm.section, variant, (progress) => {
        setUploadState({ variant, fileName: file.name, progress });
      });

      setSiteVideoForm((current) => {
        if (variant === "video") {
          return { ...current, video_url: uploadedUrl };
        }

        return { ...current, thumbnail_url: uploadedUrl };
      });

      setUploadState({ variant, fileName: file.name, progress: 100 });
      setStatus(variant === "video" ? "Video uploaded successfully." : "Thumbnail uploaded successfully.");
    } catch (error) {
      setUploadState(null);
      setStatus(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsSubmitting(false);
      globalThis.setTimeout(() => {
        setUploadState((current) => (current?.fileName === file.name ? null : current));
      }, 1200);
    }
  };

  const quickUpdate = async (item: PortfolioItem, patch: Partial<EditablePortfolioItem>) => {
    const editable = toEditableItem(item);
    return onSaveItem({ ...editable, ...patch });
  };

  const quickUpdateSiteVideo = async (video: SiteVideo, patch: Partial<EditableSiteVideo>) => {
    return onSaveSiteVideo({
      id: video.id,
      section: video.section,
      video_url: video.video_url ?? "",
      thumbnail_url: video.thumbnail_url ?? "",
      title: video.title ?? "",
      description: video.description ?? "",
      sort_order: video.sort_order,
      ...patch,
    });
  };

  const fetchMetadata = async () => {
    if (!form.external_url) {
      setStatus("Please enter a valid External URL first.");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setStatus("Fetching metadata...");
      
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(form.external_url)}`);
      const data = await response.json();
      
      if (!data.contents) {
        throw new Error("Failed to fetch page contents");
      }
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, "text/html");
      
      const title = doc.querySelector('meta[property="og:title"]')?.getAttribute("content") || doc.title || "";
      const description = doc.querySelector('meta[property="og:description"]')?.getAttribute("content") || doc.querySelector('meta[name="description"]')?.getAttribute("content") || "";
      const image = doc.querySelector('meta[property="og:image"]')?.getAttribute("content") || "";
      
      setForm((current) => ({
        ...current,
        title: title || current.title,
        description: description || current.description,
        thumbnail_url: image || current.thumbnail_url,
      }));
      
      setStatus("Metadata fetched successfully.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to fetch metadata.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const mediaAccept = getAcceptValue(form.content_type);
  const requiresUpload = form.content_type !== "website" && !form.media_url.trim() && !form.external_url.trim();
  const requiresWebsiteLink = form.content_type === "website" && !form.external_url.trim();

  const renderUploadZone = (
    variant: DropVariant,
    title: string,
    description: string,
    previewUrl: string,
    accept: string,
  ) => {
    const isActive = dragTarget === variant;

    return (
      <button
        type="button"
        disabled={isSubmitting}
        onClick={() => (variant === "media" ? mediaInputRef.current?.click() : variant === "logo" ? logoInputRef.current?.click() : thumbnailInputRef.current?.click())}
        onDragOver={(event) => {
          event.preventDefault();
          setDragTarget(variant);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragTarget((current) => (current === variant ? null : current));
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragTarget(null);
          void handleFileUpload(event.dataTransfer.files?.[0], variant);
        }}
        className={`flex min-h-40 flex-col items-center justify-center gap-3 border px-4 py-6 text-center transition disabled:cursor-not-allowed disabled:opacity-70 ${isActive ? "border-purple-400 bg-purple-500/10" : "border-white/10 bg-zinc-950/40 hover:border-white/20"}`}
      >
        {previewUrl ? (
          <img src={previewUrl} alt={title} className="mb-2 h-20 w-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <Upload className="h-6 w-6 text-purple-400" />
        )}
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-xs text-zinc-400">{description}</p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-purple-300">Drag, drop, or click</p>
        </div>
        <input
          ref={variant === "media" ? mediaInputRef : variant === "logo" ? logoInputRef : thumbnailInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={(event) => {
            void handleFileUpload(event.target.files?.[0], variant);
            event.target.value = "";
          }}
        />
      </button>
    );
  };

  if (!isConfigured) {
    return (
      <section className="border-b border-white/10 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="border border-amber-500/30 bg-amber-500/10 p-6 text-amber-100">
            Add the frontend Supabase environment values to your local environment before using the admin tools.
          </div>
        </div>
      </section>
    );
  }

  if (!userEmail) {
    return (
      <section className="border-b border-white/10 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <div className="border border-white/10 bg-black/30 p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3 text-white">
                <Lock className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold">Admin sign in</h2>
              </div>
              <div className="space-y-4">
                <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="w-full border border-white/10 bg-black px-4 py-3 text-white" />
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" className="w-full border border-white/10 bg-black px-4 py-3 text-white" />
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => handleAction(() => onSignIn(email, password))} disabled={isSubmitting} className="bg-white px-5 py-3 text-sm font-semibold text-black">
                    Sign In
                  </button>
                </div>
                <p className="text-sm text-zinc-500">No public sign-up. Access is limited to manually approved uploader accounts.</p>
              </div>
            </div>

            <div className="border border-white/10 bg-zinc-950/50 p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">Portfolio Admin</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">A cleaner media workspace</h2>
              <ul className="mt-6 space-y-3 text-sm text-zinc-400">
                <li>• Drag-and-drop uploads for media and thumbnails</li>
                <li>• Preview cards before saving to the live site</li>
                <li>• Featured content queue with ordering controls</li>
                <li>• Dedicated admin workspace for curation</li>
              </ul>
            </div>
          </div>
          {status ? <p className="mt-6 text-sm text-zinc-300">{status}</p> : null}
        </div>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="border-b border-white/10 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="space-y-6 border border-white/10 bg-black/30 p-6">
            <div className="flex items-center gap-3 text-white">
              <ShieldCheck className="h-5 w-5 text-purple-400" />
              <h2 className="text-xl font-semibold">Signed in as {userEmail}</h2>
            </div>
            <p className="text-zinc-400">
              This account is authenticated but not yet authorized as a portfolio admin. If this is the first admin account, you can claim access below.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => handleAction(onClaimAdmin)} disabled={isSubmitting || isLoading} className="bg-white px-5 py-3 text-sm font-semibold text-black">
                Claim Initial Admin Access
              </button>
              <button onClick={() => handleAction(async () => { await onSignOut(); return "Signed out."; })} className="border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                Sign Out
              </button>
            </div>
          </div>
          {status ? <p className="mt-6 text-sm text-zinc-300">{status}</p> : null}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-white/10 pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">Portfolio Admin</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">Dedicated content studio</h1>
            <p className="text-base text-zinc-400 md:text-lg">
              Manage uploads, preview portfolio cards, and control the featured order from one workspace.
            </p>
          </div>
          <button onClick={() => handleAction(async () => { await onSignOut(); return "Signed out."; })} className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm text-white">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
          <aside className="space-y-6">
            <div className="border border-white/10 bg-black/30 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-purple-300">Signed in</p>
              <p className="mt-2 text-lg font-semibold text-white">{userEmail}</p>
              <p className="mt-2 text-sm text-zinc-400">Use this workspace to curate portfolio sections and publish updates instantly.</p>
            </div>

            <div className="grid gap-3">
              {[
                ["Videos", groupedCount.video],
                ["Images", groupedCount.image],
                ["Music", groupedCount.music],
                ["Websites", groupedCount.website],
              ].map(([label, count]) => (
                <div key={label} className="border border-white/10 bg-zinc-950/50 p-4">
                  <p className="text-sm text-zinc-400">{label}</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{count}</p>
                </div>
              ))}
            </div>

            <div className="border border-white/10 bg-zinc-950/50 p-5">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">Featured queue</h2>
              </div>
              <div className="mt-4 space-y-3">
                {featuredItems.length === 0 ? (
                  <p className="text-sm text-zinc-500">No featured items yet.</p>
                ) : (
                  featuredItems.map((item) => (
                    <div key={item.id} className="border border-white/10 bg-black/30 p-3">
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-zinc-500">Order {item.sort_order}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            {/* Tabs Navigation */}
            <div className="flex border-b border-white/10 overflow-x-auto">
              <button
                onClick={() => setActiveTab("dubbing-media")}
                className={`px-6 py-3 text-sm font-semibold tracking-wider uppercase border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "dubbing-media"
                    ? "border-purple-500 text-white font-bold bg-white/5"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                Dubbing & Media Portfolio
              </button>
              <button
                onClick={() => setActiveTab("websites")}
                className={`px-6 py-3 text-sm font-semibold tracking-wider uppercase border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "websites"
                    ? "border-purple-500 text-white font-bold bg-white/5"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                Website Portfolio
              </button>
              <button
                onClick={() => setActiveTab("site-videos")}
                className={`px-6 py-3 text-sm font-semibold tracking-wider uppercase border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "site-videos"
                    ? "border-purple-500 text-white font-bold bg-white/5"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                Showcase Videos (Media Player)
              </button>
            </div>

            {/* Tab 1: Dubbing & Media Portfolio */}
            {activeTab === "dubbing-media" && (
              <>
                <div className="grid gap-6 2xl:grid-cols-[1.1fr_0.9fr]">
                  <div className="border border-white/10 bg-black/30 p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h2 className="text-xl font-semibold text-white">{form.id ? "Edit Item" : "Create New Item"}</h2>
                      <button onClick={resetForm} className="text-sm text-zinc-400 hover:text-white">Reset</button>
                    </div>

                    <div className="grid gap-3">
                      <select 
                        value={form.content_type} 
                        onChange={(event) => setForm((current) => ({ ...current, content_type: event.target.value as EditablePortfolioItem["content_type"] }))} 
                        className="border border-white/10 bg-black px-4 py-3 text-white"
                      >
                        <option value="video">Video</option>
                        <option value="image">Image</option>
                        <option value="music">Music</option>
                      </select>
                      <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Title" className="border border-white/10 bg-black px-4 py-3 text-white" />
                      <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Description" rows={4} className="border border-white/10 bg-black px-4 py-3 text-white" />

                      <div className="grid gap-3 md:grid-cols-2">
                        {renderUploadZone("media", "Main media", "Upload the primary file for this item.", form.media_url, mediaAccept)}
                        {renderUploadZone("thumbnail", "Thumbnail", "Add a cover image for cards and previews.", form.thumbnail_url, "image/*")}
                      </div>
                      {uploadState ? (
                        <div className="border border-purple-500/30 bg-purple-500/10 p-4">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <p className="font-medium text-white">
                              {uploadState.variant === "media" ? "Uploading main media" : "Uploading thumbnail"}
                            </p>
                            <span className="text-purple-300">{uploadState.progress}%</span>
                          </div>
                          <div className="mt-3 h-2 overflow-hidden bg-zinc-900">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 transition-all duration-200"
                              style={{ width: `${uploadState.progress}%` }}
                            />
                          </div>
                          <p className="mt-2 text-xs text-zinc-400">{uploadState.fileName}</p>
                        </div>
                      ) : null}

                      <input value={form.media_url} onChange={(event) => setForm((current) => ({ ...current, media_url: event.target.value }))} placeholder="Media URL" className="border border-white/10 bg-black px-4 py-3 text-white" />
                      <input value={form.thumbnail_url} onChange={(event) => setForm((current) => ({ ...current, thumbnail_url: event.target.value }))} placeholder="Thumbnail URL" className="border border-white/10 bg-black px-4 py-3 text-white" />
                      
                      <div className="flex gap-2">
                        <input value={form.external_url} onChange={(event) => setForm((current) => ({ ...current, external_url: event.target.value }))} placeholder="External URL (optional)" className="flex-1 border border-white/10 bg-black px-4 py-3 text-white" />
                      </div>
                      
                      <input value={form.tags} onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))} placeholder="Tags, comma separated" className="border border-white/10 bg-black px-4 py-3 text-white" />

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="border border-white/10 bg-zinc-950/40 p-4">
                          <p className="text-xs uppercase tracking-[0.25em] text-purple-300">Section placement</p>
                          <input value={form.sort_order} onChange={(event) => setForm((current) => ({ ...current, sort_order: Number(event.target.value) || 0 }))} type="number" placeholder="Sort order" className="mt-3 w-full border border-white/10 bg-black px-4 py-3 text-white" />
                          <p className="mt-2 text-xs text-zinc-500">Lower numbers appear earlier in the portfolio.</p>
                        </div>
                        <div className="border border-white/10 bg-zinc-950/40 p-4 text-sm text-zinc-300">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" checked={form.is_featured} onChange={(event) => setForm((current) => ({ ...current, is_featured: event.target.checked }))} />
                            Feature this item
                          </label>
                          <label className="mt-3 flex items-center gap-3">
                            <input type="checkbox" checked={form.is_published} onChange={(event) => setForm((current) => ({ ...current, is_published: event.target.checked }))} />
                            Publish on live site
                          </label>
                        </div>
                      </div>

                      {requiresUpload ? (
                        <p className="text-sm text-amber-300">Upload the main media file or add an external media link before saving this item.</p>
                      ) : null}

                      <button
                        onClick={() => handleAction(async () => {
                          const message = await onSaveItem(form);
                          resetForm();
                          return message;
                        })}
                        disabled={isSubmitting || requiresUpload}
                        className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-300"
                      >
                        <Plus className="h-4 w-4" />
                        {form.id ? "Save Changes" : "Add Item"}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <PreviewCard form={form} />
                    <div className="border border-white/10 bg-zinc-950/50 p-4 text-sm text-zinc-400">
                      <p className="font-semibold text-white">Before you save</p>
                      <ul className="mt-3 space-y-2">
                        <li>• Drag files directly into the upload zones</li>
                        <li>• Use Featured plus a low order number for top placement</li>
                        <li>• Publish only when the preview looks right</li>
                        <li>• Video, image, and music items need a real media upload or external media link</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border border-white/10 bg-zinc-950/50 p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-white">Media Library</h2>
                    <span className="text-sm text-zinc-500">Video, Image, and Music Items</span>
                  </div>

                  <div className="space-y-3">
                    {sortedItems.filter(item => item.content_type !== "website").length === 0 ? (
                      <div className="border border-dashed border-white/10 p-5 text-sm text-zinc-500">No media items yet.</div>
                    ) : (
                      sortedItems.filter(item => item.content_type !== "website").map((item) => (
                        <article key={item.id} className="border border-white/10 bg-black/30 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-xs uppercase tracking-[0.25em] text-purple-300">{item.content_type}</p>
                                {item.is_featured ? <span className="bg-purple-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-purple-300">Featured</span> : null}
                              </div>
                              <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                              <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
                              <p className="mt-2 text-xs text-zinc-500">Order {item.sort_order}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs ${item.is_published ? "bg-emerald-500/15 text-emerald-300" : "bg-zinc-800 text-zinc-400"}`}>
                              {item.is_published ? "Published" : "Draft"}
                            </span>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button onClick={() => startEditing(item)} className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-sm text-white">
                              <Pencil className="h-4 w-4" />
                              Edit
                            </button>
                            <button onClick={() => handleAction(() => quickUpdate(item, { sort_order: Math.max(0, item.sort_order - 1) }))} className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-sm text-white">
                              <ArrowUp className="h-4 w-4" />
                              Up
                            </button>
                            <button onClick={() => handleAction(() => quickUpdate(item, { sort_order: item.sort_order + 1 }))} className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-sm text-white">
                              <ArrowDown className="h-4 w-4" />
                              Down
                            </button>
                            <button onClick={() => handleAction(() => quickUpdate(item, { is_featured: !item.is_featured }))} className="border border-white/10 px-3 py-2 text-sm text-white">
                              {item.is_featured ? "Unfeature" : "Feature"}
                            </button>
                            <button onClick={() => handleAction(() => onTogglePublished(item))} className="border border-white/10 px-3 py-2 text-sm text-white">
                              {item.is_published ? "Unpublish" : "Publish"}
                            </button>
                            <button onClick={() => handleAction(() => onDeleteItem(item.id))} className="inline-flex items-center gap-2 border border-rose-500/30 px-3 py-2 text-sm text-rose-300">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Tab 2: Website Portfolio */}
            {activeTab === "websites" && (
              <>
                <div className="grid gap-6 2xl:grid-cols-[1.1fr_0.9fr]">
                  <div className="border border-white/10 bg-black/30 p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h2 className="text-xl font-semibold text-white">{form.id ? "Edit Website" : "Create New Website"}</h2>
                      <button onClick={resetForm} className="text-sm text-zinc-400 hover:text-white">Reset</button>
                    </div>

                    <div className="grid gap-3">
                      <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Website Title" className="border border-white/10 bg-black px-4 py-3 text-white font-medium" />
                      <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Description / Summary" rows={3} className="border border-white/10 bg-black px-4 py-3 text-white" />

                      {/* Website Logo and Thumbnail Upload Zones */}
                      <div className="grid gap-3 md:grid-cols-2">
                        {renderUploadZone("logo", "Logo Image (Overlay)", "Upload logo for details modal.", form.logo_url, "image/*")}
                        {renderUploadZone("thumbnail", "Cover Thumbnail", "Upload card background image.", form.thumbnail_url, "image/*")}
                      </div>

                      {uploadState ? (
                        <div className="border border-purple-500/30 bg-purple-500/10 p-4">
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <p className="font-medium text-white">
                              {uploadState.variant === "logo" ? "Uploading logo" : "Uploading thumbnail"}
                            </p>
                            <span className="text-purple-300">{uploadState.progress}%</span>
                          </div>
                          <div className="mt-3 h-2 overflow-hidden bg-zinc-900">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 transition-all duration-200"
                              style={{ width: `${uploadState.progress}%` }}
                            />
                          </div>
                          <p className="mt-2 text-xs text-zinc-400">{uploadState.fileName}</p>
                        </div>
                      ) : null}

                      <div className="flex gap-2">
                        <input value={form.external_url} onChange={(event) => setForm((current) => ({ ...current, external_url: event.target.value }))} placeholder="External Live URL (e.g. https://my-site.vercel.app/)" className="flex-1 border border-white/10 bg-black px-4 py-3 text-white" />
                        <button 
                          onClick={fetchMetadata}
                          disabled={isSubmitting || !form.external_url}
                          type="button"
                          className="bg-purple-600/20 text-purple-300 border border-purple-500/30 px-4 py-3 text-sm font-medium transition hover:bg-purple-600/40 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          Fetch Metadata
                        </button>
                      </div>

                      <input value={form.logo_url} onChange={(event) => setForm((current) => ({ ...current, logo_url: event.target.value }))} placeholder="Logo URL (manually override)" className="border border-white/10 bg-black px-4 py-3 text-white text-xs" />
                      <input value={form.thumbnail_url} onChange={(event) => setForm((current) => ({ ...current, thumbnail_url: event.target.value }))} placeholder="Thumbnail URL (manually override)" className="border border-white/10 bg-black px-4 py-3 text-white text-xs" />
                      
                      <input value={form.tags} onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))} placeholder="Tags (e.g. Next.js, TailWind, E-Commerce)" className="border border-white/10 bg-black px-4 py-3 text-white" />
                      <textarea value={form.case_study} onChange={(event) => setForm((current) => ({ ...current, case_study: event.target.value }))} placeholder="Case Study / Gyaan (paragraphs of text for details modal)" rows={6} className="border border-white/10 bg-black px-4 py-3 text-white font-mono text-sm" />

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="border border-white/10 bg-zinc-950/40 p-4">
                          <p className="text-xs uppercase tracking-[0.25em] text-purple-300">Section placement</p>
                          <input value={form.sort_order} onChange={(event) => setForm((current) => ({ ...current, sort_order: Number(event.target.value) || 0 }))} type="number" placeholder="Sort order" className="mt-3 w-full border border-white/10 bg-black px-4 py-3 text-white" />
                          <p className="mt-2 text-xs text-zinc-500">Lower numbers appear earlier in the portfolio.</p>
                        </div>
                        <div className="border border-white/10 bg-zinc-950/40 p-4 text-sm text-zinc-300">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" checked={form.is_featured} onChange={(event) => setForm((current) => ({ ...current, is_featured: event.target.checked }))} />
                            Feature this website
                          </label>
                          <label className="mt-3 flex items-center gap-3">
                            <input type="checkbox" checked={form.is_published} onChange={(event) => setForm((current) => ({ ...current, is_published: event.target.checked }))} />
                            Publish on live site
                          </label>
                        </div>
                      </div>

                      {requiresWebsiteLink ? (
                        <p className="text-sm text-amber-300">Add the website external URL before saving this website.</p>
                      ) : null}

                      <button
                        onClick={() => handleAction(async () => {
                          const message = await onSaveItem(form);
                          resetForm();
                          return message;
                        })}
                        disabled={isSubmitting || requiresWebsiteLink}
                        className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-300"
                      >
                        <Plus className="h-4 w-4" />
                        {form.id ? "Save Changes" : "Add Website"}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <PreviewCard form={form} />
                    <div className="border border-white/10 bg-zinc-950/50 p-4 text-sm text-zinc-400">
                      <p className="font-semibold text-white">Website preview options</p>
                      <ul className="mt-3 space-y-2">
                        <li>• Paste a link and click **Fetch Metadata** to fetch Title/Description/Thumbnail automatically!</li>
                        <li>• Drag and drop logo and cover images directly.</li>
                        <li>• Input tags and case study paragraphs to enrich details modal.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border border-white/10 bg-zinc-950/50 p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-white">Web Showcase Library</h2>
                    <span className="text-sm text-zinc-500">Website items</span>
                  </div>

                  <div className="space-y-3">
                    {sortedItems.filter(item => item.content_type === "website").length === 0 ? (
                      <div className="border border-dashed border-white/10 p-5 text-sm text-zinc-500">No websites added yet.</div>
                    ) : (
                      sortedItems.filter(item => item.content_type === "website").map((item) => (
                        <article key={item.id} className="border border-white/10 bg-black/30 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-xs uppercase tracking-[0.25em] text-purple-300">{item.content_type}</p>
                                {item.is_featured ? <span className="bg-purple-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-purple-300">Featured</span> : null}
                              </div>
                              <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                              <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
                              <p className="mt-2 text-xs text-zinc-500">Order {item.sort_order}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs ${item.is_published ? "bg-emerald-500/15 text-emerald-300" : "bg-zinc-800 text-zinc-400"}`}>
                              {item.is_published ? "Published" : "Draft"}
                            </span>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button onClick={() => startEditing(item)} className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-sm text-white">
                              <Pencil className="h-4 w-4" />
                              Edit
                            </button>
                            <button onClick={() => handleAction(() => quickUpdate(item, { sort_order: Math.max(0, item.sort_order - 1) }))} className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-sm text-white">
                              <ArrowUp className="h-4 w-4" />
                              Up
                            </button>
                            <button onClick={() => handleAction(() => quickUpdate(item, { sort_order: item.sort_order + 1 }))} className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-sm text-white">
                              <ArrowDown className="h-4 w-4" />
                              Down
                            </button>
                            <button onClick={() => handleAction(() => quickUpdate(item, { is_featured: !item.is_featured }))} className="border border-white/10 px-3 py-2 text-sm text-white">
                              {item.is_featured ? "Unfeature" : "Feature"}
                            </button>
                            <button onClick={() => handleAction(() => onTogglePublished(item))} className="border border-white/10 px-3 py-2 text-sm text-white">
                              {item.is_published ? "Unpublish" : "Publish"}
                            </button>
                            <button onClick={() => handleAction(() => onDeleteItem(item.id))} className="inline-flex items-center gap-2 border border-rose-500/30 px-3 py-2 text-sm text-rose-300">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Tab 3: Showcase Videos (Media Player) */}
            {activeTab === "site-videos" && (
              <div className="border border-white/10 bg-zinc-950/50 p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-white">Media Player Showcase Videos</h2>
                  <p className="text-xs text-zinc-500">Manage proof of concept showcase videos</p>
                </div>

                <div className="grid gap-3">
                  <input value={siteVideoForm.title} onChange={(event) => setSiteVideoForm((current) => ({ ...current, title: event.target.value }))} placeholder="Video Title" className="border border-white/10 bg-black px-4 py-3 text-white font-medium" />
                  <textarea value={siteVideoForm.description} onChange={(event) => setSiteVideoForm((current) => ({ ...current, description: event.target.value }))} placeholder="Description (optional)" rows={2} className="border border-white/10 bg-black px-4 py-3 text-white" />

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="border border-white/10 bg-zinc-950/40 p-4">
                      <label className="block text-sm font-medium text-white mb-2">YouTube URL</label>
                      <input 
                        value={siteVideoForm.video_url} 
                        onChange={(event) => setSiteVideoForm((current) => ({ ...current, video_url: event.target.value }))} 
                        placeholder="https://youtu.be/E8hBNvyR8p0" 
                        className="w-full border border-white/10 bg-black px-4 py-3 text-white text-sm"
                      />
                      <p className="mt-2 text-xs text-zinc-400">Paste any YouTube link (youtu.be or youtube.com)</p>
                    </div>

                    <div className="border border-white/10 bg-zinc-950/40 p-4">
                      <label className="block text-sm font-medium text-white mb-2">Showcase Section Page</label>
                      <select
                        value={siteVideoForm.section}
                        onChange={(event) => setSiteVideoForm((current) => ({ ...current, section: event.target.value }))}
                        className="w-full border border-white/10 bg-black px-4 py-3 text-white text-sm"
                      >
                        <option value="media_player">AI Dubbing Page (media_player)</option>
                        <option value="ai_video">AI Video Page (ai_video)</option>
                      </select>
                      <p className="mt-2 text-xs text-zinc-400">Select which page this showcase video should be displayed on.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAction(async () => {
                      const message = await onSaveSiteVideo(siteVideoForm);
                      setSiteVideoForm({ 
                        section: "media_player", 
                        video_url: "", 
                        thumbnail_url: "", 
                        title: "", 
                        description: "",
                        sort_order: 0
                      });
                      return message;
                    })}
                    disabled={isSubmitting || !siteVideoForm.video_url}
                    className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-300"
                  >
                    <Plus className="h-4 w-4" />
                    {siteVideoForm.id ? "Update Video" : "Add Video"}
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  {siteVideos.length === 0 ? (
                    <div className="border border-dashed border-white/10 p-5 text-sm text-zinc-500">No site videos added yet.</div>
                  ) : (
                    siteVideos.map((video) => (
                      <article key={video.id} className="border border-white/10 bg-black/30 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-300">
                                {video.section === "ai_video" ? "AI Video Showcase" : "AI Dubbing Showcase"}
                              </span>
                              <span className="text-xs text-zinc-500">Order {video.sort_order}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white">{video.title || "Untitled"}</h3>
                            <p className="mt-2 text-sm text-zinc-400">{video.description}</p>
                            <p className="mt-2 text-xs text-zinc-500 truncate">{video.video_url}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button onClick={() => startEditingSiteVideo(video)} className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-sm text-white">
                            <Pencil className="h-4 w-4" />
                            Edit
                          </button>
                          <button onClick={() => handleAction(() => quickUpdateSiteVideo(video, { sort_order: Math.max(0, video.sort_order - 1) }))} className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-sm text-white">
                            <ArrowUp className="h-4 w-4" />
                            Up
                          </button>
                          <button onClick={() => handleAction(() => quickUpdateSiteVideo(video, { sort_order: video.sort_order + 1 }))} className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-sm text-white">
                            <ArrowDown className="h-4 w-4" />
                            Down
                          </button>
                          <button onClick={() => handleAction(() => onDeleteSiteVideo(video.id))} className="inline-flex items-center gap-2 border border-rose-500/30 px-3 py-2 text-sm text-rose-300">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {status ? <p className="mt-6 text-sm text-zinc-300">{status}</p> : null}
      </div>
    </section>
  );
}

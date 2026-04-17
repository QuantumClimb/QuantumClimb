import { useMemo, useRef, useState } from "react";
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
import type { PortfolioContentType, PortfolioItem } from "../lib/supabase";

type AdminDashboardProps = Readonly<{
  isConfigured: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  userEmail?: string;
  items: PortfolioItem[];
  onSignIn: (email: string, password: string) => Promise<string>;
  onSignUp: (email: string, password: string) => Promise<string>;
  onSignOut: () => Promise<void>;
  onClaimAdmin: () => Promise<string>;
  onSaveItem: (item: EditablePortfolioItem) => Promise<string>;
  onDeleteItem: (id: string) => Promise<string>;
  onTogglePublished: (item: PortfolioItem) => Promise<string>;
  onUploadFile: (file: File, contentType: PortfolioContentType, variant: "media" | "thumbnail") => Promise<string>;
}>;

export type EditablePortfolioItem = {
  id?: string;
  content_type: PortfolioContentType;
  title: string;
  description: string;
  media_url: string;
  thumbnail_url: string;
  external_url: string;
  tags: string;
  sort_order: number;
  is_featured: boolean;
  is_published: boolean;
};

type DropVariant = "media" | "thumbnail";

const emptyForm: EditablePortfolioItem = {
  content_type: "video",
  title: "",
  description: "",
  media_url: "",
  thumbnail_url: "",
  external_url: "",
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
  onSignIn,
  onSignUp,
  onSignOut,
  onClaimAdmin,
  onSaveItem,
  onDeleteItem,
  onTogglePublished,
  onUploadFile,
}: AdminDashboardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<EditablePortfolioItem>(emptyForm);
  const [dragTarget, setDragTarget] = useState<DropVariant | null>(null);
  const mediaInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);

  const groupedCount = useMemo(() => ({
    video: items.filter((item) => item.content_type === "video").length,
    image: items.filter((item) => item.content_type === "image").length,
    music: items.filter((item) => item.content_type === "music").length,
    website: items.filter((item) => item.content_type === "website").length,
  }), [items]);

  const sortedItems = useMemo(() => sortItems(items), [items]);
  const featuredItems = useMemo(() => sortedItems.filter((item) => item.is_featured), [sortedItems]);

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
  };

  const resetForm = () => {
    setForm(emptyForm);
    setStatus("Editor reset.");
  };

  const handleFileUpload = async (file: File | undefined, variant: DropVariant) => {
    if (!file) {
      return;
    }

    await handleAction(async () => {
      const uploadedUrl = await onUploadFile(file, form.content_type, variant);
      setForm((current) => {
        if (variant === "media") {
          return { ...current, media_url: uploadedUrl };
        }

        return { ...current, thumbnail_url: uploadedUrl };
      });

      return variant === "media" ? "Media uploaded successfully." : "Thumbnail uploaded successfully.";
    });
  };

  const quickUpdate = async (item: PortfolioItem, patch: Partial<EditablePortfolioItem>) => {
    const editable = toEditableItem(item);
    return onSaveItem({ ...editable, ...patch });
  };

  const mediaAccept = getAcceptValue(form.content_type);

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
        onClick={() => (variant === "media" ? mediaInputRef.current?.click() : thumbnailInputRef.current?.click())}
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
        className={`flex min-h-40 flex-col items-center justify-center gap-3 border px-4 py-6 text-center transition ${isActive ? "border-purple-400 bg-purple-500/10" : "border-white/10 bg-zinc-950/40 hover:border-white/20"}`}
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
          ref={variant === "media" ? mediaInputRef : thumbnailInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={(event) => void handleFileUpload(event.target.files?.[0], variant)}
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
                  <button onClick={() => handleAction(() => onSignUp(email, password))} disabled={isSubmitting} className="border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                    Create Account
                  </button>
                </div>
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
            <div className="grid gap-6 2xl:grid-cols-[1.1fr_0.9fr]">
              <div className="border border-white/10 bg-black/30 p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-white">{form.id ? "Edit item" : "Create new item"}</h2>
                  <button onClick={resetForm} className="text-sm text-zinc-400 hover:text-white">Reset</button>
                </div>

                <div className="grid gap-3">
                  <select value={form.content_type} onChange={(event) => setForm((current) => ({ ...current, content_type: event.target.value as EditablePortfolioItem["content_type"] }))} className="border border-white/10 bg-black px-4 py-3 text-white">
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                    <option value="music">Music</option>
                    <option value="website">Website</option>
                  </select>
                  <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Title" className="border border-white/10 bg-black px-4 py-3 text-white" />
                  <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Description" rows={4} className="border border-white/10 bg-black px-4 py-3 text-white" />

                  {form.content_type !== "website" ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      {renderUploadZone("media", "Main media", "Upload the primary file for this item.", form.media_url, mediaAccept)}
                      {renderUploadZone("thumbnail", "Thumbnail", "Add a cover image for cards and previews.", form.thumbnail_url, "image/*")}
                    </div>
                  ) : null}

                  <input value={form.media_url} onChange={(event) => setForm((current) => ({ ...current, media_url: event.target.value }))} placeholder="Media URL" className="border border-white/10 bg-black px-4 py-3 text-white" />
                  <input value={form.thumbnail_url} onChange={(event) => setForm((current) => ({ ...current, thumbnail_url: event.target.value }))} placeholder="Thumbnail URL" className="border border-white/10 bg-black px-4 py-3 text-white" />
                  <input value={form.external_url} onChange={(event) => setForm((current) => ({ ...current, external_url: event.target.value }))} placeholder="External URL" className="border border-white/10 bg-black px-4 py-3 text-white" />
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

                  <button
                    onClick={() => handleAction(async () => {
                      const message = await onSaveItem(form);
                      resetForm();
                      return message;
                    })}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-black"
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
                  </ul>
                </div>
              </div>
            </div>

            <div className="border border-white/10 bg-zinc-950/50 p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-white">Content library</h2>
                <span className="text-sm text-zinc-500">Featured items appear first</span>
              </div>

              <div className="space-y-3">
                {sortedItems.length === 0 ? (
                  <div className="border border-dashed border-white/10 p-5 text-sm text-zinc-500">No portfolio items yet.</div>
                ) : (
                  sortedItems.map((item) => (
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
          </div>
        </div>

        {status ? <p className="mt-6 text-sm text-zinc-300">{status}</p> : null}
      </div>
    </section>
  );
}

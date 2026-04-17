import { useMemo, useRef, useState } from "react";
import { Lock, LogOut, Pencil, Plus, ShieldCheck, Trash2, Upload } from "lucide-react";
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
}: AdminDashboardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<EditablePortfolioItem>(emptyForm);
  const mediaInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);

  const groupedCount = useMemo(() => {
    return {
      video: items.filter((item) => item.content_type === "video").length,
      image: items.filter((item) => item.content_type === "image").length,
      music: items.filter((item) => item.content_type === "music").length,
      website: items.filter((item) => item.content_type === "website").length,
    };
  }, [items]);

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
    setForm({
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
    });
    setStatus(`Editing ${item.title}`);
  };

  const resetForm = () => setForm(emptyForm);

  const handleFileUpload = async (
    file: File | undefined,
    variant: "media" | "thumbnail",
  ) => {
    if (!file) {
      return;
    }

    await handleAction(async () => {
      const uploadedUrl = await onUploadFile(file, form.content_type, variant);
      setForm((current) => ({
        ...current,
        media_url: variant === "media" ? uploadedUrl : current.media_url,
        thumbnail_url: variant === "thumbnail" ? uploadedUrl : current.thumbnail_url,
      }));
      return `${variant === "media" ? "Media" : "Thumbnail"} uploaded successfully.`;
    });
  };

  return (
    <section className="border-b border-white/10 pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-10 max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">Portfolio Admin</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">Manage your portfolio content</h1>
          <p className="text-base text-zinc-400 md:text-lg">
            Sign in to add videos, images, music, and website links dynamically through Supabase.
          </p>
        </div>

        {!isConfigured ? (
          <div className="border border-amber-500/30 bg-amber-500/10 p-6 text-amber-100">
            Add the frontend Supabase environment values to your local environment before using the admin tools.
          </div>
        ) : !userEmail ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-white/10 bg-black/30 p-6">
              <div className="mb-4 flex items-center gap-3 text-white">
                <Lock className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold">Admin sign in</h2>
              </div>
              <div className="space-y-4">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-white/10 bg-black px-4 py-3 text-white" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border border-white/10 bg-black px-4 py-3 text-white" />
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

            <div className="border border-white/10 bg-zinc-950/50 p-6">
              <h2 className="text-xl font-semibold text-white">What this admin can do</h2>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li>• Add portfolio videos, images, music, and websites</li>
                <li>• Publish or unpublish items instantly</li>
                <li>• Control sort order and featured status</li>
                <li>• Keep your public portfolio synced from the database</li>
              </ul>
            </div>
          </div>
        ) : !isAdmin ? (
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
        ) : (
          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-4">
              {[
                ["Videos", groupedCount.video],
                ["Images", groupedCount.image],
                ["Music", groupedCount.music],
                ["Websites", groupedCount.website],
              ].map(([label, count]) => (
                <div key={label} className="border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-zinc-400">{label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{count}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="border border-white/10 bg-black/30 p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-white">{form.id ? "Edit item" : "Add new item"}</h2>
                  <button onClick={resetForm} className="text-sm text-zinc-400 hover:text-white">Reset</button>
                </div>

                <div className="grid gap-3">
                  <select value={form.content_type} onChange={(e) => setForm((current) => ({ ...current, content_type: e.target.value as EditablePortfolioItem["content_type"] }))} className="border border-white/10 bg-black px-4 py-3 text-white">
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                    <option value="music">Music</option>
                    <option value="website">Website</option>
                  </select>
                  <input value={form.title} onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))} placeholder="Title" className="border border-white/10 bg-black px-4 py-3 text-white" />
                  <textarea value={form.description} onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))} placeholder="Description" rows={4} className="border border-white/10 bg-black px-4 py-3 text-white" />

                  {form.content_type !== "website" ? (
                    <div className="grid gap-3 border border-white/10 bg-zinc-950/40 p-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <button type="button" onClick={() => mediaInputRef.current?.click()} className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm text-white">
                          <Upload className="h-4 w-4" />
                          Upload media file
                        </button>
                        <button type="button" onClick={() => thumbnailInputRef.current?.click()} className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm text-white">
                          <Upload className="h-4 w-4" />
                          Upload thumbnail
                        </button>
                      </div>
                      <input
                        ref={mediaInputRef}
                        type="file"
                        className="hidden"
                        accept={form.content_type === "image" ? "image/*" : form.content_type === "music" ? "audio/*" : "video/*"}
                        onChange={(e) => void handleFileUpload(e.target.files?.[0], "media")}
                      />
                      <input
                        ref={thumbnailInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => void handleFileUpload(e.target.files?.[0], "thumbnail")}
                      />
                    </div>
                  ) : null}

                  <input value={form.media_url} onChange={(e) => setForm((current) => ({ ...current, media_url: e.target.value }))} placeholder="Media URL" className="border border-white/10 bg-black px-4 py-3 text-white" />
                  <input value={form.thumbnail_url} onChange={(e) => setForm((current) => ({ ...current, thumbnail_url: e.target.value }))} placeholder="Thumbnail URL" className="border border-white/10 bg-black px-4 py-3 text-white" />
                  <input value={form.external_url} onChange={(e) => setForm((current) => ({ ...current, external_url: e.target.value }))} placeholder="External URL" className="border border-white/10 bg-black px-4 py-3 text-white" />
                  <input value={form.tags} onChange={(e) => setForm((current) => ({ ...current, tags: e.target.value }))} placeholder="Tags, comma separated" className="border border-white/10 bg-black px-4 py-3 text-white" />
                  <input value={form.sort_order} onChange={(e) => setForm((current) => ({ ...current, sort_order: Number(e.target.value) || 0 }))} type="number" placeholder="Sort order" className="border border-white/10 bg-black px-4 py-3 text-white" />

                  <label className="flex items-center gap-3 text-sm text-zinc-300">
                    <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((current) => ({ ...current, is_featured: e.target.checked }))} />
                    Featured item
                  </label>
                  <label className="flex items-center gap-3 text-sm text-zinc-300">
                    <input type="checkbox" checked={form.is_published} onChange={(e) => setForm((current) => ({ ...current, is_published: e.target.checked }))} />
                    Published on live site
                  </label>

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

              <div className="border border-white/10 bg-zinc-950/50 p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-white">Current items</h2>
                  <button onClick={() => handleAction(async () => { await onSignOut(); return "Signed out."; })} className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white">
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>

                <div className="space-y-3">
                  {items.length === 0 ? (
                    <div className="border border-dashed border-white/10 p-5 text-sm text-zinc-500">No portfolio items yet.</div>
                  ) : (
                    items.map((item) => (
                      <article key={item.id} className="border border-white/10 bg-black/30 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-purple-300">{item.content_type}</p>
                            <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                            <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
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
        )}

        {status ? <p className="mt-6 text-sm text-zinc-300">{status}</p> : null}
      </div>
    </section>
  );
}

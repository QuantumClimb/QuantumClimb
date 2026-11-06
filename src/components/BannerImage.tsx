/**
 * Content image used on service pages. Deliberately has no overlay/scrim:
 * the light theme remaps black to white, so a dark fade would turn into a
 * white haze over the artwork. The image renders identically in both themes.
 */
export function BannerImage({
  src,
  alt,
  className = "",
  imgClassName = "h-40 sm:h-56 lg:h-64",
  position = "70% center",
}: Readonly<{ src: string; alt: string; className?: string; imgClassName?: string; position?: string }>) {
  return (
    <div className={`relative overflow-hidden border border-[#8b5cf6]/25 bg-[#0d0b1a] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: position }}
        className={`block w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

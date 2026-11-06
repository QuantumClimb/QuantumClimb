import type { HealthcareCategory } from "./healthcareContent";

/** Full-bleed banner image at the top of a healthcare capability panel. */
export function HealthcareCategoryImage({
  image,
  className = "",
}: Readonly<{ image: HealthcareCategory["image"]; className?: string }>) {
  return (
    <div className={`relative overflow-hidden border-b border-white/10 ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="w-full h-40 sm:h-56 lg:h-64 object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

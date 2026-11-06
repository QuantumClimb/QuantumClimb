import { BannerImage } from "../../components/BannerImage";
import type { HealthcareCategory } from "./healthcareContent";

/** Full-bleed banner image at the top of a healthcare capability panel. */
export function HealthcareCategoryImage({
  image,
  className = "",
}: Readonly<{ image: HealthcareCategory["image"]; className?: string }>) {
  return <BannerImage src={image.src} alt={image.alt} className={`border-x-0 border-t-0 ${className}`} />;
}

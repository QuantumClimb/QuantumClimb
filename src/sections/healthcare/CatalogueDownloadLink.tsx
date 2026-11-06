import { CatalogueDownloadLink as SharedCatalogueDownloadLink } from "../../components/CatalogueDownloadLink";
import { HEALTHCARE_CATALOGUE } from "./healthcareContent";

/** Download link for the Healthcare Services Catalogue PDF (public/docs). */
export function CatalogueDownloadLink({ className = "" }: Readonly<{ className?: string }>) {
  return <SharedCatalogueDownloadLink catalogue={HEALTHCARE_CATALOGUE} className={className} />;
}

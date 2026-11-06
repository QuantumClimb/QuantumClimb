import { HealthcareAudience } from "../sections/healthcare/HealthcareAudience";
import { HealthcareCapabilities } from "../sections/healthcare/HealthcareCapabilities";
import { HealthcareCTA } from "../sections/healthcare/HealthcareCTA";
import { HealthcareHero } from "../sections/healthcare/HealthcareHero";
import { HealthcareResponsibility } from "../sections/healthcare/HealthcareResponsibility";
import { HealthcareSystem } from "../sections/healthcare/HealthcareSystem";

type HealthcareDigitalGrowthPageProps = Readonly<{
  onOpenContactModal: () => void;
}>;

export function HealthcareDigitalGrowthPage({ onOpenContactModal }: HealthcareDigitalGrowthPageProps) {
  return (
    <div className="pt-[84px] sm:pt-[96px] bg-black min-h-screen text-zinc-300">
      <HealthcareHero onStartProject={onOpenContactModal} />
      <HealthcareAudience />
      <HealthcareCapabilities />
      <HealthcareSystem />
      <HealthcareResponsibility />
      <HealthcareCTA onStartProject={onOpenContactModal} />
    </div>
  );
}

import { SocialApproach } from "../sections/social-media/SocialApproach";
import { SocialCTA } from "../sections/social-media/SocialCTA";
import { SocialHero } from "../sections/social-media/SocialHero";
import { SocialIndustries } from "../sections/social-media/SocialIndustries";
import { SocialPlatforms } from "../sections/social-media/SocialPlatforms";
import { SocialServices } from "../sections/social-media/SocialServices";

type SocialMediaMarketingPageProps = Readonly<{
  onOpenContactModal: () => void;
  onNavigateHealthcare: () => void;
}>;

export function SocialMediaMarketingPage({ onOpenContactModal, onNavigateHealthcare }: SocialMediaMarketingPageProps) {
  return (
    <div className="pt-[84px] sm:pt-[96px] bg-black min-h-screen text-zinc-300">
      <SocialHero onStartProject={onOpenContactModal} />
      <SocialPlatforms />
      <SocialServices />
      <SocialApproach />
      <SocialIndustries onNavigateHealthcare={onNavigateHealthcare} />
      <SocialCTA onStartProject={onOpenContactModal} />
    </div>
  );
}

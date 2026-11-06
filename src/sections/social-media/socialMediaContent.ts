/*
 * Social Media & Digital Marketing — page content.
 * A core Quantum Climb service across industries (not sector-specific).
 */

export const SOCIAL_PLATFORMS = [
  {
    id: "linkedin",
    tagline: "Professional reach & B2B growth",
    color: "#1d3557",
    code: "IN",
    name: "LinkedIn Marketing",
    focus: "PROFESSIONAL CREDIBILITY",
    description:
      "Build professional credibility, strengthen your business presence and connect with decision-makers, industry professionals and potential business partners through strategic content and audience development.",
  },
  {
    id: "instagram",
    tagline: "Visual storytelling & engagement",
    color: "#9b2a76",
    code: "IG",
    name: "Instagram Marketing",
    focus: "VISUAL IDENTITY",
    description:
      "Create a strong visual identity through engaging posts, Reels, Stories and creative campaigns that showcase your brand, products and services.",
  },
  {
    id: "tiktok",
    tagline: "Short-form video & discovery",
    color: "#161616",
    code: "TT",
    name: "TikTok Marketing",
    focus: "SHORT-FORM REACH",
    description:
      "Capture attention through short-form videos, creative storytelling, trends and engaging content designed to expand your reach and introduce your brand to new audiences.",
  },
  {
    id: "facebook",
    tagline: "Community & targeted campaigns",
    color: "#2563b0",
    code: "FB",
    name: "Facebook Marketing",
    focus: "COMMUNITY & CAMPAIGNS",
    description:
      "Build and engage your community through business pages, targeted campaigns, promotional content and audience-focused advertising.",
  },
] as const;

export const SOCIAL_SERVICES = [
  "Social media strategy and brand positioning",
  "Social media account setup and optimisation",
  "Content planning and monthly content calendars",
  "Creative graphic design and branded content",
  "Short-form video production, Reels and TikTok content",
  "AI-powered video creation, editing and localisation",
  "Copywriting, captions and content development",
  "Social media publishing and account management",
  "Paid social media advertising and campaign management",
  "Audience targeting and lead generation",
  "Community engagement and performance monitoring",
  "Analytics, reporting and campaign optimisation",
];

export const SOCIAL_APPROACH = ["STRATEGISE", "CREATE", "PUBLISH", "ENGAGE", "GROW"];

/** Industries served — `link` marks a sector with its own QC service page. */
export const SOCIAL_INDUSTRIES: ReadonlyArray<{ label: string; link?: "healthcare" }> = [
  { label: "Healthcare & clinics", link: "healthcare" },
  { label: "Restaurants & hospitality" },
  { label: "Retail brands" },
  { label: "Product businesses" },
  { label: "Corporate businesses" },
  { label: "Entrepreneurs & professionals" },
];

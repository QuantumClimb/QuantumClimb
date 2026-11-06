/*
 * Healthcare Digital Growth — page content.
 * Copy lives here so the section components stay presentational.
 * Items flagged `key: true` are visually emphasised as priority capabilities.
 */

export const HEALTHCARE_CATALOGUE = {
  href: "/docs/healthcare-services-catalogue.pdf",
  downloadName: "Quantum_Climb_Healthcare_Digital_Services_Catalogue.pdf",
  label: "DOWNLOAD HEALTHCARE SERVICES CATALOGUE",
  meta: "PDF · 11 PAGES",
} as const;

export const HEALTHCARE_AUDIENCES = [
  "Independent doctors",
  "Medical specialists",
  "Clinic owners",
  "Speciality centres",
  "Healthcare entrepreneurs",
  "Doctor-founded product brands",
  "Healthcare manufacturers",
  "Medical education organisations",
];

import type { Feature } from "../../components/FeatureList";

export type HealthcareFeature = Feature;

export type HealthcareCategory = Readonly<{
  id: string;
  number: string;
  title: string;
  tag: string;
  summary: string;
  features: HealthcareFeature[];
  journey?: { label: string; steps: string[] };
  spotlight?: boolean;
}>;

export const HEALTHCARE_CATEGORIES: HealthcareCategory[] = [
  {
    id: "doctor-branding",
    number: "01",
    title: "Doctor & Specialist Branding",
    tag: "PERSONAL AUTHORITY",
    summary:
      "Professional positioning for doctors and specialists — a credible profile website, clear qualification pages and educational content that helps patients and peers understand your expertise.",
    features: [
      { label: "Personal doctor branding", key: true },
      { label: "Professional positioning" },
      { label: "Doctor profile websites", key: true },
      { label: "Specialist & qualification pages" },
      { label: "International SEO" },
      { label: "YouTube medical education channels" },
      { label: "Social media marketing" },
      { label: "Doctor introduction videos" },
      { label: "AI-assisted educational videos", key: true },
      { label: "Multilingual dubbing & lip-sync", key: true },
      { label: "Appointment enquiry pathways" },
      { label: "Knowledge & article CMS" },
    ],
  },
  {
    id: "clinic-growth",
    number: "02",
    title: "Clinic & Speciality Centre Growth",
    tag: "CLINIC DIGITAL GROWTH",
    summary:
      "Clinic websites and enquiry systems that present your doctors, specialities and treatments clearly — and connect every enquiry to a structured follow-up process.",
    features: [
      { label: "Clinic websites", key: true },
      { label: "Healthcare CMS" },
      { label: "Doctor & specialist profiles" },
      { label: "Treatment & speciality pages" },
      { label: "Appointment request forms" },
      { label: "Booking integrations" },
      { label: "Patient enquiry management" },
      { label: "CRM integrations", key: true },
      { label: "WhatsApp enquiry automation", key: true },
      { label: "SEO & location landing pages" },
      { label: "Social campaigns" },
      { label: "Analytics dashboards" },
    ],
    journey: { label: "DIGITAL JOURNEY", steps: ["DISCOVER", "EXPLORE", "ENQUIRE", "FOLLOW UP"] },
  },
  {
    id: "products-commerce",
    number: "03",
    title: "Healthcare Products & Commerce",
    tag: "BRANDS & E-COMMERCE",
    summary:
      "For doctor-founded brands, healthcare manufacturers and approved product businesses — product branding, e-commerce and the partner portals that support distribution.",
    features: [
      { label: "Product branding" },
      { label: "Product websites" },
      { label: "E-commerce CMS", key: true },
      { label: "Product catalogues" },
      { label: "Product videos & advertisements" },
      { label: "SEO & international search visibility" },
      { label: "Social media campaigns" },
      { label: "Distributor portals", key: true },
      { label: "Reseller portals" },
      { label: "Lead generation" },
      { label: "CRM integration" },
    ],
  },
  {
    id: "medical-education",
    number: "04",
    title: "Medical Education & Knowledge Platforms",
    tag: "DEDICATED LMS DEVELOPMENT",
    summary:
      "Dedicated learning platforms for doctors, educators and medical training organisations — from course catalogues and learner progress to recurring subscriptions, payments and automated enrolment funnels.",
    features: [
      { label: "Dedicated Learning Management Systems", key: true },
      { label: "Course catalogues" },
      { label: "Learner accounts" },
      { label: "Lessons & modules" },
      { label: "Progress tracking" },
      { label: "Subscription CMS", key: true },
      { label: "Member-only content" },
      { label: "Recurring access plans" },
      { label: "Payment gateway integrations", key: true },
      { label: "Automated marketing funnels", key: true },
      { label: "Webinar registration" },
      { label: "Learning libraries" },
      { label: "Instructor profiles" },
      { label: "Administration dashboards" },
    ],
    journey: { label: "PLATFORM JOURNEY", steps: ["CREATE", "PUBLISH", "ENROL", "LEARN", "GROW"] },
    spotlight: true,
  },
  {
    id: "international-patients",
    number: "05",
    title: "International Patient Engagement",
    tag: "GLOBAL REACH",
    summary:
      "Multilingual websites, country-specific content and coordinated enquiry workflows for practices that welcome patients from other countries.",
    features: [
      { label: "International patient acquisition websites", key: true },
      { label: "Multilingual landing pages", key: true },
      { label: "Country-specific content" },
      { label: "International marketing campaigns" },
      { label: "WhatsApp enquiry automation" },
      { label: "Appointment coordination workflows" },
      { label: "Treatment information portals" },
      { label: "International patient enquiry CRM", key: true },
      { label: "Video consultation integrations, where permitted" },
    ],
    journey: { label: "ENQUIRY JOURNEY", steps: ["REACH", "INFORM", "CAPTURE", "COORDINATE"] },
  },
  {
    id: "content-marketing",
    number: "06",
    title: "AI-Powered Healthcare Content & Marketing",
    tag: "AI VIDEO & MULTILINGUAL MEDIA",
    summary:
      "Educational and promotional media produced with Quantum Climb's AI video and dubbing pipeline — then distributed, captioned, localised and measured.",
    features: [
      { label: "Content strategy" },
      { label: "Doctor introduction videos" },
      { label: "Educational explainers", key: true },
      { label: "Clinic overview films" },
      { label: "Instagram Reels" },
      { label: "YouTube Shorts" },
      { label: "AI-assisted video editing", key: true },
      { label: "Multilingual dubbing", key: true },
      { label: "Lip-sync" },
      { label: "Captions & subtitles" },
      { label: "SEO content" },
      { label: "Social media campaigns" },
      { label: "Paid advertising support" },
      { label: "Lead tracking & analytics" },
    ],
  },
  {
    id: "technology-integrations",
    number: "07",
    title: "Healthcare Technology & Integrations",
    tag: "CRM, AUTOMATION & INFRASTRUCTURE",
    summary:
      "The technical foundation underneath every engagement — websites, CMS, enquiry systems, CRM and messaging integrations, payments, access control, hosting and maintenance.",
    features: [
      { label: "Custom websites" },
      { label: "CMS" },
      { label: "Appointment & enquiry systems" },
      { label: "CRM integrations", key: true },
      { label: "Email & messaging integrations", key: true },
      { label: "Payment gateways" },
      { label: "E-commerce" },
      { label: "LMS" },
      { label: "Membership & subscriptions" },
      { label: "Analytics & reporting" },
      { label: "Distributor portals" },
      { label: "Role-based access" },
      { label: "Secure hosting options" },
      { label: "Backups & maintenance" },
    ],
  },
];

/** The connected growth system — how the capabilities link together. */
export const HEALTHCARE_SYSTEM_LAYERS = [
  {
    code: "L1",
    title: "Expertise & Content",
    detail: "Doctor branding, AI video, educational explainers, multilingual dubbing and lip-sync.",
  },
  {
    code: "L2",
    title: "Websites & Platforms",
    detail: "Profile and clinic websites, healthcare CMS, e-commerce, LMS and subscription platforms.",
  },
  {
    code: "L3",
    title: "Enquiry & Engagement",
    detail: "Appointment request pathways, booking integrations, WhatsApp enquiries and webinar registration.",
  },
  {
    code: "L4",
    title: "CRM & Automation",
    detail: "Enquiry routing, CRM integration, follow-up workflows and automated marketing funnels.",
  },
  {
    code: "L5",
    title: "Insight & Growth",
    detail: "SEO, campaigns, lead tracking and analytics dashboards to understand what is working.",
  },
];

export const HEALTHCARE_RESPONSIBILITY = {
  weDoNot: [
    "Guarantee patient numbers or clinic revenue",
    "Guarantee search rankings",
    "Promise medical or clinical outcomes",
  ],
  clientResponsibilities: [
    "Clinical accuracy of published content",
    "Patient consent for testimonials, images and case material",
    "Regulatory approvals for products and advertising claims",
    "Accuracy of all published claims",
  ],
  frameworks: ["Malaysia PDPA", "India DPDP Act", "GDPR", "HIPAA"],
};

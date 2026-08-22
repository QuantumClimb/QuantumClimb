import { useState, useRef, DragEvent } from "react";
import { Reveal } from "../components/Reveal";
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Globe, 
  Video, 
  Code, 
  Smartphone, 
  Workflow, 
  Sparkles, 
  Upload, 
  X, 
  MessageSquare, 
  Users, 
  PhoneCall, 
  Layers
} from "lucide-react";

type ContactPageProps = Readonly<{
  onOpenContactModal: () => void;
  onNavigateHome: () => void;
  onNavigatePortfolio: () => void;
  onSubmitInquiry: (data: InquirySubmissionData) => Promise<void>;
}>;

export type InquirySubmissionData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  country: string;
  selectedServices: string[];
  requirements: Record<string, any>;
  description: string;
  timeline: string;
  budget: string;
  referralSource: string;
  fileName: string;
};

const COUNTRY_CODES = [
  { code: "+60", country: "Malaysia (MY)" },
  { code: "+1", country: "United States / Canada (US/CA)" },
  { code: "+44", country: "United Kingdom (UK)" },
  { code: "+91", country: "India (IN)" },
  { code: "+65", country: "Singapore (SG)" },
  { code: "+61", country: "Australia (AU)" },
  { code: "+81", country: "Japan (JP)" },
  { code: "+49", country: "Germany (DE)" },
  { code: "+33", country: "France (FR)" },
  { code: "+86", country: "China (CN)" },
  { code: "+971", country: "United Arab Emirates (AE)" },
  { code: "+62", country: "Indonesia (ID)" },
  { code: "+63", country: "Philippines (PH)" },
  { code: "+66", country: "Thailand (TH)" },
  { code: "+84", country: "Vietnam (VN)" },
  { code: "+852", country: "Hong Kong (HK)" },
  { code: "+886", country: "Taiwan (TW)" },
  { code: "+82", country: "South Korea (KR)" },
  { code: "+966", country: "Saudi Arabia (SA)" },
  { code: "+64", country: "New Zealand (NZ)" },
  { code: "+55", country: "Brazil (BR)" },
  { code: "+52", country: "Mexico (MX)" },
  { code: "+34", country: "Spain (ES)" },
  { code: "+39", country: "Italy (IT)" },
  { code: "+31", country: "Netherlands (NL)" },
  { code: "+41", country: "Switzerland (CH)" },
  { code: "+46", country: "Sweden (SE)" },
  { code: "+47", country: "Norway (NO)" },
  { code: "+45", country: "Denmark (DK)" },
  { code: "+27", country: "South Africa (ZA)" },
  { code: "+90", country: "Turkey (TR)" },
  { code: "+7", country: "Russia (RU)" },
  { code: "+54", country: "Argentina (AR)" },
  { code: "+57", country: "Colombia (CO)" },
  { code: "+56", country: "Chile (CL)" },
  { code: "+51", country: "Peru (PE)" },
  { code: "+20", country: "Egypt (EG)" },
  { code: "+234", country: "Nigeria (NG)" },
  { code: "+254", country: "Kenya (KE)" },
  { code: "+92", country: "Pakistan (PK)" },
  { code: "+880", country: "Bangladesh (BD)" }
].sort((a, b) => a.country.localeCompare(b.country));

// Config for visual service cards
const SERVICES_CONFIG = [
  {
    id: "dubbing",
    label: "01. AI Dubbing & Localization",
    desc: "Transform films, videos and digital content for global audiences with AI-powered multilingual dubbing, voice localization, lip-sync and professional audio finishing.",
    icon: <Globe className="w-5 h-5 text-purple-400" />,
  },
  {
    id: "video",
    label: "02. AI Video Production",
    desc: "Create cinematic AI-generated videos, advertising content, social campaigns, concept films and branded visual experiences using next-generation generative video technology.",
    icon: <Video className="w-5 h-5 text-purple-400" />,
  },
  {
    id: "web",
    label: "03. Web Development",
    desc: "Premium websites, corporate platforms, landing pages, web applications and digital experiences designed around performance, storytelling and modern technology.",
    icon: <Code className="w-5 h-5 text-purple-400" />,
  },
  {
    id: "mobile",
    label: "04. Mobile App Development",
    desc: "Custom iOS, Android and cross-platform applications built around intuitive user experiences, scalable architecture and intelligent functionality.",
    icon: <Smartphone className="w-5 h-5 text-purple-400" />,
  },
  {
    id: "automation",
    label: "05. AI Automation & Agents",
    desc: "Intelligent AI agents, business automation, workflow systems and custom AI solutions designed to reduce repetitive work and improve operational efficiency.",
    icon: <Workflow className="w-5 h-5 text-purple-400" />,
  },
  {
    id: "creative",
    label: "06. Creative & Custom Projects",
    desc: "Have something unconventional in mind? Tell us about your idea and our team will explore the right combination of creative, technical and AI capabilities.",
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
  }
];

export function ContactPage({ onOpenContactModal, onNavigateHome, onNavigatePortfolio, onSubmitInquiry }: ContactPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 1 State: Services Selected
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Step 2 State: Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    countryCode: "+60",
    phone: "",
    company: "",
    jobTitle: "",
    country: ""
  });

  // Step 3 State: Dynamic Service Requirements
  const [requirements, setRequirements] = useState<Record<string, any>>({
    dubbing: {
      contentType: "",
      originalLanguage: "English",
      targetLanguages: [] as string[],
      duration: "",
      servicesRequired: [] as string[],
      sourceMediaExists: ""
    },
    video: {
      contentType: "",
      length: "",
      scriptExists: "",
      referenceExists: "",
      deliverables: [] as string[]
    },
    web: {
      need: "",
      haveWebsite: "",
      currentUrl: "",
      pageCount: "",
      featuresRequired: [] as string[]
    },
    mobile: {
      platforms: [] as string[],
      appType: "",
      stage: "",
      adminDashboardRequired: ""
    },
    automation: {
      areas: [] as string[],
      currentSystems: "",
      goals: ""
    },
    creative: {
      idea: ""
    }
  });

  // Step 4 State: Budget, Timeline, Desc, Upload, Referral
  const [projectDetails, setProjectDetails] = useState({
    description: "",
    timeline: "",
    budget: "",
    referralSource: ""
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Common language list for Dubbing selector
  const commonlyRequestedLanguages = ["Spanish", "French", "German", "Japanese", "Mandarin", "Hindi", "Arabic", "Portuguese", "Italian", "Russian", "Korean", "Tamil"];

  // Toggle service selection in Step 1
  const handleToggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
    setErrors(prev => ({ ...prev, services: "" }));
  };

  // Helper for dynamic requirement state changes
  const updateServiceRequirement = (serviceKey: string, field: string, value: any) => {
    setRequirements(prev => ({
      ...prev,
      [serviceKey]: {
        ...prev[serviceKey],
        [field]: value
      }
    }));
  };

  // Toggle item in requirement sub-arrays
  const toggleRequirementArrayItem = (serviceKey: string, field: string, item: string) => {
    const currentArray = requirements[serviceKey][field] as string[];
    const updatedArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateServiceRequirement(serviceKey, field, updatedArray);
  };

  // Validation handlers for step transitions
  const validateStep = (step: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (step === 1) {
      if (selectedServices.length === 0) {
        stepErrors.services = "Please select at least one service category.";
      }
    }

    if (step === 2) {
      if (!personalInfo.name.trim()) {
        stepErrors.name = "Full Name is required.";
      }
      if (!personalInfo.email.trim()) {
        stepErrors.email = "Work Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
        stepErrors.email = "Please enter a valid work email address.";
      }
    }

    if (step === 4) {
      if (!projectDetails.description.trim()) {
        stepErrors.description = "Please provide a brief project description.";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Step Navigation
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      // Step 3 is only dynamic requirements. If no dynamic service questions apply (e.g. none of standard services), we could skip,
      // but selectedServices will always match one of them since options cover everything.
      // If Step 2 goes to Step 3, let's make sure we open dynamic questions.
      setCurrentStep(prev => prev + 1);
      globalThis.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    globalThis.scrollTo({ top: 0, behavior: "smooth" });
  };

  // File Upload Handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const allowedExtensions = [".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg", ".mp4", ".mp3", ".wav"];
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      setErrors(prev => ({ ...prev, file: "Invalid file type. Please upload PDF, DOC, PNG, JPG, MP4, MP3, or WAV." }));
      return;
    }

    // Limit file size to 100MB for reference materials
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, file: "File is too large. Limit is 100MB." }));
      return;
    }

    setUploadedFile(file);
    setErrors(prev => ({ ...prev, file: "" }));
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit Handler
  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const submissionData: InquirySubmissionData = {
        name: personalInfo.name.trim(),
        email: personalInfo.email.trim(),
        phone: personalInfo.phone.trim() ? `${personalInfo.countryCode} ${personalInfo.phone.trim()}` : "",
        company: personalInfo.company.trim(),
        jobTitle: personalInfo.jobTitle.trim(),
        country: personalInfo.country.trim(),
        selectedServices,
        requirements: selectedServices.reduce((acc, serviceKey) => {
          acc[serviceKey] = requirements[serviceKey];
          return acc;
        }, {} as Record<string, any>),
        description: projectDetails.description.trim(),
        timeline: projectDetails.timeline,
        budget: projectDetails.budget,
        referralSource: projectDetails.referralSource,
        fileName: uploadedFile ? uploadedFile.name : ""
      };

      await onSubmitInquiry(submissionData);
      setIsSuccess(true);
    } catch (err) {
      console.error("Submission failed:", err);
      setErrors({ submission: "Failed to submit project inquiry. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServiceName = (key: string) => {
    switch (key) {
      case "dubbing": return "AI Dubbing & Localization";
      case "video": return "AI Video Production";
      case "web": return "Web Development";
      case "mobile": return "Mobile App Development";
      case "automation": return "AI Automation & Agents";
      case "creative": return "Creative & Custom Project";
      default: return key;
    }
  };

  // Render Step 1: Services Selection
  const renderStepServices = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono tracking-[0.35em] text-purple-400 uppercase">STEP 01 // CATEGORIES</span>
        <span className="text-xs text-zinc-500 font-mono">01 / 05</span>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl sm:text-3xl font-medium tracking-tight text-white uppercase">Select your project type</h2>
        <p className="text-xs sm:text-sm text-zinc-500">Choose one or multiple services you wish to integrate into your project.</p>
      </div>

      {errors.services && (
        <div className="border border-red-500/30 bg-red-500/5 p-4 text-xs text-red-400 font-mono">
          {errors.services}
        </div>
      )}

      <div className="grid gap-4">
        {SERVICES_CONFIG.map(svc => {
          const isSelected = selectedServices.includes(svc.id);
          return (
            <button
              key={svc.id}
              type="button"
              onClick={() => handleToggleService(svc.id)}
              className={`text-left p-3.5 sm:p-6 border transition-all duration-300 flex items-start gap-3 sm:gap-5 cursor-pointer relative ${
                isSelected 
                  ? "border-purple-600 bg-purple-500/5 shadow-[0_0_15px_rgba(124,43,255,0.1)]" 
                  : "border-white/10 bg-zinc-950/40 hover:border-white/20"
              }`}
            >
              <div className="mt-0.5 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 border border-white/10 bg-zinc-900/60 rounded-full shrink-0 group-hover:scale-110 transition-transform">
                {svc.icon}
              </div>
              <div className="flex-1 space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-lg font-medium text-white tracking-tight">{svc.label}</h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed max-w-2xl">{svc.desc}</p>
              </div>
              <div className={`w-4 h-4 sm:w-5 h-5 border flex items-center justify-center shrink-0 mt-1 transition-all ${
                isSelected ? "border-purple-500 bg-purple-600 text-white" : "border-white/20"
              }`}>
                {isSelected && <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-4 border-t border-white/5">
        <button
          type="button"
          onClick={handleNextStep}
          className="px-5 py-3 sm:px-8 sm:py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
        >
          NEXT: ABOUT YOU <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // Render Step 2: User Contact Details
  const renderStepPersonalInfo = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono tracking-[0.35em] text-purple-400 uppercase">STEP 02 // PERSONAL</span>
        <span className="text-xs text-zinc-500 font-mono">02 / 05</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-3xl font-medium tracking-tight text-white uppercase">First, tell us about you</h2>
        <p className="text-xs sm:text-sm text-zinc-500">Provide your contact details so our studio coordinators can reach out to you.</p>
      </div>

      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Full Name*</label>
            <input
              type="text"
              value={personalInfo.name}
              onChange={e => {
                setPersonalInfo(prev => ({ ...prev, name: e.target.value }));
                setErrors(prev => ({ ...prev, name: "" }));
              }}
              placeholder="John Doe"
              className={`w-full border bg-black px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none ${errors.name ? "border-red-500/50" : "border-white/10"}`}
            />
            {errors.name && <p className="text-[10px] font-mono text-red-400">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Work Email*</label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={e => {
                setPersonalInfo(prev => ({ ...prev, email: e.target.value }));
                setErrors(prev => ({ ...prev, email: "" }));
              }}
              placeholder="john@company.com"
              className={`w-full border bg-black px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none ${errors.email ? "border-red-500/50" : "border-white/10"}`}
            />
            {errors.email && <p className="text-[10px] font-mono text-red-400">{errors.email}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Phone / WhatsApp</label>
            <div className="flex border border-white/10 bg-black">
              <select
                value={personalInfo.countryCode}
                onChange={e => setPersonalInfo(prev => ({ ...prev, countryCode: e.target.value }))}
                className="bg-zinc-950 border-r border-white/10 text-white text-xs sm:text-sm px-2 sm:px-3 py-3 focus:outline-none cursor-pointer w-[95px] sm:w-[120px] shrink-0"
              >
                {COUNTRY_CODES.map(c => (
                  <option key={c.code + c.country} value={c.code}>
                    {c.code} {c.country}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={personalInfo.phone}
                onChange={e => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="201 555 0123"
                className="flex-1 bg-black px-4 py-3 text-white text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Company / Studio / Organisation</label>
            <input
              type="text"
              value={personalInfo.company}
              onChange={e => setPersonalInfo(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Company name"
              className="w-full border border-white/10 bg-black px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Job Title</label>
            <input
              type="text"
              value={personalInfo.jobTitle}
              onChange={e => setPersonalInfo(prev => ({ ...prev, jobTitle: e.target.value }))}
              placeholder="Producer, Marketing Director, Founder, etc."
              className="w-full border border-white/10 bg-black px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Country / Region</label>
            <input
              type="text"
              value={personalInfo.country}
              onChange={e => setPersonalInfo(prev => ({ ...prev, country: e.target.value }))}
              placeholder="United States, India, Germany, etc."
              className="w-full border border-white/10 bg-black px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-white/5">
        <button
          type="button"
          onClick={handlePrevStep}
          className="px-4 py-3 sm:px-6 sm:py-4 bg-transparent border border-white/10 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:border-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> BACK
        </button>
        
        <button
          type="button"
          onClick={handleNextStep}
          className="px-5 py-3 sm:px-8 sm:py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
        >
          NEXT: SPECS <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // Render Step 3: Dynamic Requirements Form based on selections
  const renderStepRequirements = () => {
    return (
      <div className="space-y-10">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono tracking-[0.35em] text-purple-400 uppercase">STEP 03 // REQUIREMENTS</span>
          <span className="text-xs text-zinc-500 font-mono">03 / 05</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-3xl font-medium tracking-tight text-white uppercase">Project Specifications</h2>
          <p className="text-xs sm:text-sm text-zinc-500">Provide details for the chosen service modules to help us estimate scope.</p>
        </div>

        {/* Dynamic Section: AI Dubbing & Localization */}
        {selectedServices.includes("dubbing") && (
          <div className="border border-white/10 bg-zinc-950/20 p-8 space-y-6">
            <h3 className="text-lg font-medium text-purple-400 uppercase tracking-wider border-b border-white/5 pb-3">
              01. AI Dubbing & Localization
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Content Type</label>
                <select
                  value={requirements.dubbing.contentType}
                  onChange={e => updateServiceRequirement("dubbing", "contentType", e.target.value)}
                  className="w-full border border-white/10 bg-black text-white text-sm px-4 py-3 focus:outline-none cursor-pointer"
                >
                  <option value="">Select Option</option>
                  <option value="Film">Film</option>
                  <option value="TV Series">TV Series</option>
                  <option value="Documentary">Documentary</option>
                  <option value="YouTube Content">YouTube Content</option>
                  <option value="Advertising">Advertising</option>
                  <option value="Corporate Content">Corporate Content</option>
                  <option value="E-Learning">E-Learning</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Original Language</label>
                <input
                  type="text"
                  value={requirements.dubbing.originalLanguage}
                  onChange={e => updateServiceRequirement("dubbing", "originalLanguage", e.target.value)}
                  placeholder="e.g. English, French"
                  className="w-full border border-white/10 bg-black px-4 py-3 text-white text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Target Languages (Select Multiple)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {commonlyRequestedLanguages.map(lang => {
                  const isChecked = requirements.dubbing.targetLanguages.includes(lang);
                  return (
                    <label key={lang} className={`flex items-center gap-2 border p-3 text-xs select-none cursor-pointer transition-colors ${
                      isChecked ? "border-purple-600 bg-purple-500/5 text-white" : "border-white/10 bg-black text-zinc-400 hover:border-white/20"
                    }`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRequirementArrayItem("dubbing", "targetLanguages", lang)}
                        className="hidden"
                      />
                      <span className={`w-3.5 h-3.5 border flex items-center justify-center ${isChecked ? "border-purple-500 bg-purple-600" : "border-white/20"}`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                      </span>
                      {lang}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Approximate Content Duration</label>
                <select
                  value={requirements.dubbing.duration}
                  onChange={e => updateServiceRequirement("dubbing", "duration", e.target.value)}
                  className="w-full border border-white/10 bg-black text-white text-sm px-4 py-3 focus:outline-none cursor-pointer"
                >
                  <option value="">Select Option</option>
                  <option value="Under 10 minutes">Under 10 minutes</option>
                  <option value="10 to 30 minutes">10 to 30 minutes</option>
                  <option value="30 to 60 minutes">30 to 60 minutes</option>
                  <option value="1 to 3 hours">1 to 3 hours</option>
                  <option value="3 to 10 hours">3 to 10 hours</option>
                  <option value="10+ hours">10+ hours</option>
                  <option value="Ongoing project">Ongoing project</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Do you have source audio/video?</label>
                <div className="flex gap-4">
                  {["Yes", "No"].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateServiceRequirement("dubbing", "sourceMediaExists", opt)}
                      className={`flex-1 border py-3 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                        requirements.dubbing.sourceMediaExists === opt ? "border-purple-600 bg-purple-500/5 text-white" : "border-white/10 hover:border-white/20 text-zinc-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Services Required</label>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {["AI Dubbing", "Voice Localization", "Lip Sync", "Translation", "Subtitle Creation", "Audio Mixing", "Audio Mastering", "Quality Control", "Full Localization Pipeline"].map(srv => {
                  const isChecked = requirements.dubbing.servicesRequired.includes(srv);
                  return (
                    <label key={srv} className={`flex items-center gap-2 border p-3 text-xs select-none cursor-pointer transition-colors ${
                      isChecked ? "border-purple-600 bg-purple-500/5 text-white" : "border-white/10 bg-black text-zinc-400 hover:border-white/20"
                    }`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRequirementArrayItem("dubbing", "servicesRequired", srv)}
                        className="hidden"
                      />
                      <span className={`w-3.5 h-3.5 border flex items-center justify-center ${isChecked ? "border-purple-500 bg-purple-600" : "border-white/20"}`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                      </span>
                      {srv}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Section: AI Video Production */}
        {selectedServices.includes("video") && (
          <div className="border border-white/10 bg-zinc-950/20 p-8 space-y-6">
            <h3 className="text-lg font-medium text-purple-400 uppercase tracking-wider border-b border-white/5 pb-3">
              02. AI Video Production
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">What would you like to create?</label>
                <select
                  value={requirements.video.contentType}
                  onChange={e => updateServiceRequirement("video", "contentType", e.target.value)}
                  className="w-full border border-white/10 bg-black text-white text-sm px-4 py-3 focus:outline-none cursor-pointer"
                >
                  <option value="">Select Option</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Social Media Video">Social Media Video</option>
                  <option value="Product Video">Product Video</option>
                  <option value="Music Video">Music Video</option>
                  <option value="Corporate Video">Corporate Video</option>
                  <option value="Cinematic Film">Cinematic Film</option>
                  <option value="Concept Video">Concept Video</option>
                  <option value="Explainer">Explainer</option>
                  <option value="AI Avatar Content">AI Avatar Content</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Approximate Video Length</label>
                <select
                  value={requirements.video.length}
                  onChange={e => updateServiceRequirement("video", "length", e.target.value)}
                  className="w-full border border-white/10 bg-black text-white text-sm px-4 py-3 focus:outline-none cursor-pointer"
                >
                  <option value="">Select Option</option>
                  <option value="Under 15 seconds">Under 15 seconds</option>
                  <option value="15 to 30 seconds">15 to 30 seconds</option>
                  <option value="30 to 60 seconds">30 to 60 seconds</option>
                  <option value="1 to 3 minutes">1 to 3 minutes</option>
                  <option value="3 to 10 minutes">3 to 10 minutes</option>
                  <option value="Long-form">Long-form</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Do you have an existing script?</label>
                <select
                  value={requirements.video.scriptExists}
                  onChange={e => updateServiceRequirement("video", "scriptExists", e.target.value)}
                  className="w-full border border-white/10 bg-black text-white text-sm px-4 py-3 focus:outline-none cursor-pointer"
                >
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Need help creating one">Need help creating one</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Do you have reference images or videos?</label>
                <div className="flex gap-4">
                  {["Yes", "No"].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateServiceRequirement("video", "referenceExists", opt)}
                      className={`flex-1 border py-3 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                        requirements.video.referenceExists === opt ? "border-purple-600 bg-purple-500/5 text-white" : "border-white/10 hover:border-white/20 text-zinc-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Required Deliverables</label>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {["16:9 Landscape", "9:16 Vertical", "1:1 Square", "Social Media Versions", "Multiple Language Versions"].map(deliv => {
                  const isChecked = requirements.video.deliverables.includes(deliv);
                  return (
                    <label key={deliv} className={`flex items-center gap-2 border p-3 text-xs select-none cursor-pointer transition-colors ${
                      isChecked ? "border-purple-600 bg-purple-500/5 text-white" : "border-white/10 bg-black text-zinc-400 hover:border-white/20"
                    }`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRequirementArrayItem("video", "deliverables", deliv)}
                        className="hidden"
                      />
                      <span className={`w-3.5 h-3.5 border flex items-center justify-center ${isChecked ? "border-purple-500 bg-purple-600" : "border-white/20"}`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                      </span>
                      {deliv}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Section: Web Development */}
        {selectedServices.includes("web") && (
          <div className="border border-white/10 bg-zinc-950/20 p-8 space-y-6">
            <h3 className="text-lg font-medium text-purple-400 uppercase tracking-wider border-b border-white/5 pb-3">
              03. Web Development
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">What do you need?</label>
                <select
                  value={requirements.web.need}
                  onChange={e => updateServiceRequirement("web", "need", e.target.value)}
                  className="w-full border border-white/10 bg-black text-white text-sm px-4 py-3 focus:outline-none cursor-pointer"
                >
                  <option value="">Select Option</option>
                  <option value="New Website">New Website</option>
                  <option value="Website Redesign">Website Redesign</option>
                  <option value="Corporate Website">Corporate Website</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Client Portal">Client Portal</option>
                  <option value="AI-Powered Website">AI-Powered Website</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Do you currently have a website?</label>
                <div className="flex gap-4">
                  {["Yes", "No"].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateServiceRequirement("web", "haveWebsite", opt)}
                      className={`flex-1 border py-3 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                        requirements.web.haveWebsite === opt ? "border-purple-600 bg-purple-500/5 text-white" : "border-white/10 hover:border-white/20 text-zinc-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {requirements.web.haveWebsite === "Yes" && (
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Current Website URL</label>
                <input
                  type="text"
                  value={requirements.web.currentUrl}
                  onChange={e => updateServiceRequirement("web", "currentUrl", e.target.value)}
                  placeholder="https://mycompany.com"
                  className="w-full border border-white/10 bg-black px-4 py-3 text-white text-sm focus:outline-none"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Approximately how many pages do you need?</label>
              <select
                value={requirements.web.pageCount}
                onChange={e => updateServiceRequirement("web", "pageCount", e.target.value)}
                className="w-full border border-white/10 bg-black text-white text-sm px-4 py-3 focus:outline-none cursor-pointer"
              >
                <option value="">Select Option</option>
                <option value="1 Page">1 Page</option>
                <option value="2 to 5 Pages">2 to 5 Pages</option>
                <option value="6 to 10 Pages">6 to 10 Pages</option>
                <option value="10 to 20 Pages">10 to 20 Pages</option>
                <option value="20+ Pages">20+ Pages</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Features Required</label>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "CMS", "Contact Forms", "Booking System", "Payment Gateway", "User Login", 
                  "Customer Dashboard", "AI Chatbot", "AI Agent", "WhatsApp Integration", 
                  "CRM Integration", "Analytics", "Multilingual Website", "E-Commerce", 
                  "API Integration"
                ].map(feat => {
                  const isChecked = requirements.web.featuresRequired.includes(feat);
                  return (
                    <label key={feat} className={`flex items-center gap-2 border p-3 text-xs select-none cursor-pointer transition-colors ${
                      isChecked ? "border-purple-600 bg-purple-500/5 text-white" : "border-white/10 bg-black text-zinc-400 hover:border-white/20"
                    }`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRequirementArrayItem("web", "featuresRequired", feat)}
                        className="hidden"
                      />
                      <span className={`w-3.5 h-3.5 border flex items-center justify-center ${isChecked ? "border-purple-500 bg-purple-600" : "border-white/20"}`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                      </span>
                      {feat}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Section: Mobile App Development */}
        {selectedServices.includes("mobile") && (
          <div className="border border-white/10 bg-zinc-950/20 p-8 space-y-6">
            <h3 className="text-lg font-medium text-purple-400 uppercase tracking-wider border-b border-white/5 pb-3">
              04. Mobile App Development
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">What platform do you need?</label>
                <div className="grid grid-cols-2 gap-3">
                  {["iOS", "Android", "Both", "Web + Mobile", "Not Sure"].map(plat => {
                    const isChecked = requirements.mobile.platforms.includes(plat);
                    return (
                      <label key={plat} className={`flex items-center gap-2 border p-3 text-xs select-none cursor-pointer transition-colors ${
                        isChecked ? "border-purple-600 bg-purple-500/5 text-white" : "border-white/10 bg-black text-zinc-400"
                      }`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleRequirementArrayItem("mobile", "platforms", plat)}
                          className="hidden"
                        />
                        <span className={`w-3.5 h-3.5 border flex items-center justify-center ${isChecked ? "border-purple-500 bg-purple-600" : "border-white/20"}`}>
                          {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                        </span>
                        {plat}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">What type of application?</label>
                <select
                  value={requirements.mobile.appType}
                  onChange={e => updateServiceRequirement("mobile", "appType", e.target.value)}
                  className="w-full border border-white/10 bg-black text-white text-sm px-4 py-3 focus:outline-none cursor-pointer"
                >
                  <option value="">Select Option</option>
                  <option value="Business App">Business App</option>
                  <option value="Consumer App">Consumer App</option>
                  <option value="Marketplace">Marketplace</option>
                  <option value="Booking App">Booking App</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Social Platform">Social Platform</option>
                  <option value="Internal Business Tool">Internal Business Tool</option>
                  <option value="AI Application">AI Application</option>
                  <option value="Media / Entertainment">Media / Entertainment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Current project stage</label>
                <select
                  value={requirements.mobile.stage}
                  onChange={e => updateServiceRequirement("mobile", "stage", e.target.value)}
                  className="w-full border border-white/10 bg-black text-white text-sm px-4 py-3 focus:outline-none cursor-pointer"
                >
                  <option value="">Select Option</option>
                  <option value="Idea">Idea</option>
                  <option value="Wireframe">Wireframe</option>
                  <option value="UI/UX Designed">UI/UX Designed</option>
                  <option value="Prototype">Prototype</option>
                  <option value="Existing Application">Existing Application</option>
                  <option value="Need Complete Development">Need Complete Development</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Do you require an admin dashboard?</label>
                <select
                  value={requirements.mobile.adminDashboardRequired}
                  onChange={e => updateServiceRequirement("mobile", "adminDashboardRequired", e.target.value)}
                  className="w-full border border-white/10 bg-black text-white text-sm px-4 py-3 focus:outline-none cursor-pointer"
                >
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Not Sure">Not Sure</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Section: AI Automation & Agents */}
        {selectedServices.includes("automation") && (
          <div className="border border-white/10 bg-zinc-950/20 p-8 space-y-6">
            <h3 className="text-lg font-medium text-purple-400 uppercase tracking-wider border-b border-white/5 pb-3">
              05. AI Automation & Agents
            </h3>

            <div className="space-y-3">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">What would you like to automate? (Select Multiple)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Sales", "Lead Generation", "Customer Support", "Marketing", "Email", 
                  "CRM", "Administration", "Reporting", "Content Production", 
                  "Internal Operations", "Data Processing"
                ].map(area => {
                  const isChecked = requirements.automation.areas.includes(area);
                  return (
                    <label key={area} className={`flex items-center gap-2 border p-3 text-xs select-none cursor-pointer transition-colors ${
                      isChecked ? "border-purple-600 bg-purple-500/5 text-white" : "border-white/10 bg-black text-zinc-400"
                    }`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRequirementArrayItem("automation", "areas", area)}
                        className="hidden"
                      />
                      <span className={`w-3.5 h-3.5 border flex items-center justify-center ${isChecked ? "border-purple-500 bg-purple-600" : "border-white/20"}`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                      </span>
                      {area}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">What systems are you currently using?</label>
              <textarea
                value={requirements.automation.currentSystems}
                onChange={e => updateServiceRequirement("automation", "currentSystems", e.target.value)}
                placeholder="CRM, WhatsApp, Google Workspace, Microsoft 365, Slack, internal systems, etc."
                rows={3}
                className="w-full border border-white/10 bg-black px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">What would you like the AI system to achieve?</label>
              <textarea
                value={requirements.automation.goals}
                onChange={e => updateServiceRequirement("automation", "goals", e.target.value)}
                placeholder="Describe your operational goals, KPIs, or bottleneck processes you wish to automate."
                rows={4}
                className="w-full border border-white/10 bg-black px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Dynamic Section: Creative & Custom Projects */}
        {selectedServices.includes("creative") && (
          <div className="border border-white/10 bg-zinc-950/20 p-8 space-y-6">
            <h3 className="text-lg font-medium text-purple-400 uppercase tracking-wider border-b border-white/5 pb-3">
              06. Creative & Custom Projects
            </h3>

            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Tell us what you want to create</label>
              <textarea
                value={requirements.creative.idea}
                onChange={e => updateServiceRequirement("creative", "idea", e.target.value)}
                placeholder="Describe your idea, challenge or vision. If the technical solution is not clear yet, simply tell us what you want to achieve."
                rows={6}
                className="w-full border border-white/10 bg-black px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-8 border-t border-white/5">
          <button
            type="button"
            onClick={handlePrevStep}
            className="px-4 py-3 sm:px-6 sm:py-4 bg-transparent border border-white/10 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:border-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> BACK
          </button>
          
          <button
            type="button"
            onClick={handleNextStep}
            className="px-5 py-3 sm:px-8 sm:py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
          >
            NEXT: TIMELINE <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Render Step 4: Budget, Timeline, Desc, Upload, Referral
  const renderStepProjectDetails = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono tracking-[0.35em] text-purple-400 uppercase">STEP 04 // TIMELINE & BUDGET</span>
        <span className="text-xs text-zinc-500 font-mono">04 / 05</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-3xl font-medium tracking-tight text-white uppercase">Project Context</h2>
        <p className="text-xs sm:text-sm text-zinc-500">Provide a high-level summary, target timeline, and budget estimation.</p>
      </div>

      <div className="space-y-6">
        {/* Project Description */}
        <div className="space-y-2">
          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Project Description*</label>
          <textarea
            value={projectDetails.description}
            onChange={e => {
              setProjectDetails(prev => ({ ...prev, description: e.target.value }));
              setErrors(prev => ({ ...prev, description: "" }));
            }}
            placeholder="Tell us about your project, goals, audience and what you would like Quantum Climb to help you achieve."
            rows={5}
            className={`w-full border bg-black px-4 py-3 text-white text-sm focus:border-purple-500 focus:outline-none ${errors.description ? "border-red-500/50" : "border-white/10"}`}
          />
          {errors.description && <p className="text-[10px] font-mono text-red-400">{errors.description}</p>}
        </div>

        {/* Start Timeline */}
        <div className="space-y-3">
          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">When would you like to start?</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {["Immediately", "Within 2 weeks", "Within 1 month", "1 to 3 months", "3 to 6 months", "Just Exploring"].map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setProjectDetails(prev => ({ ...prev, timeline: opt }))}
                className={`border py-3 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                  projectDetails.timeline === opt ? "border-purple-600 bg-purple-500/5 text-white" : "border-white/10 hover:border-white/20 text-zinc-400"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-3">
          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Estimated Project Budget</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Under USD 1,000", "USD 1,000 to 5,000", "USD 5,000 to 10,000", 
              "USD 10,000 to 25,000", "USD 25,000 to 50,000", "USD 50,000+", "Let's Discuss"
            ].map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setProjectDetails(prev => ({ ...prev, budget: opt }))}
                className={`border py-3 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                  projectDetails.budget === opt ? "border-purple-600 bg-purple-500/5 text-white" : "border-white/10 hover:border-white/20 text-zinc-400"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* File Uploader */}
        <div className="space-y-3">
          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">Have something to show us?</label>
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed p-6 text-center cursor-pointer transition-all ${
              isDragOver ? "border-purple-500 bg-purple-600/10" : "border-white/10 hover:border-white/20 bg-zinc-950/40"
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              className="hidden" 
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.mp4,.mp3,.wav"
            />
            {uploadedFile ? (
              <div className="flex flex-col items-center justify-center space-y-3" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-3 bg-zinc-900 border border-white/10 px-4 py-2 text-xs text-white">
                  <span>{uploadedFile.name}</span>
                  <button type="button" onClick={removeUploadedFile} className="text-zinc-500 hover:text-white transition-colors cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">File attached successfully</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="w-6 h-6 text-purple-400 mb-1" />
                <p className="text-xs font-semibold text-white">Upload reference material</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Drag & drop or click to browse</p>
                <p className="text-[9px] text-zinc-600">Supports PDF, DOC, PNG, JPG, MP4, MP3, WAV (Max 100MB)</p>
              </div>
            )}
          </div>
          {errors.file && <p className="text-[10px] font-mono text-red-400">{errors.file}</p>}
        </div>

        {/* How did you hear */}
        <div className="space-y-2">
          <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">How did you hear about Quantum Climb?</label>
          <select
            value={projectDetails.referralSource}
            onChange={e => setProjectDetails(prev => ({ ...prev, referralSource: e.target.value }))}
            className="w-full border border-white/10 bg-black text-white text-sm px-4 py-3 focus:outline-none cursor-pointer"
          >
            <option value="">Select Option</option>
            <option value="Google">Google</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="YouTube">YouTube</option>
            <option value="Referral">Referral</option>
            <option value="Existing Client">Existing Client</option>
            <option value="Event">Event</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-white/5">
        <button
          type="button"
          onClick={handlePrevStep}
          className="px-4 py-3 sm:px-6 sm:py-4 bg-transparent border border-white/10 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:border-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> BACK
        </button>
        
        <button
          type="button"
          onClick={handleNextStep}
          className="px-5 py-3 sm:px-8 sm:py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
        >
          NEXT: REVIEW <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // Render Step 5: Review & Submit
  const renderStepReview = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono tracking-[0.35em] text-purple-400 uppercase">STEP 05 // REVIEW</span>
        <span className="text-xs text-zinc-500 font-mono">05 / 05</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-3xl font-medium tracking-tight text-white uppercase">Review & Submit</h2>
        <p className="text-xs sm:text-sm text-zinc-500">Double check your requirements before initiating transmission to our studio system.</p>
      </div>

      {errors.submission && (
        <div className="border border-red-500/30 bg-red-500/5 p-4 text-xs text-red-400 font-mono">
          {errors.submission}
        </div>
      )}

      {/* Review Box */}
      <div className="border border-white/10 bg-zinc-950/40 p-8 space-y-6 text-sm">
        <div className="grid md:grid-cols-2 gap-6 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Full Name</span>
            <span className="text-white font-medium">{personalInfo.name}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Work Email</span>
            <span className="text-white font-medium">{personalInfo.email}</span>
          </div>
          {personalInfo.phone && (
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Phone / WhatsApp</span>
              <span className="text-white font-medium">{personalInfo.countryCode} {personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.company && (
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Company</span>
              <span className="text-white font-medium">{personalInfo.company}</span>
            </div>
          )}
        </div>

        <div className="border-b border-white/5 pb-6 space-y-3">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Selected Modules</span>
          <div className="flex flex-wrap gap-2">
            {selectedServices.map(key => (
              <span key={key} className="bg-purple-600/10 border border-purple-500/20 px-3 py-1.5 text-xs text-purple-300 font-mono">
                {getServiceName(key)}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Timeline</span>
            <span className="text-white font-medium">{projectDetails.timeline || "Not Specified"}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Estimated Budget</span>
            <span className="text-white font-medium">{projectDetails.budget || "Not Specified"}</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Project Description</span>
          <p className="text-zinc-300 leading-relaxed max-w-2xl whitespace-pre-wrap">{projectDetails.description}</p>
        </div>

        {uploadedFile && (
          <div className="space-y-2 pt-2">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Attached Material</span>
            <span className="inline-block bg-zinc-900 border border-white/10 px-3 py-1.5 text-xs text-zinc-400">
              {uploadedFile.name}
            </span>
          </div>
        )}
      </div>

      {/* Action / Privacy Box */}
      <div className="space-y-6 pt-4">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-5 bg-gradient-to-r from-[#7C2BFF] to-[#B020FF] hover:opacity-90 disabled:opacity-50 text-white font-bold tracking-widest transition-all uppercase text-sm flex items-center justify-center gap-2 cursor-pointer border-none"
        >
          {isSubmitting ? "TRANSMITTING INQUIRY..." : "SEND PROJECT INQUIRY →"}
        </button>

        <p className="text-center text-[10px] text-zinc-500 font-mono uppercase">
          We usually respond within 1 to 2 business days.
        </p>

        <p className="text-xs text-zinc-500 leading-relaxed border-t border-white/5 pt-6">
          By submitting this form, you agree that Quantum Climb may contact you regarding your project inquiry. Your information will never be sold or shared with third parties for marketing purposes.
        </p>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-white/5">
        <button
          type="button"
          onClick={handlePrevStep}
          className="px-4 py-3 sm:px-6 sm:py-4 bg-transparent border border-white/10 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:border-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> BACK
        </button>
      </div>
    </div>
  );

  // Render Success Screen
  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto text-center py-20 space-y-8">
      <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full border border-purple-600/30 bg-purple-500/5 mx-auto">
        <div className="absolute inset-0 bg-purple-600/20 blur-xl rounded-full opacity-40 animate-pulse"></div>
        <Check className="w-10 h-10 text-purple-400 relative z-10" />
      </div>

      <div className="space-y-3">
        <span className="text-[10px] font-mono tracking-[0.35em] text-purple-400 uppercase block">INQUIRY RECEIVED</span>
        <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white uppercase">Your project is now on <span className="text-zinc-500 italic font-serif">our radar.</span></h2>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto pt-2">
          Thank you for reaching out to Quantum Climb. Our coordinators will review your requirements and contact you shortly to schedule an initial consultation.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 max-w-sm mx-auto">
        <button
          type="button"
          onClick={onNavigateHome}
          className="w-full px-8 py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
        >
          RETURN HOME
        </button>
        <button
          type="button"
          onClick={() => {
            onNavigateHome();
            // Allow home navigation to settle, then scroll to ecosystem/services
            globalThis.setTimeout(() => {
              const eco = globalThis.document.getElementById("what-can-we-build");
              if (eco) eco.scrollIntoView({ behavior: "smooth" });
            }, 350);
          }}
          className="w-full px-8 py-4 bg-transparent border border-white/10 text-white font-semibold text-xs uppercase tracking-wider hover:border-white transition-colors cursor-pointer"
        >
          EXPLORE OUR SERVICES
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative bg-[#050307] min-h-screen pt-24 md:pt-40 pb-16 md:pb-24 overflow-hidden text-zinc-300 selection:bg-purple-600 selection:text-white">
      {/* Subtle grid backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full max-w-full overflow-hidden">
        {isSuccess ? (
          <Reveal type="fold">{renderSuccess()}</Reveal>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-10 xl:gap-16 items-start w-full max-w-full">
            
            {/* LEFT COLUMN: Hero text and Dynamic Sticky Summary */}
            <aside className="xl:sticky xl:top-32 space-y-12 text-center xl:text-left mx-auto max-w-xl xl:max-w-none">
              <div className="space-y-6">
                <Reveal type="mask">
                  <span className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 text-purple-400 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
                    START A PROJECT
                  </span>
                </Reveal>
                <Reveal type="mask">
                  <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-white leading-tight uppercase">
                    Let's build something <br />
                    <span className="text-zinc-500 italic font-serif">extraordinary.</span>
                  </h1>
                </Reveal>
                <Reveal type="fade-up" delay={0.1}>
                  <p className="text-sm text-zinc-400 leading-relaxed font-light">
                    Tell us what you're looking to create. Choose a service below and give us a few details about your project. Our team will review your requirements and get back to you with the right solution.
                  </p>
                </Reveal>
              </div>

              {/* Progress Tracker dots */}
              <Reveal type="fade-up" delay={0.2}>
                <div className="flex items-center gap-3 font-mono text-xs text-zinc-500 justify-center xl:justify-start">
                  <span className={currentStep === 1 ? "text-purple-400 font-bold" : currentStep > 1 ? "text-white" : ""}>01</span>
                  <span>/</span>
                  <span className={currentStep === 2 ? "text-purple-400 font-bold" : currentStep > 2 ? "text-white" : ""}>02</span>
                  <span>/</span>
                  <span className={currentStep === 3 ? "text-purple-400 font-bold" : currentStep > 3 ? "text-white" : ""}>03</span>
                  <span>/</span>
                  <span className={currentStep === 4 ? "text-purple-400 font-bold" : currentStep > 4 ? "text-white" : ""}>04</span>
                  <span>/</span>
                  <span className={currentStep === 5 ? "text-purple-400 font-bold" : ""}>05</span>
                </div>
              </Reveal>

              {/* Dynamic Sticky Project Summary Card */}
              <Reveal type="fade-up" delay={0.3}>
                <div className="border border-white/10 bg-zinc-950/80 p-6 space-y-4 text-left">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-2">YOUR PROJECT</h4>
                  
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-zinc-600 uppercase block mb-1">Services Selected:</span>
                      {selectedServices.length === 0 ? (
                        <span className="text-zinc-500 italic">None selected</span>
                      ) : (
                        <ul className="space-y-1 text-white">
                          {selectedServices.map(key => (
                            <li key={key} className="flex items-center gap-1.5 font-mono text-[10px] text-purple-300">
                              <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                              {getServiceName(key)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {personalInfo.name && (
                      <div>
                        <span className="text-zinc-600 uppercase block mb-1">Contact:</span>
                        <span className="text-zinc-300 block font-mono text-[10px] truncate">{personalInfo.name} ({personalInfo.email})</span>
                      </div>
                    )}

                    {projectDetails.timeline && (
                      <div>
                        <span className="text-zinc-600 uppercase block mb-1">Timeline:</span>
                        <span className="text-zinc-300 font-medium">{projectDetails.timeline}</span>
                      </div>
                    )}

                    {projectDetails.budget && (
                      <div>
                        <span className="text-zinc-600 uppercase block mb-1">Estimated Budget:</span>
                        <span className="text-zinc-300 font-medium">{projectDetails.budget}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            </aside>

            {/* RIGHT COLUMN: Form steps */}
            <main className="border border-white/10 bg-black/40 p-5 sm:p-8 md:p-12 shadow-2xl relative w-full max-w-full overflow-hidden">
              {currentStep === 1 && renderStepServices()}
              {currentStep === 2 && renderStepPersonalInfo()}
              {currentStep === 3 && renderStepRequirements()}
              {currentStep === 4 && renderStepProjectDetails()}
              {currentStep === 5 && renderStepReview()}
            </main>

          </div>
        )}

        {/* Dynamic Contact Alternatives */}
        <section className="mt-32 pt-16 border-t border-white/5 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase">CONTACT ALTERNATIVES</span>
            <h2 className="text-3xl font-medium tracking-tight text-white uppercase">Prefer to talk directly?</h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">Get in touch with specific departments directly via email.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* GENERAL INQUIRIES */}
            <div className="border border-white/10 bg-zinc-950/30 p-6 space-y-4">
              <div className="w-10 h-10 border border-white/10 bg-zinc-900/60 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-base font-semibold text-white uppercase tracking-wider">General Inquiries</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">For general questions about Quantum Climb, our capabilities, or studio locations.</p>
              <a href="mailto:hello@quantumclimb.com" className="block text-xs font-mono text-purple-400 hover:text-purple-300 uppercase tracking-widest pt-2">
                hello@quantumclimb.com
              </a>
            </div>

            {/* PARTNERSHIPS */}
            <div className="border border-white/10 bg-zinc-950/30 p-6 space-y-4">
              <div className="w-10 h-10 border border-white/10 bg-zinc-900/60 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-base font-semibold text-white uppercase tracking-wider">Projects & Partnerships</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">For brand campaigns, film distribution localization, and custom AI enterprise integrations.</p>
              <a href="mailto:studios@quantumclimb.com" className="block text-xs font-mono text-purple-400 hover:text-purple-300 uppercase tracking-widest pt-2">
                studios@quantumclimb.com
              </a>
            </div>
          </div>

          <div className="text-center pt-16 max-w-lg mx-auto space-y-4">
            <p className="text-zinc-600 font-mono text-xs uppercase tracking-[0.25em]">
              Your idea could be the beginning of something extraordinary.
            </p>
            <p className="text-2xl font-bold tracking-tight text-white uppercase">
              Let's build what comes next.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

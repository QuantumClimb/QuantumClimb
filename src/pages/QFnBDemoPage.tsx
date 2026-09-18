import { useState, FormEvent } from "react";
import { Reveal } from "../components/Reveal";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Grid, 
  Users, 
  TrendingUp, 
  Utensils, 
  Sparkles,
  Info,
  Check,
  AlertCircle
} from "lucide-react";

export type QFnBDemoSubmissionData = {
  fullName: string;
  restaurantName: string;
  workEmail: string;
  phone: string;
  role: string;
  businessType: string;
  outlets: string;
  currentReservationMethod: string;
  interests: string[];
  preferredContactMethod: string;
  message?: string;
};

type QFnBDemoPageProps = Readonly<{
  onNavigateQFnB: () => void;
  onSubmitDemoRequest: (data: QFnBDemoSubmissionData) => Promise<void>;
}>;

const ROLE_OPTIONS = [
  "Owner / Founder",
  "General Manager",
  "Operations Manager",
  "Marketing",
  "F&B Manager",
  "Technology / Digital",
  "Other",
];

const BUSINESS_TYPE_OPTIONS = [
  "Restaurant",
  "Café",
  "Bar",
  "Lounge",
  "Hotel / Hospitality",
  "Restaurant Group",
  "Other",
];

const OUTLETS_OPTIONS = ["1", "2–5", "6–10", "11+"];

const RESERVATION_METHOD_OPTIONS = [
  "WhatsApp",
  "Phone",
  "Website Form",
  "Reservation Platform",
  "Walk-in Mainly",
  "Other",
];

const INTEREST_OPTIONS = [
  "Reservations",
  "Table Management",
  "Guest CRM",
  "Guest History & Preferences",
  "Offers & Promotions",
  "WhatsApp Communication",
  "Marketing Automation",
  "Analytics & Insights",
  "Dining Experiences",
  "Multi-Outlet Management",
];

const CONTACT_PREFERENCE_OPTIONS = ["WhatsApp", "Email", "Phone"];

export function QFnBDemoPage({
  onNavigateQFnB,
  onSubmitDemoRequest,
}: QFnBDemoPageProps) {
  const [fullName, setFullName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [outlets, setOutlets] = useState("");
  const [currentReservationMethod, setCurrentReservationMethod] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [preferredContactMethod, setPreferredContactMethod] = useState("WhatsApp");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!restaurantName.trim()) {
      newErrors.restaurantName = "Restaurant or business name is required";
    }

    if (!workEmail.trim()) {
      newErrors.workEmail = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim())) {
      newErrors.workEmail = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Mobile / WhatsApp number is required";
    }

    if (!role) {
      newErrors.role = "Please select your role";
    }

    if (!businessType) {
      newErrors.businessType = "Please select your business type";
    }

    if (!outlets) {
      newErrors.outlets = "Please select number of outlets";
    }

    if (!currentReservationMethod) {
      newErrors.currentReservationMethod = "Please select current reservation method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmitDemoRequest({
        fullName: fullName.trim(),
        restaurantName: restaurantName.trim(),
        workEmail: workEmail.trim(),
        phone: phone.trim(),
        role,
        businessType,
        outlets,
        currentReservationMethod,
        interests: selectedInterests,
        preferredContactMethod,
        message: message.trim() || undefined,
      });

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Q F&B Demo submission failed:", err);
      setSubmitError(err?.message || "An error occurred while submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 sm:pt-36 bg-black min-h-screen text-zinc-300">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", 
            backgroundSize: "40px 40px" 
          }} 
        />
      </div>

      <div className="px-6 sm:px-10 lg:px-12 py-12 sm:py-20 max-w-7xl mx-auto z-10 relative">
        
        {/* Top Back Navigation */}
        <Reveal type="fade-up">
          <button
            onClick={onNavigateQFnB}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-widest transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO Q F&B</span>
          </button>
        </Reveal>

        {isSuccess ? (
          /* SUCCESS STATE */
          <Reveal type="fade-up">
            <div className="max-w-2xl mx-auto bg-zinc-950 border border-white/10 p-8 sm:p-14 text-center my-12">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto mb-6 text-purple-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase mb-4">
                REQUEST RECEIVED.
              </h2>

              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light mb-8 max-w-lg mx-auto">
                Thanks. The Quantum Climb team will review your details and contact you to arrange a Q F&B demonstration.
              </p>

              <button
                onClick={onNavigateQFnB}
                className="px-8 py-4 bg-white text-black hover:bg-purple-500 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
              >
                <span>RETURN TO Q F&B</span>
              </button>
            </div>
          </Reveal>
        ) : (
          /* FORM & INTRO CONTAINER */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Intro & Product Statement */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-36">
              <Reveal type="fade-up">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono tracking-widest uppercase mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  Q F&B / PRIVATE DEMO
                </div>

                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none mb-6">
                  SEE Q F&B <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-purple-400">
                    IN ACTION.
                  </span>
                </h1>

                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light mb-4">
                  Tell us a little about your restaurant and we'll tailor the demonstration around your operation.
                </p>

                <p className="text-xs text-zinc-400 leading-relaxed font-mono border-l-2 border-purple-500/40 pl-4 py-1">
                  Explore how Q F&B can bring reservations, tables, guest relationships, offers and business insights into one connected platform.
                </p>
              </Reveal>

              {/* 4 Feature Highlights */}
              <Reveal type="fade-up" delay={0.1}>
                <div className="space-y-3 pt-4 border-t border-white/10">
                  {[
                    { title: "Reservations", desc: "Live table matrix & booking rules", icon: <Grid className="w-4 h-4 text-purple-400" /> },
                    { title: "Guest Intelligence", desc: "CRM, VIP history & preferences", icon: <Users className="w-4 h-4 text-purple-400" /> },
                    { title: "Growth", desc: "Targeted offers & automated retention", icon: <TrendingUp className="w-4 h-4 text-purple-400" /> },
                    { title: "Operations", desc: "Direct ordering & floor workflow", icon: <Utensils className="w-4 h-4 text-purple-400" /> },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-3 p-3 bg-zinc-950/60 border border-white/5">
                      <div className="p-2 bg-purple-500/10 border border-purple-500/20">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</div>
                        <div className="text-[11px] text-zinc-500 font-mono">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* RIGHT COLUMN: Demo Request Form */}
            <div className="lg:col-span-7">
              <Reveal type="fade-up" delay={0.15}>
                <form 
                  onSubmit={handleSubmit}
                  className="bg-zinc-950 border border-white/10 p-6 sm:p-10 space-y-6 relative"
                >
                  {submitError && (
                    <div className="p-4 bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* 1. Basic Info Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        FULL NAME <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Marcus Vance"
                        className={`w-full px-4 py-3 bg-black border ${errors.fullName ? "border-red-500" : "border-white/15 focus:border-purple-500"} text-white text-sm outline-none transition-colors`}
                      />
                      {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Restaurant Name */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        RESTAURANT / BUSINESS NAME <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        placeholder="e.g. Lumina Restobar"
                        className={`w-full px-4 py-3 bg-black border ${errors.restaurantName ? "border-red-500" : "border-white/15 focus:border-purple-500"} text-white text-sm outline-none transition-colors`}
                      />
                      {errors.restaurantName && <p className="text-[11px] text-red-400 mt-1">{errors.restaurantName}</p>}
                    </div>
                  </div>

                  {/* 2. Contact Info Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Work Email */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        WORK EMAIL <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="marcus@restaurant.com"
                        className={`w-full px-4 py-3 bg-black border ${errors.workEmail ? "border-red-500" : "border-white/15 focus:border-purple-500"} text-white text-sm outline-none transition-colors`}
                      />
                      {errors.workEmail && <p className="text-[11px] text-red-400 mt-1">{errors.workEmail}</p>}
                    </div>

                    {/* Mobile / WhatsApp */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        MOBILE / WHATSAPP <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+60 12-345 6789"
                        className={`w-full px-4 py-3 bg-black border ${errors.phone ? "border-red-500" : "border-white/15 focus:border-purple-500"} text-white text-sm outline-none transition-colors`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* 3. Role & Business Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Role */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        ROLE <span className="text-purple-400">*</span>
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className={`w-full px-4 py-3 bg-black border ${errors.role ? "border-red-500" : "border-white/15 focus:border-purple-500"} text-white text-sm outline-none transition-colors cursor-pointer`}
                      >
                        <option value="">Select your role...</option>
                        {ROLE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-zinc-950 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.role && <p className="text-[11px] text-red-400 mt-1">{errors.role}</p>}
                    </div>

                    {/* Business Type */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        BUSINESS TYPE <span className="text-purple-400">*</span>
                      </label>
                      <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className={`w-full px-4 py-3 bg-black border ${errors.businessType ? "border-red-500" : "border-white/15 focus:border-purple-500"} text-white text-sm outline-none transition-colors cursor-pointer`}
                      >
                        <option value="">Select business type...</option>
                        {BUSINESS_TYPE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-zinc-950 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.businessType && <p className="text-[11px] text-red-400 mt-1">{errors.businessType}</p>}
                    </div>
                  </div>

                  {/* 4. Outlets & Reservation Method */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Outlets */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        NUMBER OF OUTLETS <span className="text-purple-400">*</span>
                      </label>
                      <select
                        value={outlets}
                        onChange={(e) => setOutlets(e.target.value)}
                        className={`w-full px-4 py-3 bg-black border ${errors.outlets ? "border-red-500" : "border-white/15 focus:border-purple-500"} text-white text-sm outline-none transition-colors cursor-pointer`}
                      >
                        <option value="">Select number of outlets...</option>
                        {OUTLETS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-zinc-950 text-white">
                            {opt} {opt === "1" ? "Outlet" : "Outlets"}
                          </option>
                        ))}
                      </select>
                      {errors.outlets && <p className="text-[11px] text-red-400 mt-1">{errors.outlets}</p>}
                    </div>

                    {/* Current Reservation Method */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        CURRENT RESERVATION METHOD <span className="text-purple-400">*</span>
                      </label>
                      <select
                        value={currentReservationMethod}
                        onChange={(e) => setCurrentReservationMethod(e.target.value)}
                        className={`w-full px-4 py-3 bg-black border ${errors.currentReservationMethod ? "border-red-500" : "border-white/15 focus:border-purple-500"} text-white text-sm outline-none transition-colors cursor-pointer`}
                      >
                        <option value="">Select primary method...</option>
                        {RESERVATION_METHOD_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-zinc-950 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.currentReservationMethod && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.currentReservationMethod}</p>
                      )}
                    </div>
                  </div>

                  {/* 5. Interests (Multi-select) */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                      WHAT WOULD YOU LIKE TO EXPLORE?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INTEREST_OPTIONS.map((item) => {
                        const active = selectedInterests.includes(item);
                        return (
                          <button
                            type="button"
                            key={item}
                            onClick={() => toggleInterest(item)}
                            className={`px-3 py-2 text-xs font-mono tracking-wider transition-all border cursor-pointer ${
                              active
                                ? "bg-purple-500/20 text-white border-purple-500"
                                : "bg-black text-zinc-400 border-white/10 hover:border-white/30"
                            }`}
                          >
                            {active && <span className="mr-1.5 text-purple-400">✓</span>}
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 6. Contact Preference */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                      PREFERRED CONTACT METHOD
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {CONTACT_PREFERENCE_OPTIONS.map((method) => {
                        const active = preferredContactMethod === method;
                        return (
                          <button
                            type="button"
                            key={method}
                            onClick={() => setPreferredContactMethod(method)}
                            className={`px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                              active
                                ? "bg-white text-black border-white"
                                : "bg-black text-zinc-400 border-white/10 hover:border-white/30"
                            }`}
                          >
                            {method}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 7. Optional Message */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      TELL US ABOUT YOUR OPERATION <span className="text-zinc-500 font-normal">(OPTIONAL)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Anything you'd like us to focus on during the demo?"
                      className="w-full px-4 py-3 bg-black border border-white/15 focus:border-purple-500 text-white text-sm outline-none transition-colors resize-y min-h-[90px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-white text-black hover:bg-purple-500 hover:text-white disabled:bg-zinc-800 disabled:text-zinc-500 font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer text-center"
                    >
                      {isSubmitting ? "PROCESSING REQUEST..." : "REQUEST MY DEMO"}
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

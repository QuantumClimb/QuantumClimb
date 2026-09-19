import { Reveal } from "../components/Reveal";
import { 
  ArrowRight, 
  ExternalLink, 
  Check, 
  Globe, 
  CalendarCheck, 
  Users, 
  Grid, 
  BarChart3, 
  MessageSquare, 
  Info, 
  CheckCircle2 
} from "lucide-react";

type QFnBPageProps = Readonly<{
  onOpenContactModal: () => void;
  onNavigateProducts: () => void;
  onNavigateQFnBDemo: () => void;
}>;

export function QFnBPage({
  onNavigateProducts,
  onNavigateQFnBDemo,
}: QFnBPageProps) {
  return (
    <div className="pt-28 sm:pt-36 bg-black min-h-screen text-zinc-300">
      {/* Background Ambience Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", 
            backgroundSize: "40px 40px" 
          }} 
        />
      </div>

      {/* ==================================================================== */}
      {/* SECTION 1: HERO HEADER — HOSPITALITY FIRST (60% SCENE / 40% COPY)     */}
      {/* ==================================================================== */}
      <section className="relative px-6 sm:px-10 lg:px-12 py-12 sm:py-20 max-w-7xl mx-auto z-10 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Headlines & Positioning */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal type="fade-up">
              <div className="flex items-center gap-2 mb-2">
                <button 
                  onClick={onNavigateProducts}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors cursor-pointer"
                >
                  QUANTUM CLIMB PRODUCTS
                </button>
                <span className="text-zinc-600 font-mono text-xs">/</span>
                <span className="text-purple-400 font-mono text-xs tracking-widest uppercase font-semibold">
                  HOSPITALITY TECHNOLOGY
                </span>
              </div>
            </Reveal>

            <Reveal type="fade-up" delay={0.1}>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight uppercase">
                  Q F&B
                </h1>
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-widest uppercase">
                  PLATFORM PREVIEW
                </span>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block w-full sm:w-auto">
                  RESTAURANT OPERATIONS & GUEST GROWTH PLATFORM
                </span>
              </div>
            </Reveal>

            <Reveal type="fade-up" delay={0.15}>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
                THE OPERATING LAYER <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-purple-400">
                  BEHIND BETTER HOSPITALITY.
                </span>
              </h2>
            </Reveal>

            <Reveal type="fade-up" delay={0.2}>
              <p className="text-lg sm:text-xl font-bold text-zinc-200 uppercase tracking-tight">
                MANAGE THE FLOOR. KNOW THE GUEST. GROW THE BUSINESS.
              </p>
            </Reveal>

            <Reveal type="fade-up" delay={0.25}>
              <p className="text-base text-zinc-400 leading-relaxed font-light">
                Q F&B is a restaurant operations and guest growth platform designed to connect reservations, tables, guest relationships, offers and business insights in one focused environment.
              </p>
            </Reveal>

            {/* Primary Action Buttons */}
            <Reveal type="fade-up" delay={0.3}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onNavigateQFnBDemo}
                  className="px-8 py-4 bg-white text-black hover:bg-purple-500 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer text-center"
                >
                  REQUEST A PRIVATE DEMO
                </button>

                <a
                  href="https://qrestobar.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 inline-flex items-center justify-center gap-2 text-center"
                >
                  <span>VIEW Q RESTOBAR</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Hero Hospitality Atmosphere (60% weight) */}
          <div className="lg:col-span-6">
            <Reveal type="fade-up" delay={0.2}>
              <div className="relative border border-white/10 bg-zinc-950 overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
                <img 
                  src="/images/q-fnb/1restaurant_host_station_dashboard.png" 
                  alt="Q F&B Host Station in Premium Restaurant Environment" 
                  className="w-full h-auto object-cover brightness-95 group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 border border-white/10 text-[10px] font-mono text-purple-300 uppercase">
                  OPERATIONAL ENVIRONMENT
                </div>
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/85 backdrop-blur-sm border border-white/10 text-xs font-mono text-zinc-300 flex items-center justify-between">
                  <span>HOST STATION // Live Floor & Booking Overview</span>
                  <span className="text-purple-400 font-bold text-[10px]">PLATFORM PREVIEW</span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 2: THE PROBLEM WITH RESTAURANT SERVICE CONTEXT               */}
      {/* ==================================================================== */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 border-b border-white/5">
        <Reveal type="fade-up">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">
            THE PROBLEM
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase max-w-3xl mb-6">
            TOO MANY TOOLS. <br />
            <span className="text-zinc-500">NOT ENOUGH CONNECTION.</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-3xl leading-relaxed font-light mb-12">
            Bookings live in one place. Guest details live somewhere else. Promotions happen through separate tools. Host desks handle peak service under pressure with calls, messages and paper notes. Q F&B brings the guest journey into one connected operating environment.
          </p>
        </Reveal>

        {/* Visual Convergence Flow */}
        <Reveal type="fade-up" delay={0.2}>
          <div className="bg-zinc-950 border border-white/10 p-6 sm:p-10 relative overflow-hidden">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-6">
              RESTAURANT SERVICE FLOW // DISCONNECTED FRAGMENTATION vs CONNECTED Q F&B
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {[
                { name: "BOOKINGS", sub: "Phone & DM Notes" },
                { name: "TABLES", sub: "Manual Floor Plans" },
                { name: "GUESTS", sub: "Forgotten Preferences" },
                { name: "OFFERS", sub: "Unchecked Promos" },
                { name: "MESSAGES", sub: "Personal WhatsApp" },
                { name: "INSIGHTS", sub: "End-of-Month Guesswork" }
              ].map((item) => (
                <div key={item.name} className="p-4 bg-black border border-white/10 text-center">
                  <div className="text-xs font-bold text-zinc-300 mb-1">{item.name}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">{item.sub}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center my-4">
              <div className="h-8 w-[2px] bg-gradient-to-b from-zinc-700 to-purple-500" />
            </div>

            <div className="p-6 bg-gradient-to-r from-purple-950/40 via-zinc-900 to-purple-950/40 border border-purple-500/30 text-center">
              <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">
                THE CONNECTED HOSPITALITY OPERATING LAYER
              </div>
              <div className="text-2xl font-black text-white tracking-tight uppercase">
                Q F&B PLATFORM
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 3: Q RESTOBAR + Q F&B BALANCED ECOSYSTEM                     */}
      {/* ==================================================================== */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 border-b border-white/5">
        <Reveal type="fade-up">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">
            ONE CONNECTED EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase max-w-3xl mb-12">
            TWO FACES OF ONE HOSPITALITY SYSTEM.
          </h2>
        </Reveal>

        {/* Side-by-side Symmetric Ecosystem Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: The Guest Sees This (Q RESTOBAR) WITH REAL WEBSITE SCREENSHOT */}
          <Reveal type="fade-up" delay={0.1}>
            <div className="border border-white/10 bg-zinc-950 p-6 sm:p-10 flex flex-col justify-between h-full group hover:border-white/20 transition-all duration-300">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white font-mono text-[11px] uppercase tracking-wider mb-6">
                  LIVE REFERENCE EXPERIENCE
                </div>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                  CUSTOMER-FACING RESTAURANT EXPERIENCE
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-4">
                  THE GUEST SEES THIS.
                </h3>
                <div className="text-lg font-bold text-purple-300 uppercase mb-4">
                  Q RESTOBAR
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                  A high-end customer-facing restaurant web experience featuring menus, chef recommendations, dining packages, special events, and direct reservation requests.
                </p>

                {/* PREMIUM BROWSER SCREENSHOT MOCKUP MATCHING RIGHT VISUAL WEIGHT */}
                <div className="relative border border-white/10 bg-black overflow-hidden mb-6 group-hover:border-purple-500/30 transition-colors">
                  {/* Browser Bar */}
                  <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-white/10 font-mono text-[10px] text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-zinc-300 bg-black/60 px-3 py-0.5 rounded border border-white/5 truncate max-w-[200px] sm:max-w-[260px]">
                      <Globe className="w-3 h-3 text-purple-400 flex-shrink-0" />
                      <span className="truncate">qrestobar.vercel.app</span>
                    </div>
                    <span className="text-[9px] text-emerald-400 font-bold">LIVE PORTAL</span>
                  </div>

                  {/* Real Q RESTOBAR Screenshot Asset */}
                  <img 
                    src="/images/q-fnb/qrestobar_reference_preview.png" 
                    alt="Q RESTOBAR Live Customer Portal Preview" 
                    className="w-full h-auto object-cover brightness-95"
                    loading="lazy"
                  />

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 border border-white/10 text-[9px] font-mono text-zinc-300">
                    GUEST WEBSITE PREVIEW
                  </div>
                </div>

                <div className="space-y-2 font-mono text-xs text-zinc-300 mb-8 border-l border-white/10 pl-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>Digital Menus & Pairing Guides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>Offers & Special Experiences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>Restaurant Branding & Ambience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>Direct Guest Reservation Portal</span>
                  </div>
                </div>
              </div>

              <a
                href="https://qrestobar.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-purple-400 uppercase tracking-wider transition-colors pt-4 border-t border-white/5"
              >
                <span>EXPLORE Q RESTOBAR</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          {/* Right: The Restaurant Runs This (Q F&B) WITH IMAGE 1 */}
          <Reveal type="fade-up" delay={0.2}>
            <div className="border border-purple-500/30 bg-gradient-to-b from-purple-950/20 to-zinc-950 p-6 sm:p-10 flex flex-col justify-between h-full group hover:border-purple-500/50 transition-all duration-300">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 font-mono text-[11px] uppercase tracking-wider mb-6">
                  PRODUCT CONCEPT
                </div>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                  OPERATIONS + GUEST GROWTH PLATFORM
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-4">
                  THE RESTAURANT RUNS THIS.
                </h3>
                <div className="text-lg font-bold text-purple-400 uppercase mb-4">
                  Q F&B
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
                  The private operational platform designed for restaurant owners, managers, and service staff to oversee bookings, tables, guest information, offers, communication, and business insights.
                </p>

                {/* IMAGE 1: Host Station Dashboard */}
                <div className="relative border border-white/10 bg-black overflow-hidden mb-6 group-hover:border-purple-500/40 transition-colors">
                  {/* Dashboard Header Bar */}
                  <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-white/10 font-mono text-[10px] text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                      <span className="text-zinc-300 font-bold">Q F&B // HOST STATION</span>
                    </div>
                    <span className="text-[9px] text-purple-300 font-bold">OPERATIONS MATRIX</span>
                  </div>

                  <img 
                    src="/images/q-fnb/1restaurant_host_station_dashboard.png" 
                    alt="Q F&B Restaurant Host Station Dashboard" 
                    className="w-full h-auto object-cover brightness-95"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 border border-white/10 text-[9px] font-mono text-purple-300">
                    HOST STATION DASHBOARD // PRODUCT CONCEPT
                  </div>
                </div>

                <div className="space-y-2 font-mono text-xs text-zinc-300 mb-8 border-l border-purple-500/30 pl-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>Bookings & Reservation Workflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>Table Matrix & Floor Zone Control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>Guest Information & Preference Profiles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>Offers, WhatsApp Messaging & Insights</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onNavigateQFnBDemo}
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-white uppercase tracking-wider transition-colors pt-4 border-t border-white/5 cursor-pointer text-left"
              >
                <span>REQUEST A PRIVATE DEMO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 4: MANAGE — VISUAL HOSPITALITY STORIES                       */}
      {/* ==================================================================== */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 border-b border-white/5 space-y-12">
        <Reveal type="fade-up">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">01 / MANAGE</div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase max-w-3xl mb-4">
            TAKE BOOKINGS. FILL TABLES. STAY IN CONTROL.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl font-light leading-relaxed">
            Bring bookings, tables and service availability into one clear view so your team spends less time checking messages and more time looking after guests.
          </p>
        </Reveal>

        {/* 4 Hospitality Visual Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal type="fade-up" delay={0.1}>
            <div className="p-8 bg-zinc-950 border border-white/10 hover:border-purple-500/30 transition-all space-y-4">
              <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">MAKE BOOKING EASY.</div>
              <h3 className="text-xl font-bold text-white uppercase">DIRECT GUEST RESERVATION FLOW</h3>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                Let guests select dates, times, and party sizes directly through your restaurant's digital channels, sending reservations instantly into your host station.
              </p>
              <div className="pt-2 font-mono text-xs text-purple-300 flex items-center gap-2">
                <span>Instant confirmation</span> • <span>No phone tag</span>
              </div>
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={0.15}>
            <div className="p-8 bg-zinc-950 border border-white/10 hover:border-purple-500/30 transition-all space-y-4">
              <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">SEE YOUR WHOLE FLOOR AT A GLANCE.</div>
              <h3 className="text-xl font-bold text-white uppercase">LIVE FLOOR & SEATING OVERVIEW</h3>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                Know which tables are available, reserved, seated, or being prepared across Main Dining, Terrace, Bar, and Private Rooms.
              </p>
              <div className="pt-2 font-mono text-xs text-purple-300 flex items-center gap-2">
                <span>Real-time table states</span> • <span>Zone management</span>
              </div>
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={0.2}>
            <div className="p-8 bg-zinc-950 border border-white/10 hover:border-purple-500/30 transition-all space-y-4">
              <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">NEVER LOSE A FULL-HOUSE ENQUIRY.</div>
              <h3 className="text-xl font-bold text-white uppercase">INTELLIGENT WAITLIST MANAGEMENT</h3>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                When your main dining room reaches capacity, capture high-intent guests on an active waitlist to quickly fill last-minute cancellations.
              </p>
              <div className="pt-2 font-mono text-xs text-purple-300 flex items-center gap-2">
                <span>SMS/WhatsApp alerts</span> • <span>Zero empty gaps</span>
              </div>
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={0.25}>
            <div className="p-8 bg-zinc-950 border border-white/10 hover:border-purple-500/30 transition-all space-y-4">
              <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">GIVE GUESTS THE RIGHT CHOICE.</div>
              <h3 className="text-xl font-bold text-white uppercase">MULTI-AREA SEATING PREFERENCES</h3>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                Allow diners to specify Main Dining, Outdoor Terrace, Cocktail Bar High-Tops, or Private Chef's Table when booking.
              </p>
              <div className="pt-2 font-mono text-xs text-purple-300 flex items-center gap-2">
                <span>Tailored seating</span> • <span>VIP allocations</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 5: RESERVATIONS WITH IMAGE 2 (DOMINANT VISUAL 60%)          */}
      {/* ==================================================================== */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 border-b border-white/5">
        <Reveal type="fade-up">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">
            RESERVATIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase max-w-3xl mb-4">
            FROM BOOKING TO TABLE.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl font-light mb-12">
            Turn every reservation into one organised workflow instead of another WhatsApp message, spreadsheet row or paper note.
          </p>
        </Reveal>

        {/* EDITORIAL SPLIT LAYOUT: IMAGE 2 Dominant Right / Text Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal type="fade-up" delay={0.1}>
              <div className="grid grid-cols-1 gap-4 font-mono text-xs">
                <div className="p-6 bg-zinc-950 border border-white/10">
                  <div className="text-purple-400 font-bold mb-1 uppercase text-sm">KNOW WHO'S COMING.</div>
                  <div className="text-zinc-300 leading-relaxed font-sans text-sm">See upcoming reservations clearly before service begins so host teams can prepare table flow.</div>
                </div>
                <div className="p-6 bg-zinc-950 border border-white/10">
                  <div className="text-purple-400 font-bold mb-1 uppercase text-sm">KEEP EVERY BOOKING MOVING.</div>
                  <div className="text-zinc-300 leading-relaxed font-sans text-sm">Track each reservation from enquiry to confirmed seating without lost phone calls.</div>
                </div>
                <div className="p-6 bg-zinc-950 border border-white/10">
                  <div className="text-purple-400 font-bold mb-1 uppercase text-sm">KEEP NOTES WITH THE BOOKING.</div>
                  <div className="text-zinc-300 leading-relaxed font-sans text-sm">Keep important guest, dietary, or seating preferences attached directly to the reservation.</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Image Block WITH IMAGE 2 */}
          <div className="lg:col-span-6">
            <Reveal type="fade-up" delay={0.2}>
              <div className="relative border border-white/10 bg-zinc-950 overflow-hidden group hover:border-purple-500/30 transition-colors">
                <img 
                  src="/images/q-fnb/2candlelit_dining_reservation_experience.png" 
                  alt="Candlelit Dining Reservation Experience in Q F&B" 
                  className="w-full h-auto object-cover brightness-95 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/80 border border-white/10 text-[10px] font-mono text-purple-300 uppercase">
                  INTERFACE PREVIEW
                </div>
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-mono text-zinc-300">
                  REAL HOSPITALITY CONTEXT // Candlelit Dining Reservation Journey
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Conceptual Reservation Table Preview Matrix */}
        <Reveal type="fade-up" delay={0.25}>
          <div className="bg-zinc-950 border border-white/10 p-6 sm:p-8 font-mono text-xs overflow-x-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 min-w-[700px]">
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-4 h-4 text-purple-400" />
                <span className="text-white font-bold tracking-wider uppercase">RESERVATION WORKFLOW MATRIX</span>
              </div>
              <span className="text-[10px] text-purple-300 bg-purple-950 border border-purple-800 px-2 py-0.5">
                INTERFACE PREVIEW
              </span>
            </div>

            {/* Workflow Pipeline Pills */}
            <div className="flex items-center gap-2 mb-6 min-w-[700px] text-[11px]">
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold">NEW</span>
              <span className="text-zinc-600">→</span>
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-zinc-300">CONTACTED</span>
              <span className="text-zinc-600">→</span>
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-zinc-300">CONFIRMED</span>
              <span className="text-zinc-600">→</span>
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-zinc-300">SEATED</span>
              <span className="text-zinc-600">→</span>
              <span className="px-3 py-1 bg-zinc-900 border border-white/10 text-zinc-300">COMPLETED</span>
              <span className="text-zinc-600">/</span>
              <span className="px-3 py-1 bg-zinc-900/60 border border-zinc-800 text-zinc-500">CANCELLED</span>
            </div>

            {/* Demo Data Rows */}
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 text-zinc-500 text-[10px] uppercase">
                  <th className="py-2">GUEST</th>
                  <th className="py-2">PARTY SIZE</th>
                  <th className="py-2">DATE & TIME</th>
                  <th className="py-2">TABLE</th>
                  <th className="py-2">STATUS</th>
                  <th className="py-2">SERVICE NOTES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {[
                  { guest: "Sarah Lim", party: "4 Pax", datetime: "Fri 19 Sep - 8:00 PM", table: "T-04 (Window)", status: "CONFIRMED", note: "Birthday / Vegetarian" },
                  { guest: "David Chen", party: "2 Pax", datetime: "Fri 19 Sep - 8:30 PM", table: "B-02 (Bar High)", status: "SEATED", note: "Anniversary / Wine Pairing" },
                  { guest: "Elena Rostova", party: "6 Pax", datetime: "Fri 19 Sep - 9:00 PM", table: "P-01 (Private)", status: "NEW", note: "VIP Guest / Tasting Menu" },
                  { guest: "Michael Tan", party: "3 Pax", datetime: "Sat 20 Sep - 7:30 PM", table: "T-12 (Main)", status: "CONTACTED", note: "WhatsApp Reminder Sent" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-3 font-bold text-white">{row.guest}</td>
                    <td className="py-3">{row.party}</td>
                    <td className="py-3 text-zinc-400">{row.datetime}</td>
                    <td className="py-3 text-purple-300">{row.table}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-[10px] text-zinc-300">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 text-zinc-400 italic">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* ==================================================================== */}
      {/* CINEMATIC BREAK 1: HOSPITALITY ATMOSPHERE STATEMENT                   */}
      {/* ==================================================================== */}
      <section className="relative py-28 sm:py-36 lg:py-40 border-y border-white/10 overflow-hidden text-center bg-zinc-950 group">
        {/* Background Banner Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 group-hover:scale-100"
          style={{ backgroundImage: "url('/images/q-fnb/midnight-luxe-restaurant-lounge-banner.png')" }}
        />
        {/* Dark Cinematic Overlay with Purple Tint & Top/Bottom Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-zinc-950/80 to-black/90" />
        <div className="absolute inset-0 bg-purple-950/20 mix-blend-multiply pointer-events-none" />

        <Reveal type="fade-up">
          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-purple-500/30 backdrop-blur-md text-xs font-mono text-purple-300 uppercase tracking-widest">
              HOSPITALITY PHILOSOPHY
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              GOOD HOSPITALITY FEELS PERSONAL. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-200">
                GOOD TECHNOLOGY MAKES THAT EASIER.
              </span>
            </h2>
          </div>
        </Reveal>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 6: FLOOR MANAGEMENT                                          */}
      {/* ==================================================================== */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 border-b border-white/5">
        <Reveal type="fade-up">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">
            FLOOR MANAGEMENT
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase max-w-3xl mb-4">
            SEE THE FLOOR. CONTROL THE FLOW.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl font-light mb-10">
            See what's available, what's reserved and where your next guest should sit from one clear restaurant view across Main Dining, Outdoor Terrace, Cocktail Bar, and Private Rooms.
          </p>
        </Reveal>

        {/* 3 Benefit Statements */}
        <Reveal type="fade-up" delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 font-mono text-xs">
            <div className="p-5 bg-zinc-950 border border-white/10">
              <div className="text-purple-400 font-bold mb-1 uppercase">MAKE EVERY TABLE WORK HARDER.</div>
              <div className="text-zinc-400">Use clearer table planning to reduce empty gaps during service.</div>
            </div>
            <div className="p-5 bg-zinc-950 border border-white/10">
              <div className="text-purple-400 font-bold mb-1 uppercase">FIT THE RIGHT PARTY AT THE RIGHT TABLE.</div>
              <div className="text-zinc-400">Plan seating without wasting larger tables on smaller bookings.</div>
            </div>
            <div className="p-5 bg-zinc-950 border border-white/10">
              <div className="text-purple-400 font-bold mb-1 uppercase">KEEP THE TEAM ON THE SAME PAGE.</div>
              <div className="text-zinc-400">Make the current floor state easy for hosts and service staff to understand.</div>
            </div>
          </div>
        </Reveal>

        {/* Conceptual Floor Interface Grid */}
        <Reveal type="fade-up" delay={0.15}>
          <div className="bg-zinc-950 border border-white/10 p-6 sm:p-8 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <Grid className="w-4 h-4 text-purple-400" />
                <span className="text-white font-bold uppercase">FLOOR ZONE CONTROL</span>
              </div>

              {/* Status Legend */}
              <div className="flex flex-wrap items-center gap-3 text-[10px]">
                <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> AVAILABLE</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400" /> RESERVED</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-400" /> SEATED</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> CLEANING</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-zinc-600" /> UNAVAILABLE</span>
                <span className="text-[10px] text-purple-300 bg-purple-950 border border-purple-800 px-2 py-0.5 ml-2">INTERFACE PREVIEW</span>
              </div>
            </div>

            {/* Floor Matrix Zones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  zone: "MAIN DINING ROOM",
                  tables: [
                    { id: "T-01", pax: "4 Pax", state: "SEATED", cls: "border-indigo-500/50 bg-indigo-950/30 text-indigo-200" },
                    { id: "T-02", pax: "2 Pax", state: "AVAILABLE", cls: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300" },
                    { id: "T-03", pax: "4 Pax", state: "RESERVED", cls: "border-purple-500/50 bg-purple-950/30 text-purple-300" },
                    { id: "T-04", pax: "6 Pax", state: "SEATED", cls: "border-indigo-500/50 bg-indigo-950/30 text-indigo-200" },
                  ]
                },
                {
                  zone: "BAR & HIGH TOPS",
                  tables: [
                    { id: "B-01", pax: "2 Pax", state: "AVAILABLE", cls: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300" },
                    { id: "B-02", pax: "2 Pax", state: "SEATED", cls: "border-indigo-500/50 bg-indigo-950/30 text-indigo-200" },
                    { id: "B-03", pax: "2 Pax", state: "CLEANING", cls: "border-amber-500/50 bg-amber-950/30 text-amber-300" },
                    { id: "B-04", pax: "4 Pax", state: "RESERVED", cls: "border-purple-500/50 bg-purple-950/30 text-purple-300" },
                  ]
                },
                {
                  zone: "PRIVATE ROOM",
                  tables: [
                    { id: "P-01", pax: "8 Pax", state: "RESERVED", cls: "border-purple-500/50 bg-purple-950/30 text-purple-300" },
                    { id: "P-02", pax: "12 Pax", state: "UNAVAILABLE", cls: "border-white/10 bg-black text-zinc-500" },
                  ]
                },
                {
                  zone: "OUTDOOR TERRACE",
                  tables: [
                    { id: "O-01", pax: "4 Pax", state: "AVAILABLE", cls: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300" },
                    { id: "O-02", pax: "4 Pax", state: "AVAILABLE", cls: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300" },
                    { id: "O-03", pax: "2 Pax", state: "SEATED", cls: "border-indigo-500/50 bg-indigo-950/30 text-indigo-200" },
                  ]
                }
              ].map((section) => (
                <div key={section.zone} className="p-4 bg-black border border-white/5 space-y-3">
                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{section.zone}</div>
                  <div className="space-y-2">
                    {section.tables.map((tbl) => (
                      <div key={tbl.id} className={`p-2.5 border flex items-center justify-between ${tbl.cls}`}>
                        <span className="font-bold">{tbl.id}</span>
                        <span className="text-[10px] opacity-80">{tbl.pax}</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-black/60 border border-white/10">{tbl.state}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 7: GUEST INTELLIGENCE WITH IMAGE 3                           */}
      {/* ==================================================================== */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 border-b border-white/5">
        <Reveal type="fade-up">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">
            02 / KNOW & REMEMBER
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase max-w-3xl mb-4">
            THE RESERVATION ENDS. THE RELATIONSHIP DOESN'T.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl font-light mb-12">
            Q F&B is designed to help restaurant teams recognise returning guests, remember preferences, visit history, and deliver hospitality that keeps people coming back.
          </p>
        </Reveal>

        {/* EDITORIAL RHYTHM: IMAGE 3 Left / Text & Sarah Lim Demo Profile Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-8">
          
          {/* Left IMAGE 3 Block */}
          <div className="lg:col-span-6">
            <Reveal type="fade-up" delay={0.1}>
              <div className="relative border border-white/10 bg-zinc-950 overflow-hidden group hover:border-purple-500/30 transition-colors">
                <img 
                  src="/images/q-fnb/3welcoming_returning_guests_at_q_f_b.png" 
                  alt="Welcoming Returning Guests at Q F&B Restaurant" 
                  className="w-full h-auto object-cover brightness-95 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 border border-white/10 text-[10px] font-mono text-purple-300 uppercase">
                  HOSPITALITY MOMENT
                </div>
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-mono text-zinc-300">
                  GUEST RECOGNITION // Welcoming Regular Diners with Instant Profile Notes
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Demo Guest Profile Card Block */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal type="fade-up" delay={0.2}>
              <div className="bg-zinc-950 border border-white/10 p-6 sm:p-8 relative font-mono text-xs">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-bold tracking-wider uppercase">GUEST INTELLIGENCE CARD</span>
                  </div>
                  <span className="text-[10px] text-purple-300 bg-purple-950 border border-purple-800 px-2.5 py-1">
                    DEMO PROFILE
                  </span>
                </div>

                <div className="bg-black border border-white/10 p-5 space-y-4 mb-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase">SARAH LIM</h3>
                      <div className="text-purple-400 text-[10px]">VIP REGULAR // 12 VISITS</div>
                    </div>
                    <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[9px]">
                      TOP 5% GUEST
                    </span>
                  </div>

                  <div className="space-y-1.5 text-zinc-300 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">PREFERRED SEATING:</span>
                      <span className="font-bold text-white">Window Table</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">DIETARY PREFERENCE:</span>
                      <span className="font-bold text-emerald-400">Vegetarian</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">BIRTHDAY:</span>
                      <span className="font-bold text-white">24 October</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">TYPICAL PARTY SIZE:</span>
                      <span className="font-bold text-white">4 Guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">FAVOURITE EXPERIENCE:</span>
                      <span className="font-bold text-purple-300">Live Music Friday</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[9px]">
                    <span className="px-2.5 py-1 bg-zinc-900 border border-white/10 text-zinc-300 font-bold">VIEW HISTORY</span>
                    <span className="px-2.5 py-1 bg-zinc-900 border border-white/10 text-zinc-300 font-bold">PREPARE MESSAGE</span>
                    <span className="px-2.5 py-1 bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold">BIRTHDAY OFFER</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">RECENT ACTIVITY LOG</div>
                  <div className="p-3 bg-black border border-white/5 text-[11px] space-y-1">
                    <div className="flex justify-between text-purple-400 text-[10px]">
                      <span>VISIT LOG #12</span>
                      <span>15 Aug 2026</span>
                    </div>
                    <div className="text-zinc-300">Window Table #04 — Party of 4. Spent $320. Sommelier recommendation requested.</div>
                  </div>
                </div>
                
                {/* SUBTLE FICTIONAL DEMO DATA DISCLAIMER */}
                <div className="mt-4 pt-3 border-t border-white/5 text-[9px] font-mono text-zinc-500 text-right italic">
                  * FICTIONAL DEMO DATA — Demonstration guest card for profile illustration
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 8: GROW & CAMPAIGNS WITH CINEMATIC IMAGE 4                   */}
      {/* ==================================================================== */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 border-b border-white/5 space-y-12">
        <Reveal type="fade-up">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">
            03 / GROW & ENGAGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase max-w-3xl mb-4">
            GIVE GOOD GUESTS A REASON TO COME BACK.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl font-light mb-8">
            Use guest history to encourage repeat visits for tasting menus, live music nights, and milestone birthdays instead of starting from zero every week.
          </p>
        </Reveal>

        {/* FULL-WIDTH CINEMATIC VISUAL BANNER WITH IMAGE 4 */}
        <Reveal type="fade-up" delay={0.15}>
          <div className="relative border border-white/10 bg-zinc-950 overflow-hidden group hover:border-purple-500/30 transition-colors">
            <img 
              src="/images/q-fnb/4upscale_dining_campaigns_at_night.png" 
              alt="Upscale Dining Campaigns & Special Events at Night" 
              className="w-full h-80 sm:h-96 lg:h-[480px] object-cover brightness-90 group-hover:scale-102 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-[10px] uppercase">
                  SPECIAL EVENTS & CAMPAIGNS // PRODUCT CONCEPT
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  FILL YOUR SPECIAL EVENINGS.
                </h3>
                <p className="text-zinc-300 text-sm font-light leading-relaxed hidden sm:block">
                  Targeted messaging for wine pairings, tasting menus, live music nights, and milestone dining experiences.
                </p>
              </div>

              <div className="font-mono text-xs text-zinc-400 bg-black/80 p-4 border border-white/10 flex-shrink-0">
                <div className="text-purple-400 font-bold uppercase mb-1">PLANNED CAMPAIGNS</div>
                <div>Offers • Events • Birthdays • Win-Back</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* WhatsApp Phone Message Visual */}
        <Reveal type="fade-up" delay={0.2}>
          <div className="bg-zinc-950 border border-white/10 p-6 sm:p-10">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8 font-mono text-xs">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-bold uppercase">PLANNED WHATSAPP WORKFLOW</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5">
                COMMUNICATION ENGINE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
              {[
                { title: "Reservation Confirmation", msg: "Hi Sarah, your reservation at Lumina Restobar for Friday at 8:00 PM is confirmed. We look forward to welcoming you." },
                { title: "Booking Reminder", msg: "Hi Sarah, looking forward to seeing you tonight at 8:00 PM (4 Pax, Window Table). Need to modify? Reply to this message." },
                { title: "Birthday Milestone Offer", msg: "Happy Birthday Month, Sarah! Enjoy a complimentary dessert & champagne pairing on your next visit this October." }
              ].map((card, idx) => (
                <div key={idx} className="p-5 bg-black border border-white/10 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[10px] text-purple-400 font-bold uppercase mb-2">{card.title}</div>
                    <div className="p-3 bg-zinc-900/80 border-l-2 border-emerald-500 text-zinc-300 leading-relaxed font-sans text-xs">
                      "{card.msg}"
                    </div>
                  </div>
                  <div className="text-[10px] text-zinc-500 text-right">AUTOMATED WORKFLOW PREVIEW</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 9: SELL WITH IMAGE 5                                         */}
      {/* ==================================================================== */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 border-b border-white/5">
        <Reveal type="fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">
            <span>04 / SELL & UPGRADE</span>
            <span className="text-[10px] px-2 py-0.5 bg-purple-950 text-purple-300 border border-purple-800">PLANNED COMMERCE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase max-w-3xl mb-4">
            CREATE MORE VALUE FROM EVERY VISIT.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl font-light mb-12">
            Q F&B is designed to grow beyond reservations by giving restaurants new ways to sell private dining, packages and special occasions directly to guests.
          </p>
        </Reveal>

        {/* EDITORIAL SPLIT LAYOUT: Text Left / IMAGE 5 Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          
          {/* Left Sub-Benefits Block */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal type="fade-up" delay={0.1}>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-5 bg-zinc-950 border border-white/10 space-y-1">
                  <div className="text-xs font-mono text-purple-300 font-bold uppercase">TURN A BOOKING INTO A BIGGER EXPERIENCE.</div>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    Offer packages, pairing menus or upgrades around the reservation journey.
                  </p>
                </div>

                <div className="p-5 bg-zinc-950 border border-white/10 space-y-1">
                  <div className="text-xs font-mono text-purple-300 font-bold uppercase">SELL THE OCCASIONS PEOPLE WANT TO CELEBRATE.</div>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    Create future experiences for birthdays, private dining, events and special chef tasting dinners.
                  </p>
                </div>

                <div className="p-5 bg-zinc-950 border border-white/10 space-y-1">
                  <div className="text-xs font-mono text-purple-300 font-bold uppercase">PROTECT HIGH-VALUE BOOKINGS.</div>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    Future payment tools can support booking deposits for selected experiences or busy weekend periods.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right IMAGE 5 Block */}
          <div className="lg:col-span-6">
            <Reveal type="fade-up" delay={0.2}>
              <div className="relative border border-purple-500/30 bg-zinc-950 overflow-hidden group hover:border-purple-500/50 transition-colors">
                <img 
                  src="/images/q-fnb/5luxury_private_dining_birthday_celebration.png" 
                  alt="Luxury Private Dining & Birthday Celebration Experience" 
                  className="w-full h-auto object-cover brightness-95 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-purple-950 border border-purple-800 text-[10px] font-mono text-purple-300 uppercase">
                  PLANNED COMMERCE CAPABILITIES
                </div>
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-mono text-zinc-300">
                  PRIVATE DINING & CELEBRATIONS // Experience Packages & Upgrades
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* CINEMATIC BREAK 2: BETTER CONTEXT STATEMENT                          */}
      {/* ==================================================================== */}
      <section className="relative py-28 sm:py-36 lg:py-40 border-y border-white/10 overflow-hidden text-center bg-black group">
        {/* Background Banner Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 group-hover:scale-100"
          style={{ backgroundImage: "url('/images/q-fnb/cinematic-luxe-restaurant-interior.png')" }}
        />
        {/* Dark Cinematic Overlay with Subtle Ambient Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-zinc-950/85 to-black/95" />
        <div className="absolute inset-0 bg-purple-950/15 mix-blend-overlay pointer-events-none" />

        <Reveal type="fade-up">
          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/20 backdrop-blur-md text-xs font-mono text-purple-300 uppercase tracking-widest">
              SERVICE EXCELLENCE
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              BETTER SERVICE STARTS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-zinc-200">
                WITH BETTER CONTEXT.
              </span>
            </h2>
          </div>
        </Reveal>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 10: ANALYTICS WITH IMAGE 6                                   */}
      {/* ==================================================================== */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 border-b border-white/5">
        <Reveal type="fade-up">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">
            INSIGHTS PREVIEW
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase max-w-3xl mb-4">
            KNOW WHAT'S ACTUALLY WORKING.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl font-light mb-12">
            Focus on practical restaurant metrics: How many guests returned? Which days perform best? How many reservations cancelled? Who are the strongest regular guests?
          </p>
        </Reveal>

        {/* EDITORIAL SPLIT LAYOUT: IMAGE 6 Left / Analytics Matrix Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left IMAGE 6 Block */}
          <div className="lg:col-span-6">
            <Reveal type="fade-up" delay={0.1}>
              <div className="relative border border-white/10 bg-zinc-950 overflow-hidden group hover:border-purple-500/30 transition-colors">
                <img 
                  src="/images/q-fnb/6restaurant_insights_after_dark.png" 
                  alt="Restaurant Insights Review After Dark" 
                  className="w-full h-auto object-cover brightness-95 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 border border-white/10 text-[10px] font-mono text-purple-300 uppercase">
                  INSIGHTS PREVIEW
                </div>
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-mono text-zinc-300">
                  AFTER DARK REVIEW // Owner Reviewing Service Metrics Inside Restaurant
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Analytics Demo Data Matrix */}
          <div className="lg:col-span-6">
            <Reveal type="fade-up" delay={0.2}>
              <div className="bg-zinc-950 border border-white/10 p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-bold uppercase">BUSINESS INSIGHTS MATRIX</span>
                  </div>
                  <span className="text-[10px] text-purple-300 bg-purple-950 border border-purple-800 px-2 py-0.5">
                    DEMO DATA
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono">
                  {[
                    { label: "RESERVATIONS", val: "482", sub: "+18% MoM" },
                    { label: "REPEAT GUEST %", val: "38.4%", sub: "High Loyalty" },
                    { label: "NO-SHOW RATE", val: "2.1%", sub: "-4.5% Improvement" },
                    { label: "AVG PARTY SIZE", val: "3.8", sub: "Peak Fri / Sat" },
                    { label: "GUEST PROFILES", val: "185", sub: "Active Records" },
                    { label: "CAMPAIGN RESPONSE", val: "24.6%", sub: "Birthday Offers" },
                  ].map((metric) => (
                    <div key={metric.label} className="p-3 bg-black border border-white/10">
                      <div className="text-[9px] text-zinc-500 uppercase">{metric.label}</div>
                      <div className="text-xl font-bold text-white mt-1 mb-1">{metric.val}</div>
                      <div className="text-[9px] text-purple-400">{metric.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[9px] font-mono text-zinc-500 text-right mt-4">* Fictional demo metrics</div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 11: NOT LOCKED TO ONE WEBSITE                                */}
      {/* ==================================================================== */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 border-b border-white/5">
        <Reveal type="fade-up">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">
            NOT LOCKED TO ONE WEBSITE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase max-w-3xl mb-4">
            YOUR BRAND OUT FRONT. Q F&B BEHIND IT.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl font-light mb-10">
            Q F&B is designed as a standalone operational platform that can connect with restaurant websites while allowing each hospitality brand to keep its own identity. It is designed to work with existing restaurant websites, custom brand applications, or as a standalone operating back-end.
          </p>
        </Reveal>

        <Reveal type="fade-up" delay={0.15}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
            {[
              "QC Restaurant Websites",
              "Existing Restaurant Websites",
              "Restaurants",
              "Boutique Cafés",
              "Bars & Lounges",
              "Hotel Dining",
              "Restaurant Groups",
              "Hospitality Brands",
              "Private Clubs",
              "Event Venues"
            ].map((item) => (
              <div key={item} className="p-4 bg-zinc-950 border border-white/10 text-center text-zinc-300">
                <Check className="w-4 h-4 text-purple-400 mx-auto mb-2" />
                <div>{item}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 12: PRODUCT ROADMAP & FOCUS                                  */}
      {/* ==================================================================== */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10 border-b border-white/5 space-y-12">
        <Reveal type="fade-up">
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">
            PRODUCT DIRECTION
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase max-w-3xl mb-4">
            PLANNED DEVELOPMENT ROADMAP.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl font-light">
            Q F&B is being built modularly around front-of-house service and guest relationships.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <Reveal type="fade-up" delay={0.1}>
            <div className="p-6 bg-zinc-950 border border-purple-500/40 h-full flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-purple-400 font-bold uppercase mb-2">FOUNDATION</div>
                <h3 className="text-lg font-bold text-white uppercase mb-4">CORE SYSTEM</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Reservations</li>
                  <li>• Tables</li>
                  <li>• Guest Profiles</li>
                  <li>• Offers</li>
                  <li>• Basic Insights</li>
                </ul>
              </div>
              <div className="mt-6 text-[10px] text-purple-400 uppercase">PLANNED CAPABILITY</div>
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={0.2}>
            <div className="p-6 bg-zinc-950 border border-white/10 h-full flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-zinc-400 font-bold uppercase mb-2">GROWTH</div>
                <h3 className="text-lg font-bold text-white uppercase mb-4">AUTOMATION</h3>
                <ul className="space-y-2 text-zinc-400">
                  <li>• Waitlist</li>
                  <li>• WhatsApp Workflows</li>
                  <li>• Feedback</li>
                  <li>• Campaigns</li>
                  <li>• Multi-Outlet Management</li>
                </ul>
              </div>
              <div className="mt-6 text-[10px] text-zinc-500 uppercase">PLANNED CAPABILITY</div>
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={0.3}>
            <div className="p-6 bg-black border border-white/10 h-full flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase mb-2">COMMERCE</div>
                <h3 className="text-lg font-bold text-white uppercase mb-4">COMMERCE LAYER</h3>
                <ul className="space-y-2 text-zinc-500">
                  <li>• Deposits</li>
                  <li>• Gift Cards</li>
                  <li>• Dining Experiences</li>
                  <li>• Payment Integrations</li>
                </ul>
              </div>
              <div className="mt-6 text-[10px] text-zinc-600 uppercase">PLANNED CAPABILITY</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 13: FINAL PRIVATE DEMO CTA                                   */}
      {/* ==================================================================== */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto z-10">
        <Reveal type="fade-up">
          <div className="bg-zinc-950 border border-white/10 p-8 sm:p-14 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono tracking-widest uppercase mb-6">
              Q F&B / PRIVATE DEMO
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase max-w-3xl mx-auto mb-6">
              SEE WHAT Q F&B COULD DO FOR YOUR RESTAURANT.
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto font-light mb-10 leading-relaxed">
              Tell us how your restaurant currently handles bookings, guests and communication. We'll tailor the demonstration around your operation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onNavigateQFnBDemo}
                className="px-8 py-4 bg-white text-black hover:bg-purple-500 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer w-full sm:w-auto"
              >
                REQUEST A PRIVATE DEMO
              </button>

              <a
                href="https://qrestobar.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>VIEW Q RESTOBAR</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}

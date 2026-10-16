  import { Link } from 'react-router-dom';
  import { ArrowRight, Sparkles, Calendar, MapPin } from 'lucide-react';
  import heroBg from '@/assets/images/clg.png';
  import { AboutSection } from '@/components/home/AboutSection';
  import { NoticesSection } from '@/components/home/NoticesSection';
  import { DharoharSection } from '@/components/home/DharoharSection';
  import { EventSection } from '@/components/home/EventSection';
  import { WelcomeMessagesSection } from '@/components/home/WelcomeMessagesSection';
  import { GallerySection } from '@/components/home/GallerySection';
  import { AlumniLegacySection } from '@/components/home/AlumniLegacySection';
  import { PastSponsorsSection } from '@/components/home/PastSponsorsSection';
  import { HeritageCtaSection } from '@/components/common/HeritageCtaSection';

  export const HomePage = () => {
    const tickerItems = [
      { prefix: 'Ruby Jubilee Batch — ', highlight: '1986' },
      { prefix: 'Reconnect with the GCAAA Alumni Community', highlight: null },
      { prefix: 'GCAAA Alumni Meet — ', highlight: '28 November 2026' },
      { prefix: 'Silver Jubilee Batch — ', highlight: '2001' },
    ];

    return (
      <div className="w-full bg-neutral-950 text-white">

        {/* ========================================================
            1. HERO SECTION WITH RICH ARCHITECTURAL TEXT OVERLAY
        ======================================================== */}
        <section className="relative w-full h-[55vh] sm:h-[70vh] md:h-[80vh] lg:h-[88vh] min-h-[380px] sm:min-h-[500px] overflow-hidden flex items-center justify-center">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat brightness-[0.9] contrast-[1.05] saturate-[1.15]"
            style={{
              backgroundImage: `url(${heroBg})`,
              backgroundPosition: 'center top',
            }}
          />

          {/* Cinematic Gradient Overlays (Dark bottom & subtle vignette for crisp text contrast) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />

          {/* Hero Content Container */}
          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            {/* Top Eyebrow Badge */}
            <div className="relative -top-4 sm:-top-7 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-2 sm:mb-3 shadow-lg animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>Government College of Architecture Alumni Association</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.15] text-white max-w-6xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              <span className="block sm:whitespace-nowrap">Uniting Generations of Architects,</span>
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-200 to-white sm:whitespace-nowrap">
                Honoring Our Timeless Legacy
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="mt-3.5 sm:mt-5 text-xs sm:text-base md:text-lg text-neutral-200 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-2">
              Connecting graduates, mentors, and faculty of <strong className="text-white font-bold">GCA Lucknow</strong> (now <em>FOAP, AKTU</em>) across the globe. Celebrating brotherhood, design innovation, and our timeless campus heritage.
            </p>

            {/* Action CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                to="/registration"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#B70D2B] hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-full shadow-xl shadow-red-950/50 hover:shadow-red-600/50 hover:-translate-y-0.5 transition-all"
              >
                <span>Register As Alumnus</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/50 hover:bg-white hover:text-neutral-950 text-white border border-white/30 hover:border-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-full backdrop-blur-md shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Calendar className="w-4 h-4 text-red-400" />
                <span>Dharohar 2026 Meet</span>
              </Link>
            </div>

            
          </div>
        </section>

        {/* ========================================================
            2. MARQUEE TICKER (OUTSIDE HERO — ALWAYS VISIBLE)
        ======================================================== */}
        <div className="relative w-full bg-black border-t-2 border-b-2 border-red-600 overflow-hidden shadow-2xl shadow-red-950/30 py-3 sm:py-3.5">
          <div className="animate-marquee flex items-center whitespace-nowrap">
            {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
              <div key={index} className="flex items-center shrink-0">
                <span className="text-white font-semibold text-[11px] sm:text-sm md:text-base tracking-wide flex items-center hover:text-red-400 transition-colors">
                  <span>{item.prefix}</span>
                  {item.highlight && (
                    <span className="text-red-500 font-extrabold ml-1">{item.highlight}</span>
                  )}
                </span>
                <span className="text-red-500 mx-4 sm:mx-6 md:mx-8 text-xs sm:text-sm drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]">
                  ◆
                </span>
              </div>
            ))}
          </div>
        </div>

        

        {/* ========================================================
            8. ALUMNI LEGACY
        ======================================================== */}
        <AlumniLegacySection />

      

        {/* ========================================================
            5. DHAROHAR 2026 SECTION
        ======================================================== */}
        <DharoharSection />

        {/* ========================================================
            5. EVENT SECTION
        ======================================================== */}
        <EventSection />

        {/* ========================================================
            7. WELCOME MESSAGES
        ======================================================== */}
        <WelcomeMessagesSection />

        {/* ========================================================
            6. GALLERY SECTION
        ======================================================== */}
        <GallerySection />

        

        {/* ========================================================
            3. ABOUT SECTION
        ======================================================== */}
        <AboutSection />

        {/* ========================================================
            4. NOTICES & ANNOUNCEMENTS SECTION (CIRCULARS & NOTICES)
        ======================================================== */}
        <NoticesSection />
        

        {/* ========================================================
            9. PAST SPONSORS SECTION
        ======================================================== */}
        <PastSponsorsSection />

        {/* ========================================================
            10. HERITAGE STAMP & SKYLINE CTA SECTION
        ======================================================== */}
        <HeritageCtaSection />
      </div>
    );
  };
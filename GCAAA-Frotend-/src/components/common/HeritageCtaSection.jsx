import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeritageCtaSection = () => {
  return (
    <section className="w-full bg-white pt-4 sm:pt-6 pb-8 sm:pb-12">
      {/* Navbar ke equal width (1400px container) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14">
        {/* Floating CTA Card */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#0c0d12] border border-neutral-800/90 p-6 sm:p-8 md:p-10 text-center shadow-2xl overflow-hidden">

          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-3 sm:space-y-4">

            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span>GCAAA Alumni Fraternity · Est. 1976</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-black text-white tracking-tight leading-tight">
              Are You an Alumnus of GCA Lucknow FOAP?
            </h2>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed font-normal max-w-2xl mx-auto">
              Reconnect with batchmates and mentors, explore the global architectural alumni network, stay updated with chapter events, and participate in Dharohar 2026. Register today to stay connected!
            </p>

            {/* Action Buttons */}
            <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/registration"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B70D2B] hover:bg-red-700 active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-3 rounded-xl shadow-lg shadow-red-950/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Register As Alumnus</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/events"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B70D2B] hover:bg-red-700 active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-3 rounded-xl shadow-lg shadow-red-950/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Explore Dharohar 2026</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export const CTASection = HeritageCtaSection;
export default HeritageCtaSection;
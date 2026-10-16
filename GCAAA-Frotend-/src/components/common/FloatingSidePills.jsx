import { Link } from 'react-router-dom';

export const FloatingSidePills = () => {
  return (
    <>
      {/* ========================================================
          1. LEFT SIDE FLOATING ACTION PILLS
      ======================================================== */}
      <div className="hidden md:flex fixed left-0 top-[48%] -translate-y-1/2 z-30 flex-col gap-3 pointer-events-auto">
        {/* Left Pill 1: Dharohar 2026 */}
        <Link
          to="/events"
          title="Dharohar 2026 Alumni Meet"
          className="group relative bg-[#B70D2B] hover:bg-red-700 text-white font-black text-[10px] sm:text-[11px] tracking-widest uppercase py-3 sm:py-3.5 px-1.5 sm:px-2 rounded-r-xl shadow-xl shadow-red-950/40 border-r-2 border-y-2 border-red-500/80 transition-all duration-300 hover:translate-x-1.5 hover:shadow-red-600/60 flex items-center justify-center cursor-pointer"
        >
          <span
            style={{ writingMode: 'vertical-rl' }}
            className="rotate-180 tracking-widest whitespace-nowrap font-extrabold"
          >
            Dharohar 2026
          </span>
          {/* Subtle Glow Strip */}
          <span className="absolute inset-y-0 right-0 w-0.5 bg-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* Left Pill 2: Photo Gallery & Archives */}
        <Link
          to="/gallery"
          title="GCAAA Photo Gallery & Memories"
          className="group relative bg-[#B70D2B] hover:bg-red-700 text-white font-black text-[10px] sm:text-[11px] tracking-widest uppercase py-3 sm:py-3.5 px-1.5 sm:px-2 rounded-r-xl shadow-xl shadow-red-950/40 border-r-2 border-y-2 border-red-500/80 transition-all duration-300 hover:translate-x-1.5 hover:shadow-red-600/60 flex items-center justify-center cursor-pointer"
        >
          <span
            style={{ writingMode: 'vertical-rl' }}
            className="rotate-180 tracking-widest whitespace-nowrap font-extrabold"
          >
            Photo Gallery
          </span>
          {/* Subtle Glow Strip */}
          <span className="absolute inset-y-0 right-0 w-0.5 bg-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      {/* ========================================================
          2. RIGHT SIDE FLOATING ACTION PILLS
      ======================================================== */}
      <div className="hidden md:flex fixed right-0 top-[48%] -translate-y-1/2 z-30 flex-col gap-3 pointer-events-auto">
        {/* Right Pill 1: Alumni Register / Join GCAAA */}
        <Link
          to="/registration"
          title="Alumni Registration & Life Membership"
          className="group relative bg-[#B70D2B] hover:bg-red-700 text-white font-black text-[10px] sm:text-[11px] tracking-widest uppercase py-3 sm:py-3.5 px-1.5 sm:px-2 rounded-l-xl shadow-xl shadow-red-950/40 border-l-2 border-y-2 border-red-500/80 transition-all duration-300 hover:-translate-x-1.5 hover:shadow-red-600/60 flex items-center justify-center cursor-pointer"
        >
          <span
            style={{ writingMode: 'vertical-rl' }}
            className="tracking-widest whitespace-nowrap font-extrabold"
          >
            Join GCAAA
          </span>
          {/* Subtle Glow Strip */}
          <span className="absolute inset-y-0 left-0 w-0.5 bg-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* Right Pill 2: Jubilee Cohort / Committee */}
        <Link
          to="/committee"
          title="Executive Committee & Advisory Board"
          className="group relative bg-[#B70D2B] hover:bg-red-700 text-white font-black text-[10px] sm:text-[11px] tracking-widest uppercase py-3 sm:py-3.5 px-1.5 sm:px-2 rounded-l-xl shadow-xl shadow-red-950/40 border-l-2 border-y-2 border-red-500/80 transition-all duration-300 hover:-translate-x-1.5 hover:shadow-red-600/60 flex items-center justify-center cursor-pointer"
        >
          <span
            style={{ writingMode: 'vertical-rl' }}
            className="tracking-widest whitespace-nowrap font-extrabold"
          >
            Team GCAAA
          </span>
          {/* Subtle Glow Strip */}
          <span className="absolute inset-y-0 left-0 w-0.5 bg-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    </>
  );
};

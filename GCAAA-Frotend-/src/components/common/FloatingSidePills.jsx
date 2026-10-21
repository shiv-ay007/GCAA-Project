import { Link } from 'react-router-dom';

// ✅ Shared class — ALL 4 pills same size, NO hover movement
const PILL_BASE =
  "group relative bg-[#B70D2B] hover:bg-red-700 text-white font-black text-[10px] sm:text-[11px] tracking-widest uppercase " +
  "w-9 sm:w-10 h-[120px] sm:h-[135px] " + // ✅ Thoda bada size
  "flex items-center justify-center " +
  "shadow-xl shadow-red-950/40 border-red-500/80 " +
  "transition-colors duration-300 hover:shadow-red-600/60 cursor-pointer overflow-hidden";

export const FloatingSidePills = () => {
  return (
    <>
      {/* ========================================================
          1. LEFT SIDE FLOATING ACTION PILLS
      ======================================================== */}
      <div className="hidden md:flex fixed left-0 top-[48%] -translate-y-1/2 z-30 flex-col gap-3 pointer-events-auto">
        {/* Left Pill 1: Registered Members Directory */}
        <Link
          to="/registered-members"
          title="GCAAA Registered Members Directory"
          className={`${PILL_BASE} rounded-r-2xl border-r-2 border-y-2`}
        >
          <span
            style={{ writingMode: 'vertical-rl' }}
            className="rotate-180 tracking-widest whitespace-nowrap font-extrabold text-amber-200"
          >
            Membership
          </span>
          <span className="absolute inset-y-0 right-0 w-0.5 bg-amber-400 opacity-80 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* Left Pill 2: Photo Gallery & Archives */}
        <Link
          to="/gallery"
          title="GCAAA Photo Gallery & Memories"
          className={`${PILL_BASE} rounded-r-2xl border-r-2 border-y-2`}
        >
          <span
            style={{ writingMode: 'vertical-rl' }}
            className="rotate-180 tracking-widest whitespace-nowrap font-extrabold"
          >
            Photo Gallery
          </span>
          <span className="absolute inset-y-0 right-0 w-0.5 bg-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      {/* ========================================================
          2. RIGHT SIDE FLOATING ACTION PILLS
      ======================================================== */}
      <div className="hidden md:flex fixed right-0 top-[48%] -translate-y-1/2 z-30 flex-col gap-3 pointer-events-auto">
        {/* Right Pill 1: Join GCAAA */}
        <Link
          to="/registration"
          title="Alumni Registration & Life Membership"
          className={`${PILL_BASE} rounded-l-2xl border-l-2 border-y-2`}
        >
          <span
            style={{ writingMode: 'vertical-rl' }}
            className="tracking-widest whitespace-nowrap font-extrabold"
          >
            Join GCAAA
          </span>
          <span className="absolute inset-y-0 left-0 w-0.5 bg-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* Right Pill 2: Team GCAAA */}
        <Link
          to="/committee"
          title="Executive Committee & Advisory Board"
          className={`${PILL_BASE} rounded-l-2xl border-l-2 border-y-2`}
        >
          <span
            style={{ writingMode: 'vertical-rl' }}
            className="tracking-widest whitespace-nowrap font-extrabold"
          >
            Team GCAAA
          </span>
          <span className="absolute inset-y-0 left-0 w-0.5 bg-red-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    </>
  );
};

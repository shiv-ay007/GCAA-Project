import { useState, useEffect } from 'react';
import { X, Vote, CalendarDays } from 'lucide-react';
import electionBannerImg from '@/assets/images/election_notice_banner.png';

export const ElectionNominationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Show popup automatically whenever the page loads or refreshes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500); // Smooth 500ms entrance after load

    return () => clearTimeout(timer);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal Card Container (Stop propagation so clicking inside does NOT close or redirect) */}
      <div
        className="relative w-full max-w-2xl lg:max-w-3xl bg-neutral-950 text-white rounded-2xl shadow-2xl border border-red-900/60 overflow-hidden max-h-[96vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Crimson & Gold Header Band */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-[#8B0000] to-red-600 shrink-0" />

        {/* Modal Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 hover:bg-[#8B0000] text-neutral-200 hover:text-white flex items-center justify-center transition-all shadow-xl backdrop-blur-md border border-white/20 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Close Pop-up"
          title="Close Popup"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Banner Image Area - Zoomed Full Card Display */}
        <div className="relative overflow-y-auto bg-white flex items-center justify-center p-2 sm:p-4 max-h-[82vh]">
          <img
            src={electionBannerImg}
            alt="GCAAA Executive Body Election 2026-2028 Official Notice & Schedule"
            className="w-full h-auto max-h-[78vh] object-contain block mx-auto drop-shadow-xs"
          />
        </div>

        {/* Bottom Information Bar */}
        <div className="p-3 sm:p-3.5 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-t border-red-950/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="text-xs">
            <p className="font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
              <Vote className="w-4 h-4 text-amber-400" />
              <span>GCAAA Election Committee &bull; 2026</span>
            </p>
            <p className="text-[11px] text-neutral-400 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
              <CalendarDays className="w-3.5 h-3.5 text-red-400 inline" />
              <span>Official Schedule &bull; Filing of Nominations: 22&ndash;25 October 2026</span>
            </p>
          </div>

          <span className="text-[11px] font-semibold text-neutral-400">
            Official Notification
          </span>

          {/* Fill nomination form button temporarily commented out as requested */}
          {/*
          <button
            onClick={() => navigate('/election-nomination')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B0000] to-red-700 hover:from-red-700 hover:to-[#8B0000] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-2.5 sm:py-3 px-6 rounded-xl shadow-lg shadow-red-950/60 border border-red-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Fill Nomination Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          */}
        </div>
      </div>
    </div>
  );
};

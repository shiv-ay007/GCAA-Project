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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal Card Container (Fitted to image aspect ratio, zero side space) */}
      <div
        className="relative w-full max-w-[440px] sm:max-w-[480px] md:max-w-[500px] bg-neutral-950 text-white rounded-2xl shadow-2xl border border-neutral-700/80 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Header Band */}
        <div className="h-1.5 w-full bg-gradient-to-r from-neutral-900 via-[#1A365D] to-amber-500 shrink-0" />

        {/* Modal Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2.5 right-2.5 z-30 w-8 h-8 rounded-full bg-black/80 hover:bg-[#1A365D] text-neutral-200 hover:text-white flex items-center justify-center transition-all shadow-xl backdrop-blur-md border border-white/20 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Close Pop-up"
          title="Close Popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Banner Image Area - FULL 100% WIDTH, ZERO SIDE MARGINS */}
        <div className="relative w-full bg-white p-0 m-0 overflow-y-auto max-h-[calc(92vh-60px)] flex items-center justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <img
            src={electionBannerImg}
            alt="GCAAA Executive Body Election 2026-2028 Official Notice & Schedule"
            className="w-full h-auto block select-none"
          />
        </div>

        {/* Bottom Information Bar */}
        <div className="p-2.5 sm:p-3 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-2 text-left shrink-0">
          <div className="text-xs">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Vote className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>GCAAA Election Committee &bull; 2026</span>
            </p>
            <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
              <CalendarDays className="w-3.5 h-3.5 text-amber-400 shrink-0 inline" />
              <span>Schedule: Filing of Nominations (22&ndash;25 Oct 2026)</span>
            </p>
          </div>

          <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 whitespace-nowrap">
            Official Notification
          </span>
        </div>
      </div>
    </div>
  );
};

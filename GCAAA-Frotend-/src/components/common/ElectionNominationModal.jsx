import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Vote, CalendarDays, ArrowRight, Sparkles } from 'lucide-react';
import electionBannerImg from '@/assets/images/election_notice_banner.png';

export const ElectionNominationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Show popup automatically whenever the page loads or refreshes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

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

  const handleNavigate = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
    navigate('/election-nomination');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal Card Container */}
      <div
        className="relative w-auto max-w-[min(94vw,500px)] bg-neutral-950 text-white rounded-2xl shadow-2xl border border-neutral-700/90 overflow-hidden flex flex-col max-h-[96vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Header Band */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-red-600 to-[#1A365D] shrink-0" />

        {/* Modal Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2.5 right-2.5 z-30 w-8 h-8 rounded-full bg-black/80 hover:bg-red-600 text-neutral-200 hover:text-white flex items-center justify-center transition-all shadow-xl backdrop-blur-md border border-white/20 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Close Pop-up"
          title="Close Popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Banner Image Area (Fits 100% without scroll or slider) */}
        <div className="relative w-full bg-white p-0 m-0 overflow-hidden flex items-center justify-center shrink min-h-0">
          <img
            src={electionBannerImg}
            alt="GCAAA Executive Body Election 2026-2028 Official Notice & Schedule"
            className="w-auto h-auto max-h-[calc(94vh-135px)] max-w-full object-contain block select-none mx-auto"
          />
        </div>

        {/* Bottom CTA & Information Bar */}
        <div className="p-3 sm:p-3.5 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-t border-neutral-800 shrink-0 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs gap-2">
            <div className="text-left">
              <p className="font-bold text-white flex items-center gap-1.5 text-xs">
                <Vote className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>GCAAA Election &bull; 2026-28</span>
              </p>
              <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                <CalendarDays className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Nominations: 22&ndash;25 Oct 2026</span>
              </p>
            </div>

            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-600/40 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online Portal Open
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleNavigate}
              className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-[#B70D2B] to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-red-950/60 border border-red-500/40 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>Fill Nomination Form</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleClose}
              className="py-2.5 sm:py-3 px-3.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-bold border border-neutral-700 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Vote, Sparkles } from 'lucide-react';
import electionBannerImg from '@/assets/images/election_banner.png';

export const ElectionNominationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleNavigateToNomination = () => {
    setIsOpen(false);
    navigate('/election-nomination');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal Card Container */}
      <div
        className="relative w-full max-w-xl md:max-w-2xl bg-neutral-950 text-white rounded-2xl shadow-2xl border border-red-900/60 overflow-hidden max-h-[94vh] flex flex-col group transition-transform duration-300 hover:scale-[1.008] cursor-pointer"
        onClick={handleNavigateToNomination} // Entire card is clickable
      >
        {/* Top Decorative Crimson & Gold Header Band */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-[#8B0000] to-red-600 shrink-0" />

        {/* Modal Close Button (stops propagation so clicking X only closes modal) */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 hover:bg-[#8B0000] text-neutral-200 hover:text-white flex items-center justify-center transition-all shadow-xl backdrop-blur-md border border-white/20 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Close Pop-up"
          title="Close Popup"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Banner Image Area */}
        <div
          className="relative overflow-hidden bg-neutral-900 flex items-center justify-center"
          title="Click to Fill Election Nomination Form"
        >
          <img
            src={electionBannerImg}
            alt="GCAAA Executive Body Election 2026-2028 Nomination"
            className="w-full h-auto max-h-[72vh] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* Subtle Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors pointer-events-none" />
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-t border-red-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left text-xs hidden sm:block">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Vote className="w-4 h-4 text-amber-400" />
              <span>GCAAA Executive Body Election 2026 – 2028</span>
            </p>
            <p className="text-[11px] text-neutral-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-red-400 inline" />
              Online Nomination Portal is now open for Lifetime Members
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigateToNomination();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B0000] to-red-700 hover:from-red-700 hover:to-[#8B0000] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-2.5 sm:py-3 px-6 rounded-xl shadow-lg shadow-red-950/60 border border-red-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Fill Nomination Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

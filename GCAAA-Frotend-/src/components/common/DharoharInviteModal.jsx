import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import dharoharInviteImg from '@/assets/images/dharohar_invite_popup.jpg';

export const DharoharInviteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Automatically trigger modal on EVERY page load / refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 700); // 700ms smooth delay after page refresh

    return () => clearTimeout(timer);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNavigateToRegister = () => {
    setIsOpen(false);
    navigate('/registration');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm transition-all duration-300"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal Card Container */}
      <div
        className="relative w-full max-w-xl md:max-w-2xl bg-neutral-950 text-white rounded-2xl shadow-2xl border border-neutral-700/80 overflow-hidden max-h-[94vh] flex flex-col group transition-transform duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Top Decorative Crimson Header Band */}
        <div className="h-1.5 w-full bg-gradient-to-r from-neutral-900 via-[#B70D2B] to-amber-500 shrink-0" />

        {/* Modal Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/75 hover:bg-[#B70D2B] text-neutral-200 hover:text-white flex items-center justify-center transition-all shadow-lg backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Close Pop-up"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Clickable Image Banner Area */}
        <div
          onClick={handleNavigateToRegister}
          className="relative cursor-pointer overflow-hidden bg-neutral-900 flex items-center justify-center"
          title="Click to Register / RSVP for Dharohar 2026"
        >
          <img
            src={dharoharInviteImg}
            alt="Dharohar 2026 - GCA Alumni Meet & GBM Invitation"
            className="w-full h-auto max-h-[75vh] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* Subtle Hover Overlay (no text) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-3 sm:p-4 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left text-xs hidden sm:block">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Join Alumni &amp; Faculty · November 28, 2026
            </p>
            <p className="text-[11px] text-neutral-400">
              Celebrate Ruby &amp; Silver Jubilee at FOAP-AKTU Lucknow
            </p>
          </div>

          <button
            onClick={handleNavigateToRegister}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#B70D2B] hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-2.5 sm:py-3 px-6 rounded-xl shadow-lg shadow-red-950/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Register / RSVP Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
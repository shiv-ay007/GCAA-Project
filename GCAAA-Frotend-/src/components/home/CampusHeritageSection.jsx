import React, { useState, useEffect } from 'react';
import {
  Building2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import campusHeritageAerial from '@/assets/images/campus_heritage_aerial.jpg';
import campusAcademicBlock from '@/assets/images/campus_academic_block.jpg';
import campusTagoreEntrance from '@/assets/images/campus_tagore_entrance.jpg';

export const CampusHeritageSection = () => {
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const campusCards = [
    {
      id: 'heritage',
      image: campusHeritageAerial,
      title: 'The Historic Arched Corridors',
      description:
        'Colonial arched colonnades, heritage red-and-ochre brickwork, and lush central courtyards that have nurtured generations of architects since 1911.',
    },
    {
      id: 'academic',
      image: campusAcademicBlock,
      title: 'Contemporary Design Studios',
      description:
        'State-of-the-art multi-storey architectural complex housing creative drafting studios, climate labs, and faculty spaces.',
    },
    {
      id: 'entrance',
      image: campusTagoreEntrance,
      title: 'Main Entrance Pavilion & Facade',
      description:
        'Iconic entrance canopy, broad steps, and monumental front facade of the Faculty of Architecture & Planning at Tagore Marg, Lucknow.',
    },
  ];

  const openLightbox = (index) => {
    setActiveModalIndex(index);
  };

  const closeLightbox = () => {
    setActiveModalIndex(null);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex + 1) % campusCards.length);
    }
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex - 1 + campusCards.length) % campusCards.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeModalIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex]);

  return (
    <section className="w-full bg-white text-neutral-900 py-12 sm:py-16 lg:py-20 border-b border-neutral-200 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14">
        {/* ========================================================
            MINIMAL CLEAN HEADER (NO BADGES)
        ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#B70D2B] text-xs font-bold uppercase tracking-widest mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#B70D2B]" />
            <span>Campus &amp; Architectural Heritage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-neutral-900 tracking-tight">
            Our Campus &amp; Architectural Heritage
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
            From the 1911 colonial heritage corridors to the modern Tagore Marg FOAP-AKTU campus.
          </p>
        </div>

        {/* ========================================================
            3-CARD GRID: CRISP CLEAR IMAGES, NO BADGES, TEXT AT BOTTOM ON HOVER
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {campusCards.map((card, idx) => (
            <div
              key={card.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-[380px] sm:h-[420px] lg:h-[460px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer bg-neutral-100"
            >
              {/* CLEAR, CRISP IMAGE — NEVER BLURRED */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* EXPAND ICON IN TOP RIGHT (APPEARS SMOOTHLY ON HOVER) */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-[#B70D2B] text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* BOTTOM GRADIENT & TEXT (ONLY AT BOTTOM — TOP OF IMAGE STAYS COMPLETELY CLEAR) */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent pt-20 pb-5 px-5 sm:px-6 z-10 flex flex-col justify-end">
                <h3 className="text-base sm:text-lg font-bold text-white font-serif tracking-tight drop-shadow-md leading-snug">
                  {card.title}
                </h3>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-[13px] text-neutral-200 leading-relaxed font-normal pt-2 border-t border-white/20 mt-2">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          FULLSCREEN LIGHTBOX MODAL
      ======================================================== */}
      {activeModalIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-[#B70D2B] text-white transition-all cursor-pointer shadow-lg"
            aria-label="Close image modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left / Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-white text-white hover:text-black transition-all cursor-pointer border border-white/20 shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right / Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-white text-white hover:text-black transition-all cursor-pointer border border-white/20 shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Image Container */}
          <div
            className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[78vh] flex items-center justify-center">
              <img
                src={campusCards[activeModalIndex].image}
                alt={campusCards[activeModalIndex].title}
                className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/15"
              />
            </div>

            {/* Caption beneath */}
            <div className="mt-3 text-center max-w-2xl px-4">
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                {campusCards[activeModalIndex].title}
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm mt-1">
                {campusCards[activeModalIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

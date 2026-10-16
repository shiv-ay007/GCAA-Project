import React, { useState, useMemo, useEffect } from 'react';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';

import { allGalleryItems, galleryCategories as categoryTabs } from '@/data/galleryData';
export { allGalleryItems };

export const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: allGalleryItems.length };
    allGalleryItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered Items
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return allGalleryItems;
    return allGalleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null && filteredItems.length > 0) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredItems.length);
    }
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null && filteredItems.length > 0) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredItems.length]);

  return (
    <div className="w-full bg-white text-neutral-900 min-h-screen pb-24 font-sans">
      {/* ========================================================
          1. HEADER BANNER
      ======================================================== */}
      <section className="bg-gradient-to-b from-neutral-100/90 via-neutral-50 to-white border-b border-neutral-200/90 pt-10 sm:pt-14 pb-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/90 text-[#B70D2B] text-xs font-black tracking-widest uppercase mb-3 shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-[#B70D2B]" />
            <span>ARCHIVES &amp; DHAROHAR REUNIONS</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 uppercase tracking-tight">
            GCAAA PHOTO <span className="text-[#B70D2B]">GALLERY</span>
          </h1>

          {/* Categories Filter Pills */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {categoryTabs.map((cat) => {
              const isActive = activeCategory === cat.key;
              const count = categoryCounts[cat.key] || 0;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#B70D2B] text-white shadow-md shadow-red-700/25 ring-2 ring-red-400/40'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:border-red-600/60 hover:text-red-700 hover:bg-red-50/50 shadow-xs'
                  }`}
                  style={{
                    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontVariantNumeric: 'lining-nums tabular-nums',
                  }}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive
                        ? 'bg-white text-[#B70D2B]'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          2. PURE PHOTO GRID (NO TEXT ON CARDS)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer relative bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200/90 hover:border-red-600 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 aspect-[4/3]"
            >
              <img
                src={item.src}
                alt=""
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Hover Dark Overlay with Zoom Icon */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-xs text-[#B70D2B] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. FULLSCREEN LIGHTBOX MODAL (PURE HIGH-RES IMAGE)
      ======================================================== */}
      {selectedPhotoIndex !== null && filteredItems[selectedPhotoIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
        >
          {/* Top Header Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-20">
            <span
              className="text-xs font-semibold text-neutral-300 bg-neutral-900/80 px-3 py-1.5 rounded-full border border-neutral-700"
              style={{
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontVariantNumeric: 'lining-nums tabular-nums',
              }}
            >
              {selectedPhotoIndex + 1} / {filteredItems.length}
            </span>

            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-neutral-900/90 border border-neutral-700 text-white hover:bg-red-600 transition-colors cursor-pointer shadow-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevPhoto}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 hover:bg-[#B70D2B] border border-neutral-700 text-white transition-colors z-20 cursor-pointer shadow-lg"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 hover:bg-[#B70D2B] border border-neutral-700 text-white transition-colors z-20 cursor-pointer shadow-lg"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Center Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] flex items-center justify-center p-2"
          >
            <div className="relative p-1 sm:p-2 bg-neutral-900/95 rounded-2xl border border-neutral-700/80 shadow-2xl overflow-hidden">
              <img
                src={filteredItems[selectedPhotoIndex].src}
                alt=""
                className="max-h-[82vh] max-w-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

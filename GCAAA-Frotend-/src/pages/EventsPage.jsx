import { Link } from 'react-router-dom';
import { EventSection } from '@/components/home/EventSection';
import { DharoharSection } from '@/components/home/DharoharSection';
import { GallerySection } from '../components/home/GallerySection';
import eventHeroImg from '@/assets/images/dharohar.png';

export const EventsPage = () => {
  return (
    <div className="w-full bg-white">
      {/* ========================================================
          1. SLEEK MINIMAL HERO BANNER
      ======================================================== */}
      <section className="relative overflow-hidden py-12 sm:py-16 flex items-center justify-center border-b border-neutral-300">
        {/* Background Event / Reunion Image */}
        <img
          src={eventHeroImg}
          alt="GCAAA Events & Reunions"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />

        {/* Content: Title & Breadcrumb Only */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase font-serif drop-shadow-md">
            Events &amp; Reunions
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-neutral-300 mt-2 font-semibold">
            <Link to="/" className="hover:text-red-400 transition-colors">
              HOME
            </Link>
            <span className="text-red-500 font-bold">—</span>
            <span className="text-amber-400">EVENTS</span>
          </div>
        </div>
      </section>

      <DharoharSection />
      <EventSection />
      <GallerySection />
    </div>
  );
};

import { EventSection } from '@/components/home/EventSection';
import { DharoharSection } from '@/components/home/DharoharSection';
import { GallerySection } from '../components/home/GallerySection';

export const EventsPage = () => {
  return (
    <div className="w-full bg-white">
      <div className="py-14 sm:py-16 bg-neutral-950 text-white text-center border-b border-neutral-900">
        <p className="text-xs uppercase font-bold tracking-[0.2em] text-[#B70D2B] mb-2">Annual Mega Gathering</p>
        <h1 className="text-4xl sm:text-5xl font-black">Events &amp; Reunions</h1>
        <p className="text-sm text-neutral-400 mt-3 max-w-xl mx-auto px-4">
          Explore upcoming alumni meets, general body meetings, and celebrations.
        </p>
      </div>
      <DharoharSection />
      <EventSection />
      <GallerySection />
    </div>
  );
};

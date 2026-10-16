import { Link } from 'react-router-dom';
import collegeImage from '@/assets/images/building.jpg';

export const AboutSection = () => {
  return (
    <section className="bg-white py-10 sm:py-16 lg:py-24 border-b border-neutral-200 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* ========================================================
              LEFT COLUMN: TEXT CONTENT
          ======================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Main Section Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-neutral-900 leading-[1.25] tracking-tight mb-4 sm:mb-6">
              About Government College of Architecture (FOAP, AKTU)
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-base leading-relaxed text-neutral-600 mb-6 sm:mb-8 text-left sm:text-justify">
              <p>
                The institute traces its origins back to 1911, as a part of the Government College of Arts & Crafts.
                It is one of the oldest architectural institutions in the country. In 1976, it separated from the
                Government College of Arts & Crafts and was renamed the Govt. School of Architecture. Later, in 1980,
                it became the Govt. College of Architecture, Lucknow (popularly known as GCA, Lucknow) and attained
                the status of a constituent college of Lucknow University.
              </p>

              <p className="hidden sm:block">
                Until the academic session of 1999–2000, the college, forming the Faculty of Architecture of Lucknow
                University, conducted a five-year degree program leading to a Bachelor's degree in Architecture (B. Arch).
              </p>

              <p className="hidden sm:block">
                Starting from the academic session 2000–2001, as per a government directive applicable to all technical
                institutions of the state, it was affiliated with the newly established U.P. Technical University,
                Lucknow (now AKTU) for all academic matters.
              </p>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: IMAGE WITH DOT GRID ACCENT (PROPERLY JUSTIFIED)
          ======================================================== */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center">

            {/* Decorative Dotted Grid Pattern (Top-Right, aligned with image) */}
            <div className="absolute -top-6 right-0 sm:-right-4 w-32 h-32 sm:w-48 sm:h-48 pointer-events-none opacity-30 z-0">
              <svg className="w-full h-full" fill="none">
                <pattern id="about-dot-grid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2.5" cy="2.5" r="2" fill="#6b7280" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#about-dot-grid)" />
              </svg>
            </div>

            {/* Offset White Frame & Shadowed Image Card */}
            <div className="relative z-10 w-full max-w-lg lg:max-w-none bg-white p-2 sm:p-3 border border-neutral-200/90 shadow-2xl">
              <img
                src={collegeImage}
                alt="Government College of Architecture, Lucknow"
                className="w-full h-[240px] sm:h-[420px] lg:h-[540px] object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
import { Link } from 'react-router-dom';
import { Compass, Building2, Trees, HardHat, Award, ArrowRight, Sparkles } from 'lucide-react';
import buildingPhoto from '@/assets/images/building.jpg';

export const AlumniLegacySection = ({ showTimelineAndImpact = false }) => {
  // Chronological timeline milestones from the brochure
  const milestones = [
    {
      year: '1911',
      title: 'Origins in Lucknow',
      desc: 'Started as an integral part of the Government College of Arts & Crafts, among the oldest in India.',
    },
    {
      year: '1976',
      title: 'Govt. School of Architecture',
      desc: 'Separated from Arts & Crafts to become an autonomous specialized architecture school.',
    },
    {
      year: '1980',
      title: 'GCA & Lucknow University',
      desc: 'Renamed Govt. College of Architecture (GCA Lucknow), constituent college of Lucknow University.',
    },
    {
      year: '1999',
      title: '5-Year B.Arch Program',
      desc: 'Conducted rigorous five-year Bachelor of Architecture degree producing pioneering graduates.',
    },
    {
      year: '2001',
      title: 'AKTU / UPTU Affiliation',
      desc: 'Affiliated with state technical university (now Faculty of Architecture & Planning, AKTU).',
    },
  ];

  // 4 Core Alumni impact disciplines from the brochure
  const impactFields = [
    {
      icon: <Compass className="w-6 h-6 text-red-600" />,
      title: 'Architecture & Design',
      desc: 'Designing landmark civic monuments, contemporary habitats, and cutting-edge commercial spaces.',
    },
    {
      icon: <Building2 className="w-6 h-6 text-red-600" />,
      title: 'Urban Planning',
      desc: 'Master-planning resilient urban environments, transportation corridors, and smart regional habitats.',
    },
    {
      icon: <Trees className="w-6 h-6 text-red-600" />,
      title: 'Sustainable Design',
      desc: 'Pioneering net-zero buildings, heritage conservation, and eco-friendly climate-responsive systems.',
    },
    {
      icon: <HardHat className="w-6 h-6 text-red-600" />,
      title: 'Construction & Innovation',
      desc: 'Leading mega-infrastructure construction, BIM integration, and global engineering consultancy.',
    },
  ];

  return (
    <section className="bg-white text-neutral-900 py-10 sm:py-20 relative overflow-hidden border-t border-b border-neutral-200">
      {/* Background Decorative Soft Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-amber-200/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 relative z-10">

        {/* ========================================================
            1. TOP: GCA ALUMNI ASSOCIATION HEADLINE & STAMP CARD
        ======================================================== */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
            showTimelineAndImpact ? 'mb-12 sm:mb-20' : ''
          }`}
        >

          {/* Left Column: Association Legacy Narrative */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Living Legacy of Excellence
            </div>

            {/* Heading + Subheading (gap reduced) */}
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight font-serif">
                GCA Alumni Association 
              </h2>

              <div className="h-1 w-16 sm:w-20 bg-red-600 rounded-full" />

              <h3 className="text-lg sm:text-2xl font-bold text-neutral-700">
                A Community Connected by a Shared Legacy & Global Footprint
              </h3>
            </div>

            <p className="text-neutral-700 text-xs sm:text-base leading-relaxed text-justify">
              The alumni of <strong className="text-neutral-900">Government College of Architecture, Lucknow</strong>{' '}
              (now <em>Faculty of Architecture & Planning, AKTU</em>) are the foundation of its rich legacy and
              continued excellence.
            </p>

            <p className="hidden sm:block text-neutral-600 text-sm sm:text-base leading-relaxed text-justify">
              Over the years, our alumni have become leaders, innovators, educators, and changemakers in the
              fields of architecture, urban planning, sustainable design, and construction. They have achieved
              remarkable milestones leaving their mark not just in India, but across the globe. Their journeys
              continue to inspire future generations of architects, planners, and innovators.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {!showTimelineAndImpact && (
                <Link
                  to="/about"
                  className="w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5"
                >
                  Explore Full History <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <Link
                to="/registration"
                className="w-full sm:w-auto text-center justify-center inline-flex items-center gap-2 border border-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 text-neutral-800 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all"
              >
                Join Alumni Directory
              </Link>
            </div>
          </div>

          {/* Right Column: Commemorative Stamp UI */}
          <div className="lg:col-span-5 flex justify-center pt-4 sm:pt-0">
            <div className="relative group w-full max-w-md">
              {/* Golden Seal Circle */}
              <div className="absolute -top-3 -left-3 sm:-top-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-400 shadow-xl flex items-center justify-center text-neutral-950 font-black text-xs uppercase tracking-tighter z-20 border-2 border-amber-300 rotate-[-12deg] group-hover:rotate-0 transition-transform">
                <span className="text-center font-bold text-[8px] sm:text-[10px] leading-tight">
                  SEAL OF<br />LEGACY
                </span>
              </div>

              {/* Postage Stamp Card */}
              <div className="bg-white text-neutral-900 p-4 sm:p-6 rounded-lg shadow-2xl border-4 border-dashed border-neutral-300 relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                {/* Stamp Header Strip */}
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white font-black text-[10px] sm:text-xs px-2 py-0.5 rounded tracking-wider">
                      POSTAGE
                    </span>
                    <span className="font-extrabold text-[10px] sm:text-xs tracking-widest text-neutral-800 uppercase">
                      GCAAA • 2026
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-neutral-500">
                    AKTU TAGORE MARG
                  </span>
                </div>

                {/* Stamp Visual Body */}
                <div className="grid grid-cols-12 gap-2.5 sm:gap-3 bg-neutral-50 border border-neutral-200 p-2.5 sm:p-3 rounded">
                  {/* Left Red Block */}
                  <div className="col-span-4 bg-red-700 text-white rounded p-2 sm:p-3 flex flex-col justify-between text-center shadow-inner">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none">26</span>
                    <div className="border-t border-red-500/60 pt-1 mt-1">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider block">BATCH</span>
                      <span className="text-[11px] sm:text-xs font-extrabold">2001</span>
                    </div>
                  </div>

                  {/* Right Image Colonnade */}
                  <div className="col-span-8 relative rounded overflow-hidden h-24 sm:h-28 border border-neutral-300">
                    <img
                      src={buildingPhoto}
                      alt="GCA Colonnade Corridor"
                      className="w-full h-full object-cover filter contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                      <span className="text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase">
                        Faculty of Architecture
                      </span>
                    </div>
                  </div>
                </div>

                {/* Postmark Circle & Stamp Details */}
                <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-neutral-900 leading-tight text-[11px] sm:text-xs">Silver Jubilee: Batch of 2001</p>
                    <p className="text-[10px] sm:text-[11px] text-neutral-500">Ruby Jubilee: Batch of 1986</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-red-600/40 flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-red-600 text-center leading-none rotate-12">
                    28 NOV<br />2026
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {showTimelineAndImpact && (
          <>
            {/* ========================================================
                2. CHRONOLOGICAL MILESTONES (1911 TO 2001)
            ======================================================== */}
            <div className="mb-12 sm:mb-20">
              <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 mb-1.5 sm:mb-2">
                  HISTORICAL TIMELINE
                </p>
                <h3 className="text-xl sm:text-3xl font-extrabold text-neutral-900">
                  The Evolution of Government College of Architecture
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm mt-2 sm:mt-3">
                  Tracing over a century of architectural education, constituent leadership, and state affiliation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
                {milestones.map((item, index) => (
                  <div
                    key={index}
                    className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 sm:p-5 hover:border-red-500/60 hover:bg-white hover:shadow-lg hover:shadow-red-100 transition-all hover:-translate-y-1 group relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-red-600 font-mono mb-1.5 group-hover:scale-105 transition-transform">
                        {item.year}
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-neutral-900 mb-1.5 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-neutral-600 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-neutral-200 text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                      Phase 0{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ========================================================
                3. 4 FIELDS OF IMPACT
            ======================================================== */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 mb-1.5 sm:mb-2">
                  GLOBAL FOOTPRINT & LEADERSHIP
                </p>
                <h3 className="text-xl sm:text-3xl font-extrabold text-neutral-900">
                  Shaping Cities & Civilizations Worldwide
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {impactFields.map((field, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-neutral-200 p-4 sm:p-6 rounded-xl hover:border-red-500/50 hover:shadow-xl hover:shadow-red-100/50 transition-all group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center mb-3.5 sm:mb-5 group-hover:bg-red-600 group-hover:border-red-600 group-hover:scale-110 transition-all">
                      <span className="group-hover:[&>svg]:text-white transition-colors [&>svg]:transition-colors">
                        {field.icon}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-neutral-900 mb-1.5 sm:mb-2">{field.title}</h4>
                    <p className="text-neutral-600 text-xs leading-relaxed">{field.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ========================================================
                4. BOTTOM SLOGAN RIBBON
            ======================================================== */}
            <div className="mt-10 sm:mt-16 py-3 sm:py-4 px-4 sm:px-6 bg-neutral-900 rounded-lg shadow-xl">
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-2.5 sm:gap-x-4 gap-y-1.5 text-xs sm:text-sm font-semibold tracking-wide text-neutral-300">
                <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" /> Connect
                </span>
                <span className="text-red-500 font-black">•</span>
                <span className="hover:text-white transition-colors">Collaborate</span>
                <span className="text-red-500 font-black">•</span>
                <span className="hover:text-white transition-colors">Share Experiences</span>
                <span className="text-red-500 font-black">•</span>
                <span className="text-white font-bold">Inspire Future Generations</span>
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  );
};
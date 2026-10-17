import { Link } from 'react-router-dom';
import { AboutSection } from '@/components/home/AboutSection';
import { AlumniLegacySection } from '@/components/home/AlumniLegacySection';
import { CheckCircle2, ShieldCheck, HeartHandshake, Globe } from 'lucide-react';
import { APP_NAME } from '@/utils/constants';
import aboutHeroImg from '@/assets/images/clg.png';

export const AboutPage = () => {
  const missionGoals = [
    {
      title: 'Global Alumni Connection',
      desc: 'Foster lifelong professional and personal bonds among alumni, faculty, and students across generations.',
      icon: <Globe className="w-5 h-5 text-red-500" />,
    },
    {
      title: 'Architectural Heritage',
      desc: 'Celebrate, archive, and promote the storied architectural legacy of Government College of Architecture Lucknow.',
      icon: <ShieldCheck className="w-5 h-5 text-red-500" />,
    },
    {
      title: 'Student Mentorship & Support',
      desc: 'Provide industry mentorship, research grants, scholarships, and career advancement to graduating architects.',
      icon: <HeartHandshake className="w-5 h-5 text-red-500" />,
    },
  ];

  return (
    <div className="w-full bg-neutral-950 text-white">
      {/* ========================================================
          1. SLEEK MINIMAL HERO BANNER
      ======================================================== */}
      <section className="relative overflow-hidden py-12 sm:py-16 flex items-center justify-center border-b border-neutral-300">
        {/* Background Campus Image */}
        <img
          src={aboutHeroImg}
          alt={`About ${APP_NAME}`}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />

        {/* Content: Title & Breadcrumb Only */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase font-serif drop-shadow-md">
            About {APP_NAME}
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-neutral-300 mt-2 font-semibold">
            <Link to="/" className="hover:text-red-400 transition-colors">
              HOME
            </Link>
            <span className="text-red-500 font-bold">—</span>
            <span className="text-amber-400">ABOUT US</span>
          </div>
        </div>
      </section>

      {/* 2. College Origins & Heritage Section */}
      <AboutSection />

      {/* 3. Alumni Association Brochure Timeline & Impact Section */}
      <AlumniLegacySection showTimelineAndImpact />

      {/* 4. Strategic Mission & Objectives Grid — WHITE SECTION */}
      <section className="w-full bg-white text-neutral-900 py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-2">
              VISION & CORE VALUES
            </p>
            <h2 className="text-3xl font-bold text-neutral-900">Our Enduring Mission</h2>
            <p className="text-neutral-600 text-sm mt-3">
              Guiding principles that drive the alumni community towards sustainable innovation and social responsibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionGoals.map((goal, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 border border-neutral-200 p-8 rounded-xl hover:border-red-600/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-white border border-neutral-200 flex items-center justify-center mb-6 group-hover:border-red-600/60 group-hover:scale-105 transition-all">
                  {goal.icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{goal.title}</h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
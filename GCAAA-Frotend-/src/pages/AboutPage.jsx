import { AboutSection } from '@/components/home/AboutSection';
import { AlumniLegacySection } from '@/components/home/AlumniLegacySection';
import { CheckCircle2, ShieldCheck, HeartHandshake, Globe } from 'lucide-react';
import { APP_NAME } from '@/utils/constants';

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
      {/* 1. Page Header Banner */}
      <div className="relative py-16 sm:py-20 text-center border-b border-neutral-900 bg-black/60 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-red-500 mb-3">
          Our Heritage & Community
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
          About {APP_NAME}
        </h1>
        <p className="mt-4 text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto px-4">
          Dedicated to upholding the values, century-long legacy, and global impact of Government College of Architecture.
        </p>
      </div>

      {/* 2. College Origins & Heritage Section */}
      <AboutSection />

      {/* 3. Alumni Association Brochure Timeline & Impact Section */}
      <AlumniLegacySection showTimelineAndImpact />

      {/* 4. Strategic Mission & Objectives Grid — WHITE SECTION */}
      <section className="w-full bg-white text-neutral-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
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
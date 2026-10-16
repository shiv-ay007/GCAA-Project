import { useParams } from 'react-router-dom';
import { WelcomeMessagesSection } from '@/components/home/WelcomeMessagesSection';
import { ExecutiveCommitteeSection } from '@/components/home/ExecutiveCommitteeSection';
import { HeritageCtaSection } from '@/components/common/HeritageCtaSection';

const SECTION_META = {
  'office-bearers': {
    title: 'Office Bearers',
    subtitle: 'Meet the elected office bearers leading the GCAAA fraternity.',
  },
  'executive-members': {
    title: 'Executive Members',
    subtitle: 'Meet the dedicated executive members driving the GCAAA fraternity.',
  },
  convenor: {
    title: 'Convenor',
    subtitle: 'Meet the convenors coordinating GCAAA initiatives and events.',
  },
};

export const CommitteePage = () => {
  const { section } = useParams();
  const meta = SECTION_META[section] || {
    title: 'Team & Executive Committee',
    subtitle: 'Meet the office bearers, leadership patrons, and executive members driving the GCAAA fraternity.',
  };

  return (
    <div className="w-full bg-white">
      <div className="py-14 sm:py-16 bg-neutral-950 text-white text-center border-b border-neutral-900">
        <p className="text-xs uppercase font-bold tracking-[0.2em] text-[#B70D2B] mb-2">Team GCAAA</p>
        <h1 className="text-4xl sm:text-5xl font-black">{meta.title}</h1>
        <p className="text-sm text-neutral-400 mt-3 max-w-xl mx-auto px-4">
          {meta.subtitle}
        </p>
      </div>
      {!section && <WelcomeMessagesSection />}
      <ExecutiveCommitteeSection activeSection={section} />
      <HeritageCtaSection />
    </div>
  );
};



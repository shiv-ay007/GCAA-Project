import { Link } from 'react-router-dom';
import { Quote, ArrowRight } from 'lucide-react';
import p1 from '@/assets/images/p-1.png';
import p2 from '@/assets/images/p-2.png';
import p3 from '@/assets/images/p-3.png';

export const WelcomeMessagesSection = () => {
  const messages = [
    {
      name: 'Dr. Vandana Sehgal',
      title: 'Principal And Dean, FOAP-AKTU',
      image: p1,
      roleBadge: 'Patron',
      quote:
        'I take great pride that, our Institute continues to grow steadily in student enrolment, faculty strength, academic excellence, campus-facilitated learning, and institutional resources. We take pride in our achievements and remain steadfast in our vision for the future.\n\nI invite our alumni, students, faculty & industry partners to join hands as we move together towards a brighter and more promising future.',
    },
    {
      name: 'Ar. Anupam Mittal',
      title: 'President, GCAAA',
      image: p2,
      roleBadge: 'President',
      quote:
        "Since it's formation in 2013, GCAAA has grown into a vibrant alumni community, earning recognition, creating meaningful impact and proudly carrying forward the legacy of our alma mater beyond architecture.\n\nDharohar 2026 celebrates this journey and the bond that unites us. I warmly invite all our alumni to join the celebration and make this occasion truly memorable.",
    },
    {
      name: 'Ar. Vishal Gulati',
      title: 'General Secretary, GCAAA',
      image: p3,
      roleBadge: 'General Secretary',
      quote:
        'Our alumni are our extended family and our strategic strength for networking and expanding horizons within India and abroad. In recent years, our North, West, South, and Overseas chapters of the alumni network have been actively coming together to provide strength to our GCAAA family.\n\nWe take pride in our annual GBMs and welcome you all for this fun-filled event to connect with each other.',
    },
  ];

  return (
    <section className="bg-neutral-50 text-neutral-900 pt-8 sm:pt-12 pb-12 sm:pb-24 border-b border-neutral-200">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-14">

        {/* Section Header */}
        <div className="mb-8 sm:mb-14 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#B70D2B] mb-1.5 sm:mb-2">
            Leadership &amp; Vision
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight">
            OUR <span className="text-[#B70D2B]">PATRON</span>
          </h2>
          <div className="mt-2.5 sm:mt-3.5 h-1 w-16 bg-[#B70D2B] mx-auto mb-3 sm:mb-4" />
          <p className="text-xs sm:text-base text-neutral-600">
            Inspiring words from our Dean, President, and General Secretary welcoming the alumni fraternity to Dharohar 2026.
          </p>
        </div>

        {/* 3 Leadership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {messages.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <div className="absolute top-5 sm:top-6 right-5 sm:right-6 text-neutral-200 group-hover:text-red-100 transition-colors pointer-events-none">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <div>
                {/* Profile Avatar & Header */}
                <div className="flex items-center gap-3.5 sm:gap-5 mb-4 sm:mb-6">
                  <div className="relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#B70D2B] p-0.5 sm:p-1 shadow-lg"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-[#B70D2B] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter shadow">
                      {item.roleBadge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">{item.name}</h3>
                    <p className="text-xs font-semibold text-[#B70D2B] mt-0.5 sm:mt-1">{item.title}</p>
                  </div>
                </div>

                {/* Message Quote */}
                <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm leading-relaxed text-neutral-600 border-t border-neutral-100 pt-4 sm:pt-5">
                  {item.quote.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx} className={`text-justify ${pIdx > 0 ? 'hidden sm:block' : ''}`}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Bottom Card Accent */}
              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
                <span>DHAROHAR 2026</span>
                <span className="text-[#B70D2B] font-bold">GCAAA Family</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            to="/committee"
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white border border-neutral-300 hover:border-neutral-900 px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-wider rounded shadow-sm hover:shadow transition-all group"
          >
            <span>View Executive Committee &amp; Office Bearers</span>
            <ArrowRight className="w-4 h-4 text-[#B70D2B] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
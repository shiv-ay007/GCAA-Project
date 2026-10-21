import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Megaphone,
  ArrowRight,
  Calendar,
  X,
  FileText,
  CheckCircle2,
  Play,
  Pause,
  Vote,
  CalendarDays,
  Gavel,
} from 'lucide-react';
import electionBannerImg from '@/assets/images/election_notice_banner.png';

export const NoticesSection = () => {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isCircularsPaused, setIsCircularsPaused] = useState(false);
  const [isAnnouncementsPaused, setIsAnnouncementsPaused] = useState(false);

  const circularNotices = [
    {
      id: 'c-election',
      title: 'GCAAA Election Notice: Official Schedule for Executive Committee Elections 2026',
      date: 'Oct 21, 2026',
      badge: 'Elections 2026',
      category: 'Official Circular',
      description:
        'The Election Committee hereby announces the schedule for the GCAAA Elections 2026. All members are requested to participate actively and uphold the spirit of fairness, mutual respect and unity throughout the election process.',
      issuedBy: 'Election Committee • 2026, GCAAA',
      isElection: true,
    },
    {
      id: 'c1',
      title: 'Notice for Annual General Body Meeting (GBM) 2026 at FOAP Lucknow',
      date: 'Oct 11, 2026',
      badge: 'Important',
      category: 'Official Notice',
      description:
        'The Annual General Body Meeting (GBM) of the Government College of Architecture Alumni Association will be held on 28th November 2026 at 11:30 AM in the Main Auditorium, FOAP Campus, Tagore Marg, Lucknow. All registered life members are requested to attend.',
      issuedBy: 'Hony. Secretary, GCAAA Lucknow',
    },
    {
      id: 'c2',
      title: 'Notification for GCAAA Executive Committee Nominations 2026-2028',
      date: 'Oct 04, 2026',
      badge: 'Elections',
      category: 'Official Notice',
      description:
        'Nominations are invited from eligible alumni for election to various positions in the Executive Committee (President, Vice President, General Secretary, Joint Secretary, and Executive Members) for the term 2026–2028.',
      issuedBy: 'Election Officer, GCAAA',
    },
    {
      id: 'c3',
      title: 'Call for Nominations: Distinguished Alumni Achiever Awards 2026',
      date: 'Sep 28, 2026',
      badge: 'Awards',
      category: 'Official Notice',
      description:
        'GCAAA invites nominations to honor alumni who have made exemplary contributions to sustainable architecture, urban design, architectural education, and public service.',
      issuedBy: 'Awards Committee, GCAAA',
    },
    {
      id: 'c4',
      title: 'Submission of Batch Memorabilia & Photos for Dharohar 2026 Souvenir',
      date: 'Sep 22, 2026',
      badge: 'Archive',
      category: 'Official Notice',
      description:
        'Alumni are invited to submit vintage campus photographs, studio sketches, batch reunion pictures, and memoirs for inclusion in the official commemorative coffee-table book.',
      issuedBy: 'Editorial Board, GCAAA',
    },
    {
      id: 'c5',
      title: 'Verification of Alumni Electoral Rolls & Life Membership Roster',
      date: 'Sep 15, 2026',
      badge: 'Membership',
      category: 'Official Notice',
      description:
        'All alumni are advised to verify and update their contact details, batch year, and current postal address in the official GCAAA database before the publication of the 2026 election roll.',
      issuedBy: 'Registrar & Membership Bureau, GCAAA',
    },
    {
      id: 'c6',
      title: 'Establishment of FOAP-AKTU Heritage Architecture Preservation Cell',
      date: 'Sep 08, 2026',
      badge: 'Academic',
      category: 'Official Notice',
      description:
        'In collaboration with GCAAA, a dedicated cell has been constituted to archive Avadh heritage architecture drawings, historic building surveys, and student documentation projects.',
      issuedBy: 'Dean & Patron, FOAP-AKTU',
    },
  ];

  const announcements = [
    {
      id: 'a-election',
      title: 'Official Election Notice & Schedule: Filing of Nominations (22–25 October 2026)',
      date: 'Oct 21, 2026',
      badge: 'Elections 2026',
      category: 'Announcement',
      description:
        'Announcement of GCAAA Elections 2026 timeline: Filing of nominations will take place from 22 to 25 October 2026, followed by voting on 1 November 2026 and results declaration on 2 November 2026.',
      issuedBy: 'Election Committee • 2026, GCAAA',
      isElection: true,
    },
    {
      id: 'a1',
      title: 'DHAROHAR 2026: Silver (Batch 2001) & Ruby Jubilee (Batch 1986) Registration Open',
      date: 'Oct 10, 2026',
      badge: 'Flagship Meet',
      category: 'Announcement',
      description:
        'Early-bird RSVP and registrations are now open for the grand reunion. Batches celebrating their 40th Anniversary (1986) and 25th Anniversary (2001) will receive special batch mementos and dais honors.',
      issuedBy: 'Organizing Committee, Dharohar 2026',
    },
    {
      id: 'a2',
      title: 'Architectural Heritage Conservation Workshop by Eminent Alumni Practitioners',
      date: 'Oct 01, 2026',
      badge: 'Workshop',
      category: 'Announcement',
      description:
        'A half-day hands-on masterclass on reviving historic Avadh architecture, brick lime masonry, and urban conservation will precede the evening conclave on campus.',
      issuedBy: 'Academic Council, FOAP AKTU',
    },
    {
      id: 'a3',
      title: 'Publication of GCAAA Annual Architectural Journal & Directory 2026',
      date: 'Sep 25, 2026',
      badge: 'Directory',
      category: 'Announcement',
      description:
        'The updated Alumni Directory with contacts of over 15,000 alumni across India and abroad is ready for print. Please update your current firm details and contact information.',
      issuedBy: 'Publications Bureau, GCAAA',
    },
    {
      id: 'a4',
      title: 'Student Mentorship Circle: Portfolio Review Sessions with Senior Architects',
      date: 'Sep 18, 2026',
      badge: 'Mentorship',
      category: 'Announcement',
      description:
        'Connecting final year B.Arch students with practicing alumni for one-on-one portfolio critiques, thesis mentorship, and professional career guidance.',
      issuedBy: 'Student Welfare & Mentorship Wing',
    },
    {
      id: 'a5',
      title: 'National Design Competition: Innovative Sustainable Interventions for Campus',
      date: 'Sep 11, 2026',
      badge: 'Competition',
      category: 'Announcement',
      description:
        'Calling young alumni practitioners and current scholars to submit climate-responsive landscape and courtyard design solutions for the historic campus.',
      issuedBy: 'Design Advisory Panel, GCAAA',
    },
    {
      id: 'a6',
      title: 'Commemorative Coffee-Table Monograph: A Century of Architecture in Lucknow',
      date: 'Sep 03, 2026',
      badge: 'Souvenir',
      category: 'Announcement',
      description:
        'Pre-order the limited-edition hardbound souvenir documenting the 115-year history from Government College of Arts & Crafts (1911) to FOAP AKTU.',
      issuedBy: 'Editorial Bureau, Dharohar 2026',
    },
  ];

  return (
    <section className="w-full bg-neutral-100 text-neutral-900 py-10 sm:py-16 md:py-20 border-b border-neutral-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14">
        {/* ========================================================
            SECTION HEADER
        ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-100 border border-red-300 text-red-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Bell className="w-3.5 h-3.5 text-red-600" />
            <span>Official Notices &amp; Announcements</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight uppercase">
            CIRCULARS &amp; <span className="text-red-600">ANNOUNCEMENTS</span>
          </h2>

          <div className="flex items-center justify-center gap-3 my-3">
            <div className="h-0.5 w-12 bg-red-600" />
            <div className="w-2 h-2 rounded-full bg-neutral-800" />
            <div className="h-0.5 w-12 bg-red-600" />
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Stay updated with official association notifications, upcoming conclaves, election
            circulars, and institutional honors.
          </p>
        </div>

        {/* ========================================================
            TWO COLUMN DISPLAY: CIRCULARS & ANNOUNCEMENTS
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* CARD 1: OFFICIAL CIRCULARS & NOTICES */}
          <div className="flex flex-col bg-white rounded-2xl shadow-xl shadow-neutral-300/40 border border-neutral-200 overflow-hidden hover:shadow-2xl transition-all">
            {/* Solid Red Header Cap with Rounded Top */}
            <div className="bg-[#B70D2B] text-white py-3.5 sm:py-4 px-4 sm:px-6 flex items-center justify-between">
              <h3 className="text-base sm:text-lg lg:text-xl font-extrabold tracking-wide uppercase flex items-center gap-2">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                <span>Official Circulars &amp; Notices</span>
              </h3>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold bg-black/25 text-white/95 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCircularsPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
                    }`}
                  />
                  {isCircularsPaused ? 'Paused' : 'Auto Scroll'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsCircularsPaused(!isCircularsPaused)}
                  title={isCircularsPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                  className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
                  aria-label="Toggle auto scroll"
                >
                  {isCircularsPaused ? (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  )}
                </button>
              </div>
            </div>

            {/* Circular Items List - Auto Scrolling Box */}
            <div className="p-4 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
              {/* Helper Bar */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2.5 border-b border-neutral-100 mb-3">
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                  {circularNotices.length} Live Circulars
                </span>
              </div>

              {/* Vertical Marquee Window (Bottom-to-Top) */}
              <div
                className="relative h-[340px] sm:h-[370px] overflow-hidden marquee-vertical-container"
                onTouchStart={() => setIsCircularsPaused(true)}
                onTouchEnd={() => setIsCircularsPaused(false)}
              >
                {/* Top Subtle Gradient Fade */}
                <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />

                {/* Bottom Subtle Gradient Fade */}
                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />

                {/* Infinite Scrolling Track */}
                <div
                  className="animate-marquee-vertical space-y-3.5 py-1"
                  style={{ animationPlayState: isCircularsPaused ? 'paused' : undefined }}
                >
                  {[...circularNotices, ...circularNotices].map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      onClick={() => setSelectedNotice(item)}
                      className={`group/item cursor-pointer border-b border-neutral-100 pb-3 -mx-1 sm:-mx-2 px-2.5 py-2 rounded-lg transition-all border ${
                        item.isElection
                          ? 'bg-amber-50/70 border-amber-300 hover:bg-amber-100/80 shadow-2xs'
                          : 'hover:bg-red-50/70 border-transparent hover:border-red-200'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`font-bold transition-colors mt-0.5 shrink-0 ${
                            item.isElection
                              ? 'text-amber-700'
                              : 'text-neutral-400 group-hover/item:text-red-600'
                          }`}
                        >
                          &rarr;
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                                item.isElection
                                  ? 'text-amber-900 bg-amber-200/80 border-amber-400'
                                  : 'text-red-600 bg-red-50 border-red-200'
                              }`}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <h4
                            className={`text-xs sm:text-sm font-bold transition-colors leading-snug line-clamp-2 ${
                              item.isElection
                                ? 'text-neutral-900 group-hover/item:text-[#8B0000]'
                                : 'text-neutral-800 group-hover/item:text-red-600'
                            }`}
                          >
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-neutral-400 italic mt-1 flex items-center gap-1 font-medium">
                            <Calendar className="w-3 h-3 text-neutral-400" />
                            <span>{item.date}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Read More Button */}
              <div className="pt-4 sm:pt-5 mt-2 border-t border-neutral-100">
                <Link
                  to="/events"
                  className="w-full justify-center sm:w-auto inline-flex items-center gap-2 px-6 py-2.5 bg-[#B70D2B] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md shadow-red-600/30 transition-all cursor-pointer"
                >
                  <span>View All Circulars</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* CARD 2: ALUMNI ANNOUNCEMENTS */}
          <div className="flex flex-col bg-white rounded-2xl shadow-xl shadow-neutral-300/40 border border-neutral-200 overflow-hidden hover:shadow-2xl transition-all">
            {/* Solid Red Header Cap with Rounded Top */}
            <div className="bg-[#B70D2B] text-white py-3.5 sm:py-4 px-4 sm:px-6 flex items-center justify-between">
              <h3 className="text-base sm:text-lg lg:text-xl font-extrabold tracking-wide uppercase flex items-center gap-2">
                <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                <span>Alumni Announcements</span>
              </h3>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold bg-black/25 text-white/95 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isAnnouncementsPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
                    }`}
                  />
                  {isAnnouncementsPaused ? 'Paused' : 'Auto Scroll'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsAnnouncementsPaused(!isAnnouncementsPaused)}
                  title={isAnnouncementsPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                  className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
                  aria-label="Toggle auto scroll"
                >
                  {isAnnouncementsPaused ? (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  )}
                </button>
              </div>
            </div>

            {/* Announcement Items List - Auto Scrolling Box */}
            <div className="p-4 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
              {/* Helper Bar */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2.5 border-b border-neutral-100 mb-3">
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                  {announcements.length} Announcements
                </span>
              </div>

              {/* Vertical Marquee Window (Bottom-to-Top) */}
              <div
                className="relative h-[340px] sm:h-[370px] overflow-hidden marquee-vertical-container"
                onTouchStart={() => setIsAnnouncementsPaused(true)}
                onTouchEnd={() => setIsAnnouncementsPaused(false)}
              >
                {/* Top Subtle Gradient Fade */}
                <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />

                {/* Bottom Subtle Gradient Fade */}
                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />

                {/* Infinite Scrolling Track */}
                <div
                  className="animate-marquee-vertical space-y-3.5 py-1"
                  style={{ animationPlayState: isAnnouncementsPaused ? 'paused' : undefined }}
                >
                  {[...announcements, ...announcements].map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      onClick={() => setSelectedNotice(item)}
                      className={`group/item cursor-pointer border-b border-neutral-100 pb-3 -mx-1 sm:-mx-2 px-2.5 py-2 rounded-lg transition-all border ${
                        item.isElection
                          ? 'bg-amber-50/70 border-amber-300 hover:bg-amber-100/80 shadow-2xs'
                          : 'hover:bg-red-50/70 border-transparent hover:border-red-200'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`font-bold transition-colors mt-0.5 shrink-0 ${
                            item.isElection
                              ? 'text-amber-700'
                              : 'text-neutral-400 group-hover/item:text-red-600'
                          }`}
                        >
                          &rarr;
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                                item.isElection
                                  ? 'text-amber-900 bg-amber-200/80 border-amber-400'
                                  : 'text-red-600 bg-red-50 border-red-200'
                              }`}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <h4
                            className={`text-xs sm:text-sm font-bold transition-colors leading-snug line-clamp-2 ${
                              item.isElection
                                ? 'text-neutral-900 group-hover/item:text-[#8B0000]'
                                : 'text-neutral-800 group-hover/item:text-red-600'
                            }`}
                          >
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-neutral-400 italic mt-1 flex items-center gap-1 font-medium">
                            <Calendar className="w-3 h-3 text-neutral-400" />
                            <span>{item.date}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Read More Button */}
              <div className="pt-4 sm:pt-5 mt-2 border-t border-neutral-100">
                <Link
                  to="/events"
                  className="w-full justify-center sm:w-auto inline-flex items-center gap-2 px-6 py-2.5 bg-[#B70D2B] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md shadow-red-600/30 transition-all cursor-pointer"
                >
                  <span>View All Announcements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          INTERACTIVE FULL NOTICE MODAL
      ======================================================== */}
      {selectedNotice && (
        <div
          onClick={() => setSelectedNotice(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-neutral-200 relative overflow-hidden max-h-[92vh] overflow-y-auto"
          >
            {/* Top Bar with Badge & Close */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-neutral-200">
              <span
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                  selectedNotice.isElection
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {selectedNotice.badge} &bull; {selectedNotice.category}
              </span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notice Title & Metadata */}
            <div className="mt-3 sm:mt-4">
              <h3 className="text-base sm:text-xl font-black text-neutral-900 leading-snug">
                {selectedNotice.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-500 mt-1 flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-red-600" />
                <span>Date of Release: {selectedNotice.date}</span>
              </p>
            </div>

            {/* If Election Notice: Show Banner Graphic & Schedule Table & Code of Conduct */}
            {selectedNotice.isElection ? (
              <div className="mt-4 space-y-4">
                {/* Official Banner Image Preview */}
                <div className="rounded-xl border border-amber-200 bg-white overflow-hidden shadow-2xs p-2">
                  <img
                    src={electionBannerImg}
                    alt="GCAAA Election Notice 2026"
                    className="w-full h-auto max-h-[320px] object-contain mx-auto"
                  />
                </div>

                {/* Introduction */}
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  <p>{selectedNotice.description}</p>
                </div>

                {/* Schedule Table */}
                <div className="rounded-xl border border-neutral-300 overflow-hidden shadow-2xs">
                  <div className="bg-[#142A4A] text-white py-2 px-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-amber-400" />
                    <span>Official Election Schedule 2026</span>
                  </div>
                  <table className="w-full text-xs sm:text-sm border-collapse text-left">
                    <thead>
                      <tr className="bg-neutral-100 text-neutral-700 border-b border-neutral-300">
                        <th className="py-2 px-3 font-bold border-r border-neutral-300 w-2/5">
                          Date / Timeline
                        </th>
                        <th className="py-2 px-3 font-bold">Election Event &amp; Activity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      <tr className="bg-white">
                        <td className="py-2 px-3 font-bold text-neutral-900 border-r border-neutral-200">
                          21 October 2026
                        </td>
                        <td className="py-2 px-3 text-neutral-800">Declaration of Election</td>
                      </tr>
                      <tr className="bg-[#F8FAFC]">
                        <td className="py-2 px-3 font-bold text-neutral-900 border-r border-neutral-200">
                          22&ndash;25 October 2026
                        </td>
                        <td className="py-2 px-3 font-bold text-[#8B0000]">
                          Filing of Nominations (4 days)
                        </td>
                      </tr>
                      <tr className="bg-white">
                        <td className="py-2 px-3 font-bold text-neutral-900 border-r border-neutral-200">
                          26&ndash;27 October 2026
                        </td>
                        <td className="py-2 px-3 text-neutral-800">
                          Withdrawal of Nominations (2 days)
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]">
                        <td className="py-2 px-3 font-bold text-neutral-900 border-r border-neutral-200">
                          28 October 2026
                        </td>
                        <td className="py-2 px-3 text-neutral-800">
                          Declaration of Final Candidate List
                        </td>
                      </tr>
                      <tr className="bg-white">
                        <td className="py-2 px-3 font-bold text-neutral-900 border-r border-neutral-200">
                          29&ndash;31 October 2026
                        </td>
                        <td className="py-2 px-3 text-neutral-800">Canvassing (3 days)</td>
                      </tr>
                      <tr className="bg-[#F8FAFC]">
                        <td className="py-2 px-3 font-bold text-neutral-900 border-r border-neutral-200">
                          1 November 2026
                        </td>
                        <td className="py-2 px-3 font-bold text-emerald-800">Voting</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="py-2 px-3 font-bold text-neutral-900 border-r border-neutral-200">
                          2 November 2026
                        </td>
                        <td className="py-2 px-3 text-neutral-800">
                          Counting of Votes and Declaration of Results
                        </td>
                      </tr>
                      <tr className="bg-[#F8FAFC]">
                        <td className="py-2 px-3 font-bold text-neutral-900 border-r border-neutral-200">
                          5 November 2026
                        </td>
                        <td className="py-2 px-3 text-neutral-800">
                          First AGM of the Newly Elected Executive Body
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Code of Conduct */}
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-xs text-neutral-700 leading-relaxed">
                  <span className="font-bold text-[#C4973B] uppercase tracking-wider block mb-1">
                    Code of Conduct:
                  </span>
                  Members are requested to refrain from campaigning on the official GCAAA community
                  group. All election-related activities should be conducted in a healthy, cordial
                  and respectful environment. Let us preserve the harmony, dignity and integrity of
                  our association and ensure a fair and transparent election process.
                </div>
              </div>
            ) : (
              /* Standard Notice Description Body */
              <div className="mt-3 sm:mt-4 p-3.5 sm:p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                <p>{selectedNotice.description}</p>
              </div>
            )}

            {/* Issuing Authority */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 sm:pt-4 border-t border-neutral-100 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5 font-semibold text-neutral-800">
                <FileText className="w-4 h-4 text-red-600" />
                {selectedNotice.issuedBy}
              </span>
              <span className="text-[10px] sm:text-[11px] text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Official Notification
              </span>
            </div>

            {/* Modal Actions */}
            <div className="mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
              <button
                onClick={() => setSelectedNotice(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg transition-colors text-center cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

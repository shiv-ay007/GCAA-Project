import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Award, ArrowRight, CheckCircle2, Ticket, Sparkles } from 'lucide-react';

export const EventSection = () => {
  // Live Countdown calculation to November 28, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-11-28T10:00:00').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scheduleItems = [
    { time: '10:00 AM', title: 'Registration & Welcome Tea', desc: 'Badge collection & morning networking' },
    { time: '11:30 AM', title: 'Annual GBM Proceedings', desc: 'Association updates & key addresses' },
    { time: '01:30 PM', title: 'Fellowship Lunch', desc: 'Inter-batch networking across faculty & alumni' },
    { time: '03:30 PM', title: 'Jubilee Batch Felicitation', desc: 'Honoring Batch 2001 (25 Yrs) & 1986 (40 Yrs)' },
    { time: '06:00 PM', title: 'Cultural Night & Dinner', desc: 'Musical evening, memories & gala dinner' },
  ];

  return (
    <section
      id="events"
      className="bg-white text-neutral-900 py-10 sm:py-16 border-b border-neutral-200 antialiased"
      style={{ fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif' }}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-14">

        {/* ========================================================
            1. SECTION HEADER
        ======================================================== */}
        <div className="mb-6 sm:mb-8 max-w-3xl">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#B70D2B] mb-1.5">
            Flagship Gathering · 2026
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight tracking-tight">
            Alumni GBM &amp; <span className="text-[#B70D2B]">Dharohar 2026</span>
          </h2>
          <div className="mt-2.5 h-1 w-14 bg-[#B70D2B]" />
        </div>

        {/* ========================================================
            2. EVENT HERO CARD & LIVE COUNTDOWN (BLACK & RED THEME)
        ======================================================== */}
        <div className="bg-neutral-950 text-white rounded-xl p-4 sm:p-8 mb-8 sm:mb-10 shadow-2xl border border-neutral-800 relative overflow-hidden">
          {/* Subtle Red Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            {/* Left: Event Spotlight Headline & Milestones */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-red-950/80 border border-red-800/80 text-red-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Mark Your Calendars
              </div>

              <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                Celebrate Milestone Jubilees at Your Alma Mater
              </h3>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Join alumni and faculty on <strong>November 28, 2026</strong> to celebrate the
                <strong> Ruby Jubilee (1986)</strong> &amp; <strong>Silver Jubilee (2001)</strong> at FOAP Lucknow.
              </p>

              {/* Event Location & Date Chips */}
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] sm:text-xs font-semibold text-neutral-300">
                <span className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2.5 sm:px-3 py-1.5 rounded">
                  <Calendar className="w-3.5 h-3.5 text-red-500" /> 28th Nov 2026
                </span>
                <span className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2.5 sm:px-3 py-1.5 rounded">
                  <MapPin className="w-3.5 h-3.5 text-red-500" /> FOAP, AKTU, Lucknow
                </span>
                <span className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2.5 sm:px-3 py-1.5 rounded">
                  <Clock className="w-3.5 h-3.5 text-red-500" /> 10:00 AM Onwards
                </span>
              </div>
            </div>

            {/* Right: Live Countdown Clock & RSVP */}
            <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 p-4 sm:p-6 rounded-xl shadow-xl flex flex-col justify-between">
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-neutral-400 text-center mb-2.5 sm:mb-3">
                Countdown to Event Day
              </p>

              {/* Countdown Numbers */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center mb-3.5 sm:mb-4">
                <div className="bg-black/80 border border-neutral-800 py-2 sm:py-2.5 px-0.5 sm:px-1 rounded-lg">
                  <span className="block text-lg sm:text-2xl font-extrabold text-white font-mono tabular-nums">{timeLeft.days}</span>
                  <span className="text-[8px] sm:text-[9px] uppercase font-bold text-neutral-400">Days</span>
                </div>
                <div className="bg-black/80 border border-neutral-800 py-2 sm:py-2.5 px-0.5 sm:px-1 rounded-lg">
                  <span className="block text-lg sm:text-2xl font-extrabold text-white font-mono tabular-nums">{timeLeft.hours}</span>
                  <span className="text-[8px] sm:text-[9px] uppercase font-bold text-neutral-400">Hours</span>
                </div>
                <div className="bg-black/80 border border-neutral-800 py-2 sm:py-2.5 px-0.5 sm:px-1 rounded-lg">
                  <span className="block text-lg sm:text-2xl font-extrabold text-white font-mono tabular-nums">{timeLeft.minutes}</span>
                  <span className="text-[8px] sm:text-[9px] uppercase font-bold text-neutral-400">Mins</span>
                </div>
                <div className="bg-black/80 border border-neutral-800 py-2 sm:py-2.5 px-0.5 sm:px-1 rounded-lg">
                  <span className="block text-lg sm:text-2xl font-extrabold text-red-500 font-mono tabular-nums">{timeLeft.seconds}</span>
                  <span className="text-[8px] sm:text-[9px] uppercase font-bold text-neutral-400">Secs</span>
                </div>
              </div>

              {/* RSVP Direct Button */}
              <Link
                to="/contact"
                className="w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" /> Register &amp; Reserve Your Seat
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. TWO CARDS: JUBILEE SPOTLIGHT (LEFT) & SCHEDULE (RIGHT)
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">

          {/* LEFT: JUBILEE HONORS */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Award className="w-4 h-4 text-[#B70D2B]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#B70D2B]">
                  Landmark Cohorts
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                Milestone Jubilees in Focus
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Special stage recognition and felicitation honors for landmark anniversary batches.
              </p>
            </div>

            {/* Ruby Jubilee Card — red border */}
            <div className="bg-white border-2 border-[#B70D2B] hover:border-red-700 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-red-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  40th Anniversary
                </span>
                <span className="bg-[#B70D2B] text-white text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs tracking-wider">
                  BATCH 1986
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-red-700 transition-colors tracking-tight">
                Ruby Jubilee Batch
              </h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Honoring 40 years of pioneering architectural leadership, campus mentorship, and landmark urban projects built across India.
              </p>
            </div>

            {/* Silver Jubilee Card — red border (was amber) */}
            <div className="bg-white border-2 border-[#B70D2B] hover:border-red-700 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-red-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  25th Anniversary
                </span>
                <span className="bg-[#B70D2B] text-white text-[10px] sm:text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs tracking-wider">
                  BATCH 2001
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-red-700 transition-colors tracking-tight">
                Silver Jubilee Batch
              </h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Celebrating 25 years of design innovation, global practice, and lifelong brotherhood rooted in the halls of FOAP Lucknow.
              </p>
            </div>

            {/* Felicitation Memento Note */}
            <div className="bg-neutral-950 text-white rounded-2xl p-3.5 sm:p-4 border border-neutral-800 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-950/80 border border-red-800/80 text-red-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-300 leading-snug">
                Attending alumni of both jubilee cohorts will receive personalized <strong className="text-white font-semibold">Commemorative Jubilee Medallions</strong> on stage.
              </p>
            </div>
          </div>

          {/* RIGHT: TENTATIVE DAY SCHEDULE / ITINERARY */}
          <div className="lg:col-span-7 bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-7 shadow-xs flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-4 mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight">
                  Event Day Itinerary
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#B70D2B]" />
                  <span>Saturday, 28 November 2026 · FOAP Campus, Tagore Marg</span>
                </p>
              </div>
              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#B70D2B] text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" /> Full Day Conclave
              </span>
            </div>

            <div className="space-y-3">
              {scheduleItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/80 hover:bg-white hover:border-[#B70D2B]/40 hover:shadow-sm transition-all group"
                >
                  {/* Time badge — RED */}
                  <span className="w-24 sm:w-28 py-1.5 px-2 rounded-lg bg-[#B70D2B] text-white text-[11px] font-mono font-bold text-center shrink-0 shadow-sm group-hover:bg-red-700 transition-colors tabular-nums">
                    {item.time}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-[#B70D2B] transition-colors leading-snug">
                      {item.title}
                    </h5>
                    <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
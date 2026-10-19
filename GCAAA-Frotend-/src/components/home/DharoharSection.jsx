import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Sparkles,
  Download,
} from "lucide-react";
import dharoharImg from "@/assets/images/dharohar_2026_campus.jpg";

export const DharoharSection = () => {
  return (
    <section
      id="dharohar"
      className="bg-white text-neutral-900 py-12 sm:py-16 lg:py-22 border-b border-neutral-200"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-14">
        {/* ========================================================
            1. MAIN SECTION HEADING AT THE TOP
        ======================================================== */}
        <div className="mb-8 sm:mb-12 max-w-4xl">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#B70D2B] mb-1.5 sm:mb-2">
            GCA Alumni Meet · DHAROHAR · 2026
          </p>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight">
            DHAROHAR{" "}
            <span className="text-[#B70D2B] font-serif font-black">
              धरोहर 2026
            </span>
          </h2>

          <div className="mt-2.5 sm:mt-3.5 h-1 w-16 bg-[#B70D2B]" />
        </div>

        {/* ========================================================
            2. BALANCED TWO-COLUMN LAYOUT (EQUAL HEIGHT ALIGNMENT)
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch">
          {/* LEFT COLUMN: DHAROHAR PHOTO + SHIFTED EVENT HIGHLIGHTS & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-hidden border border-neutral-200 shadow-lg rounded-lg bg-neutral-100 min-h-[260px] sm:min-h-[340px] lg:min-h-[360px]">
                <img
                  src={dharoharImg}
                  alt="GCA Alumni Meet DHAROHAR 2026"
                  className="w-full h-full object-cover object-center block hover:scale-[1.01] transition-transform duration-300"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-1">
                <span>GCA (Now FOAP-AKTU), Lucknow</span>
                <span className="text-[#B70D2B] font-bold">
                  Annual GBM · 28 November 2026
                </span>
              </div>
            </div>

            {/* Shifted below image to keep both columns visually balanced */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 bg-white p-3 rounded-lg border border-neutral-200/80 shadow-2xs">
                <Calendar className="w-4 h-4 text-[#B70D2B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Event Date
                  </span>
                  <strong className="text-neutral-900 text-xs sm:text-sm">
                    Nov 28, 2026
                  </strong>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 bg-white p-3 rounded-lg border border-neutral-200/80 shadow-2xs">
                <MapPin className="w-4 h-4 text-[#B70D2B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Venue
                  </span>
                  <strong className="text-neutral-900 text-xs sm:text-sm">
                    FOAP-AKTU, Lko
                  </strong>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 bg-white p-3 rounded-lg border border-neutral-200/80 shadow-2xs">
                <Users className="w-4 h-4 text-[#B70D2B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Celebration
                  </span>
                  <strong className="text-neutral-900 text-xs sm:text-sm">
                    1986 &amp; 2001 Batch
                  </strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-1">
              <Link
                to="/registration"
                className="w-full sm:w-auto text-center justify-center bg-[#B70D2B] hover:bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-lg shadow transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Alumni Registration</span>  
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/events"
                className="w-full sm:w-auto text-center justify-center border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-800 font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-lg transition-all"
              >
                Explore Event
              </Link>
              <a
                href="/dharohar-2026-brochure.pdf"
                download="GCAAA-Dharohar-2026-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center justify-center bg-neutral-900 hover:bg-[#B70D2B] text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-lg shadow transition-all active:scale-95 flex items-center gap-2 group cursor-pointer"
                title="Download Dharohar 2026 Brochure (PDF)"
              >
                <Download className="w-4 h-4 text-neutral-300 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
                <span>Download Brochure</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: COMPLETE BROCHURE DETAILS & INVITATION WITH KEYWORD HIGHLIGHTS */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            {/* Part 1: GCA Alumni Meet - DHAROHAR 2026 */}
            <div className="space-y-3">

              <p className="text-xs sm:text-[15px] leading-relaxed text-neutral-700 text-left sm:text-justify">
                Alumni Meets, named{" "}
                <span className="text-[#B70D2B] font-extrabold">Dharohar</span>,
                serve as a vibrant platform for reconnecting with former
                students, celebrating shared memories, and building a strong
                network of professionals who once walked the same campus
                corridors. These gatherings foster a{" "}
                <span className="bg-red-50 text-[#B70D2B] font-semibold px-1.5 py-0.5 rounded">
                  sense of belonging and pride
                </span>
                , allowing alumni to engage with their alma mater, share their
                professional journeys, and contribute to the institution&apos;s
                growth. Through interactive sessions, cultural programs, and{" "}
                networking opportunities, Alumni Meets strengthen bonds and
                encourage meaningful collaborations between past and present
                members of the academic community.
              </p>
            </div>

            {/* Part 2: Invitation Block */}
            <div className="bg-neutral-50/90 border-l-4 border-[#B70D2B] border border-neutral-200/80 rounded-r-xl p-5 sm:p-6 space-y-3.5 shadow-xs">
              <h3 className="text-2xl sm:text-3xl font-light text-[#E31E24] tracking-wide font-sans">
                Invitation
              </h3>

              <p className="text-xs sm:text-[15px] leading-relaxed text-neutral-700">
                The{" "}
                <strong className="text-neutral-900">
                  GCA Alumni Association 
                </strong>{" "}
                invites you to its Annual General Body Meeting (GBM) on{" "}
                <span className="bg-[#B70D2B] text-white font-extrabold px-2 py-0.5 rounded text-xs sm:text-sm whitespace-nowrap">
                  November 28, 2026
                </span>{" "}
                — a perfect opportunity to reconnect, share memories, and relive
                the moments that made your college life special.
              </p>

              <p className="text-xs sm:text-[15px] leading-relaxed text-neutral-700">
                This year marks a special milestone as we celebrate the{" "}
                <span className="bg-red-50 border border-red-200 text-[#B70D2B] font-bold px-1.5 py-0.5 rounded">
                  Ruby Jubilee of the 1986 batch
                </span>{" "}
                &amp;{" "}
                <span className="bg-red-50 border border-red-200 text-[#B70D2B] font-bold px-1.5 py-0.5 rounded">
                  Silver Jubilee of the 2001 batch
                </span>{" "}
                of{" "}
                <strong className="text-neutral-900">
                  GCA (now FOAP-AKTU)
                </strong>
                . Along with this, we are hosting the much-awaited gala event,{" "}
                <strong className="text-[#B70D2B] font-extrabold">
                  DHAROHAR 2026
                </strong>
                .
              </p>

              <div className="pt-2 border-t border-neutral-200/80 space-y-1">
                <p className="text-sm sm:text-base italic font-bold text-neutral-900">
                  &ldquo;It&apos;s time to come together once again.&rdquo;
                </p>
                <p className="text-xs sm:text-sm font-medium text-neutral-600">
                  We warmly invite you to be part of this celebration and look
                  forward to welcoming you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

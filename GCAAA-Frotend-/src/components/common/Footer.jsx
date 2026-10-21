import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Clock, ArrowRight } from 'lucide-react';
import logoImg from '@/assets/images/logo.png';
// ✅ Apna CodeCrafter logo yahan import karo (path apne folder ke hisaab se adjust karo)
import codeCrafterLogo from '@/assets/images/image.png';

export const Footer = () => {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscribedEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setSubscribedEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-black text-white border-t border-neutral-900 mt-auto">

      {/* ========================================================
          MAIN FOOTER MULTI-COLUMN GRID
      ======================================================== */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-9 lg:gap-7">

          {/* COLUMN 1: BRAND IDENTITY & ABOUT */}
          <div className="lg:col-span-4 space-y-3">
            <Link to="/" className="inline-flex items-center gap-3 group">
              {logoImg ? (
                <img
                  src={logoImg}
                  alt="GCAAA Logo"
                  className="h-14 w-auto object-contain bg-white/5 p-1 rounded-lg border border-neutral-800 group-hover:border-red-600/60 transition-colors"
                />
              ) : (
                <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center text-white font-black text-2xl">
                  G
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white tracking-tight uppercase leading-tight group-hover:text-red-400 transition-colors">
                  GCAAA
                </span>
                <span className="text-xs font-bold text-neutral-400 tracking-wider uppercase leading-none mt-0.5">
                  Alumni Association
                </span>
                <span className="text-xs text-red-500 font-semibold tracking-wide uppercase mt-1">
                  Est. 1976 · Lucknow
                </span>
              </div>
            </Link>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed text-left sm:text-justify">
              GCAAA unites seasoned architects, graduates, and faculty under one collaborative umbrella — fostering brotherhood, design excellence, and our timeless campus heritage.
            </p>

            <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-900 text-neutral-400 text-sm space-y-1.5">
              <p className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                Institutional Affiliation
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Faculty of Architecture &amp; Planning (FOAP), Dr. A.P.J. Abdul Kalam Technical University, Lucknow.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Connect On Social Media
              </p>
              <div className="flex items-center gap-2.5">
                <a href="#facebook" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
                <a href="#instagram" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.449-1.44z" />
                  </svg>
                </a>
                <a href="#linkedin" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                <a href="#twitter" aria-label="X" className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-red-600" />
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link to="/" className="hover:text-red-400 hover:translate-x-1 transition-all inline-block">Home Portal</Link></li>
              <li><Link to="/about" className="hover:text-red-400 hover:translate-x-1 transition-all inline-block">About Association</Link></li>
              <li><Link to="/events" className="hover:text-red-400 hover:translate-x-1 transition-all inline-block">Dharohar 2026 Meet</Link></li>
              <li><Link to="/committee" className="hover:text-red-400 hover:translate-x-1 transition-all inline-block">Executive Committee</Link></li>
              <li><Link to="/gallery" className="hover:text-red-400 hover:translate-x-1 transition-all inline-block">Gallery &amp; Awards</Link></li>
              <li><Link to="/publications" className="hover:text-red-400 hover:translate-x-1 transition-all inline-block">Souvenirs &amp; Publications</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 hover:translate-x-1 transition-all inline-block">Contact Secretariat</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: KEY INITIATIVES */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-red-600" />
              Key Initiatives
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link to="/events" className="hover:text-red-400 transition-colors flex items-center justify-between group">
                  <span>Ruby Jubilee (Batch 1986)</span>
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-red-400 transition-colors flex items-center justify-between group">
                  <span>Silver Jubilee (Batch 2001)</span>
                </Link>
              </li>
              <li><Link to="/registration" className="hover:text-red-400 transition-colors block">Alumni Life Membership</Link></li>
              <li><Link to="/gallery" className="hover:text-red-400 transition-colors block">Heritage &amp; Philatelic Stamps</Link></li>
              <li><Link to="/about" className="hover:text-red-400 transition-colors block">Student Mentorship Circles</Link></li>
              <li><Link to="/events" className="hover:text-red-400 transition-colors block">Annual GBM Proceedings</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: HEADQUARTERS */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded bg-red-600" />
              Headquarters
            </h4>

            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">Tagore Marg, Hazratganj, Lucknow – 226007, Uttar Pradesh, India</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-red-500 shrink-0" />
                <a href="tel:+919839270036" className="hover:text-red-400 font-semibold text-white transition-colors">+91 98392 70036</a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-red-500 shrink-0" />
                <a href="mailto:gcaaa07@gmail.com" className="hover:text-red-400 font-semibold text-neutral-300 transition-colors">gcaaa07@gmail.com</a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">09:00 AM – 06:00 PM</p>
                  <p className="text-xs text-neutral-500">Monday to Saturday</p>
                </div>
              </div>

              <div className="pt-1">
                <Link to="/registration" className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-950/80 hover:bg-red-600 text-red-400 hover:text-white border border-red-800/80 text-xs font-bold uppercase tracking-wider rounded transition-all">
                  Register As Alumnus <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          BOTTOM COPYRIGHT BAR — SINGLE LINE & LEFT ALIGNED
      ======================================================== */}
      <div className="border-t border-neutral-900 bg-neutral-950/90 py-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 flex flex-col lg:flex-row items-center justify-start gap-3 lg:gap-6">

          {/* LEFT: Precision Crafted + Logo */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="text-xs sm:text-sm text-neutral-400 text-center sm:text-left leading-relaxed sm:whitespace-nowrap">
              Precision Crafted with Digital Intelligence by
            </span>
            <a
              href="https://www.codecrafter.co.in/" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CodeCrafter"
              className="shrink-0 opacity-90 hover:opacity-100 transition-opacity flex items-center"
            >
              <img
                src={codeCrafterLogo}
                alt="CodeCrafter"
                className="h-6 sm:h-7 w-auto object-contain brightness-0 invert"
              />
            </a>
          </div>

          {/* SEPARATOR (Desktop only) */}
          <span className="hidden lg:block text-neutral-700">|</span>

          {/* RIGHT: Copyright text */}
          <p className="text-xs sm:text-sm text-neutral-400 text-center lg:text-left leading-relaxed sm:whitespace-nowrap">
            © {new Date().getFullYear()} Government College of Architecture Alumni Association. All Rights Reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};
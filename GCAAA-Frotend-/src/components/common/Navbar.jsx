import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Clock,
  Phone,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Home,
  Info,
  Users,
  Calendar,
  Award,
  UserPlus,
  FileText,
  BookOpen,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import logoImg from '@/assets/images/logo.png';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();

  // Close all menus whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setDesktopDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeAllMenus = () => {
    setDesktopDropdown(null);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* 1. TOP INFO BAR (Scrolls off naturally with page) */}
      <div className="bg-white border-b border-neutral-200 print:hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 flex flex-col md:flex-row items-stretch justify-between text-xs">
          {/* Left info items */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 py-2 text-neutral-700 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span className="font-semibold text-neutral-800">
                Tagore Marg, Hazratganj, Lucknow – 226007, UP
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <a
                href="mailto:gcaaa07@gmail.com"
                className="hover:text-red-600 transition-colors font-semibold"
              >
                gcaaa07@gmail.com
              </a>
            </div>
          </div>

          {/* Right angled welcome banner (hidden on mobile) */}
          <div className="hidden md:flex bg-black text-white px-8 py-2 font-medium items-center justify-center slant-cut-left shrink-0">
            <span>Welcome to Government College Alumni Association</span>
          </div>
        </div>
      </div>

      {/* 2. STICKY HEADER (Stays firmly pinned at top-0 with zero jitter) */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full bg-white print:hidden transition-shadow duration-300 ${
          isScrolled ? 'shadow-xl' : 'shadow-sm'
        }`}
      >
        {/* 2. MIDDLE BRANDING BAR */}
        <div className="bg-white border-b border-neutral-200 py-2">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <Link to="/" onClick={closeAllMenus} className="flex items-center gap-3">
              {logoImg ? (
                <img
                  src={logoImg}
                  alt="GCAAA Logo"
                  className="w-auto object-contain h-10 sm:h-12"
                />
              ) : (
                <div className="bg-red-600 rounded-lg flex items-center justify-center text-white font-black w-10 h-10 text-lg">
                  G
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-extrabold text-neutral-900 tracking-tight leading-tight uppercase text-lg sm:text-xl">
                  GCAAA
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-600 tracking-wider uppercase leading-none">
                  Alumni Association
                </span>
              </div>
            </Link>

            {/* Desktop Widgets */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 shadow-sm">
                  <Clock className="w-5 h-5 text-neutral-800" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900 leading-tight lining-nums">
                    09:00 am - 06:00 pm
                  </p>
                  <p className="text-xs text-neutral-500">We Serve with Pleasure</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 shadow-sm">
                  <Phone className="w-5 h-5 text-neutral-800" />
                </div>
                <div>
                  <a
                    href="tel:+919839270036"
                    className="text-sm font-bold text-neutral-900 leading-tight hover:text-red-600 transition-colors lining-nums"
                  >
                    +91 98392 70036
                  </a>
                  <p className="text-xs text-neutral-500">Discuss any Queries</p>
                </div>
              </div>

              <div className="flex items-center border border-neutral-300 rounded overflow-hidden">
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-red-600 hover:text-white border-r border-neutral-300 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-red-600 hover:text-white border-r border-neutral-300 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-red-600 hover:text-white border-r border-neutral-300 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                <a
                  href="#twitter"
                  aria-label="X"
                  className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-red-600 hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Mobile Actions: CTA Button + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to="/registration"
                onClick={closeAllMenus}
                className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors uppercase tracking-wider flex items-center gap-1 shadow-sm active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Join</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:scale-95 transition-all flex items-center justify-center"
                aria-label="Open Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. MAIN NAV BAR (DESKTOP RED BAR) */}
        <nav className="hidden lg:block bg-red-600">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14">
            <div className="flex items-center justify-between font-bold text-xs tracking-wider text-white">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-3.5 hover:bg-red-700 transition-colors ${
                    isActive ? 'bg-red-700 text-white' : ''
                  }`
                }
              >
                HOME
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-4 py-3.5 hover:bg-red-700 transition-colors ${
                    isActive ? 'bg-red-700 text-white' : ''
                  }`
                }
              >
                ABOUT US
              </NavLink>

              <div
                className="relative"
                onMouseEnter={() => setDesktopDropdown('team')}
                onMouseLeave={() => setDesktopDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setDesktopDropdown(desktopDropdown === 'team' ? null : 'team')
                  }
                  className="px-4 py-3.5 flex items-center gap-1 hover:bg-red-700 transition-colors uppercase"
                >
                  TEAM GCAAA <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {desktopDropdown === 'team' && (
                  <div className="absolute top-full left-0 bg-neutral-900 border border-neutral-800 text-white shadow-xl min-w-[200px] py-2 z-50">
                    <Link
                      to="/committee/office-bearers"
                      onClick={closeAllMenus}
                      className="block px-4 py-2 hover:bg-red-600 text-xs"
                    >
                      Office Bearers
                    </Link>
                    <Link
                      to="/committee/executive-members"
                      onClick={closeAllMenus}
                      className="block px-4 py-2 hover:bg-red-600 text-xs"
                    >
                      Executive Members
                    </Link>
                    <Link
                      to="/committee/convenor"
                      onClick={closeAllMenus}
                      className="block px-4 py-2 hover:bg-red-600 text-xs"
                    >
                      Convenor
                    </Link>
                  </div>
                )}
              </div>

              <NavLink
                to="/events"
                className={({ isActive }) =>
                  `px-4 py-3.5 hover:bg-red-700 transition-colors ${
                    isActive ? 'bg-red-700 text-white' : ''
                  }`
                }
              >
                EVENT
              </NavLink>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `px-4 py-3.5 hover:bg-red-700 transition-colors ${
                    isActive ? 'bg-red-700 text-white' : ''
                  }`
                }
              >
                GALLERY & AWARDS
              </NavLink>

              <div
                className="relative"
                onMouseEnter={() => setDesktopDropdown('join')}
                onMouseLeave={() => setDesktopDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setDesktopDropdown(desktopDropdown === 'join' ? null : 'join')
                  }
                  className="px-4 py-3.5 flex items-center gap-1 hover:bg-red-700 transition-colors uppercase"
                >
                  JOIN GCAAA <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {desktopDropdown === 'join' && (
                  <div className="absolute top-full left-0 bg-neutral-900 border border-neutral-800 text-white shadow-xl min-w-[200px] py-2 z-50">
                    <Link
                      to="/registration"
                      onClick={closeAllMenus}
                      className="block px-4 py-2 hover:bg-red-600 text-xs"
                    >
                      Life Membership Registration
                    </Link>
                    {/* <Link
                      to="/election-nomination"
                      onClick={closeAllMenus}
                      className="block px-4 py-2 hover:bg-red-600 text-xs text-amber-300 font-bold flex items-center justify-between"
                    >
                      <span>Election Nomination 2026</span>
                      <span className="text-[9px] bg-red-800 text-white font-extrabold px-1.5 py-0.5 rounded">NEW</span>
                    </Link> */}
                    <Link
                      to="/alumni-data-list"
                      onClick={closeAllMenus}
                      className="block px-4 py-2 hover:bg-red-600 text-xs"
                    >
                      All Batches Of GCAAA
                    </Link>
                  </div>
                )}
              </div>

              <NavLink
                to="/publications"
                className={({ isActive }) =>
                  `px-4 py-3.5 hover:bg-red-700 transition-colors ${
                    isActive ? 'bg-red-700 text-white' : ''
                  }`
                }
              >
                PUBLICATIONS
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `px-4 py-3.5 hover:bg-red-700 transition-colors ${
                    isActive || location.pathname.startsWith('/blog') ? 'bg-red-700 text-white' : ''
                  }`
                }
              >
                BLOGS
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-4 py-3.5 hover:bg-red-700 transition-colors uppercase ${
                    isActive ? 'bg-red-700 text-white' : ''
                  }`
                }
              >
                CONTACT US
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      {/* 4. FULL-SCREEN SEAMLESS MOBILE DRAWER (ZERO TOP GAP) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col lg:hidden animate-fadeIn">
          {/* Header Bar inside Drawer (Brand Logo + Close Button) — sits flush at the very top */}
          <div className="px-4 py-3 bg-white border-b border-neutral-200 flex items-center justify-between shrink-0 shadow-2xs">
            <Link to="/" onClick={closeAllMenus} className="flex items-center gap-3">
              {logoImg ? (
                <img
                  src={logoImg}
                  alt="GCAAA Logo"
                  className="w-auto object-contain h-10"
                />
              ) : (
                <div className="bg-red-600 rounded-lg flex items-center justify-center text-white font-black w-10 h-10 text-lg">
                  G
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-extrabold text-neutral-900 tracking-tight leading-tight uppercase text-lg">
                  GCAAA
                </span>
                <span className="text-[10px] font-bold text-neutral-600 tracking-wider uppercase leading-none">
                  Alumni Association
                </span>
              </div>
            </Link>

            <button
              onClick={closeAllMenus}
              className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors shadow-2xs active:scale-95"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Navigation Body */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 text-sm font-bold text-neutral-800 divide-y divide-neutral-100">
            {/* Home */}
            <div className="pb-1">
              <NavLink
                to="/"
                onClick={closeAllMenus}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-extrabold border-l-4 border-red-600 pl-3'
                      : 'hover:bg-neutral-50 text-neutral-800 hover:text-red-600'
                  }`
                }
              >
                <Home className="w-4 h-4 text-red-600 shrink-0" />
                <span>HOME</span>
              </NavLink>
            </div>

            {/* About Us */}
            <div className="py-1">
              <NavLink
                to="/about"
                onClick={closeAllMenus}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-extrabold border-l-4 border-red-600 pl-3'
                      : 'hover:bg-neutral-50 text-neutral-800 hover:text-red-600'
                  }`
                }
              >
                <Info className="w-4 h-4 text-red-600 shrink-0" />
                <span>ABOUT US</span>
              </NavLink>
            </div>

            {/* Team GCAAA Accordion */}
            <div className="py-1">
              <button
                onClick={() => toggleDropdown('team')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all text-left ${
                  activeDropdown === 'team' || location.pathname.startsWith('/committee')
                    ? 'bg-neutral-50 text-red-600'
                    : 'hover:bg-neutral-50 text-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-red-600 shrink-0" />
                  <span>TEAM GCAAA</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                    activeDropdown === 'team' ? 'rotate-180 text-red-600' : ''
                  }`}
                />
              </button>
              {activeDropdown === 'team' && (
                <div className="ml-7 mr-2 mt-1 mb-2 bg-neutral-50 border border-neutral-200/80 rounded-xl p-1.5 space-y-1">
                  <Link
                    to="/committee/office-bearers"
                    onClick={closeAllMenus}
                    className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-colors ${
                      location.pathname === '/committee/office-bearers'
                        ? 'bg-red-600 text-white font-bold'
                        : 'text-neutral-700 hover:bg-neutral-200/70 hover:text-red-600'
                    }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    <span>Office Bearers</span>
                  </Link>
                  <Link
                    to="/committee/executive-members"
                    onClick={closeAllMenus}
                    className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-colors ${
                      location.pathname === '/committee/executive-members'
                        ? 'bg-red-600 text-white font-bold'
                        : 'text-neutral-700 hover:bg-neutral-200/70 hover:text-red-600'
                    }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    <span>Executive Members</span>
                  </Link>
                  <Link
                    to="/committee/convenor"
                    onClick={closeAllMenus}
                    className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-colors ${
                      location.pathname === '/committee/convenor'
                        ? 'bg-red-600 text-white font-bold'
                        : 'text-neutral-700 hover:bg-neutral-200/70 hover:text-red-600'
                    }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    <span>Convenor</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Event */}
            <div className="py-1">
              <NavLink
                to="/events"
                onClick={closeAllMenus}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-extrabold border-l-4 border-red-600 pl-3'
                      : 'hover:bg-neutral-50 text-neutral-800 hover:text-red-600'
                  }`
                }
              >
                <Calendar className="w-4 h-4 text-red-600 shrink-0" />
                <span>EVENT</span>
              </NavLink>
            </div>

            {/* Gallery & Awards */}
            <div className="py-1">
              <NavLink
                to="/gallery"
                onClick={closeAllMenus}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-extrabold border-l-4 border-red-600 pl-3'
                      : 'hover:bg-neutral-50 text-neutral-800 hover:text-red-600'
                  }`
                }
              >
                <Award className="w-4 h-4 text-red-600 shrink-0" />
                <span>GALLERY & AWARDS</span>
              </NavLink>
            </div>

            {/* Join GCAAA Accordion */}
            <div className="py-1">
              <button
                onClick={() => toggleDropdown('join')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all text-left ${
                  activeDropdown === 'join' ||
                  location.pathname.startsWith('/registration') ||
                  location.pathname.startsWith('/registered-members') ||
                  location.pathname.startsWith('/alumni-data-list')
                    ? 'bg-neutral-50 text-red-600'
                    : 'hover:bg-neutral-50 text-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserPlus className="w-4 h-4 text-red-600 shrink-0" />
                  <span>JOIN GCAAA</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                    activeDropdown === 'join' ? 'rotate-180 text-red-600' : ''
                  }`}
                />
              </button>
              {activeDropdown === 'join' && (
                <div className="ml-7 mr-2 mt-1 mb-2 bg-neutral-50 border border-neutral-200/80 rounded-xl p-1.5 space-y-1">
                  <Link
                    to="/registration"
                    onClick={closeAllMenus}
                    className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors ${
                      location.pathname === '/registration'
                        ? 'bg-red-600 text-white font-bold'
                        : 'text-neutral-700 hover:bg-neutral-200/70 hover:text-red-600'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                      Life Membership Registration
                    </span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </Link>

                  {/* <Link
                    to="/election-nomination"
                    onClick={closeAllMenus}
                    className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors ${
                      location.pathname === '/election-nomination'
                        ? 'bg-red-600 text-white font-bold'
                        : 'text-neutral-700 hover:bg-neutral-200/70 hover:text-red-600'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-bold text-[#8B0000]">
                      <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                      Election Nomination 2026-28
                    </span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                      New
                    </span>
                  </Link> */}
                  
                  <Link
                    to="/alumni-data-list"
                    onClick={closeAllMenus}
                    className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors ${
                      location.pathname === '/alumni-data-list'
                        ? 'bg-red-600 text-white font-bold'
                        : 'text-neutral-700 hover:bg-neutral-200/70 hover:text-red-600'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                      Alumni Data List
                    </span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                      Data
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Publications */}
            <div className="py-1">
              <NavLink
                to="/publications"
                onClick={closeAllMenus}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-extrabold border-l-4 border-red-600 pl-3'
                      : 'hover:bg-neutral-50 text-neutral-800 hover:text-red-600'
                  }`
                }
              >
                <BookOpen className="w-4 h-4 text-red-600 shrink-0" />
                <span>PUBLICATIONS</span>
              </NavLink>
            </div>

            {/* Blog */}
            <div className="py-1">
              <NavLink
                to="/blog"
                onClick={closeAllMenus}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                    isActive || location.pathname.startsWith('/blog')
                      ? 'bg-red-50 text-red-600 font-extrabold border-l-4 border-red-600 pl-3'
                      : 'hover:bg-neutral-50 text-neutral-800 hover:text-red-600'
                  }`
                }
              >
                <BookOpen className="w-4 h-4 text-red-600 shrink-0" />
                <span>BLOGS</span>
              </NavLink>
            </div>

            {/* Contact Us */}
            <div className="py-1">
              <NavLink
                to="/contact"
                onClick={closeAllMenus}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-extrabold border-l-4 border-red-600 pl-3'
                      : 'hover:bg-neutral-50 text-neutral-800 hover:text-red-600'
                  }`
                }
              >
                <PhoneCall className="w-4 h-4 text-red-600 shrink-0" />
                <span>CONTACT US</span>
              </NavLink>
            </div>
          </div>

          {/* Sticky Bottom Actions inside Drawer */}
          <div className="bg-neutral-50 p-4 border-t border-neutral-200 shrink-0 space-y-3">
            <Link
              to="/registration"
              onClick={closeAllMenus}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-[#B70D2B] text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.99] transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>ALUMNI REGISTRATION 2026</span>
            </Link>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:+919839270036"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white border border-neutral-300/80 text-neutral-800 font-bold hover:text-red-600 hover:border-red-300 transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>+91 98392 70036</span>
              </a>
              <a
                href="mailto:gcaaa07@gmail.com"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white border border-neutral-300/80 text-neutral-800 font-bold hover:text-red-600 hover:border-red-300 transition-colors shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>Email Us</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-3 pt-1 text-neutral-500">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a
                href="#twitter"
                aria-label="X"
                className="w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
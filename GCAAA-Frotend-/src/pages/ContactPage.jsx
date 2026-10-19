import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  Train,
  Plane,
  Car,
  ExternalLink,
  Navigation,
} from 'lucide-react';
import buildingHeroImg from '@/assets/images/GCAAA_college_building.jpg';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-neutral-900">
      {/* ========================================================
          1. SLEEK MINIMAL HERO BANNER (With college background image, matching Election form)
      ======================================================== */}
      <section className="relative overflow-hidden py-12 sm:py-16 flex items-center justify-center border-b border-neutral-300">
        {/* Background Campus Image */}
        <img
          src={buildingHeroImg}
          alt="Government College of Architecture"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />

        {/* Content: Title & Breadcrumb Only */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase font-serif drop-shadow-md">
            Contact Secretariat
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-neutral-300 mt-2 font-semibold">
            <Link to="/" className="hover:text-red-400 transition-colors">
              HOME
            </Link>
            <span className="text-red-500 font-bold">—</span>
            <span className="text-amber-400">CONTACT US</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. MAIN CONTENT: CONTACT INFO (LEFT) + FORM (RIGHT)
      ======================================================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: SECRETARIAT DETAILS & OFFICE BEARERS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card */}
            <div className="bg-neutral-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-neutral-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B70D2B]/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-red-950/70 text-red-400 border border-red-800/40 text-[11px] font-bold uppercase tracking-wider mb-2">
                  OFFICIAL HEADQUARTERS
                </span>
                <h3 className="text-xl font-black text-white font-serif">
                  Government College of Architecture Alumni Association
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Faculty of Architecture &amp; Planning (AKTU), Lucknow
                </p>
              </div>

              <div className="space-y-4 pt-2 text-sm text-neutral-300">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-red-400 mt-0.5">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Campus Address</p>
                    <p className="text-white text-xs sm:text-sm mt-0.5 leading-relaxed font-medium">
                      Tagore Marg, Hazratganj, Lucknow – 226007, Uttar Pradesh, India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-red-400">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Contact Phone</p>
                    <a
                      href="tel:+919839270036"
                      className="text-white text-xs sm:text-sm mt-0.5 font-semibold hover:text-red-400 transition-colors inline-block"
                    >
                      +91 98392 70036
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-red-400">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Official Email</p>
                    <a
                      href="mailto:gcaaa07@gmail.com"
                      className="text-white text-xs sm:text-sm mt-0.5 font-semibold hover:text-red-400 transition-colors inline-block"
                    >
                      gcaaa07@gmail.com
                    </a>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-red-400">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Office Timings</p>
                    <p className="text-neutral-300 text-xs sm:text-sm mt-0.5">
                      Monday to Friday: 9:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Bearers Hotline */}
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Key Office Bearers
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800">
                    <p className="text-neutral-400 font-medium text-[11px]">President</p>
                    <p className="text-white font-bold mt-0.5">Ar. Anupam Mittal</p>
                    <a
                      href="tel:9415010301"
                      className="text-red-400 hover:text-red-300 font-semibold block mt-1"
                    >
                      +91 94150 10301
                    </a>
                  </div>

                  <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800">
                    <p className="text-neutral-400 font-medium text-[11px]">General Secretary</p>
                    <p className="text-white font-bold mt-0.5">Ar. Vishal Gulati</p>
                    <a
                      href="tel:9415025946"
                      className="text-red-400 hover:text-red-300 font-semibold block mt-1"
                    >
                      +91 94150 25946
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CLEAN & NORMAL CONTACT FORM */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl border border-neutral-200/90 p-6 sm:p-10">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-neutral-900 font-serif">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Fill out the form below and our secretariat team will get back to you shortly.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-10 px-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-4">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-black text-emerald-950">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your message has been received by the GCAAA Secretariat. We will respond within 24 to 48 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="bg-[#B70D2B] hover:bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-400 focus:bg-white focus:ring-2 focus:ring-[#B70D2B] focus:border-[#B70D2B] focus:outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-400 focus:bg-white focus:ring-2 focus:ring-[#B70D2B] focus:border-[#B70D2B] focus:outline-none transition-all"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-400 focus:bg-white focus:ring-2 focus:ring-[#B70D2B] focus:border-[#B70D2B] focus:outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Subject / Purpose of Contact
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:bg-white focus:ring-2 focus:ring-[#B70D2B] focus:outline-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Life Membership Assistance">Life Membership Assistance</option>
                    <option value="Dharohar 2026 Event Query">Dharohar 2026 Event Query</option>
                    <option value="Alumni Directory Verification">Alumni Directory Verification</option>
                    <option value="Media & Publications">Media &amp; Publications</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Your Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 placeholder-neutral-400 focus:bg-white focus:ring-2 focus:ring-[#B70D2B] focus:border-[#B70D2B] focus:outline-none transition-all"
                    placeholder="Write your message or inquiry here..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#B70D2B] hover:bg-neutral-900 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-xl shadow-lg shadow-red-950/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Secretariat</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================
          3. CAMPUS ACCESSIBILITY & HOW TO REACH (MATCHING DESIGN)
      ======================================================== */}
      <section className="bg-neutral-50/70 border-t border-neutral-200/80 py-14 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-[11px] font-extrabold uppercase tracking-widest mb-3.5 shadow-2xs">
              CAMPUS ACCESSIBILITY
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-serif text-neutral-900 tracking-tight leading-snug">
              How to Reach FOAP AKTU Campus,
              <br />
              Lucknow
            </h2>

            <p className="mt-3.5 text-neutral-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Located on Tagore Marg in Hazratganj, adjacent to the historic Lucknow University and Gomti Riverfront.
            </p>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left Column: Key Transit Distance */}
            <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 p-5 sm:p-7 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-5 text-neutral-900">
                  <Navigation className="w-5 h-5 text-red-600 rotate-45 shrink-0" />
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 font-serif">
                    Key Transit Distance
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {/* Railway */}
                  <div className="p-3.5 sm:p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/40 hover:bg-neutral-50/80 transition-colors flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5 border border-red-100/60">
                      <Train className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                        Charbagh Railway Station (LKO)
                      </h4>
                      <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">
                        Approx. 5.2 km · 15 to 20 minutes by cab/auto
                      </p>
                    </div>
                  </div>

                  {/* Airport */}
                  <div className="p-3.5 sm:p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/40 hover:bg-neutral-50/80 transition-colors flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5 border border-red-100/60">
                      <Plane className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                        Chaudhary Charan Singh Airport (LKO)
                      </h4>
                      <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">
                        Approx. 16.5 km · 35 to 45 minutes via Amar Shaheed Path / Metro
                      </p>
                    </div>
                  </div>

                  {/* Bus Terminal */}
                  <div className="p-3.5 sm:p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/40 hover:bg-neutral-50/80 transition-colors flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5 border border-red-100/60">
                      <Car className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                        Kaiserbagh Bus Terminal
                      </h4>
                      <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">
                        Approx. 2.8 km · 10 minutes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campus Landmark highlight box */}
              <div className="p-4 rounded-xl bg-red-50/60 border border-red-200/80 mt-2">
                <p className="text-xs font-bold text-[#B70D2B]">Campus Landmark:</p>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Near Hanuman Setu Temple and Arts College, opposite Lucknow University Law Faculty, Tagore Marg, Hazratganj.
                </p>
              </div>
            </div>

            {/* Right Column: Embedded Map */}
            <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 overflow-hidden shadow-xs relative min-h-[440px] sm:min-h-[480px] flex">
              {/* Floating 'Open in Maps' Button */}
              <a
                href="https://maps.google.com/?q=Faculty+of+Architecture+and+Planning,+Tagore+Marg,+Hazratganj,+Lucknow,+Uttar+Pradesh+226007"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-neutral-800 text-xs font-semibold shadow-md border border-neutral-200 backdrop-blur-xs transition-all hover:shadow-lg"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              </a>

              <iframe
                title="FOAP AKTU Campus Location Map"
                src="https://maps.google.com/maps?q=Faculty+of+Architecture+and+Planning,+Tagore+Marg,+Hazratganj,+Lucknow,+Uttar+Pradesh+226007&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[440px] sm:min-h-[480px] border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

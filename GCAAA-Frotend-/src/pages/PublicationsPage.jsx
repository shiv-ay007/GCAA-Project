import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Calendar,
  Layers,
  HardDrive,
  CheckCircle2,
  Bookmark,
  Share2,
  Sparkles,
  Eye,
  X,
  ChevronRight,
  Info
} from 'lucide-react';

import { publications } from '@/data/publicationsData';
import buildingHeroImg from '@/assets/images/GCAAA_college_building.jpg';

export const PublicationsPage = () => {
  const [activePreviewPdf, setActivePreviewPdf] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleShare = (pub) => {
    const url = `${window.location.origin}/publications#${pub.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(pub.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="w-full bg-neutral-50 text-neutral-900 min-h-screen pb-24 font-sans">
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
            Publications &amp; Souvenirs
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-neutral-300 mt-2 font-semibold">
            <Link to="/" className="hover:text-red-400 transition-colors">
              HOME
            </Link>
            <span className="text-red-500 font-bold">—</span>
            <span className="text-amber-400">PUBLICATIONS</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. STATS & QUICK NAVIGATION (Matching Navbar Width: max-w-[1400px])
      ======================================================== */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 mt-6 sm:mt-8">
        <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
          {/* Metric Stats Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs font-semibold text-neutral-700">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-50 border border-neutral-200">
              <Layers className="w-3.5 h-3.5 text-[#B70D2B]" />
              <span><strong className="text-neutral-900">3</strong> Milestone Editions</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-50 border border-neutral-200">
              <FileText className="w-3.5 h-3.5 text-[#B70D2B]" />
              <span><strong className="text-neutral-900">446</strong> Total Documented Pages</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-50 border border-neutral-200">
              <Calendar className="w-3.5 h-3.5 text-[#B70D2B]" />
              <span>Spanning <strong className="text-neutral-900">2013 – 2025</strong></span>
            </div>
          </div>

          {/* Quick Jump Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold mr-1">
              Jump To:
            </span>
            {publications.map((pub) => (
              <a
                key={pub.id}
                href={`#${pub.id}`}
                className="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-red-50 hover:text-red-700 hover:border-red-300 border border-neutral-200 text-xs font-bold transition-all text-neutral-700"
              >
                {pub.sectionNumber}. {pub.edition}
              </a>
            ))}
          </div>
        </div>

        {/* ========================================================
            3. THREE DEDICATED PUBLICATION SECTIONS
        ======================================================== */}
        <div className="space-y-12 sm:space-y-16">
        {publications.map((pub, index) => (
          <section
            key={pub.id}
            id={pub.id}
            className="scroll-mt-36 lg:scroll-mt-40 relative bg-white rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-6 sm:p-10 lg:p-12 overflow-hidden"
          >
            {/* Background Watermark Section Number */}
            <div className="absolute top-2 right-4 sm:top-6 sm:right-8 text-7xl sm:text-9xl font-black text-neutral-100/90 select-none pointer-events-none -z-0">
              {pub.sectionNumber}
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT COLUMN: 3D BOOK COVER PREVIEW */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="group relative w-full max-w-[340px] sm:max-w-[380px] rounded-2xl overflow-hidden bg-neutral-100 p-3 sm:p-4 border-2 border-neutral-200/90 hover:border-red-600 transition-all duration-300 shadow-md hover:shadow-2xl">
                  {/* Aspect Box for Cover */}
                  <div className="relative rounded-xl overflow-hidden bg-neutral-900 shadow-inner aspect-[3/4] flex items-center justify-center">
                    <img
                      src={pub.coverImg}
                      alt={pub.title}
                      className="w-full h-full object-contain object-center group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>

                  {/* Under Cover Label */}
                  <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-neutral-500 px-1">
                    <span className="flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5 text-red-600" />
                      Official Archive Copy
                    </span>
                    <span className="lining-nums font-bold text-neutral-700">{pub.year} Edition</span>
                  </div>
                </div>

                {/* File Specs Bar */}
                <div className="w-full max-w-[340px] sm:max-w-[380px] mt-4 grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                    <p className="text-[10px] uppercase font-bold text-neutral-500">Document Pages</p>
                    <p className="text-sm sm:text-base font-extrabold text-neutral-900 lining-nums">{pub.pages} Pages</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                    <p className="text-[10px] uppercase font-bold text-neutral-500">Edition Year</p>
                    <p className="text-sm sm:text-base font-extrabold text-neutral-900 lining-nums">{pub.year}</p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: METADATA, SUMMARY & DOWNLOAD ACTIONS */}
              <div className="lg:col-span-7 space-y-6">
                {/* Header Tag & Title */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                      Section {pub.sectionNumber}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${pub.badgeColor}`}>
                      {pub.badge}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-950 uppercase tracking-tight">
                    {pub.title}
                  </h2>

                  <p className="text-xs sm:text-sm font-bold text-red-600 italic tracking-wide mt-1">
                    "{pub.tagline}"
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {pub.description}
                </p>

                {/* Table of Contents / Key Highlights */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-600" />
                    <span>Included in this Edition:</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {pub.highlights.map((h, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publication Sections breakdown */}
                <div className="bg-neutral-50/80 rounded-2xl p-4 border border-neutral-200">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 mb-2.5">
                    Edition Structure &amp; Chapters:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pub.sectionsCovered.map((sec, secIdx) => (
                      <div key={secIdx} className="text-xs">
                        <span className="font-bold text-neutral-900 block">• {sec.title}</span>
                        <span className="text-[11px] text-neutral-500 leading-tight block">{sec.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTONS (DOWNLOAD & VIEW) */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Primary Download Button */}
                  <a
                    href={pub.pdfUrl}
                    download={pub.downloadFilename}
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md shadow-red-600/30 active:scale-[0.98] cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>

                  {/* Secondary View Online Button */}
                  <a
                    href={pub.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-2xs hover:border-neutral-400 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-neutral-600" />
                    <span>View Online</span>
                  </a>

                  {/* Share Link Button */}
                  <button
                    onClick={() => handleShare(pub)}
                    className="p-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                    title={copiedId === pub.id ? "Link Copied!" : "Copy Link to this Edition"}
                    aria-label="Share Publication"
                  >
                    {copiedId === pub.id ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Share2 className="w-4 h-4 text-neutral-600" />
                    )}
                  </button>
                </div>

                
              </div>
            </div>
          </section>
        ))}
        </div>
      </div>

      {/* ========================================================
          3. CONTRIBUTE & ARCHIVE NOTICE BANNER
      ======================================================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 mt-16 sm:mt-20">
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-3xl p-8 sm:p-10 border border-neutral-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center shrink-0 mt-1">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight">
                Contribute to the Upcoming GCAAA Souvenir
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
                Have vintage photographs, student sketches, architectural projects, or nostalgic batch memoirs? Submit your entries to the GCAAA Publications Committee to be featured in the next edition.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/contact"
              className="w-full sm:w-auto text-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-600/30"
            >
              Submit Content
            </Link>
            <Link
              to="/registration"
              className="w-full sm:w-auto text-center px-6 py-3 border border-neutral-700 hover:border-white text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              Update Membership Roll
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

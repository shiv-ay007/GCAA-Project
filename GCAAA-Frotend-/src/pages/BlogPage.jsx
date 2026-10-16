import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Sparkles,
  X,
  Share2,
  Tag,
  PenTool,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { blogsData, blogCategories } from '@/data/blogsData';

export const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBlogModal, setActiveBlogModal] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter blogs based on category and search query
  const filteredBlogs = useMemo(() => {
    return blogsData.filter((blog) => {
      const matchesCategory =
        selectedCategory === 'All' || blog.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.author.name.toLowerCase().includes(q) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleShare = (blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* ========================================================
          1. HERO HEADER BANNER
      ======================================================== */}
      <section className="relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white pt-14 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-neutral-800">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-red-600/15 blur-[140px] rounded-full pointer-events-none -z-0" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4 sm:space-y-5">
          {/* Breadcrumb / Top Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-700/80 text-red-400 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>GCAAA Thought Leadership &amp; Memoirs</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            ALUMNI <span className="text-[#E31E24]">BLOGS &amp; ARTICLES</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Architectural discourse, historic Lucknow memoirs, urban innovations, and professional journeys shared by the Government College of Architecture alumni fraternity.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs by title, architect, or topic (e.g. Lucknow, Urban, Heritage)..."
                className="w-full pl-11 pr-4 py-3 bg-neutral-900/90 text-white placeholder-neutral-500 rounded-xl border border-neutral-700 focus:border-red-600 focus:bg-neutral-900 outline-hidden text-xs sm:text-sm shadow-xl transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. CATEGORY FILTER STRIP
      ======================================================== */}
      <section className="bg-white border-b border-neutral-200 sticky top-[64px] sm:top-[72px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {blogCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#B70D2B] text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. 6 BLOGS GRID: 3 COLUMNS PER ROW (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Results Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              Featured Articles <span className="text-red-600">({filteredBlogs.length})</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Showing {filteredBlogs.length} of {blogsData.length} published blogs in <strong>{selectedCategory}</strong>
            </p>
          </div>

          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-red-600 hover:text-red-800 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* 3 in a Row Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="group bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-2xl hover:border-red-600/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image Cover Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Category Badge on Image */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm border ${blog.categoryColor}`}>
                        {blog.category}
                      </span>
                    </div>

                    {/* Read Time Overlay */}
                    <div className="absolute bottom-3 right-3 z-10">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold">
                        <Clock className="w-3 h-3 text-amber-300" />
                        <span>{blog.readTime}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-red-600" />
                      <span>{blog.date}</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setActiveBlogModal(blog)}
                      className="text-base sm:text-lg font-black text-neutral-900 group-hover:text-[#B70D2B] transition-colors line-clamp-2 leading-snug cursor-pointer"
                    >
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md"
                        >
                          <Tag className="w-2.5 h-2.5 text-neutral-400" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Author + Read Button */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-neutral-300 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-900 truncate">
                        {blog.author.name}
                      </p>
                      <p className="text-[10px] text-neutral-500 truncate max-w-[130px] sm:max-w-[150px]">
                        {blog.author.role}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveBlogModal(blog)}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#B70D2B] hover:text-neutral-900 uppercase tracking-wider group-hover:translate-x-0.5 transition-all cursor-pointer shrink-0"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-lg mx-auto shadow-xs">
            <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-900">No blog articles found</h3>
            <p className="text-xs text-neutral-500 mt-1 mb-4">
              We couldn’t find any articles matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#B70D2B] text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* ========================================================
          4. WRITE FOR GCAAA / EDITORIAL CTA BANNER
      ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="relative rounded-3xl bg-neutral-950 text-white p-8 sm:p-12 overflow-hidden border border-neutral-800 shadow-2xl">
          {/* Background decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-700 text-red-400 text-xs font-bold uppercase tracking-wider">
                <PenTool className="w-3.5 h-3.5 text-amber-400" />
                <span>Call for Articles &amp; Research</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Are You A GCA Alumnus? Share Your Story
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                We invite architecture alumni, town planners, and academics to submit articles on heritage conservation, innovative urban design, or memoirs of college life for publication on the official GCAAA portal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="mailto:gcaaa072@gmail.com?subject=GCAAA%20Blog%20Submission"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B70D2B] hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <PenTool className="w-4 h-4" />
                <span>Submit An Article Draft</span>
              </a>
              <Link
                to="/registration"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-neutral-700 transition-all cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Join As Alumni</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. FULL BLOG ARTICLE MODAL
      ======================================================== */}
      {activeBlogModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn overflow-y-auto">
          <div
            className="bg-white rounded-3xl max-w-3xl w-full my-auto overflow-hidden shadow-2xl border border-neutral-200 relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative aspect-[16/9] w-full bg-neutral-900">
              <img
                src={activeBlogModal.image}
                alt={activeBlogModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveBlogModal(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/75 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 z-10">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider shadow-sm border ${activeBlogModal.categoryColor}`}>
                  {activeBlogModal.category}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
              {/* Meta bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200 text-xs text-neutral-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-red-600" />
                    <span>{activeBlogModal.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-red-600" />
                    <span>{activeBlogModal.readTime}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleShare(activeBlogModal)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
                </button>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 leading-snug">
                {activeBlogModal.title}
              </h2>

              {/* Author Card */}
              <div className="flex items-center gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
                <img
                  src={activeBlogModal.author.avatar}
                  alt={activeBlogModal.author.name}
                  className="w-12 h-12 rounded-full object-cover border border-neutral-300"
                />
                <div>
                  <h4 className="text-sm font-black text-neutral-900">
                    {activeBlogModal.author.name}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {activeBlogModal.author.role}
                  </p>
                </div>
              </div>

              {/* Content Body */}
              <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-4">
                {activeBlogModal.content.split('\n\n').map((paragraph, index) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;
                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3
                        key={index}
                        className="text-base sm:text-lg font-black text-neutral-900 pt-2 border-b border-neutral-200 pb-1"
                      >
                        {trimmed.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (trimmed.startsWith('- ')) {
                    const items = trimmed.split('\n').map((item) => item.replace('- ', '').trim());
                    return (
                      <ul key={index} className="list-disc pl-5 space-y-1 text-neutral-700">
                        {items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-neutral-700">
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-neutral-200 flex flex-wrap gap-2">
                {activeBlogModal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs font-bold text-neutral-700 bg-neutral-100 px-3 py-1 rounded-lg"
                  >
                    <Tag className="w-3 h-3 text-red-600" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-neutral-100 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <span className="text-xs text-neutral-500 font-semibold">
                Published on Government College Alumni Association Official Portal
              </span>
              <button
                onClick={() => setActiveBlogModal(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-neutral-900 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

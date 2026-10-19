import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Tag,
  BookOpen,
  PenTool,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Eye,
  Loader2,
  AlertCircle,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import { blogsData, blogCategories } from '@/data/blogsData';
import { fetchBlogByIdOrSlug, fetchBlogsFromApi } from '@/Api/blogApi';
import buildingHeroImg from '@/assets/images/GCAAA_college_building.jpg';

export const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top whenever ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Safe author helpers
  const getAuthorName = (author) =>
    typeof author === 'object' ? author?.name || 'GCAAA Editorial Board' : author || 'GCAAA Editorial Board';
  const getAuthorRole = (author) =>
    typeof author === 'object' ? author?.role || 'Alumni Member' : 'Alumni Member';
  const getAuthorAvatar = (author) =>
    (typeof author === 'object' && author?.avatar)
      ? author.avatar
      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  // Load active blog details
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        setError(null);
        let found = null;

        // 1. Try fetching from backend API
        try {
          const res = await fetchBlogByIdOrSlug(id);
          if (res?.success && res.data) {
            found = res.data;
          }
        } catch (err) {
          console.warn('Backend fetch failed, trying local fallback:', err.message);
        }

        // 2. Fallback to static blogsData
        if (!found) {
          found = blogsData.find(
            (b) =>
              b.id === id ||
              b.slug === id ||
              b._id === id ||
              String(b.id) === String(id)
          );
        }

        if (found) {
          setBlog(found);
        } else {
          setError('The requested blog article could not be found.');
        }
      } catch (err) {
        setError('Failed to load blog article details.');
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, [id]);

  // Load recent blogs for sidebar
  useEffect(() => {
    const loadRecent = async () => {
      try {
        const res = await fetchBlogsFromApi({ limit: 8 });
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          setRecentBlogs(res.data);
        } else {
          setRecentBlogs(blogsData);
        }
      } catch (err) {
        setRecentBlogs(blogsData);
      }
    };
    loadRecent();
  }, []);

  // Filter other recent blogs (exclude current)
  const otherRecentBlogs = useMemo(() => {
    if (!recentBlogs || recentBlogs.length === 0) return [];
    const currentId = blog?.slug || blog?._id || blog?.id || id;
    return recentBlogs
      .filter((b) => (b.slug || b._id || b.id) !== currentId)
      .slice(0, 5);
  }, [recentBlogs, blog, id]);

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share && blog) {
      navigator
        .share({
          title: blog.title,
          text: blog.excerpt,
          url: shareUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  // Render paragraph content gracefully
  const renderFormattedContent = (contentStr) => {
    if (!contentStr) return null;

    const sections = contentStr
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    return sections.map((sec, idx) => {
      // Subheading ###
      if (sec.startsWith('### ')) {
        return (
          <h3
            key={idx}
            className="text-xl sm:text-2xl font-black text-neutral-900 mt-8 mb-3 font-serif tracking-tight border-b border-neutral-100 pb-2 flex items-center gap-2"
          >
            <span className="w-1.5 h-5 bg-[#800018] rounded-full inline-block" />
            <span>{sec.replace('### ', '')}</span>
          </h3>
        );
      }

      // Bullet lists
      if (sec.startsWith('- ') || sec.includes('\n- ')) {
        const items = sec
          .split('\n')
          .filter((line) => line.trim().startsWith('- '))
          .map((line) => line.trim().replace(/^-\s*/, ''));

        return (
          <ul key={idx} className="my-4 space-y-2.5 pl-2">
            {items.map((item, itemIdx) => (
              <li
                key={itemIdx}
                className="flex items-start gap-2.5 text-neutral-700 text-sm sm:text-base leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#800018] mt-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Normal paragraph
      return (
        <p
          key={idx}
          className="text-neutral-700 leading-relaxed text-sm sm:text-base md:text-lg mb-5"
        >
          {sec}
        </p>
      );
    });
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="w-10 h-10 text-[#800018] animate-spin mb-4" />
        <h3 className="text-lg font-bold text-neutral-800">Loading Article Details...</h3>
        <p className="text-xs text-neutral-500 mt-1">Fetching live blog contents and media</p>
      </div>
    );
  }

  // Not Found State
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-md w-full bg-white rounded-3xl border border-neutral-200 p-8 shadow-md">
          <AlertCircle className="w-14 h-14 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-black text-neutral-900 tracking-tight">Article Not Found</h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 mb-6">
            {error || 'The blog article you are looking for does not exist or has been moved.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Go Back
            </button>
            <Link
              to="/blog"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#800018] hover:bg-red-800 text-white font-bold text-xs transition-colors shadow-md text-center"
            >
              Browse All Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tagsList = Array.isArray(blog.tags) ? blog.tags : [];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* ========================================================
          1. ELEGANT HERO SECTION
      ======================================================== */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-neutral-300">
        {/* Background Campus Image Cover */}
        <img
          src={buildingHeroImg}
          alt="Government College of Architecture"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark Rich Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#40000c]/85 to-black/90" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 text-white">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-6">
            <Link to="/" className="hover:text-red-400 transition-colors">
              HOME
            </Link>
            <span className="text-red-500 font-bold">—</span>
            <Link to="/blog" className="hover:text-red-400 transition-colors">
              BLOGS
            </Link>
            <span className="text-red-500 font-bold">—</span>
            <span className="text-amber-400 truncate max-w-[200px] sm:max-w-none">
              {blog.category || 'ARTICLE'}
            </span>
          </div>

          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider shadow-sm border ${
                blog.categoryColor || 'bg-red-950/80 text-red-200 border-red-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{blog.category || 'Alumni Feature'}</span>
            </span>
          </div>

          {/* Main Article Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white font-serif tracking-tight leading-tight max-w-5xl drop-shadow-md">
            {blog.title}
          </h1>

          {/* Meta Bar: Author, Date, Read Time, Share */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-white/20">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={getAuthorAvatar(blog.author)}
                  alt={getAuthorName(blog.author)}
                  className="w-10 h-10 rounded-full object-cover border-2 border-red-400 shadow-sm"
                />
                <div>
                  <p className="font-extrabold text-white text-sm">
                    {getAuthorName(blog.author)}
                  </p>
                  <p className="text-[11px] text-neutral-300 font-medium">
                    {getAuthorRole(blog.author)}
                  </p>
                </div>
              </div>

              {/* Publication Date */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-xs">
                <Calendar className="w-3.5 h-3.5 text-red-400" />
                <span>{blog.date}</span>
              </div>

              {/* Read Time */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-xs">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>{blog.readTime || '4 min read'}</span>
              </div>

              {/* Reads / Views Count (if available) */}
              {blog.reads !== undefined && (
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-neutral-300 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-xs">
                  <Eye className="w-3.5 h-3.5 text-neutral-300" />
                  <span>{blog.reads} views</span>
                </div>
              )}
            </div>

            {/* Share Button in Hero */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-bold text-xs uppercase tracking-wider border border-white/25 backdrop-blur-md transition-all cursor-pointer shadow-md"
            >
              <Share2 className="w-4 h-4 text-amber-300" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. MAIN CONTENT & RIGHT RECENT BLOGS SIDEBAR
      ======================================================== */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 py-10 sm:py-14">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-600 hover:text-[#800018] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Blogs</span>
          </Link>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ----------------------------------------------------
              LEFT COLUMN: MAIN ARTICLE (8 cols on lg)
          ---------------------------------------------------- */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-neutral-200/90 shadow-sm overflow-hidden p-6 sm:p-8 md:p-10">
            {/* Featured Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md bg-neutral-900 border border-neutral-200 mb-8">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 z-10">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider shadow-md border ${
                    blog.categoryColor || 'bg-red-950/90 text-red-200 border-red-700'
                  }`}
                >
                  {blog.category}
                </span>
              </div>
            </div>

            {/* Excerpt Lead Callout Box */}
            {blog.excerpt && (
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-red-50/80 via-neutral-50 to-neutral-50 border-l-4 border-[#800018] text-neutral-800 text-base sm:text-lg italic font-medium leading-relaxed mb-8 shadow-2xs">
                &ldquo;{blog.excerpt}&rdquo;
              </div>
            )}

            {/* Optional Quote Callout */}
            {blog.quote && (
              <blockquote className="p-6 my-8 rounded-2xl bg-neutral-900 text-white border-l-4 border-amber-400 shadow-md">
                <p className="text-base sm:text-lg italic font-serif leading-relaxed">
                  &ldquo;{blog.quote}&rdquo;
                </p>
                {blog.quoteAuthor && (
                  <footer className="mt-3 text-xs uppercase tracking-wider text-amber-300 font-bold">
                    — {blog.quoteAuthor}
                  </footer>
                )}
              </blockquote>
            )}

            {/* Formatted Article Body */}
            <article className="prose prose-neutral max-w-none text-neutral-800">
              {renderFormattedContent(blog.content || blog.excerpt)}
            </article>

            {/* Tags Cloud */}
            {tagsList.length > 0 && (
              <div className="mt-10 pt-6 border-t border-neutral-200">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  <Tag className="w-3.5 h-3.5 text-[#800018]" />
                  <span>Article Topics:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tagsList.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-xl border border-neutral-200/80 transition-colors"
                    >
                      <span className="text-[#800018] font-bold">#</span>
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio Box */}
            <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <img
                src={getAuthorAvatar(blog.author)}
                alt={getAuthorName(blog.author)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#800018] shrink-0 shadow-md"
              />
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#800018]">
                  <User className="w-3.5 h-3.5" />
                  <span>Written By</span>
                </div>
                <h4 className="text-lg font-black text-neutral-900 tracking-tight">
                  {getAuthorName(blog.author)}
                </h4>
                <p className="text-xs font-semibold text-neutral-600">
                  {getAuthorRole(blog.author)}
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed pt-1">
                  Published and preserved on the official Government College of Architecture Alumni Association (GCAAA) platform.
                </p>
              </div>
            </div>

            {/* Bottom Actions: Share & Back */}
            <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-all shadow-2xs cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#800018]" />
                <span>All Articles</span>
              </Link>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#800018] hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedLink ? 'Link Copied!' : 'Share This Story'}</span>
              </button>
            </div>
          </main>

          {/* ----------------------------------------------------
              RIGHT COLUMN: RECENT BLOGS SIDEBAR (4 cols on lg)
          ---------------------------------------------------- */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* 1. Recent Blogs Widget */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-5 sm:p-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-5 bg-[#800018] rounded-full" />
                  <h3 className="text-base font-black text-neutral-900 uppercase tracking-tight">
                    Recent Articles
                  </h3>
                </div>
                <Link
                  to="/blog"
                  className="text-xs font-bold text-[#800018] hover:underline"
                >
                  View All
                </Link>
              </div>

              {otherRecentBlogs.length > 0 ? (
                <div className="space-y-4">
                  {otherRecentBlogs.map((item) => (
                    <Link
                      key={item.slug || item._id || item.id}
                      to={`/blog/${item.slug || item._id || item.id}`}
                      className="group flex items-start gap-3.5 p-2.5 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200/80 transition-all"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-neutral-200/70 shadow-2xs">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#800018] block truncate">
                          {item.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-[#800018] transition-colors line-clamp-2 leading-snug mt-0.5">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-semibold mt-1.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-red-600" />
                            <span>{item.date}</span>
                          </span>
                          <span>•</span>
                          <span>{item.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500 py-4 text-center">
                  No other recent articles.
                </p>
              )}
            </div>

            {/* 2. Categories Quick Filter Widget */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-2 pb-4 border-b border-neutral-200 mb-4">
                <div className="w-2.5 h-5 bg-[#800018] rounded-full" />
                <h3 className="text-base font-black text-neutral-900 uppercase tracking-tight">
                  Explore Topics
                </h3>
              </div>

              <div className="space-y-1.5">
                {blogCategories
                  .filter((c) => c !== 'All')
                  .map((cat) => (
                    <Link
                      key={cat}
                      to={`/blog`}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-red-50/70 hover:text-[#800018] transition-colors group"
                    >
                      <span className="truncate">{cat}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#800018] group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
              </div>
            </div>

            {/* 3. Alumni Submission CTA Box */}
            <div className="rounded-3xl bg-neutral-950 text-white p-6 border border-neutral-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950 border border-red-700 text-red-300 text-[10px] font-bold uppercase tracking-wider">
                  <PenTool className="w-3 h-3 text-amber-400" />
                  <span>Call For Articles</span>
                </div>
                <h4 className="text-base font-black text-white uppercase tracking-tight">
                  Share Your Architectural Insights
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Have a research piece, heritage documentation, or project story to publish? Send your article draft to the GCAAA editorial board.
                </p>
                <a
                  href="mailto:gcaaa07@gmail.com?subject=GCAAA%20Blog%20Article%20Submission"
                  className="mt-2 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#800018] hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Submit An Article</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;

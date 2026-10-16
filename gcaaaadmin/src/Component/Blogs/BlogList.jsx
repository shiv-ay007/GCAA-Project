import React from 'react'
import { Edit3, Trash2, Calendar, User, Eye, CheckCircle2, Clock } from 'lucide-react'

const BlogList = ({ blogs, onEdit, onDelete, onToggleStatus }) => {
  if (blogs.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-xs">
        <p className="text-sm font-medium text-gray-500">
          No blog articles found matching your criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="group flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-xs transition-all duration-300 hover:border-[#d4af37]/40 hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
            {/* Thumbnail */}
            <div className="h-24 w-full sm:w-36 shrink-0 overflow-hidden rounded-xl bg-gray-100">
              <img
                src={
                  blog.image ||
                  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80'
                }
                alt={blog.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#800018]/10 px-2.5 py-0.5 text-xs font-semibold text-[#800018]">
                  {blog.category}
                </span>

                <button
                  type="button"
                  onClick={() => onToggleStatus(blog.id)}
                  title="Click to toggle publish status"
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold cursor-pointer transition ${
                    blog.status === 'Published'
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 hover:bg-emerald-100'
                      : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 hover:bg-amber-100'
                  }`}
                >
                  {blog.status === 'Published' ? (
                    <CheckCircle2 size={11} />
                  ) : (
                    <Clock size={11} />
                  )}
                  {blog.status}
                </button>
              </div>

              <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-[#800018] transition-colors truncate">
                {blog.title}
              </h3>

              <p className="text-xs text-gray-500 line-clamp-2">
                {blog.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-gray-400">
                <span className="flex items-center gap-1 font-medium text-gray-600">
                  <User size={13} className="text-[#800018]" />
                  {blog.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={13} />
                  {blog.reads} reads
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 border-t border-gray-100 pt-3 md:border-t-0 md:pt-0 self-end md:self-center">
            <button
              type="button"
              onClick={() => onEdit(blog)}
              title="Edit Blog"
              className="rounded-xl border border-gray-200 bg-white p-2 text-gray-600 hover:border-[#800018] hover:text-[#800018] transition shadow-2xs"
            >
              <Edit3 size={16} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(blog.id)}
              title="Delete Blog"
              className="rounded-xl border border-gray-200 bg-white p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 transition shadow-2xs"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogList

import React, { useState } from 'react'
import BlogStats from '../Component/Blogs/BlogStats'
import BlogFilters from '../Component/Blogs/BlogFilters'
import BlogList from '../Component/Blogs/BlogList'
import BlogModal from '../Component/Blogs/BlogModal'

const initialBlogs = [
  {
    id: 1,
    title: 'Transforming Urban Landscapes: Journey of Ar. Sunita Roy',
    category: 'Alumni Spotlight',
    author: 'Editorial Desk',
    date: 'March 10, 2026',
    reads: '1,420',
    status: 'Published',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80',
    excerpt:
      'Reflecting on 20 years since graduating from GCA Lucknow, Ar. Roy discusses master-planning sustainable transit corridors and green public parks.',
  },
  {
    id: 2,
    title: 'The Evolution of Brick Masonry in Awadh Architecture',
    category: 'Architectural Opinion',
    author: 'Prof. Aniruddh Gupta',
    date: 'Feb 24, 2026',
    reads: '980',
    status: 'Published',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    excerpt:
      'How historical Lakhnawi Lakhori bricks inspired contemporary climatic thermal envelopes in Northern India.',
  },
  {
    id: 3,
    title: 'Late Night Juries, Chai at the Gate: Remembering 90s GCA Campus Life',
    category: 'Campus Memories',
    author: 'Batch of 1998 Alumni',
    date: 'Jan 15, 2026',
    reads: '2,640',
    status: 'Published',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80',
    excerpt:
      'Nostalgic memoirs from senior alumni tracing the studio culture, hand-drawn drafting boards, and everlasting camaraderie.',
  },
  {
    id: 4,
    title: 'Artificial Intelligence & Generative BIM in Architectural Practice',
    category: 'Industry Trends',
    author: 'Karan Mehra (Batch 2021)',
    date: 'March 01, 2026',
    reads: '450',
    status: 'Draft',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    excerpt:
      'A review of emergent parametric design algorithms and how recent GCA graduates are integrating AI workflows in enterprise studios.',
  },
]

const Blogs = () => {
  const [blogs, setBlogs] = useState(initialBlogs)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedStatus, setSelectedStatus] = useState('All Status')

  const [modalOpen, setModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)

  const handleOpenAdd = () => {
    setEditingBlog(null)
    setModalOpen(true)
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setBlogs((prev) => prev.filter((b) => b.id !== id))
    }
  }

  const handleToggleStatus = (id) => {
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: b.status === 'Published' ? 'Draft' : 'Published',
            }
          : b
      )
    )
  }

  const handleSave = (data) => {
    if (editingBlog) {
      setBlogs((prev) =>
        prev.map((b) => (b.id === editingBlog.id ? { ...data, id: editingBlog.id } : b))
      )
    } else {
      const newBlog = {
        ...data,
        id: Date.now(),
        reads: '0',
      }
      setBlogs([newBlog, ...blogs])
    }
  }

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All Categories' || b.category === selectedCategory

    const matchesStatus =
      selectedStatus === 'All Status' || b.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const publishedCount = blogs.filter((b) => b.status === 'Published').length
  const draftCount = blogs.filter((b) => b.status === 'Draft').length

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
          Stories & Perspectives
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Articles & Blog Management
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Publish alumni spotlights, architectural essays, and college community news.
        </p>
      </div>

      {/* KPI Stats */}
      <BlogStats
        totalBlogs={blogs.length}
        publishedCount={publishedCount}
        draftCount={draftCount}
      />

      {/* Filters */}
      <BlogFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onOpenAddModal={handleOpenAdd}
      />

      {/* Blog List */}
      <BlogList
        blogs={filteredBlogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* Modal */}
      <BlogModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingBlog={editingBlog}
      />
    </div>
  )
}

export default Blogs

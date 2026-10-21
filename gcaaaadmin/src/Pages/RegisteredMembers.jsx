import React, { useState, useEffect, useCallback } from 'react'
import MemberStats from '../Component/RegisteredMembers/MemberStats'
import MemberFilters from '../Component/RegisteredMembers/MemberFilters'
import MemberTable from '../Component/RegisteredMembers/MemberTable'
import MemberModal from '../Component/RegisteredMembers/MemberModal'
import MemberDetailModal from '../Component/RegisteredMembers/MemberDetailModal'
import {
  fetchRegisteredMembers,
  fetchMemberStats,
  createRegisteredMember,
  updateRegisteredMember,
  deleteRegisteredMember,
  fetchMemberById,
} from '../Api/registeredMemberApi'

const RegisteredMembers = () => {
  const [members, setMembers] = useState([])
  const [stats, setStats] = useState({ total: 0, verified: 0, active: 0, cohorts: [] })
  const [loading, setLoading] = useState(true)

  // Filters & Pagination State
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedCohort, setSelectedCohort] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [pageSize, setPageSize] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  // Modal & Notification State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [viewingMember, setViewingMember] = useState(null)
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // Debounce search input to avoid request flooding and race conditions
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim())
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Reset page to 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, selectedCohort, selectedStatus, pageSize])

  // Load Statistics
  const loadStats = async () => {
    try {
      const res = await fetchMemberStats()
      if (res.success && res.stats) {
        setStats({
          total: res.stats.total || 0,
          verified: res.stats.verified || 0,
          active: (res.stats.total || 0) - (res.stats.deceased || 0),
          cohorts: res.stats.cohorts || [],
        })
      }
    } catch (err) {
      console.warn('Could not load member statistics:', err.message)
    }
  }

  // Load Members List
  const loadMembers = useCallback(async () => {
    setLoading(true)
    try {
      const params = {
        page: currentPage,
        limit: pageSize,
        search: debouncedSearch,
        sortBy: 'createdAt',
        order: 'desc',
      }
      if (selectedCohort && selectedCohort !== 'all') {
        params.cohort = selectedCohort
      }
      if (selectedStatus) {
        params.status = selectedStatus
      }

      const res = await fetchRegisteredMembers(params)
      if (res.success) {
        setMembers(res.data || [])
        setTotalPages(res.totalPages || 1)
        setTotalCount(res.total || 0)
        setErrorMsg('')
      }
    } catch (err) {
      console.error('Error fetching registered members:', err.message)
      setErrorMsg('Could not connect to backend server. Please verify backend is running on port 5000.')
    } finally {
      setLoading(false)
    }
  }, [currentPage, pageSize, debouncedSearch, selectedCohort, selectedStatus])

  useEffect(() => {
    loadStats()
  }, [])

  useEffect(() => {
    loadMembers()
  }, [loadMembers])

  // Action Handlers
  const handleOpenAdd = () => {
    setEditingMember(null)
    setModalOpen(true)
  }

  const handleView = async (member) => {
    // Open immediately with cached row data for instant responsive UX
    setViewingMember(member)
    setDetailModalOpen(true)

    // Fetch full database record (including Cloudinary photo & payment proof)
    if (member._id) {
      try {
        const res = await fetchMemberById(member._id)
        if (res.success && res.data) {
          setViewingMember(res.data)
        }
      } catch (err) {
        console.warn('Could not fetch full details, keeping cached record:', err)
      }
    }
  }

  const handleApprove = async (member) => {
    try {
      await updateRegisteredMember(member._id, { status: 'Paid' })
      setFeedbackMsg(`Member ${member.name} has been verified and marked as Paid!`)
      setDetailModalOpen(false)
      loadMembers()
      loadStats()
      setTimeout(() => setFeedbackMsg(''), 4000)
    } catch (err) {
      alert(`Approval failed: ${err.response?.data?.message || err.message}`)
    }
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this registered member?')) return
    try {
      await deleteRegisteredMember(id)
      setFeedbackMsg('Member record deleted successfully.')
      loadMembers()
      loadStats()
      setTimeout(() => setFeedbackMsg(''), 3000)
    } catch (err) {
      alert(`Delete failed: ${err.response?.data?.message || err.message}`)
    }
  }

  const handleSave = async (formData) => {
    try {
      if (editingMember?._id) {
        await updateRegisteredMember(editingMember._id, formData)
        setFeedbackMsg('Member record updated successfully.')
      } else {
        await createRegisteredMember(formData)
        setFeedbackMsg('New member registered successfully.')
      }
      setModalOpen(false)
      loadMembers()
      loadStats()
      setTimeout(() => setFeedbackMsg(''), 3000)
    } catch (err) {
      alert(`Save failed: ${err.response?.data?.message || err.message}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
            Official Member Directory
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Registered Members
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage official life membership roll of Government College of Architecture Alumni Association.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 animate-in fade-in">
              <span>{errorMsg}</span>
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('')
                  loadMembers()
                }}
                className="underline hover:text-red-900 cursor-pointer font-bold"
              >
                Retry
              </button>
            </div>
          )}
          {feedbackMsg && (
            <span className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-800 animate-in fade-in">
              {feedbackMsg}
            </span>
          )}
        </div>
      </div>

      {/* KPI Stats */}
      <MemberStats
        total={stats.total}
        verified={stats.verified}
        active={stats.active}
        cohortsCount={stats.cohorts?.length || 5}
      />

      {/* Filters & Actions */}
      <MemberFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCohort={selectedCohort}
        setSelectedCohort={setSelectedCohort}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        pageSize={pageSize}
        setPageSize={setPageSize}
        onRefresh={() => {
          loadMembers()
          loadStats()
        }}
        loading={loading}
      />

      {/* Members Table */}
      <MemberTable
        members={members}
        loading={loading}
        total={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={(p) => setCurrentPage(p)}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add / Edit Modal */}
      <MemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingMember={editingMember}
      />

      {/* View Full Registration Details Modal */}
      <MemberDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        member={viewingMember}
        onEdit={handleEdit}
        onApprove={handleApprove}
      />
    </div>
  )
}

export default RegisteredMembers

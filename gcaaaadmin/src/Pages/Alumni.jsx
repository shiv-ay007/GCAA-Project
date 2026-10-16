import React, { useState } from 'react'
import AlumniStats from '../Component/Alumni/AlumniStats'
import AlumniFilters from '../Component/Alumni/AlumniFilters'
import AlumniTable from '../Component/Alumni/AlumniTable'
import AlumniModal from '../Component/Alumni/AlumniModal'

const initialAlumni = [
  {
    id: 1,
    name: 'Ar. Rajesh Verma',
    regId: 'GCA-2012-019',
    batch: 'Batch of 2012',
    degree: 'B.Arch',
    designation: 'Principal Architect',
    company: 'Studio Vistas, Lucknow',
    email: 'rajesh.verma@vistas.com',
    phone: '+91 94150 12345',
    status: 'Verified',
  },
  {
    id: 2,
    name: 'Ananya Sharma',
    regId: 'GCA-2018-044',
    batch: 'Batch of 2018',
    degree: 'M.Arch (Urban Design)',
    designation: 'Senior Urban Planner',
    company: 'Town Planning Corp, Delhi',
    email: 'ananya.s@towncorp.org',
    phone: '+91 98111 22334',
    status: 'Verified',
  },
  {
    id: 3,
    name: 'Mohd. Farhan',
    regId: 'GCA-2021-081',
    batch: 'Batch of 2021',
    degree: 'B.Arch',
    designation: 'Landscape Architect',
    company: 'GreenScape Studios, Mumbai',
    email: 'farhan.arch@greenscape.in',
    phone: '+91 91234 56789',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Kavita Sundaram',
    regId: 'GCA-2015-003',
    batch: 'Batch of 2015',
    degree: 'B.Arch',
    designation: 'Associate Director',
    company: 'ArchGlobal, Bengaluru',
    email: 'kavita.s@archglobal.com',
    phone: '+91 99887 66554',
    status: 'Verified',
  },
  {
    id: 5,
    name: 'Vikramaditya Rao',
    regId: 'GCA-2023-012',
    batch: 'Batch of 2023',
    degree: 'B.Arch',
    designation: 'Junior Architect',
    company: 'Design Hub, Lucknow',
    email: 'vikram.rao@designhub.co',
    phone: '+91 98390 11223',
    status: 'Pending',
  },
  {
    id: 6,
    name: 'Pooja Agarwal',
    regId: 'Batch of 2020',
    batch: 'Batch of 2020',
    degree: 'M.Arch (Landscape)',
    designation: 'Ecological Consultant',
    company: 'EcoHabitats, Jaipur',
    email: 'pooja.a@ecohabitats.org',
    phone: '+91 97110 33445',
    status: 'Verified',
  },
]

const Alumni = () => {
  const [alumniList, setAlumniList] = useState(initialAlumni)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBatch, setSelectedBatch] = useState('All Batches')
  const [selectedStatus, setSelectedStatus] = useState('All Status')

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAlumni, setEditingAlumni] = useState(null)

  // Handlers
  const handleOpenAdd = () => {
    setEditingAlumni(null)
    setModalOpen(true)
  }

  const handleEdit = (alumnus) => {
    setEditingAlumni(alumnus)
    setModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this alumni record?')) {
      setAlumniList((prev) => prev.filter((a) => a.id !== id))
    }
  }

  const handleToggleStatus = (id) => {
    setAlumniList((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: a.status === 'Verified' ? 'Pending' : 'Verified',
            }
          : a
      )
    )
  }

  const handleSaveAlumni = (data) => {
    if (editingAlumni) {
      setAlumniList((prev) =>
        prev.map((item) => (item.id === editingAlumni.id ? { ...data, id: editingAlumni.id } : item))
      )
    } else {
      const newAlumnus = {
        ...data,
        id: Date.now(),
      }
      setAlumniList([newAlumnus, ...alumniList])
    }
  }

  // Filtered List
  const filteredAlumni = alumniList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.regId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBatch =
      selectedBatch === 'All Batches' || item.batch === selectedBatch

    const matchesStatus =
      selectedStatus === 'All Status' || item.status === selectedStatus

    return matchesSearch && matchesBatch && matchesStatus
  })

  const verifiedCount = alumniList.filter((a) => a.status === 'Verified').length
  const pendingCount = alumniList.filter((a) => a.status === 'Pending').length

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
          Directory & Membership
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Alumni Management
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Search, verify, and maintain records of Government College of Architecture graduates.
        </p>
      </div>

      {/* KPI Stats */}
      <AlumniStats
        totalCount={alumniList.length}
        verifiedCount={verifiedCount}
        pendingCount={pendingCount}
      />

      {/* Filters & Actions */}
      <AlumniFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedBatch={selectedBatch}
        setSelectedBatch={setSelectedBatch}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onOpenAddModal={handleOpenAdd}
      />

      {/* Alumni Table */}
      <AlumniTable
        alumniList={filteredAlumni}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      {/* Add / Edit Modal */}
      <AlumniModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveAlumni}
        editingAlumni={editingAlumni}
      />
    </div>
  )
}

export default Alumni

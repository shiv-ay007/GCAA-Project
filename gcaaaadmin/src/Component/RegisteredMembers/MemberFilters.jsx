import React from 'react'
import { Search, Filter, X, RefreshCw } from 'lucide-react'

const MemberFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCohort,
  setSelectedCohort,
  selectedStatus,
  setSelectedStatus,
  pageSize,
  setPageSize,
  onRefresh,
  loading,
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xs lg:flex-row lg:items-center lg:justify-between">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search registered members by name or membership no (e.g. GCA2022101)..."
          className="w-full rounded-xl border border-gray-200 bg-[#fdfcfb] py-2.5 pl-10 pr-10 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#800018] focus:ring-2 focus:ring-[#800018]/10"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dropdown Filters & Actions */}
      <div className="flex flex-wrap items-center gap-2.5">
        <select
          value={selectedCohort}
          onChange={(e) => setSelectedCohort(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-medium text-gray-700 outline-none focus:border-[#800018]"
        >
          <option value="all">All Cohorts (B.Arch & PG)</option>
          <option value="m-arch">M.Arch</option>
          <option value="murp">MURP</option>
          <option value="miend">MIEND</option>
          <option value="mind">MIND</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-medium text-gray-700 outline-none focus:border-[#800018]"
        >
          <option value="">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-medium text-gray-700 outline-none focus:border-[#800018]"
        >
          <option value={25}>Show 25</option>
          <option value={50}>Show 50</option>
          <option value={100}>Show 100</option>
          <option value={150}>Show 150</option>
          <option value="ALL">Show ALL</option>
        </select>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          title="Refresh Data"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 active:scale-95 transition"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin text-[#800018]' : ''} />
        </button>
      </div>
    </div>
  )
}

export default MemberFilters

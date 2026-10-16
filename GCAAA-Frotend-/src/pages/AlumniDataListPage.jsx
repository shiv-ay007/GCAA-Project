import { useState, useMemo } from 'react';
import {
  Search,
  Users,
  GraduationCap,
  Calendar,
  RefreshCw,
  ChevronDown,
  ArrowUpDown,
  Download,
  AlertCircle,
  FileSpreadsheet,
  HeartHandshake
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { allCohorts, getBatchNo } from '../data/cohortRecords';

// ✅ Helper: Extract only the numeric year from strings like "Prior to 1985", "Diploma 1988-91", "2020"
const extractYear = (yearStr) => {
  if (!yearStr) return '';
  const str = yearStr.toString();
  const matches = str.match(/\d{4}/g);
  if (!matches || matches.length === 0) return str;
  // Agar multiple years hain (jaise "Diploma 1988-91"), toh pehla (start year) return karein
  return matches[0];
};

export const AlumniDataListPage = () => {
  // Course / Cohort Filter Tabs (from reference master excel sheet)
  const cohortTabs = [
    {
      id: 'all',
      label: 'ALL (85-2025)',
      course: 'Bachelor of Architecture & Foundation (Prior to 1985 - 2025)',
      count: allCohorts['all']?.records?.length || 1546,
    },
    {
      id: 'm-arch',
      label: 'M.ARCH 15-21',
      course: 'Master of Architecture (M.Arch 2015-2023)',
      count: allCohorts['m-arch']?.records?.length || 94,
    },
    {
      id: 'murp',
      label: 'MURP-20,21',
      course: 'Master of Urban & Regional Planning (MURP 2020-2025)',
      count: allCohorts['murp']?.records?.length || 100,
    },
    {
      id: 'miend',
      label: 'MIEND-20',
      course: 'Master In Environmental Design (MIEND 2020-2025)',
      count: allCohorts['miend']?.records?.length || 29,
    },
    {
      id: 'mind',
      label: 'MIND-23',
      course: 'Master In Interior Design (MIND 2023-2025)',
      count: allCohorts['mind']?.records?.length || 20,
    },
  ];

  const [activeTab, setActiveTab] = useState('all');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('year-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  // Active Cohort Dataset
  const currentCohort = allCohorts[activeTab] || allCohorts['all'];
  const currentRecords = currentCohort.records || [];

  // Sorted list of unique batch years for active cohort
  const activeBatches = useMemo(() => {
    const years = Array.from(new Set(currentRecords.map((r) => r.year.toString())));
    return years.sort((a, b) => {
      if (a.toLowerCase().includes('prior')) return -1;
      if (b.toLowerCase().includes('prior')) return 1;
      if (a.toLowerCase().includes('diploma') && !b.toLowerCase().includes('diploma')) return -1;
      if (b.toLowerCase().includes('diploma') && !a.toLowerCase().includes('diploma')) return 1;
      const numA = parseInt(a, 10);
      const numB = parseInt(b, 10);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      return a.localeCompare(b);
    });
  }, [currentRecords]);

  // Quick stats by year for active cohort
  const batchStats = useMemo(() => {
    const stats = {};
    currentRecords.forEach((item) => {
      const yr = item.year.toString();
      stats[yr] = (stats[yr] || 0) + 1;
    });
    return stats;
  }, [currentRecords]);

  // Filtered & Sorted Alumni Records
  const filteredData = useMemo(() => {
    return currentRecords
      .filter((item) => {
        // Year filter
        if (selectedYear !== 'ALL' && item.year.toString() !== selectedYear) {
          return false;
        }

        // Search Query (name, year, batch)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = item.name.toLowerCase().includes(q);
          const matchYear = item.year.toString().toLowerCase().includes(q);
          const batchStr = (item.batchNo || getBatchNo(item.year, activeTab)).toLowerCase();
          const matchBatch = batchStr.includes(q);
          if (!matchName && !matchYear && !matchBatch) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'year-asc') {
          const ya = parseInt(a.year, 10) || 1980;
          const yb = parseInt(b.year, 10) || 1980;
          return ya - yb || a.sno - b.sno;
        }
        if (sortBy === 'year-desc') {
          const ya = parseInt(a.year, 10) || 1980;
          const yb = parseInt(b.year, 10) || 1980;
          return yb - ya || a.sno - b.sno;
        }
        if (sortBy === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'name-desc') {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
  }, [currentRecords, selectedYear, searchQuery, sortBy, activeTab]);

  // Pagination calculation
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Dynamic pagination range window (e.g. 1 ... 4 5 6 ... 30)
  const paginationRange = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const range = [];
    if (currentPage <= 4) {
      range.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      range.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      range.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return range;
  }, [currentPage, totalPages]);

  // Export to CSV helper (Sr No, Year, Name) — Year only numeric
  const handleExportCSV = () => {
    if (!filteredData.length) return;
    const headers = ['Sr No.', 'Year', 'Name'];
    const rows = filteredData.map((d, index) => [
      index + 1,
      `"${extractYear(d.year)}"`,
      `"${d.name.replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GCAAA_Alumni_${activeTab}_${selectedYear}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 pb-24">
      {/* 1. Header Banner */}
      <div className="bg-[#0C0D12] text-white pt-8 sm:pt-10 pb-6 sm:pb-8 px-6 sm:px-10 md:px-14 lg:px-16 border-b border-neutral-800">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>GCAAA Official Member Directory</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                ALUMNI <span className="text-[#E31E24]">DATA LIST</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
                Official Directory of Government College of Architecture Alumni. Complete master records for B.Arch, M.Arch, MURP, MIEND, and MIND cohorts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={handleExportCSV}
                disabled={filteredData.length === 0}
                className="w-full sm:w-auto bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-neutral-200 font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition-colors border border-neutral-700 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV ({filteredData.length})</span>
              </button>
              <Link
                to="/registration"
                className="w-full sm:w-auto bg-[#E31E24] hover:bg-red-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Register New Alumni</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Cohort Filter Strip (Matching master excel tabs) */}
      <div className="bg-[#0B0F19] border-b-2 border-[#1E293B] shadow-lg sticky top-[56px] lg:top-[108px] z-30">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16">
          <div className="flex items-center overflow-x-auto no-scrollbar py-2 touch-pan-x">
            <div className="flex items-stretch border-l border-neutral-800 shrink-0">
              {cohortTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSelectedYear('ALL');
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wide border-r border-neutral-800 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-white text-neutral-950 rounded-t-lg shadow-md relative -bottom-2 border-b-2 border-emerald-600'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1 ${
                        isActive ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-6">
        
        {/* Cohort Header & Batch Quick Filter Card */}
        <div className="bg-white rounded-xl border border-neutral-200/90 p-4 sm:p-5 shadow-xs mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-100">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>{currentCohort.course}</span>
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Displaying <strong>{currentRecords.length}</strong> verified alumni across {activeBatches.length} batch groups.
              </p>
            </div>
          </div>

          {/* Filter Controls: Search, Year Dropdown, Sort, Reset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Search */}
            <div className="sm:col-span-2 lg:col-span-5 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontVariantNumeric: 'lining-nums tabular-nums' }}
                placeholder="Search alumni name or batch year..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-300 text-xs sm:text-sm focus:outline-hidden focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-white"
              />
            </div>

            {/* Year Dropdown */}
            <div className="sm:col-span-1 lg:col-span-3">
              <div className="relative">
                <Calendar className="w-4 h-4 text-red-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontVariantNumeric: 'lining-nums tabular-nums' }}
                  className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-neutral-300 text-xs sm:text-sm font-semibold text-neutral-800 focus:outline-hidden focus:border-red-600 bg-white appearance-none cursor-pointer"
                >
                  <option
                    value="ALL"
                    style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontVariantNumeric: 'lining-nums tabular-nums' }}
                  >
                    All Batches ({currentRecords.length} records)
                  </option>
                  {activeBatches.map((yr) => (
                    <option
                      key={yr}
                      value={yr}
                      style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontVariantNumeric: 'lining-nums tabular-nums' }}
                    >
                      {extractYear(yr)} ({yr}) — {batchStats[yr] || 0} alumni
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Sort By Dropdown */}
            <div className="sm:col-span-1 lg:col-span-3">
              <div className="relative">
                <ArrowUpDown className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontVariantNumeric: 'lining-nums tabular-nums' }}
                  className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-neutral-300 text-xs sm:text-sm font-semibold text-neutral-800 focus:outline-hidden focus:border-red-600 bg-white appearance-none cursor-pointer"
                >
                  <option value="year-asc" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Year: Oldest First</option>
                  <option value="year-desc" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Year: Recent First</option>
                  <option value="name-asc" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Name: A to Z</option>
                  <option value="name-desc" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>Name: Z to A</option>
                </select>
                <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Reset Filters */}
            <div className="sm:col-span-2 lg:col-span-1 flex justify-end">
              <button
                onClick={() => {
                  setSelectedYear('ALL');
                  setSearchQuery('');
                  setSortBy('year-asc');
                  setCurrentPage(1);
                }}
                title="Reset all filters"
                className="w-full py-2.5 px-3 rounded-lg border border-neutral-300 hover:border-red-600 text-neutral-700 hover:text-red-600 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-neutral-50"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="lg:hidden">Reset Filters</span>
              </button>
            </div>
          </div>

          {/* Filter tags & Counter */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-neutral-100 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-neutral-500 font-semibold">Active:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-neutral-900 text-white font-bold text-[11px]">
                {selectedYear === 'ALL' ? 'All Batches' : `${extractYear(selectedYear)} (${selectedYear})`}
              </span>
              {searchQuery && (
                <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[11px]">
                  &quot;{searchQuery}&quot;
                </span>
              )}
            </div>
            <div className="text-neutral-500 font-medium text-xs">
              Showing <strong className="text-neutral-900 font-bold">{filteredData.length}</strong> of{' '}
              <strong className="text-neutral-900 font-bold">{currentRecords.length}</strong> alumni
            </div>
          </div>
        </div>

        {/* 3. Alumni Data Table — Year column shows ONLY numeric year */}
        <div className="bg-white rounded-xl border border-neutral-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed min-w-[540px] text-xs sm:text-sm border-collapse">
              <thead className="bg-[#111827] text-white uppercase font-black text-[11px] tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-4 px-6 sm:px-10 w-1/3 text-left">SR NO.</th>
                  <th className="py-4 px-6 sm:px-10 w-1/3 text-left">YEAR</th>
                  <th className="py-4 px-6 sm:px-10 w-1/3 text-left">NAME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-800">
                {paginatedData.length > 0 ? (
                  paginatedData.map((alumnus, idx) => {
                    const globalIndex = (currentPage - 1) * itemsPerPage + idx + 1;
                    const isDeceased = alumnus.deceased || alumnus.name.toLowerCase().startsWith('late ') || alumnus.name.includes('[Deceased]') || alumnus.email?.toLowerCase().includes('no more with us');
                    const displayYear = extractYear(alumnus.year);

                    return (
                      <tr
                        key={`${activeTab}-${alumnus.year}-${alumnus.sno}-${alumnus.name}-${idx}`}
                        className={`hover:bg-red-50/40 transition-colors ${
                          isDeceased ? 'bg-neutral-50/70' : ''
                        }`}
                      >
                        {/* Sr No. — Starting (Left) */}
                        <td
                          style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontVariantNumeric: 'lining-nums tabular-nums' }}
                          className="py-3.5 px-6 sm:px-10 text-left font-bold text-neutral-400"
                        >
                          {globalIndex}
                        </td>

                        {/* Year — Middle (Left-aligned in 1/3 for equal gapping) */}
                        <td className="py-3.5 px-6 sm:px-10 text-left whitespace-nowrap">
                          <span
                            style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontVariantNumeric: 'lining-nums tabular-nums' }}
                            className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-black bg-neutral-100 border border-neutral-200 text-neutral-900"
                          >
                            {displayYear}
                          </span>
                        </td>

                        {/* Name — Ending (Left-aligned in 1/3 for equal gapping) */}
                        <td className="py-3.5 px-6 sm:px-10 font-bold text-neutral-900 text-left">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center shrink-0 uppercase shadow-2xs ${
                                isDeceased
                                  ? 'bg-neutral-200 text-neutral-700 border border-neutral-300'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {alumnus.name.replace(/^Late\s+/i, '').replace(/Prof\.|Dr\.|Ar\.|\[Deceased\]/gi, '').trim().charAt(0) || 'A'}
                            </div>
                            <div className="flex flex-col min-w-0 text-left">
                              <span className={`text-xs sm:text-sm uppercase tracking-tight ${isDeceased ? 'text-neutral-800 font-extrabold' : 'text-neutral-900'}`}>
                                {alumnus.name}
                              </span>
                              {isDeceased && (
                                <span className="text-[10px] font-semibold text-neutral-500 italic">
                                  No more with us (In Memoriam)
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-neutral-500">
                      <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                      <p className="font-semibold text-sm">No alumni records found matching the criteria.</p>
                      <p className="text-xs text-neutral-400 mt-1">
                        Try changing the batch year filter or clear the search box.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination / Item per page bar */}
          {totalItems > 0 && (
            <div className="p-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-50/80 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <span>Show per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontVariantNumeric: 'lining-nums tabular-nums' }}
                  className="border border-neutral-300 rounded px-2 py-1 bg-white font-semibold text-neutral-800 cursor-pointer"
                >
                  <option value={25} style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>25</option>
                  <option value={50} style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>50</option>
                  <option value={100} style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>100</option>
                  <option value={200} style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>200</option>
                  <option value={500} style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>500</option>
                </select>
                <span className="text-neutral-400">|</span>
                <span style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontVariantNumeric: 'lining-nums tabular-nums' }}>
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{' '}
                  {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} alumni
                </span>
              </div>

              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-2.5 py-1 border border-neutral-300 rounded hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed font-semibold cursor-pointer"
                  >
                    Prev
                  </button>
                  {paginationRange.map((p, idx) => {
                    if (p === '...') {
                      return (
                        <span key={`ellipsis-${idx}`} className="px-1.5 text-neutral-400">
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-7 h-7 rounded text-xs font-bold transition-colors cursor-pointer ${
                          currentPage === p
                            ? 'bg-neutral-900 text-white'
                            : 'border border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-2.5 py-1 border border-neutral-300 rounded hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed font-semibold cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Bottom Status Note */}
          <div className="p-3.5 bg-neutral-900 text-neutral-300 text-center text-xs flex items-center justify-center gap-2">
            <HeartHandshake className="w-4 h-4 text-red-500 shrink-0" />
            <span>
              <strong>{currentRecords.length} Alumni Records</strong> loaded for <strong>{currentCohort.course}</strong> from official Master Directory.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
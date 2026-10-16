import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowLeft, ChevronLeft, ChevronRight, FileSpreadsheet, Users } from 'lucide-react';
import { allCohorts, getMembershipNo } from '../data/cohortRecords';

// Helper to format names cleanly (Title Case, remove deceased tags)
const cleanAndFormatName = (str = '') => {
  const clean = str.replace(/\[Deceased\]/gi, '').trim();
  if (clean === clean.toUpperCase() || clean === clean.toLowerCase()) {
    return clean
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map((w) => {
        // preserve small initials like S.M. or A.K.
        if (w.includes('.')) {
          return w.toUpperCase();
        }
        return w.charAt(0).toUpperCase() + w.slice(1);
      })
      .join(' ');
  }
  return clean;
};

// Helper hook for responsive column count: 1 on mobile, 2 on tablet, 3 on desktop
const useResponsiveColumns = () => {
  const [cols, setCols] = useState(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  });

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setCols(3);
      else if (window.innerWidth >= 768) setCols(2);
      else setCols(1);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return cols;
};

export const RegisteredMembersPage = () => {
  const responsiveCols = useResponsiveColumns();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(150); // 150 gives 50 rows per column across 3 columns

  // 1. Build master sorted list of all registered members across all cohorts
  const masterMembers = useMemo(() => {
    const list = [];
    const seen = new Set();

    // Process each cohort dataset (Bachelor of Architecture and PG courses)
    Object.entries(allCohorts).forEach(([cohortKey, cohort]) => {
      (cohort.records || []).forEach((r) => {
        const rawName = r.name || '';
        const name = cleanAndFormatName(rawName);
        const memNo = r.membershipNo || getMembershipNo(r);

        const dedupeKey = `${name.toLowerCase()}___${memNo.toLowerCase()}`;
        if (!seen.has(dedupeKey)) {
          seen.add(dedupeKey);
          list.push({
            name,
            membershipNo: memNo,
            year: r.year,
            cohort: cohortKey,
          });
        }
      });
    });

    // Sort alphabetically by name (matching reference sample)
    list.sort((a, b) => a.name.localeCompare(b.name));

    // Assign sequential S.No (1, 2, 3...)
    return list.map((item, idx) => ({
      ...item,
      sno: idx + 1,
      uniqueKey: `${item.sno}-${item.membershipNo}`,
    }));
  }, []);

  // 2. Filter members based on Search Query (Name or Membership No)
  const filteredMembers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return masterMembers;

    return masterMembers.filter((item) => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchMem = (item.membershipNo || '').toLowerCase().includes(q);
      return matchName || matchMem;
    });
  }, [masterMembers, searchQuery]);

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // 3. Paginate the items (or show all if itemsPerPage === 'ALL')
  const totalFiltered = filteredMembers.length;
  const isAll = itemsPerPage === 'ALL';
  const effectiveLimit = isAll ? totalFiltered : Number(itemsPerPage);
  const totalPages = isAll ? 1 : Math.ceil(totalFiltered / effectiveLimit) || 1;

  const currentSlice = useMemo(() => {
    if (isAll) return filteredMembers;
    const start = (currentPage - 1) * effectiveLimit;
    return filteredMembers.slice(start, start + effectiveLimit);
  }, [filteredMembers, isAll, currentPage, effectiveLimit]);

  // 4. Distribute currentSlice across responsive columns (3 on desktop, 2 on tablet, 1 on mobile)
  const columnsData = useMemo(() => {
    const numCols = responsiveCols;
    const cols = [];
    const total = currentSlice.length;
    let startIndex = 0;

    for (let i = 0; i < numCols; i++) {
      const remainingCols = numCols - i;
      const remainingItems = total - startIndex;
      const chunkSize = Math.ceil(remainingItems / remainingCols);
      cols.push(currentSlice.slice(startIndex, startIndex + chunkSize));
      startIndex += chunkSize;
    }
    return cols;
  }, [currentSlice, responsiveCols]);

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-neutral-900 pb-20">
      {/* 1. Header Banner (Prevents sticky navbar overlap and matches site theme) */}
      <div className="bg-[#0C0D12] text-white pt-8 sm:pt-10 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-14 border-b border-neutral-800">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Users className="w-3.5 h-3.5" />
              <span>GCAAA Official Member Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              REGISTERED <span className="text-[#E31E24]">MEMBERS</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Official verified life membership directory of Government College of Architecture Alumni Association.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              to="/registration"
              className="w-full sm:w-auto bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition-colors border border-neutral-700 flex items-center justify-center gap-2 shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Registration</span>
            </Link>
            <Link
              to="/alumni-data-list"
              className="w-full sm:w-auto bg-[#E31E24] hover:bg-red-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Full Master Directory</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Content Card Container (Matching Sample Image Layout & Visuals) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 py-6 sm:py-8">
        <div className="bg-white rounded-xl border border-neutral-200/90 shadow-sm p-4 sm:p-6 md:p-8">
          {/* Header Title (Matching 2nd Photo: "Registered Members") */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h2 className="text-2xl sm:text-3xl font-medium text-neutral-700 tracking-tight">
              Registered Members
            </h2>
            <div className="text-xs text-neutral-500 font-medium">
              Total Members: <strong className="text-neutral-900">{masterMembers.length}</strong>
            </div>
          </div>

          {/* Search Bar (Matching 2nd Photo: "Search name or membership no.") */}
          <div className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name or membership no."
              style={{
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontVariantNumeric: 'lining-nums tabular-nums',
              }}
              className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-md bg-white text-neutral-800 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-500 focus:ring-1 focus:ring-neutral-400 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Multi-Column Tables (Exact equal widths across all 3 tables with table-fixed & colgroup) */}
          {totalFiltered > 0 ? (
            <div
              className={`grid gap-4 sm:gap-6 ${
                responsiveCols === 3
                  ? 'grid-cols-3'
                  : responsiveCols === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-1'
              }`}
            >
              {columnsData.map((colItems, colIdx) => (
                <div
                  key={`col-${colIdx}`}
                  className="bg-white rounded-lg border border-neutral-200/90 overflow-hidden shadow-2xs"
                >
                  <table className="w-full table-fixed border-collapse text-xs sm:text-sm">
                    {/* Fixed column widths so every single table is identical down to the sub-pixel */}
                    <colgroup>
                      <col style={{ width: '15%' }} />
                      <col style={{ width: '53%' }} />
                      <col style={{ width: '32%' }} />
                    </colgroup>
                    <thead>
                      <tr className="bg-black text-white font-bold border-b border-neutral-700">
                        <th className="py-2.5 px-3 text-left font-bold truncate">S.No</th>
                        <th className="py-2.5 px-3 text-left font-bold truncate">Name</th>
                        <th className="py-2.5 px-3 text-left font-bold truncate whitespace-nowrap">
                          Membership No
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {colItems.map((item, rowIdx) => (
                        <tr
                          key={item.uniqueKey}
                          className={`transition-colors  hover:bg-red-100 ${
                            rowIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/80'
                          }`}
                        >
                          {/* S.No */}
                          <td
                            style={{
                              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                              fontVariantNumeric: 'lining-nums tabular-nums',
                            }}
                            className="py-2.5 px-3 text-neutral-700 font-medium align-middle truncate"
                          >
                            {item.sno}
                          </td>

                          {/* Name */}
                          <td
                            className="py-2.5 px-3 text-neutral-900 font-medium align-middle truncate"
                            title={item.name}
                          >
                            {item.name}
                          </td>

                          {/* Membership No */}
                          <td
                            style={{
                              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                              fontVariantNumeric: 'lining-nums tabular-nums',
                            }}
                            className="py-2.5 px-3 text-neutral-800 font-normal align-middle truncate whitespace-nowrap"
                            title={item.membershipNo}
                          >
                            {item.membershipNo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            /* No Results Found State */
            <div className="text-center py-16 px-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <Search className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-800">
                No registered members found
              </h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto">
                No records match &quot;<strong className="text-neutral-700">{searchQuery}</strong>&quot;.
                Try checking the spelling or search by member surname or ID.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-neutral-800 text-white text-xs font-bold rounded-md hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Bottom Pagination & Records Summary Bar */}
          {totalFiltered > 0 && (
            <div className="mt-8 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
              {/* Left: Items per page selector & status */}
              <div className="flex flex-wrap items-center gap-3">
                <span>Show:</span>
                <div className="inline-flex rounded-md border border-neutral-300 overflow-hidden bg-white">
                  {[150, 300, 600, 'ALL'].map((val) => (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() => {
                        setItemsPerPage(val);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 font-bold text-xs transition-colors cursor-pointer border-r border-neutral-200 last:border-r-0 ${
                        itemsPerPage === val
                          ? 'bg-neutral-900 text-white'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {val === 'ALL' ? 'All' : val}
                    </button>
                  ))}
                </div>
                <span className="text-neutral-400">|</span>
                <span>
                  Showing{' '}
                  <strong className="text-neutral-900 font-bold">
                    {isAll ? 1 : Math.min((currentPage - 1) * effectiveLimit + 1, totalFiltered)}
                  </strong>{' '}
                  to{' '}
                  <strong className="text-neutral-900 font-bold">
                    {isAll ? totalFiltered : Math.min(currentPage * effectiveLimit, totalFiltered)}
                  </strong>{' '}
                  of <strong className="text-neutral-900 font-bold">{totalFiltered}</strong> members
                  {searchQuery && ' (filtered)'}
                </span>
              </div>

              {/* Right: Page Navigation Buttons */}
              {!isAll && totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-2.5 py-1.5 border border-neutral-300 rounded hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <span className="px-2 font-bold text-neutral-800">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-2.5 py-1.5 border border-neutral-300 rounded hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

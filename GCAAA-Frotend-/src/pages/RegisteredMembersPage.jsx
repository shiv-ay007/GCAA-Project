import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Users,
  Loader2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { fetchRegisteredMembersFromApi } from '../Api/registeredMemberApi';

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
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(150);

  // Dynamic MongoDB state (Only from Backend)
  const [members, setMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce search query to prevent excessive API requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch purely from Backend MongoDB API
  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchRegisteredMembersFromApi({
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch,
        view: 'public',
        status: 'Paid',
        sortBy: 'createdAt',
        order: 'desc',
      });

      if (res && res.success) {
        const approvedMembers = (res.data || []).filter(
          (m) => m.status !== 'Pending' && m.status !== 'Rejected'
        );
        setMembers(approvedMembers);
        setTotalMembers(res.total ?? approvedMembers.length);
      } else {
        setError(res?.message || 'Failed to fetch registered members from server');
      }
    } catch (err) {
      console.error('Error fetching members from backend:', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Unable to load data from backend server. Please verify backend connection.'
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Determine pagination parameters
  const isAll = itemsPerPage === 'ALL';
  const effectiveLimit = isAll ? totalMembers : Number(itemsPerPage) || 150;
  const totalPages = isAll ? 1 : Math.ceil(totalMembers / effectiveLimit) || 1;

  // Distribute items across responsive columns (3 on desktop, 2 on tablet, 1 on mobile)
  // Continuous serial numbers matching totalMembers in descending order (e.g. 1731, 1730, 1729...)
  const membersWithSno = useMemo(() => {
    const pageOffset = (currentPage - 1) * effectiveLimit;
    return members.map((member, idx) => ({
      ...member,
      continuousSno: Math.max(1, totalMembers - (pageOffset + idx)),
    }));
  }, [members, currentPage, effectiveLimit, totalMembers]);

  const columnsData = useMemo(() => {
    const numCols = responsiveCols;
    const cols = [];
    const total = membersWithSno.length;
    let startIndex = 0;

    for (let i = 0; i < numCols; i++) {
      const remainingCols = numCols - i;
      const remainingItems = total - startIndex;
      const chunkSize = Math.ceil(remainingItems / remainingCols);
      cols.push(membersWithSno.slice(startIndex, startIndex + chunkSize));
      startIndex += chunkSize;
    }
    return cols;
  }, [membersWithSno, responsiveCols]);

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-neutral-900 pb-20">
      {/* 1. Header Banner */}
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

      {/* 2. Main Content Card Container */}
      <div className="max-w-[1400px] mx-auto px-2 sm:px-8 lg:px-14 py-4 sm:py-8">
        <div className="bg-white rounded-xl border border-neutral-200/90 shadow-sm p-3 sm:p-6 md:p-8">
          {/* Header Title & Dynamic Total Count from Backend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h2 className="text-2xl sm:text-3xl font-medium text-neutral-700 tracking-tight">
              Registered Members
            </h2>
            <div className="text-xs text-neutral-500 font-medium flex items-center gap-2">
              <span>Total Members:</span>
              <strong className="text-neutral-900 text-sm">
                {loading && totalMembers === 0 ? '...' : totalMembers.toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Search Bar */}
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

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={fetchMembers}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-xs cursor-pointer transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* Loading Indicator */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-500 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#E31E24]" />
              <p className="text-xs sm:text-sm font-medium">Loading registered members from database...</p>
            </div>
          ) : totalMembers > 0 && members.length > 0 ? (
            /* Multi-Column Tables with Responsive Column Widths */
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
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-xs sm:text-sm">
                      <colgroup>
                        <col className="w-12 sm:w-16" />
                        <col className="w-auto" />
                        <col className="w-28 sm:w-36" />
                      </colgroup>
                      <thead>
                        <tr className="bg-black text-white font-bold border-b border-neutral-700">
                          <th className="py-2.5 px-2 sm:px-3 text-center sm:text-left font-bold text-xs sm:text-sm whitespace-nowrap">
                            S.No
                          </th>
                          <th className="py-2.5 px-2 sm:px-3 text-left font-bold text-xs sm:text-sm">
                            Name
                          </th>
                          <th className="py-2.5 px-2 sm:px-3 text-right sm:text-left font-bold text-xs sm:text-sm whitespace-nowrap">
                            Membership No
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {colItems.map((item, rowIdx) => (
                          <tr
                            key={item._id || `${item.sno}-${item.membershipNo}-${rowIdx}`}
                            className={`transition-colors hover:bg-red-50 ${
                              rowIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/80'
                            }`}
                          >
                            {/* S.No */}
                            <td
                              style={{
                                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                                fontVariantNumeric: 'lining-nums tabular-nums',
                              }}
                              className="py-2 px-2 sm:px-3 text-neutral-600 font-medium align-middle text-center sm:text-left whitespace-nowrap text-xs sm:text-sm"
                            >
                              {item.continuousSno ?? item.sno ?? item.displaySno ?? '-'}
                            </td>

                            {/* Name */}
                            <td
                              className="py-2 px-2 sm:px-3 text-neutral-900 font-semibold align-middle text-left text-xs sm:text-sm break-words leading-snug"
                            >
                              <span>{item.name}</span>
                              {(item.status === 'In Memoriam' || item.name?.toLowerCase().startsWith('late ')) && (
                                <span className="block text-[10px] font-semibold text-neutral-500 italic mt-0.5">
                                  No more with us (In Memoriam)
                                </span>
                              )}
                            </td>

                            {/* Membership No */}
                            <td
                              style={{
                                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                                fontVariantNumeric: 'lining-nums tabular-nums',
                              }}
                              className="py-2 px-2 sm:px-3 text-neutral-800 font-medium align-middle text-right sm:text-left whitespace-nowrap text-[11px] sm:text-xs"
                            >
                              {item.membershipNo}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                {searchQuery
                  ? `No records match "${searchQuery}". Try checking the spelling or search by member name or ID.`
                  : 'No member records exist in the database.'}
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-neutral-800 text-white text-xs font-bold rounded-md hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}

          {/* Bottom Pagination & Records Summary Bar */}
          {!loading && totalMembers > 0 && (
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
                    {isAll ? 1 : Math.min((currentPage - 1) * effectiveLimit + 1, totalMembers)}
                  </strong>{' '}
                  to{' '}
                  <strong className="text-neutral-900 font-bold">
                    {isAll ? totalMembers : Math.min(currentPage * effectiveLimit, totalMembers)}
                  </strong>{' '}
                  of <strong className="text-neutral-900 font-bold">{totalMembers}</strong> members
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

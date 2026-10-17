import React from 'react'
import { Edit3, Trash2, CheckCircle2, Clock, ChevronLeft, ChevronRight, AlertCircle, ShieldCheck, Eye } from 'lucide-react'

const MemberTable = ({
  members = [],
  loading = false,
  total = 0,
  currentPage = 1,
  totalPages = 1,
  pageSize = 150,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-16 text-center shadow-xs">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-3 border-[#800018] border-t-transparent" />
        <p className="mt-3 text-xs font-semibold text-gray-500">
          Loading registered members from database...
        </p>
      </div>
    )
  }

  if (members.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-xs">
        <AlertCircle size={36} className="mx-auto text-gray-300 mb-2" />
        <h4 className="font-semibold text-gray-800 text-sm">No Member Records Found</h4>
        <p className="text-xs text-gray-400 mt-1">
          Try adjusting your search criteria or register a new alumnus.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-[#faf9f6] text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="py-3 px-3 w-14 text-center">S.No</th>
              <th className="py-3 px-3 w-28 text-center">Actions</th>
              <th className="py-3 px-4">Member Name</th>
              <th className="py-3 px-4">Membership No</th>
              <th className="py-3 px-4">Graduation Year</th>
              <th className="py-3 px-4">Course / Program</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {members.map((member, idx) => (
              <tr
                key={member._id || member.membershipNo}
                className="transition-colors hover:bg-red-50/20"
              >
                {/* S.No */}
                <td className="py-3 px-3 text-center font-mono text-xs text-gray-500 font-medium">
                  {member.sno || member.displaySno || idx + 1}
                </td>

                {/* Actions (Brought forward right after S.No) */}
                <td className="py-3 px-3 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onView && onView(member)}
                      title="View Full Registration Details"
                      className="rounded-lg p-1.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(member)}
                      title="Edit Member"
                      className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-[#800018] transition cursor-pointer"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(member._id)}
                      title="Delete Member"
                      className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>

                {/* Name */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => onView && onView(member)}
                      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-gray-100 shadow-2xs ${
                        member.photo
                          ? 'cursor-pointer hover:ring-2 hover:ring-[#800018]/40 transition'
                          : 'bg-[#800018]/10 text-[#800018]'
                      }`}
                      title={member.photo ? 'Click to view photo & details' : ''}
                    >
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement.querySelector('.avatar-fallback');
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <span
                        className={`avatar-fallback text-xs font-bold uppercase ${
                          member.photo ? 'hidden' : 'flex items-center justify-center'
                        }`}
                      >
                        {(member.firstName?.[0] || member.name?.replace(/^Ar\.\s*/i, '')?.[0] || member.name?.[0] || 'A').toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 leading-tight">
                        {member.name}
                      </p>
                      {member.email && (
                        <p className="text-[11px] text-gray-400">{member.email}</p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Membership No */}
                <td className="py-3 px-4">
                  <span className="inline-block font-mono text-xs font-bold tracking-wide text-[#700018] bg-[#d4af37]/15 px-2.5 py-0.5 rounded-md">
                    {member.membershipNo}
                  </span>
                </td>

                {/* Year */}
                <td className="py-3 px-4 text-xs font-medium text-gray-600">
                  {member.year || '—'}
                </td>

                {/* Course */}
                <td className="py-3 px-4 text-xs text-gray-600">
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">
                    {member.course || 'Bachelor of Architecture'}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3 px-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      member.status === 'Paid' || member.status === 'Verified' || member.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                        : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20'
                    }`}
                  >
                    {member.status === 'Paid' || member.status === 'Verified' || member.status === 'Active' ? (
                      <>
                        <ShieldCheck size={12} />
                        <span>Paid</span>
                      </>
                    ) : (
                      <>
                        <Clock size={12} />
                        <span>Pending</span>
                      </>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 bg-[#faf9f6] px-4 py-3 text-xs text-gray-500">
          <div>
            Showing <strong className="text-gray-900 font-semibold">{members.length}</strong> of{' '}
            <strong className="text-gray-900 font-semibold">{total.toLocaleString()}</strong> records
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
            >
              <ChevronLeft size={14} /> Prev
            </button>

            <span className="font-semibold text-gray-800">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MemberTable

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CheckCircle2, Clock, Eye, Building2, MapPin } from 'lucide-react'

const alumniData = [
  {
    id: 1,
    name: 'Ar. Rajesh Verma',
    batch: 'Batch of 2012',
    designation: 'Principal Architect',
    studio: 'Studio Vistas Architecture',
    location: 'Lucknow, UP',
    status: 'Verified',
    avatar: 'RV',
    specialization: 'Heritage Conservation',
  },
  {
    id: 2,
    name: 'Ananya Sharma',
    batch: 'Batch of 2018',
    designation: 'Senior Urban Planner',
    studio: 'Town Planning Corp',
    location: 'New Delhi',
    status: 'Verified',
    avatar: 'AS',
    specialization: 'Urban Infrastructure',
  },
  {
    id: 3,
    name: 'Mohd. Farhan',
    batch: 'Batch of 2021',
    designation: 'Landscape Architect',
    studio: 'GreenScape Studios',
    location: 'Mumbai, MH',
    status: 'Pending',
    avatar: 'MF',
    specialization: 'Eco Landscapes',
  },
  {
    id: 4,
    name: 'Kavita Sundaram',
    batch: 'Batch of 2015',
    designation: 'Associate Director',
    studio: 'ArchGlobal International',
    location: 'Bengaluru, KA',
    status: 'Verified',
    avatar: 'KS',
    specialization: 'Commercial Design',
  },
  {
    id: 5,
    name: 'Vikramaditya Rao',
    batch: 'Batch of 2023',
    designation: 'Junior Architect',
    studio: 'Design Hub Associates',
    location: 'Lucknow, UP',
    status: 'Pending',
    avatar: 'VR',
    specialization: 'Parametric Design',
  },
  {
    id: 6,
    name: 'Pooja Agarwal',
    batch: 'Batch of 2020',
    designation: 'Project Lead',
    studio: 'Studio Morphosis',
    location: 'Jaipur, RJ',
    status: 'Verified',
    avatar: 'PA',
    specialization: 'Sustainable Envelopes',
  },
  {
    id: 7,
    name: 'Ar. Nikhil Tandon',
    batch: 'Batch of 2010',
    designation: 'Managing Partner',
    studio: 'Tandon & Associates',
    location: 'Varanasi, UP',
    status: 'Verified',
    avatar: 'NT',
    specialization: 'Institutional Campus',
  },
]

const RecentAlumniTable = () => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#800018]" />
            <h3 className="font-serif text-lg font-bold text-gray-900">
              Recent Alumni Registrations
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Graduates registered on the GCA portal awaiting or completed verification
          </p>
        </div>

        <Link
          to="/alumni"
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-[#faf9f6] px-3 py-1.5 text-xs font-semibold text-[#800018] shadow-2xs transition hover:bg-[#800018] hover:text-white"
        >
          View All Directory <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-[#faf9f6] text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <th className="py-3 px-4">Alumni Member</th>
              <th className="py-3 px-4">Batch</th>
              <th className="py-3 px-4">Studio / Firm</th>
              <th className="py-3 px-4">Specialization</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {alumniData.map((alumnus) => (
              <tr
                key={alumnus.id}
                className="transition-colors hover:bg-red-50/20"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#800018]/10 text-xs font-bold text-[#800018] ring-1 ring-[#800018]/20">
                      {alumnus.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 leading-tight">
                        {alumnus.name}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                        <MapPin size={11} /> {alumnus.location}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className="inline-block rounded-md bg-[#d4af37]/15 px-2 py-0.5 text-xs font-medium text-[#700018]">
                    {alumnus.batch}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <p className="text-xs font-medium text-gray-800">
                    {alumnus.studio}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {alumnus.designation}
                  </p>
                </td>

                <td className="py-3.5 px-4 text-xs text-gray-600">
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700">
                    {alumnus.specialization}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      alumnus.status === 'Verified'
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                        : 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20'
                    }`}
                  >
                    {alumnus.status === 'Verified' ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <Clock size={12} />
                    )}
                    {alumnus.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentAlumniTable

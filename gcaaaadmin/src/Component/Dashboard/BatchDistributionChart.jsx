import React from 'react'
import { GraduationCap, MapPin, Award, Compass } from 'lucide-react'

const programs = [
  { name: 'Bachelor of Architecture (B.Arch)', count: '3,490 alumni', percentage: 72, color: 'bg-[#800018]' },
  { name: 'M.Arch (Urban Design)', count: '680 alumni', percentage: 14, color: 'bg-[#d4af37]' },
  { name: 'M.Arch (Landscape Architecture)', count: '435 alumni', percentage: 9, color: 'bg-emerald-700' },
  { name: 'Ph.D in Architecture & Planning', count: '245 alumni', percentage: 5, color: 'bg-amber-600' },
]

const chapters = [
  { city: 'Lucknow Chapter', count: '1,420 members', isHQ: true },
  { city: 'Delhi-NCR Chapter', count: '980 members', isHQ: false },
  { city: 'Mumbai & West Coast', count: '640 members', isHQ: false },
  { city: 'Bengaluru / South India', count: '510 members', isHQ: false },
  { city: 'International Alumni Chapter', count: '420 members', isHQ: false },
]

const BatchDistributionChart = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Degree Distribution */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#800018]/10 text-[#800018]">
            <GraduationCap size={18} />
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold text-gray-900">
              Alumni by Academic Program
            </h4>
            <p className="text-[11px] text-gray-400">
              Department qualification breakdown
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3.5">
          {programs.map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="font-semibold text-gray-900">{item.count}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Alumni Chapters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d4af37]/20 text-[#800018]">
            <MapPin size={18} />
          </div>
          <div>
            <h4 className="font-serif text-sm font-bold text-gray-900">
              Regional Alumni Chapters
            </h4>
            <p className="text-[11px] text-gray-400">
              Active networking clusters across regions
            </p>
          </div>
        </div>

        <div className="mt-3.5 divide-y divide-gray-50 space-y-2">
          {chapters.map((ch) => (
            <div key={ch.city} className="flex items-center justify-between pt-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#800018]" />
                <span className="font-medium text-gray-800">{ch.city}</span>
                {ch.isHQ && (
                  <span className="rounded bg-[#800018]/10 px-1.5 py-0.2 text-[9px] font-bold text-[#800018]">
                    Campus HQ
                  </span>
                )}
              </div>
              <span className="font-semibold text-gray-600">{ch.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BatchDistributionChart

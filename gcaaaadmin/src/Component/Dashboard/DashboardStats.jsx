import React from 'react'
import { Users, CalendarDays, Image, BookOpen, TrendingUp, UserCheck } from 'lucide-react'

const statsData = [
  {
    title: 'Total Alumni',
    value: '4,850',
    change: '+12.5%',
    isPositive: true,
    subtitle: 'from last batch',
    icon: Users,
    accent: '#800018',
  },
  {
    title: 'Active Events',
    value: '18',
    change: '+3 new',
    isPositive: true,
    subtitle: 'this semester',
    icon: CalendarDays,
    accent: '#d4af37',
  },
  {
    title: 'Gallery Media',
    value: '1,240',
    change: '+85',
    isPositive: true,
    subtitle: 'archived photos',
    icon: Image,
    accent: '#800018',
  },
  {
    title: 'Publications & Journals',
    value: '96',
    change: '+4 this month',
    isPositive: true,
    subtitle: 'architectural papers',
    icon: BookOpen,
    accent: '#d4af37',
  },
]

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.title}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Top gold corner accent */}
            <div className="absolute top-0 right-0 h-16 w-16 -mr-8 -mt-8 rounded-full bg-[#d4af37]/10 transition-transform group-hover:scale-150" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                  {stat.title}
                </p>
                <h3 className="mt-2 font-serif text-3xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>

              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md transition-transform group-hover:scale-110"
                style={{ backgroundColor: stat.accent }}
              >
                <Icon size={22} strokeWidth={2} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-gray-50 pt-3 text-xs">
              <span className="flex items-center gap-0.5 font-semibold text-emerald-600">
                <TrendingUp size={14} />
                {stat.change}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">{stat.subtitle}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DashboardStats

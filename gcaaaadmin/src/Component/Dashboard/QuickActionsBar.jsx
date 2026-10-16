import React from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, CalendarPlus, Upload, FileEdit, Download } from 'lucide-react'

const actions = [
  {
    title: 'Register Alumni',
    desc: 'Add new graduate record',
    icon: UserPlus,
    path: '/alumni',
    color: 'bg-[#800018] text-white',
  },
  {
    title: 'Create Event',
    desc: 'Schedule reunion or meet',
    icon: CalendarPlus,
    path: '/events',
    color: 'bg-[#9f1239] text-white',
  },
  {
    title: 'Upload Gallery',
    desc: 'Share campus memories',
    icon: Upload,
    path: '/gallery',
    color: 'bg-[#b45309] text-white',
  },
  {
    title: 'Publish Blog',
    desc: 'Post story or news',
    icon: FileEdit,
    path: '/blogs',
    color: 'bg-[#854d0e] text-white',
  },
]

const QuickActionsBar = () => {
  return (
    <div className="rounded-2xl border border-[#e9e2dc] bg-gradient-to-r from-[#700018] to-[#45000f] p-6 text-white shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5c66b]">
            Direct Operations
          </span>
          <h3 className="font-serif text-xl font-bold mt-1">
            GCAAA Quick Administration Actions
          </h3>
          <p className="text-xs text-white/70 mt-1 max-w-xl">
            Streamline association operations: register new alumni, schedule architecture exhibitions, or publish newsletters.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {actions.map((act) => {
            const Icon = act.icon
            return (
              <Link
                key={act.title}
                to={act.path}
                className="group flex flex-col items-center justify-center rounded-xl bg-white/10 p-3 text-center backdrop-blur-xs border border-white/10 hover:bg-white/20 transition-all hover:scale-105"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e5c66b] text-[#700018] shadow-sm mb-2 group-hover:scale-110 transition-transform">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <span className="text-xs font-semibold tracking-wide text-white">
                  {act.title}
                </span>
                <span className="text-[10px] text-white/60 line-clamp-1 mt-0.5">
                  {act.desc}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default QuickActionsBar

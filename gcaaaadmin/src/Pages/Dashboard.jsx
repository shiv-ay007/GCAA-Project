import React from 'react'
import DashboardStats from '../Component/Dashboard/DashboardStats'
import QuickActionsBar from '../Component/Dashboard/QuickActionsBar'
import RecentAlumniTable from '../Component/Dashboard/RecentAlumniTable'
import UpcomingEventsSection from '../Component/Dashboard/UpcomingEventsSection'
import RecentActivityFeed from '../Component/Dashboard/RecentActivityFeed'
import BatchDistributionChart from '../Component/Dashboard/BatchDistributionChart'
import FeaturedAlumniWork from '../Component/Dashboard/FeaturedAlumniWork'
import AssociationNoticeBoard from '../Component/Dashboard/AssociationNoticeBoard'

const Dashboard = () => {
  return (
    <div className="space-y-6 pb-6">
      {/* Page Title & Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
            Overview & Analytics
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Association Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Welcome to the Government College of Architecture Alumni Association management center.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Academic Year 2025-2026
          </span>
        </div>
      </div>

      {/* KPI Stats */}
      <DashboardStats />

      {/* Quick Action Operations */}
      <QuickActionsBar />

      {/* Main Grid: Fully balanced left and right columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <RecentAlumniTable />
          <FeaturedAlumniWork />
          <BatchDistributionChart />
        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-6">
          <UpcomingEventsSection />
          <AssociationNoticeBoard />
          <RecentActivityFeed />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

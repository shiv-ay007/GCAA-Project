import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../Pages/Login'
import MainLayout from '../Layout/MainLayout'
import Dashboard from '../Pages/Dashboard'
import Alumni from '../Pages/Alumni'
import Events from '../Pages/Events'
import Gallery from '../Pages/Gallery'
import Publications from '../Pages/Publications'
import Blogs from '../Pages/Blogs'
import Settings from '../Pages/Settings'
import Profile from '../Pages/Profile'

const MainRoute = () => {
  return (
    <Routes>
      {/* Auth Route */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Panel Layout Protected Route */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/blogs" element={<Blogs />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/MainLayout" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Fallback to Dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default MainRoute

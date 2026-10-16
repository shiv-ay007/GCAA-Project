import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../Pages/Login'
import MainLayout from '../Layout/MainLayout'
import Dashboard from '../Pages/Dashboard'
import RegisteredMembers from '../Pages/RegisteredMembers'
import Alumni from '../Pages/Alumni'
import Events from '../Pages/Events'
import Gallery from '../Pages/Gallery'
import Publications from '../Pages/Publications'
import Blogs from '../Pages/Blogs'
import Settings from '../Pages/Settings'
import Profile from '../Pages/Profile'
import adminAuth from '../Api/adminAuthApi'

// Route Guard: Ensures only authenticated admins can access portal pages
const ProtectedAdminRoute = ({ children }) => {
  if (!adminAuth.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}

const MainRoute = () => {
  const isAuth = adminAuth.isAuthenticated()

  return (
    <Routes>
      {/* Public / Auth Routes */}
      <Route
        path="/"
        element={isAuth ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {/* Admin Panel Protected Routes (Requires JWT Session) */}
      <Route
        element={
          <ProtectedAdminRoute>
            <MainLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registered-members" element={<RegisteredMembers />} />
        <Route path="/all-batches" element={<Alumni />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/blogs" element={<Blogs />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/MainLayout" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={isAuth ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  )
}

export default MainRoute


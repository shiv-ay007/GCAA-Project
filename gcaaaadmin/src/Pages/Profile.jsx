import React, { useState } from 'react'
import ProfileHeader from '../Component/Profile/ProfileHeader'
import ProfileDetailsCard from '../Component/Profile/ProfileDetailsCard'
import ProfileEditModal from '../Component/Profile/ProfileEditModal'

const initialProfile = {
  name: 'Ar. Alok Nath Srivastava',
  avatarInitials: 'AS',
  role: 'Chief Administrator & Registrar',
  department: 'Alumni Affairs & External Relations',
  email: 'admin@gcaaa.org',
  phone: '+91 94151 89765',
  joinedDate: 'July 2021',
}

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile)
  const [modalOpen, setModalOpen] = useState(false)

  const handleSave = (updated) => {
    setProfile({
      ...updated,
      avatarInitials: updated.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
          Account & Credentials
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Admin Profile
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Personal identification, role assignments, and security permission scopes.
        </p>
      </div>

      <ProfileHeader
        profile={profile}
        onEditClick={() => setModalOpen(true)}
      />

      <ProfileDetailsCard profile={profile} />

      <ProfileEditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        profile={profile}
        onSave={handleSave}
      />
    </div>
  )
}

export default Profile

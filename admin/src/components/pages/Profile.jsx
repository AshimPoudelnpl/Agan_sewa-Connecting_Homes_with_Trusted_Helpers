import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { email, role } = useSelector((state) => state.user)

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{email?.charAt(0).toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-bold">Admin Profile</h1>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <p className="p-3rounded">{email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <p className="p-3 rounded capitalize">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
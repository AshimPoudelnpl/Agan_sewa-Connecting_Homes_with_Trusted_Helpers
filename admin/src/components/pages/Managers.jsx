import React, { useState } from 'react'
import DetailsModal from '../shared/Modal'

const Managers = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Manager Management
        </h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Manager
        </button>
      </div>
      <DetailsModal 
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Add Manager"
        size='4xl'
      />
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">Manager form contents goes here</p>
        
      </div>
    </div>
  )
}

export default Managers
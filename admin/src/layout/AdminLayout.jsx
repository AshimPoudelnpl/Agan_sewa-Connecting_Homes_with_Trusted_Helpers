import React from 'react'
import { Outlet } from 'react-router-dom'
import Dashboard from '../components/pages/Dashboard'
import Sidebar from '../components/shared/Sidebar'
import Managers from '../components/pages/Managers'

const AdminLayout = () => {
  return (
    <div className='flex'>
        <Sidebar/>
       
       <div className='flex-1'>
         <Outlet/>
       </div> 
    </div>
  )
}

export default AdminLayout
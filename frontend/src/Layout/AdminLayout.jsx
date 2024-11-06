import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../assets/Admin/component/Navbar'
import Header from '../assets/Admin/component/Header'

function AdminLayout() {
  return (
    <div>
     <div>
        <Header/>
      </div>
      <div>
        <Navbar/>
      </div>
      <div className='absolute w-full  h-screen top-20 left-20'>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout

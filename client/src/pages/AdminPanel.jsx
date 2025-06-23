import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { MdDashboard, MdPeople, MdInventory } from "react-icons/md";
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[user])

    const isActiveRoute = (path) => {
        return location.pathname.includes(path)
    }

  return (
    <div className='min-h-screen bg-gray-50 flex'>
        {/* Sidebar */}
        <aside className='bg-white shadow-lg w-64 min-h-screen flex flex-col'>
            {/* Header */}
            <div className='p-6 border-b border-gray-100'>
                <div className='flex items-center space-x-3'>
                    <div className='w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center'>
                        <span className='text-white font-bold text-xl'>A</span>
                    </div>
                    <div>
                        <h1 className='text-xl font-bold text-gray-800'>Admin Panel</h1>
                        <p className='text-sm text-gray-500'>Dashboard</p>
                    </div>
                </div>
            </div>

            {/* User Profile */}
            <div className='p-6 border-b border-gray-100'>
                <div className='flex items-center space-x-3'>
                    <div className='w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center'>
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className='w-12 h-12 rounded-full object-cover' alt={user?.name} />
                        ) : (
                            <FaRegCircleUser className='text-teal-600 text-xl'/>
                        )}
                    </div>
                    <div>
                        <p className='font-semibold text-gray-800 capitalize'>{user?.name}</p>
                        <p className='text-sm text-gray-500 capitalize'>{user?.role}</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className='flex-1 p-4'>
                <div className='space-y-2'>
                    <Link 
                        to={"all-users"} 
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActiveRoute('all-users') 
                                ? 'bg-teal-500 text-white shadow-md' 
                                : 'text-gray-600 hover:bg-teal-50 hover:text-teal-600'
                        }`}
                    >
                        <MdPeople className='text-xl' />
                        <span className='font-medium'>All Users</span>
                    </Link>
                    
                    <Link 
                        to={"all-products"} 
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActiveRoute('all-products') 
                                ? 'bg-teal-500 text-white shadow-md' 
                                : 'text-gray-600 hover:bg-teal-50 hover:text-teal-600'
                        }`}
                    >
                        <MdInventory className='text-xl' />
                        <span className='font-medium'>All Products</span>
                    </Link>
                </div>
            </nav>

            {/* Footer */}
            <div className='p-4 border-t border-gray-100'>
                <div className='text-center'>
                    <p className='text-xs text-gray-500'>© 2024 E-Commerce Admin</p>
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className='flex-1 overflow-hidden'>
            <div className='h-full overflow-y-auto'>
                <Outlet/>
            </div>
        </main>
    </div>
  )
}

export default AdminPanel
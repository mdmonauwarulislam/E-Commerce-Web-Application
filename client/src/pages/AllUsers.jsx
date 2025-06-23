import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit, MdSearch, MdFilterList } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    })

    const fetchAllUsers = async() =>{
        setLoading(true)
        try {
            const fetchData = await fetch(SummaryApi.allUser.url,{
                method : SummaryApi.allUser.method,
                credentials : 'include'
            })

            const dataResponse = await fetchData.json()

            if(dataResponse.success){
                setAllUsers(dataResponse.data)
            }

            if(dataResponse.error){
                toast.error(dataResponse.message)
            }
        } catch (error) {
            console.error("Error fetching users:", error)
            toast.error("Failed to fetch users")
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllUsers()
    },[])

    const filteredUsers = allUser.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getRoleBadgeColor = (role) => {
        switch(role) {
            case 'ADMIN':
                return 'badge-red'
            case 'USER':
                return 'badge-blue'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

  return (
    <div className='h-full bg-gradient-gray'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b border-gray-200 p-6 pt-10 animate-fade-in-up'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold text-gray-800'>User Management</h1>
            <p className='text-gray-600 mt-1'>Manage user accounts and permissions</p>
          </div>
          
          <div className='flex items-center gap-3'>
            {/* Search Bar */}
            <div className='relative'>
              <MdSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Search users...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64 input-teal focus-teal'
              />
            </div>
            
            {/* Filter Button */}
            <button className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover-lift'>
              <MdFilterList className='text-xl' />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='p-6'>
        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-fade-in-up'>
          <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Total Users</p>
                <p className='text-2xl font-bold text-gray-800'>{allUser.length}</p>
              </div>
              <div className='w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center'>
                <span className='text-teal-600 text-xl'>👥</span>
              </div>
            </div>
          </div>
          
          <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Admins</p>
                <p className='text-2xl font-bold text-gray-800'>
                  {allUser.filter(user => user.role === 'ADMIN').length}
                </p>
              </div>
              <div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center'>
                <span className='text-red-600 text-xl'>👑</span>
              </div>
            </div>
          </div>
          
          <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Regular Users</p>
                <p className='text-2xl font-bold text-gray-800'>
                  {allUser.filter(user => user.role === 'USER').length}
                </p>
              </div>
              <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                <span className='text-blue-600 text-xl'>👤</span>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500'></div>
          </div>
        ) : (
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-fade-in-up'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Users ({filteredUsers.length})
              </h2>
            </div>
            
            <div className='overflow-x-auto'>
              <table className='w-full admin-table'>
                <thead className='bg-gray-50 border-b border-gray-200'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Role</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Joined</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredUsers.map((user,index) => (
                    <tr key={user._id} className='hover:bg-gray-50 transition-colors duration-150'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center'>
                            <span className='text-teal-600 font-semibold text-sm'>
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900 capitalize'>{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{user.email}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {moment(user.createdAt).format('MMM DD, YYYY')}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <button 
                          className='bg-teal-100 hover:bg-teal-300 text-teal-700 p-2 rounded-lg transition-all duration-200 hover:scale-105 hover-lift' 
                          onClick={()=>{
                            setUpdateUserDetails(user)
                            setOpenUpdateRole(true)
                          }}
                        >
                          <MdModeEdit className='text-lg'/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className='text-center py-12 animate-fade-in-up'>
                <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <MdSearch className='text-gray-400 text-3xl' />
                </div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>No users found</h3>
                <p className='text-gray-500'>Try adjusting your search terms.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Update Role Modal */}
      {openUpdateRole && (
        <ChangeUserRole 
          onClose={()=>setOpenUpdateRole(false)} 
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  )
}

export default AllUsers
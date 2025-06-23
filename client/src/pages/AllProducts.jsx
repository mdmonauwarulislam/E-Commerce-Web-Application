import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'
import { MdAdd, MdSearch } from "react-icons/md";

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchAllProduct = async() =>{
    setLoading(true)
    try {
      const response = await fetch(SummaryApi.allProduct.url)
      const dataResponse = await response.json()

      console.log("product data",dataResponse)
      setAllProduct(dataResponse?.data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  const filteredProducts = allProduct.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className='h-full bg-gradient-gray'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b border-gray-200 p-6 pt-10 animate-fade-in-up'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold text-gray-800'>Products Management</h1>
            <p className='text-gray-600 mt-1'>Manage your product inventory</p>
          </div>
          
          <div className='flex items-center gap-3'>
            {/* Search Bar */}
            <div className='relative'>
              <MdSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Search products...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64 input-teal focus-teal'
              />
            </div>
            
            {/* Upload Button */}
            <button 
              className='btn-teal text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover-lift'
              onClick={()=>setOpenUploadProduct(true)}
            >
              <MdAdd className='text-xl' />
              <span>Add Product</span>
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
                <p className='text-sm font-medium text-gray-600'>Total Products</p>
                <p className='text-2xl font-bold text-gray-800'>{allProduct.length}</p>
              </div>
              <div className='w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center'>
                <MdAdd className='text-teal-600 text-xl' />
              </div>
            </div>
          </div>
          
          <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Active Products</p>
                <p className='text-2xl font-bold text-gray-800'>{allProduct.length}</p>
              </div>
              <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                <span className='text-green-600 text-xl'>✓</span>
              </div>
            </div>
          </div>
          
          <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 card-hover'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Categories</p>
                <p className='text-2xl font-bold text-gray-800'>12</p>
              </div>
              <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                <span className='text-blue-600 text-xl'>📁</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500'></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className='text-center py-12 animate-fade-in-up'>
            <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <MdSearch className='text-gray-400 text-3xl' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No products found</h3>
            <p className='text-gray-500'>Try adjusting your search terms or add a new product.</p>
          </div>
        ) : (
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-fade-in-up'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Products ({filteredProducts.length})
              </h2>
            </div>
            <div className='p-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {filteredProducts.map((product,index)=>{
                  return(
                    <AdminProductCard 
                      data={product} 
                      key={index+"allProduct"} 
                      fetchdata={fetchAllProduct}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
      )}
    </div>
  )
}

export default AllProducts
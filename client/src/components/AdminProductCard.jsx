import React, { useState } from 'react'
import { MdModeEditOutline, MdDelete, MdVisibility } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct,setEditProduct] = useState(false)

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group'>
      {/* Product Image */}
      <div className='relative h-48 bg-gray-100 overflow-hidden'>
        <img 
          src={data?.productImage[0]}  
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
          alt={data.productName}
        />
        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200'></div>
        
        {/* Action Buttons */}
        <div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200'>
          <button 
            className='w-8 h-8 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center shadow-md transition-all duration-200'
            onClick={()=>setEditProduct(true)}
          >
            <MdModeEditOutline className='text-sm'/>
          </button>
          <button className='w-8 h-8 bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center justify-center shadow-md transition-all duration-200'>
            <MdVisibility className='text-sm'/>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className='p-4'>
        <h3 className='font-semibold text-gray-800 text-sm line-clamp-2 mb-2 group-hover:text-teal-600 transition-colors duration-200'>
          {data.productName}
        </h3>
        
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <p className='text-lg font-bold text-teal-600'>
              {displayINRCurrency(data.sellingPrice)}
            </p>
            {data.mrp > data.sellingPrice && (
              <p className='text-sm text-gray-500 line-through'>
                {displayINRCurrency(data.mrp)}
              </p>
            )}
          </div>
          
          <div className='flex items-center gap-1'>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              data.category === 'mobile' ? 'bg-blue-100 text-blue-800' :
              data.category === 'laptop' ? 'bg-purple-100 text-purple-800' :
              data.category === 'camera' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {data.category}
            </span>
          </div>
        </div>

        {/* Stock Status */}
        <div className='mt-3 pt-3 border-t border-gray-100'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-gray-600'>Stock:</span>
            <span className={`font-medium ${
              data.stock > 10 ? 'text-green-600' : 
              data.stock > 0 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {data.stock > 10 ? 'In Stock' : 
               data.stock > 0 ? 'Low Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
        
      {/* Edit Product Modal */}
      {editProduct && (
        <AdminEditProduct 
          productData={data} 
          onClose={()=>setEditProduct(false)} 
          fetchdata={fetchdata}
        />
      )}
    </div>
  )
}

export default AdminProductCard
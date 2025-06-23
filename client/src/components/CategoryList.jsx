import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'
import { CategoryCardSkeleton } from './LoadingSkeleton'

const CategoryList = () => {
    const [categoryProduct,setCategoryProduct] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchCategoryProduct = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <section className="py-8 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Explore our wide range of products across different categories
          </p>
        </div>
        
        <div className="flex items-center gap-6 justify-center overflow-x-auto scrollbar-none pb-4">
            {
                loading ? (
                    Array.from({ length: 13 }).map((_, index) => (
                        <CategoryCardSkeleton key={index} />
                    ))
                ) :
                (
                    categoryProduct.map((product,index)=>{
                        return(
                            <Link to={"/product-category?category="+product?.category} className='cursor-pointer group' key={product?.category}>
                                <div className='flex flex-col items-center space-y-3 min-w-[80px]'>
                                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden p-3 bg-gradient-to-br from-teal-50 to-cyan-50 border border-gray-200 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-teal-100 group-hover:to-cyan-100'>
                                        <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply transition-transform duration-300 group-hover:scale-110'/>
                                    </div>
                                    <p className='text-center text-xs md:text-sm capitalize font-medium text-gray-700 group-hover:text-teal-700 transition-colors duration-300'>{product?.category}</p>
                                </div>
                            </Link>
                        )
                    })
                )
            }
        </div>
      </div>
    </section>
  )
}

export default CategoryList
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })

    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])

    const [sortBy,setSortBy] = useState("")

    const fetchData = async()=>{
      const response = await fetch(SummaryApi.filterProduct.url,{
        method : SummaryApi.filterProduct.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()
      setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) =>{
      const {name , value, checked} =  e.target

      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value] : checked
        }
      })
    }

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el => el)

      setFilterCategoryList(arrayOfCategory)

      //format for url change when change on the checkbox
      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1 ) === index  ){
          return `category=${el}`
        }
        return `category=${el}&&`
      })

      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])


    const handleOnChangeSortBy = (e)=>{
      const { value } = e.target

      setSortBy(value)

      if(value === 'asc'){
        setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }

      if(value === 'dsc'){
        setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])
    
  return (
    <div className='container mx-auto p-4'>

       {/***desktop version */}
       <div className='hidden lg:grid grid-cols-[200px,1fr]'>
           {/***left side */}
           <div className='bg-white p-2 overflow-y-scroll'>
                {/**sort by */}
                <div className='mb-6'>
                    <label className='block text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300 mb-2 items-center gap-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-teal-500"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15l3.5 3.5 3.5-3.5m-7-6l3.5-3.5 3.5 3.5" /></svg>
                      Sort by
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 text-sm"
                      value={sortBy}
                      onChange={handleOnChangeSortBy}
                    >
                      <option value="">Select</option>
                      <option value="asc">Price: Low to High</option>
                      <option value="dsc">Price: High to Low</option>
                    </select>
                </div>


                {/**filter by */}
                <div className=''>
                    <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300 mb-2'>Category</h3>
                    <div className='flex flex-wrap gap-2 py-2'>
                        {productCategory.map((categoryName) => {
                            const selected = !!selectCategory[categoryName?.value];
                            return (
                                <button
                                    key={categoryName?.value}
                                    type="button"
                                    onClick={() => handleSelectCategory({
                                        target: {
                                            name: 'category',
                                            value: categoryName?.value,
                                            checked: !selected
                                        }
                                    })}
                                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-300
                                        ${selected ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md border-teal-500' : 'bg-white text-teal-700 border-slate-300 hover:bg-teal-50'}`}
                                >
                                    {categoryName?.label}
                                </button>
                            );
                        })}
                    </div>
                </div>


           </div>


            {/***right side ( product ) */}
            <div className='px-4'>
              <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

             <div className='overflow-y-scroll'>
              {
                  data.length !== 0 && !loading && (
                    <VerticalCard data={data} loading={loading}/>
                  )
              }
             </div>
            </div>
       </div>
       
    </div>
  )
}

export default CategoryProduct
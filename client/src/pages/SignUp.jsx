import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imagetobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const [data,setData] = useState({
      email : "",
      password : "",
      name : "",
      confirmPassword : "",
      profilePic : "",
  })
  const navigate = useNavigate()

  const handleOnChange = (e) =>{
      const { name , value } = e.target

      setData((preve)=>{
          return{
              ...preve,
              [name] : value
          }
      })
  }

  const handleUploadPic = async(e) =>{
    const file = e.target.files[0]
    
    const imagePic = await imageTobase64(file)
    
    setData((preve)=>{
      return{
        ...preve,
        profilePic : imagePic
      }
    })

  }


  const handleSubmit = async(e) =>{
      e.preventDefault()

      if(data.password === data.confirmPassword){

        const dataResponse = await fetch(SummaryApi.signUP.url,{
            method : SummaryApi.signUP.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })
    
          const dataApi = await dataResponse.json()

          if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/login")
          }

          if(dataApi.error){
            toast.error(dataApi.message)
          }
    
      }else{
        toast.error("Please check password and confirm password")
      }

  }

  return (
    <section id='signup' className='min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-8'>
        <div className='container mx-auto px-4 flex items-center justify-center min-h-screen'>
            
            {/* Main Container */}
            <div className='bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl'>
                
                {/* Two Column Layout */}
                <div className='flex flex-col lg:flex-row'>
                    
                    {/* Left Side - Ecommerce Image */}
                    <div className='lg:w-1/2 bg-gradient-to-br from-teal-500 to-teal-600 p-6 lg:p-8 flex items-center justify-center'>
                        <div className='text-center text-white'>
                            <div className='mb-6 lg:mb-8'>
                                <h1 className='text-2xl lg:text-4xl font-bold mb-3 lg:mb-4'>Welcome to Our Store</h1>
                                <p className='text-teal-100 text-sm lg:text-lg'>Join thousands of satisfied customers and discover amazing products</p>
                            </div>
                            
                            {/* Ecommerce Illustration */}
                            <div className='relative'>
                                <div className='w-48 h-48 lg:w-64 lg:h-64 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 lg:mb-6'>
                                    <svg className='w-24 h-24 lg:w-32 lg:h-32 text-white' fill='currentColor' viewBox='0 0 24 24'>
                                        <path d='M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z'/>
                                    </svg>
                                </div>
                                <div className='absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-12 h-12 lg:w-16 lg:h-16 bg-yellow-400 rounded-full flex items-center justify-center'>
                                    <span className='text-lg lg:text-2xl'>🛍️</span>
                                </div>
                                <div className='absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 w-10 h-10 lg:w-12 lg:h-12 bg-pink-400 rounded-full flex items-center justify-center'>
                                    <span className='text-base lg:text-xl'>💳</span>
                                </div>
                            </div>
                            
                            <div className='mt-6 lg:mt-8'>
                                <p className='text-teal-100 text-sm lg:text-base'>Already have an account?</p>
                                <Link to="/login" className='inline-block mt-2 px-4 lg:px-6 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-teal-600 transition-all duration-300 text-sm lg:text-base'>
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side - Signup Form */}
                    <div className='lg:w-1/2 p-6 lg:p-8'>
                        <div className='max-w-md mx-auto'>
                            <div className='text-center mb-6 lg:mb-8'>
                                <h2 className='text-2xl lg:text-3xl font-bold text-gray-800 mb-2'>Create Account</h2>
                                <p className='text-gray-600 text-sm lg:text-base'>Join our community today</p>
                            </div>

                            {/* Profile Picture Upload */}
                            <div className='w-20 h-20 lg:w-24 lg:h-24 mx-auto relative overflow-hidden rounded-full mb-4 lg:mb-6 border-4 border-teal-100'>
                                <div className='w-full h-full flex items-center justify-center bg-teal-50'>
                                    {data.profilePic ? (
                                        <img src={data.profilePic} alt='profile' className='w-full h-full object-cover'/>
                                    ) : (
                                        <FaUser className='w-8 h-8 lg:w-10 lg:h-10 text-teal-400' />
                                    )}
                                </div>
                                <form>
                                  <label>
                                    <div className='text-xs bg-opacity-90 bg-teal-500 pb-1 lg:pb-2 pt-1 cursor-pointer text-center absolute bottom-0 w-full text-white'>
                                      Upload
                                    </div>
                                    <input type='file' className='hidden' onChange={handleUploadPic}/>
                                  </label>
                                </form>
                            </div>

                            <form className='space-y-3 lg:space-y-4' onSubmit={handleSubmit}>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1 lg:mb-2'>Full Name</label>
                                    <div className='bg-gray-50 border border-gray-200 rounded-lg p-2 lg:p-3 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200 transition-all'>
                                        <input 
                                            type='text' 
                                            placeholder='Enter your full name' 
                                            name='name'
                                            value={data.name}
                                            onChange={handleOnChange}
                                            required
                                            className='w-full h-full outline-none bg-transparent text-gray-800 placeholder-gray-500 text-sm lg:text-base'/>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1 lg:mb-2'>Email Address</label>
                                    <div className='bg-gray-50 border border-gray-200 rounded-lg p-2 lg:p-3 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200 transition-all'>
                                        <input 
                                            type='email' 
                                            placeholder='Enter your email' 
                                            name='email'
                                            value={data.email}
                                            onChange={handleOnChange}
                                            required
                                            className='w-full h-full outline-none bg-transparent text-gray-800 placeholder-gray-500 text-sm lg:text-base'/>
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1 lg:mb-2'>Password</label>
                                    <div className='bg-gray-50 border border-gray-200 rounded-lg p-2 lg:p-3 flex focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200 transition-all'>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            placeholder='Enter your password'
                                            value={data.password}
                                            name='password' 
                                            onChange={handleOnChange}
                                            required
                                            className='w-full h-full outline-none bg-transparent text-gray-800 placeholder-gray-500 text-sm lg:text-base'/>
                                        <div className='cursor-pointer text-gray-500 hover:text-teal-600 transition-colors' onClick={()=>setShowPassword((preve)=>!preve)}>
                                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1 lg:mb-2'>Confirm Password</label>
                                    <div className='bg-gray-50 border border-gray-200 rounded-lg p-2 lg:p-3 flex focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200 transition-all'>
                                        <input 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            placeholder='Confirm your password'
                                            value={data.confirmPassword}
                                            name='confirmPassword' 
                                            onChange={handleOnChange}
                                            required
                                            className='w-full h-full outline-none bg-transparent text-gray-800 placeholder-gray-500 text-sm lg:text-base'/>
                                        <div className='cursor-pointer text-gray-500 hover:text-teal-600 transition-colors' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                            {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                                        </div>
                                    </div>
                                </div>

                                <button type='submit' className='w-full bg-teal-600 hover:bg-teal-700 text-white px-4 lg:px-6 py-3 lg:py-4 rounded-lg font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mt-6 text-sm lg:text-base'>
                                    Create Account
                                </button>
                            </form>

                            <div className='text-center mt-6'>
                                <p className='text-gray-600 text-sm lg:text-base'>
                                    Already have an account? 
                                    <Link to="/login" className='text-teal-600 hover:text-teal-700 hover:underline font-medium ml-1'>
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SignUp
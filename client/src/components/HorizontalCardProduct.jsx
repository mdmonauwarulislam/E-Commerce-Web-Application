import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { ProductCardSkeleton } from './LoadingSkeleton'
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../store/cartSlice';

const HorizontalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const getCartItem = (productId) =>
      cartItems.find(item => item.productId?._id === productId);

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const updateCart = async (cartId, quantity) => {
      const response = await fetch('/api/update-cart-product', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ _id: cartId, quantity })
      });
      const data = await response.json();
      if (data.success) {
        dispatch(setCartItems(data.data));
        fetchUserAddToCart();
      }
    };

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }

    // Horizontal Product Card Skeleton
    const HorizontalProductSkeleton = () => (
        <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-lg shadow-md flex overflow-hidden animate-pulse'>
            <div className='bg-gradient-to-br from-gray-200 to-gray-300 h-full p-4 min-w-[120px] md:min-w-[145px]'></div>
            <div className='p-4 grid w-full gap-2'>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                <div className='flex gap-3 w-full'>
                    <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                    <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                </div>
                <div className='h-8 bg-gray-200 rounded w-full'></div>
            </div>
        </div>
    )

  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4 bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent'>{heading}</h2>
                
        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
            <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block hover:bg-gray-50 transition-colors duration-200' onClick={scrollLeft}>
                <FaAngleLeft/>
            </button>
            <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block hover:bg-gray-50 transition-colors duration-200' onClick={scrollRight}>
                <FaAngleRight/>
            </button> 

            {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <HorizontalProductSkeleton key={index} />
                ))
            ) : (
                data.map((product,index)=>{
                    const cartItem = getCartItem(product._id);
                    return(
                        <Link key={product?._id || `product-${index}`} to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-lg shadow-md flex overflow-hidden hover:shadow-lg transition-all duration-300 group'>
                            <div className='bg-gradient-to-br from-gray-100 to-gray-200 h-full p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center'>
                                <img src={product.productImage[0]} className='object-scale-down h-full group-hover:scale-110 transition-all duration-300'/>
                            </div>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black group-hover:text-teal-600 transition-colors duration-200'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500 text-sm'>{product?.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                    <p className='text-slate-500 line-through text-sm'>{ displayINRCurrency(product?.price)  }</p>
                                </div>
                                {cartItem ? (
                                    <div className='flex items-center gap-2'>
                                        <button className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center' onClick={e => {e.preventDefault(); updateCart(cartItem._id, cartItem.quantity - 1)}} disabled={cartItem.quantity <= 1}>-</button>
                                        <span className='text-lg font-semibold text-gray-800 min-w-[2rem] text-center'>{cartItem.quantity}</span>
                                        <button className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center' onClick={e => {e.preventDefault(); updateCart(cartItem._id, cartItem.quantity + 1)}}>+</button>
                                    </div>
                                ) : (
                                    <button className='text-sm bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-3 py-1 rounded-full transition-all duration-300 hover:shadow-md' onClick={e=>{e.preventDefault();handleAddToCart(e,product?._id)}}>Add to Cart</button>
                                )}
                            </div>
                        </Link>
                    )
                })
            )}
        </div>
    </div>
  )
}

export default HorizontalCardProduct
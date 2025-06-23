import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../store/cartSlice';

const VerticalCard = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const getCartItem = (productId) =>
      cartItems.find(item => item.productId?._id === productId);

    const handleAddToCart = async(e,id) =>{
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

    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 xl:gap-6'>
      {
           loading ? (
               loadingList.map(() => {
                   return(
                       <div className='bg-white rounded-2xl shadow-md overflow-hidden animate-pulse flex flex-col'>
                           <div className='bg-gradient-to-br from-gray-200 to-gray-300 h-48 flex justify-center items-center'></div>
                           <div className='p-4 flex-1 flex flex-col gap-3'>
                               <div className='h-5 bg-gray-200 rounded w-3/4'></div>
                               <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                               <div className='flex gap-3'>
                                   <div className='h-5 bg-gray-200 rounded w-1/3'></div>
                                   <div className='h-5 bg-gray-200 rounded w-1/3'></div>
                               </div>
                               <div className='h-9 bg-gray-200 rounded w-1/2 mt-2'></div>
                           </div>
                       </div>
                   )
               })
           ) : (
               data.map((product)=>{
                   const cartItem = getCartItem(product._id);
                   return(
                       <Link to={'/product/'+product?._id} className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group' onClick={scrollTop} key={product._id}>
                           <div className='bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex justify-center items-center'>
                               <img src={product?.productImage[0]} className='object-scale-down h-full group-hover:scale-110 transition-transform duration-300 mix-blend-multiply'/>
                           </div>
                           <div className='p-4 flex-1 flex flex-col gap-2'>
                               <h2 className='font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-gray-900 group-hover:text-teal-600 transition-colors duration-200'>{product?.productName}</h2>
                               <p className='capitalize text-teal-600 font-medium text-xs'>{product?.category}</p>
                               <div className='flex gap-3 items-end'>
                                   <p className='text-teal-700 font-bold text-lg'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                   <p className='text-gray-400 line-through text-sm'>{ displayINRCurrency(product?.price)  }</p>
                               </div>
                               {cartItem ? (
                                 <div className='flex items-center gap-2 mt-2'>
                                   <button className='w-8 h-8 rounded-full border border-teal-300 flex items-center justify-center text-teal-700 font-bold hover:bg-teal-100 disabled:opacity-50 disabled:cursor-not-allowed transition' onClick={e => {e.preventDefault(); updateCart(cartItem._id, cartItem.quantity - 1)}} disabled={cartItem.quantity <= 1}>-</button>
                                   <span className='text-lg font-semibold text-gray-800 min-w-[2rem] text-center'>{cartItem.quantity}</span>
                                   <button className='w-8 h-8 rounded-full border border-teal-300 flex items-center justify-center text-teal-700 font-bold hover:bg-teal-100 transition' onClick={e => {e.preventDefault(); updateCart(cartItem._id, cartItem.quantity + 1)}}>+</button>
                                 </div>
                               ) : (
                                 <button className='mt-2 text-sm bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2 rounded-full transition-all duration-300 hover:shadow-md' onClick={e=>{e.preventDefault();handleAddToCart(e,product?._id)}}>Add to Cart</button>
                               )}
                           </div>
                       </Link>
                   )
               })
           )
       }
      </div>
    )
}

export default VerticalCard
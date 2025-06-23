import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../store/cartSlice';

const CategroyWiseProductDisplay = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

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
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <div className="container mx-auto px-4 my-6 relative">
            <h2 className="text-2xl font-bold py-4 text-teal-700">{heading}</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,320px))] justify-center md:justify-between md:gap-6 gap-4 overflow-x-scroll scrollbar-none transition-all">
                {
                    loading ? (
                        loadingList.map((_,i)=>(
                            <div key={i} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-xl shadow-lg border border-teal-100 animate-pulse">
                                <div className="bg-teal-50 h-48 p-4 flex justify-center items-center rounded-t-xl" />
                                <div className="p-4 grid gap-3">
                                    <div className="h-6 bg-teal-100 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-teal-100 rounded w-1/2 mb-2" />
                                    <div className="flex gap-3">
                                        <div className="h-5 bg-teal-100 rounded w-1/3" />
                                        <div className="h-5 bg-teal-100 rounded w-1/3" />
                                    </div>
                                    <div className="h-8 bg-teal-100 rounded w-1/2 mt-2" />
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product) => {
                            const cartItem = getCartItem(product._id);
                            return (
                                <Link to={'/product/'+product?._id} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-xl shadow-lg border border-teal-100 hover:shadow-xl transition-all group flex flex-col" onClick={scrollTop} key={product._id}>
                                    <div className="bg-teal-50 h-48 p-4 flex justify-center items-center rounded-t-xl">
                                        <img src={product?.productImage[0]} className="object-scale-down h-full group-hover:scale-110 transition-transform duration-200 mix-blend-multiply" alt={product?.productName} />
                                    </div>
                                    <div className="p-4 grid gap-3 flex-1">
                                        <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-gray-900">{product?.productName}</h2>
                                        <p className="capitalize text-teal-600 font-medium">{product?.category}</p>
                                        <div className="flex gap-3 items-end">
                                            <p className="text-teal-700 font-bold text-lg">{ displayINRCurrency(product?.sellingPrice) }</p>
                                            <p className="text-gray-400 line-through text-sm">{ displayINRCurrency(product?.price) }</p>
                                        </div>
                                        {cartItem ? (
                                          <div className="flex items-center gap-2 mt-2">
                                            <button className="w-8 h-8 rounded-full border border-teal-300 flex items-center justify-center text-teal-700 font-bold hover:bg-teal-100 disabled:opacity-50 disabled:cursor-not-allowed transition" onClick={e => {e.preventDefault(); updateCart(cartItem._id, cartItem.quantity - 1)}} disabled={cartItem.quantity <= 1}>-</button>
                                            <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">{cartItem.quantity}</span>
                                            <button className="w-8 h-8 rounded-full border border-teal-300 flex items-center justify-center text-teal-700 font-bold hover:bg-teal-100 transition" onClick={e => {e.preventDefault(); updateCart(cartItem._id, cartItem.quantity + 1)}}>+</button>
                                          </div>
                                        ) : (
                                          <button className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full shadow-md transition font-semibold mt-2" onClick={e=>{e.preventDefault();handleAddToCart(e,product?._id)}}>Add to Cart</button>
                                        )}
                                    </div>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default CategroyWiseProductDisplay
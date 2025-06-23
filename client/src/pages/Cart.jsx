import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete, MdShoppingCart, MdRemove, MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems, setCartLoading } from '../store/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const context = useContext(Context);
    const { items: data, loading } = useSelector(state => state.cart);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        dispatch(setCartLoading(true));
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        });
        const responseData = await response.json();
        if (responseData.success) {
            dispatch(setCartItems(responseData.data));
        }
        dispatch(setCartLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ _id: id, quantity: qty + 1 })
        });
        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
        }
    };

    const decraseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ _id: id, quantity: qty - 1 })
            });
            const responseData = await response.json();
            if (responseData.success) {
                fetchData();
            }
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ _id: id })
        });
        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0);

    // Empty cart component
    const EmptyCart = () => (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm">
            <div className="text-center space-y-6">
                <div className="relative">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MdShoppingCart className="text-4xl text-gray-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-xs text-teal-600 font-semibold">0</span>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        </div>
    )

    // Loading skeleton
    const LoadingSkeleton = () => (
        <div className="space-y-4">
            {loadingCart.map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                    <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">Review your items and proceed to checkout</p>
                </div>

                {loading ? (
                    <LoadingSkeleton />
                ) : data.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {data.map((product) => (
                                <div key={product?._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex gap-4">
                                        <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                                            <img 
                                                src={product?.productId?.productImage[0]} 
                                                className="w-full h-full object-cover mix-blend-multiply" 
                                                alt={product?.productId?.productName}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                                        {product?.productId?.productName}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 capitalize mt-1">
                                                        {product?.productId.category}
                                                    </p>
                                                </div>
                                                <button 
                                                    onClick={() => deleteCartProduct(product?._id)}
                                                    className="text-gray-400 hover:text-teal-500 p-2 rounded-full hover:bg-teal-50 transition-colors duration-200"
                                                >
                                                    <MdDelete className="text-xl" />
                                                </button>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-3">
                                                    <button 
                                                        onClick={() => decraseQty(product?._id, product?.quantity)}
                                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                                                    >
                                                        <MdRemove className="text-gray-600" />
                                                    </button>
                                                    <span className="text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
                                                        {product?.quantity}
                                                    </span>
                                                    <button 
                                                        onClick={() => increaseQty(product?._id, product?.quantity)}
                                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                                                    >
                                                        <MdAdd className="text-gray-600" />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500 line-through">
                                                        {displayINRCurrency(product?.productId?.sellingPrice)}
                                                    </p>
                                                    <p className="text-lg font-bold text-teal-600">
                                                        {displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Items ({totalQty})</span>
                                        <span className="font-semibold text-gray-800">{displayINRCurrency(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-green-600 font-semibold">Free</span>
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-800">Total</span>
                                            <span className="text-2xl font-bold text-teal-600">{displayINRCurrency(totalPrice)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                                    Proceed to Checkout
                                </button>
                                
                                <div className="mt-4 text-center">
                                    <p className="text-sm text-gray-500">
                                        Secure checkout powered by Stripe
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
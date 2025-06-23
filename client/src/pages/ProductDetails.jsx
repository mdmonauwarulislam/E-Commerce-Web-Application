import React, { useCallback, useContext, useEffect, useState } from 'react'
import  { useParams, Link } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar, FaStarHalf, FaRegHeart, FaHeart, FaShareAlt, FaCheckCircle, FaTimesCircle, FaChevronLeft } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../store/cartSlice';

const TEAL = 'text-teal-600';
const TEAL_BG = 'bg-teal-600';
const TEAL_BORDER = 'border-teal-600';
const TEAL_HOVER = 'hover:bg-teal-700 hover:text-white';

const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : "",
    stock: 10, // Placeholder for stock
    rating: 4.5, // Placeholder for rating
    reviews: 12 // Placeholder for reviews
  })
  const params = useParams()
  const [loading,setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")
  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({ x : 0, y : 0 })
  const [zoomImage,setZoomImage] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [showZoomModal, setShowZoomModal] = useState(false)
  const { fetchUserAddToCart } = useContext(Context)
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const cartItem = cartItems.find(item => item.productId?._id === params.id);

  const fetchProductDetails = async()=>{
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({ productId : params?.id })
    })
    setLoading(false)
    const dataReponse = await response.json()
    setData({ ...dataReponse?.data, stock: 10, rating: 4.5, reviews: 12 }) // Add placeholder
    setActiveImage(dataReponse?.data?.productImage[0])
  }

  useEffect(()=>{ fetchProductDetails() },[params])

  const handleMouseEnterProduct = (imageURL)=> setActiveImage(imageURL)

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const { left , top, width , height } = e.target.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    setZoomImageCoordinate({ x, y })
  },[])

  const handleLeaveImageZoom = ()=> setZoomImage(false)

  const handleAddToCart = async(e,id) =>{
    await addToCart(e,id, quantity)
    fetchUserAddToCart()
  }

  const handleWishlist = () => setWishlist(w => !w)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Product link copied to clipboard!")
  }

  const handleQuantityChange = (val) => {
    if(val < 1) return;
    if(val > data.stock) return;
    setQuantity(val)
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

  // Helper for rendering stars
  const renderStars = (rating) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    return (
      <span className="flex items-center gap-0.5">
        {[...Array(full)].map((_,i) => <FaStar key={i} className="text-yellow-400" />)}
        {half && <FaStarHalf className="text-yellow-400" />}
        {[...Array(5-full-(half?1:0))].map((_,i) => <FaStar key={i+10} className="text-gray-300" />)}
      </span>
    )
  }

  // Breadcrumbs
  const breadcrumbs = (
    <nav className="text-sm mb-4 flex items-center gap-2 text-gray-500">
      <Link to="/" className="hover:underline flex items-center gap-1"><FaChevronLeft className="inline" />Home</Link>
      <span>/</span>
      <Link to={data.category ? `/category/${data.category}` : "#"} className="hover:underline">{data.category || 'Category'}</Link>
      <span>/</span>
      <span className="text-gray-700 font-medium">{data.productName || 'Product'}</span>
    </nav>
  )

  // Zoom Modal
  const zoomModal = showZoomModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={()=>setShowZoomModal(false)}>
      <img src={activeImage} alt="Zoomed" className="max-h-[80vh] max-w-[90vw] rounded shadow-lg border-4 border-white" />
    </div>
  )

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {zoomModal}
      {breadcrumbs}
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col lg:flex-row-reverse gap-4 w-full lg:w-1/2">
          <div className="relative h-[320px] w-full lg:w-[400px] bg-slate-100 rounded-lg shadow p-2 flex items-center justify-center group cursor-zoom-in" onClick={()=>setShowZoomModal(true)}>
            <img src={activeImage} alt="Product" className="h-full w-full object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-105" onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>
            {/* Magnifier effect for desktop */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[200px] min-h-[200px] w-[200px] h-[200px] bg-white border-2 border-teal-400 rounded-lg overflow-hidden shadow-lg -right-[210px] top-0 z-20 pointer-events-none">
                <div
                  className="w-full h-full scale-150"
                  style={{
                    background : `url(${activeImage})`,
                    backgroundRepeat : 'no-repeat',
                    backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
                  }}
                />
              </div>
            )}
            {/* Wishlist */}
            <button className="absolute top-3 right-3 bg-white rounded-full shadow p-2 text-xl" onClick={e => {e.stopPropagation(); handleWishlist();}} title="Add to wishlist">
              {wishlist ? <FaHeart className="text-teal-600" /> : <FaRegHeart className="text-gray-400 hover:text-teal-600" />}
            </button>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 lg:flex-col overflow-x-auto scrollbar-none h-full mt-2 lg:mt-0">
            {loading ? (
              productImageListLoading.map((_,index) => (
                <div className="h-16 w-16 bg-slate-200 rounded animate-pulse" key={"loadingImage"+index}></div>
              ))
            ) : (
              data?.productImage?.map((imgURL) => (
                <div className={`h-16 w-16 bg-slate-100 rounded p-1 border-2 ${activeImage===imgURL ? 'border-teal-600' : 'border-transparent'}`} key={imgURL}>
                  <img src={imgURL} alt="thumb" className="w-full h-full object-contain mix-blend-multiply cursor-pointer rounded" onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onClick={()=>handleMouseEnterProduct(imgURL)}/>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Product Details */}
        <div className="flex flex-col gap-3 w-full lg:w-1/2">
          {loading ? (
            <div className="grid gap-2 w-full animate-pulse">
              <div className="h-6 bg-slate-200 rounded-full w-1/3"></div>
              <div className="h-8 bg-slate-200 rounded w-2/3"></div>
              <div className="h-6 bg-slate-200 rounded w-1/4"></div>
              <div className="h-6 bg-slate-200 rounded w-1/2"></div>
              <div className="h-10 bg-slate-200 rounded w-full"></div>
              <div className="h-8 bg-slate-200 rounded w-1/2"></div>
              <div className="h-12 bg-slate-200 rounded w-full"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-semibold">{data?.brandName}</span>
                <span className="capitalize text-gray-400 text-xs">{data?.category}</span>
                <span className="flex items-center gap-1 ml-auto">
                  {data.stock > 0 ? <FaCheckCircle className="text-teal-600" title="In Stock" /> : <FaTimesCircle className="text-red-500" title="Out of Stock" />}
                  <span className={data.stock > 0 ? "text-teal-600" : "text-red-500"}>{data.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                </span>
              </div>
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">{data?.productName}</h2>
              <div className="flex items-center gap-2">
                {renderStars(data.rating)}
                <span className="text-gray-500 text-sm">({data.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-3 text-2xl lg:text-3xl font-semibold my-1">
                <span className="text-teal-600">{displayINRCurrency(data.sellingPrice)}</span>
                <span className="text-gray-400 line-through text-lg">{displayINRCurrency(data.price)}</span>
              </div>
              <div className="flex items-center gap-3 my-2">
                {cartItem ? (
                  <div className="flex items-center border rounded overflow-hidden">
                    <button className="px-2 py-1 text-lg text-gray-600 hover:text-teal-600" onClick={() => updateCart(cartItem._id, cartItem.quantity - 1)} disabled={cartItem.quantity <= 1}>-</button>
                    <span className="w-12 text-center outline-none flex items-center justify-center">{cartItem.quantity}</span>
                    <button className="px-2 py-1 text-lg text-gray-600 hover:text-teal-600" onClick={() => updateCart(cartItem._id, cartItem.quantity + 1)}>+</button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center border rounded overflow-hidden">
                      <button className="px-2 py-1 text-lg text-gray-600 hover:text-teal-600" onClick={()=>handleQuantityChange(quantity-1)} disabled={quantity<=1}>-</button>
                      <input type="number" min="1" max={data.stock} value={quantity} onChange={e=>handleQuantityChange(Number(e.target.value))} className="w-12 text-center outline-none" />
                      <button className="px-2 py-1 text-lg text-gray-600 hover:text-teal-600" onClick={()=>handleQuantityChange(quantity+1)} disabled={quantity>=data.stock}>+</button>
                    </div>
                    <button className={`rounded px-4 py-2 min-w-[120px] font-medium border-2 ${TEAL_BORDER} text-white ${TEAL_BG} hover:bg-white hover:text-teal-600 transition`} onClick={(e)=>handleAddToCart(e,data?._id)} disabled={data.stock<1}>Add To Cart</button>
                  </>
                )}
                <button className="rounded-full p-2 border border-gray-200 hover:bg-gray-100 transition" onClick={handleShare} title="Share"><FaShareAlt className="text-teal-600" /></button>
              </div>
              <div>
                <p className="text-gray-700 font-semibold my-1">Description:</p>
                <p className="text-gray-600">{data?.description}</p>
              </div>
              {/* Reviews Section (placeholder) */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Reviews</h3>
                <div className="bg-gray-50 p-3 rounded shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold text-gray-700">4.5</span>
                    <span className="text-gray-400">by John Doe</span>
                  </div>
                  <p className="text-gray-600 text-sm">Great product! Highly recommended. (This is a placeholder review.)</p>
                </div>
                <div className="text-xs text-gray-400 mt-1">(Reviews feature coming soon)</div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Related Products */}
      {data.category && (
        <div className="mt-10">
          <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Products"}/>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
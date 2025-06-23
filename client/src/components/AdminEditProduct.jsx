import React, { useState, useRef } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete, MdOutlineCheckCircle, MdOutlineCancel } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const TEAL = 'teal';

const AdminEditProduct = ({
  onClose,
  productData,
  fetchdata
}) => {
  const initialData = {
    ...productData,
    productName: productData?.productName || '',
    brandName: productData?.brandName || '',
    category: productData?.category || '',
    productImage: productData?.productImage || [],
    description: productData?.description || '',
    price: productData?.price || '',
    sellingPrice: productData?.sellingPrice || '',
    stock: productData?.stock || '',
    sku: productData?.sku || '',
    status: productData?.status ?? true,
    updatedAt: productData?.updatedAt || '',
  };
  const [data, setData] = useState(initialData);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [unsaved, setUnsaved] = useState(false);
  const fileInputRef = useRef();

  // Detect unsaved changes
  React.useEffect(() => {
    setUnsaved(JSON.stringify(data) !== JSON.stringify(initialData));
  }, [data]);

  // Confirm before closing if unsaved changes
  const handleClose = () => {
    if (unsaved) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to close?')) return;
    }
    onClose();
  };

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const uploadImageCloudinary = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url]
      }));
    } catch (err) {
      toast.error('Image upload failed');
    }
    setLoading(false);
  };

  const handleDeleteProductImage = (index) => {
    setDeleteIndex(index);
  };

  const confirmDeleteImage = () => {
    if (deleteIndex === null) return;
    const newProductImage = [...data.productImage];
    newProductImage.splice(deleteIndex, 1);
    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage]
    }));
    setDeleteIndex(null);
  };

  const cancelDeleteImage = () => setDeleteIndex(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    setLoading(false);
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    } else if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  const handleReset = () => {
    setData(initialData);
  };

  // Modern input style
  const inputClass = 'p-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all';
  const labelClass = 'mt-3 font-medium text-slate-700';

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-60 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
      <div className='bg-white shadow-xl p-6 rounded-2xl w-full max-w-2xl h-full max-h-[90%] overflow-hidden flex flex-col relative'>
        {/* Loading overlay */}
        {loading && (
          <div className='absolute inset-0 bg-white bg-opacity-70 flex flex-col justify-center items-center z-50'>
            <div className='w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-2'></div>
            <span className='text-teal-700 font-semibold'>Processing...</span>
          </div>
        )}
        <div className='flex justify-between items-center pb-3 border-b border-slate-100 mb-2'>
          <h2 className='font-bold text-xl text-teal-700'>Edit Product</h2>
          <button
            className='w-fit ml-auto text-2xl hover:text-teal-600 cursor-pointer p-1 rounded-full hover:bg-teal-50 transition-colors'
            onClick={handleClose}
            aria-label='Close edit product dialog'
            type='button'
          >
            <CgClose />
          </button>
        </div>
        <form className='grid gap-3 overflow-y-auto flex-1 pb-5 px-4' onSubmit={handleSubmit} style={{ scrollbarWidth: 'none' }}>
          <label htmlFor='productName' className={labelClass}>Product Name</label>
          <input
            type='text'
            id='productName'
            placeholder='Enter product name'
            name='productName'
            value={data.productName}
            onChange={handleOnChange}
            className={inputClass}
            required
          />
          <label htmlFor='brandName' className={labelClass}>Brand Name</label>
          <input
            type='text'
            id='brandName'
            placeholder='Enter brand name'
            value={data.brandName}
            name='brandName'
            onChange={handleOnChange}
            className={inputClass}
            required
          />
          <label htmlFor='category' className={labelClass}>Category</label>
          <select required value={data.category} name='category' onChange={handleOnChange} className={inputClass}>
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>{el.label}</option>
            ))}
          </select>
          <label htmlFor='sku' className={labelClass}>SKU</label>
          <input
            type='text'
            id='sku'
            placeholder='Enter SKU'
            name='sku'
            value={data.sku}
            onChange={handleOnChange}
            className={inputClass}
          />
          <label htmlFor='stock' className={labelClass}>Stock Quantity</label>
          <input
            type='number'
            id='stock'
            placeholder='Enter stock quantity'
            name='stock'
            value={data.stock}
            onChange={handleOnChange}
            className={inputClass}
            min={0}
          />
          <label htmlFor='status' className={labelClass}>Status</label>
          <div className='flex items-center gap-3'>
            <label className='flex items-center gap-1 cursor-pointer'>
              <input
                type='checkbox'
                name='status'
                checked={!!data.status}
                onChange={handleOnChange}
                className='accent-teal-600 w-5 h-5'
              />
              <span className='text-teal-700 font-semibold'>{data.status ? 'Active' : 'Inactive'}</span>
            </label>
          </div>
          <label htmlFor='productImage' className={labelClass}>Product Images</label>
          <div className='flex flex-wrap gap-3 mb-2'>
            {data.productImage && data.productImage.length > 0 ? (
              data.productImage.map((el, index) => (
                <div className='relative group' key={el + index}>
                  <img
                    src={el}
                    alt={el}
                    width={80}
                    height={80}
                    className='bg-slate-100 border rounded-lg cursor-pointer object-cover shadow-sm hover:shadow-md transition-shadow duration-200'
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(el);
                    }}
                  />
                  <button
                    type='button'
                    className='absolute -top-2 -right-2 p-1 text-white bg-red-600 rounded-full shadow-lg opacity-80 hover:opacity-100 transition-opacity z-10'
                    onClick={() => handleDeleteProductImage(index)}
                    aria-label='Delete image'
                  >
                    <MdDelete />
                  </button>
                </div>
              ))
            ) : (
              <p className='text-red-600 text-xs'>*Please upload product image</p>
            )}
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='file'
              id='uploadImageInput'
              className='hidden'
              onChange={handleUploadProduct}
              ref={fileInputRef}
              accept='image/*'
            />
            <button
              type='button'
              className='flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors shadow-sm'
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <FaCloudUploadAlt className='text-xl' /> Upload Image
            </button>
          </div>
          <label htmlFor='price' className={labelClass}>Price</label>
          <input
            type='number'
            id='price'
            placeholder='Enter price'
            value={data.price}
            name='price'
            onChange={handleOnChange}
            className={inputClass}
            required
            min={0}
          />
          <label htmlFor='sellingPrice' className={labelClass}>Selling Price</label>
          <input
            type='number'
            id='sellingPrice'
            placeholder='Enter selling price'
            value={data.sellingPrice}
            name='sellingPrice'
            onChange={handleOnChange}
            className={inputClass}
            required
            min={0}
          />
          <label htmlFor='description' className={labelClass}>Description</label>
          <textarea
            className='h-28 bg-slate-50 border border-slate-200 rounded resize-none p-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all'
            placeholder='Enter product description'
            rows={3}
            onChange={handleOnChange}
            name='description'
            value={data.description}
          />
          <div className='flex flex-col sm:flex-row gap-3 mt-4'>
            <button
              className='flex-1 px-3 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors font-semibold shadow-sm'
              type='submit'
              disabled={loading}
            >
              Update Product
            </button>
            <button
              className='flex-1 px-3 py-2 bg-slate-100 text-teal-700 border border-teal-200 rounded hover:bg-slate-200 transition-colors font-semibold shadow-sm'
              type='button'
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>
          </div>
          <div className='text-xs text-slate-500 mt-2'>
            Last updated: {data.updatedAt ? new Date(data.updatedAt).toLocaleString() : 'N/A'}
          </div>
        </form>
        {/* Delete image confirmation dialog */}
        {deleteIndex !== null && (
          <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'>
            <div className='bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-4'>
              <div className='text-3xl text-red-600'><MdDelete /></div>
              <div className='text-lg font-semibold text-slate-700'>Delete this image?</div>
              <div className='flex gap-4'>
                <button
                  className='flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
                  onClick={confirmDeleteImage}
                >
                  <MdOutlineCheckCircle className='text-xl' /> Yes
                </button>
                <button
                  className='flex items-center gap-1 px-4 py-2 bg-slate-100 text-slate-700 border border-slate-200 rounded hover:bg-slate-200 transition-colors'
                  onClick={cancelDeleteImage}
                >
                  <MdOutlineCancel className='text-xl' /> No
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Display image full screen */}
        {openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )}
      </div>
    </div>
  );
}

export default AdminEditProduct
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    if (!uploadImageCloudinary || !uploadImageCloudinary.secure_url) {
      toast.error("Image upload failed");
      return;
    }
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.secure_url],
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    } else if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl max-h-[85%] h-full rounded-xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center border-b p-4 bg-teal-600 text-white">
          <h2 className="text-xl font-semibold">Upload Product</h2>
          <button onClick={onClose} className="hover:text-red-200">
            <CgClose className="text-2xl" />
          </button>
        </div>

        <form
          className="p-4 overflow-y-auto h-[calc(100%-64px)] space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="productName" className="block font-semibold">
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Enter product name"
              value={data.productName}
              onChange={handleOnChange}
              className='w-full px-3 py-2 text-gray-700 border-teal-300 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
              required
            />
          </div>

          <div>
            <label htmlFor="brandName" className="block font-semibold">
              Brand Name:
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              placeholder="Enter brand name"
              value={data.brandName}
              onChange={handleOnChange}
              className='w-full px-3 py-2 text-gray-700 border-teal-300 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="mt-3 font-semibold">
              Category :
            </label>
            <select
              required
              value={data.category}
              name="category"
              onChange={handleOnChange}
              className="w-full px-3 py-2 text-gray-700 border-teal-300 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value={""}>Select Category</option>
              {productCategory.map((el, index) => (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="productImage" className="block font-semibold">
              Product Image:
            </label>
            <label htmlFor="uploadImageInput" className="block cursor-pointer">
              <div className="flex justify-center items-center mt-1 border-2 border-teal-300 border-dashed bg-gray-50 rounded-lg cursor-pointer hover:bg-teal-50 h-32">
                <div className="text-center text-gray-600 flex flex-col gap-2 justify-center items-center">
                  <span className="text-5xl text-teal-500">
                    <FaCloudUploadAlt />
                  </span>
                  <p className="text-sm text-gray-500">
                    Drag & drop or click to upload
                  </p>
                </div>
              </div>
              <input
                type="file"
                id="uploadImageInput"
                className="hidden"
                onChange={handleUploadProduct}
              />
            </label>
            {data.productImage.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {data.productImage.map((el, index) => (
                  <div className="relative group w-20 h-20" key={index}>
                    <img
                      src={el}
                      alt={`upload-${index}`}
                      className="w-full h-full object-cover rounded cursor-pointer border "
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteProductImage(index)}
                      className="absolute bottom-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-sm mt-1">
                *Please upload product image
              </p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block font-medium">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              value={data.price}
              onChange={handleOnChange}
              className="w-full p-2 bg-gray-50 border-teal-300 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 "
              required
            />
          </div>

          <div>
            <label htmlFor="sellingPrice" className="block font-medium">
              Selling Price:
            </label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              placeholder="Enter selling price"
              value={data.sellingPrice}
              onChange={handleOnChange}
              className="w-full p-2 bg-gray-50 border-teal-300 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-semibold">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              value={data.description}
              onChange={handleOnChange}
              className="h-28 w-full px-3 py-2 text-gray-700 border-teal-300 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              rows={3}
              required
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Upload Product
            </button>
          </div>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;

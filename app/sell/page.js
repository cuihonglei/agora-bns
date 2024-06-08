"use client";

import { useState } from "react";

import Head from "next/head";
import Link from "next/link";

import { useUserAuth } from "app/_utils/auth-context";
import { uploadProductImages } from "../_services/storage-service";
import { addProduct } from "../_services/product-service";
import { addUserProduct } from "../_services/user-service";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Sell() {
  const { user } = useUserAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    images: [], // Ensure this is always an array
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const fileArray = Array.from(files);
      setFormData({ ...formData, images: fileArray });

      const previewArray = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previewArray);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateFormData = (data) => {
    const requiredFields = [
      "name",
      "description",
      "price",
      "category",
      "condition",
      "images",
    ];
    for (const field of requiredFields) {
      if (
        !data[field] ||
        (Array.isArray(data[field]) && data[field].length === 0)
      ) {
        console.error(`Missing field: ${field}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form data
    if (!validateFormData(formData)) {
      toast.error(
        "Please fill in all fields and select at least one image to upload.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return; // Return early if form data is invalid
    }
  
    if (!user) {
      console.error("No authenticated user available");
      toast.error("No authenticated user available", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  
    try {
      console.log("Images to upload:", formData.images); // Debugging log
      const imageUrls = await uploadProductImages(formData.images);
  
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        condition: formData.condition,
        imageUrls: imageUrls,
        userId: user.uid,
      };
  
      console.log("Product data:", productData); // Debugging log
      const productId = await addProduct(productData);
      await addUserProduct(user.uid, productId);
  
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        condition: "",
        images: [],
      });
      setImagePreviews([]); // Clear the image previews
    } catch (error) {
      console.error("Error adding product: ", error);
      toast.error(
        "An error occurred while adding the product. Please try again later.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };
  

  return (
    <>
      <Head>
        <title>Sell Your Product | Agora BNS</title>
      </Head>

      <div className="relative min-h-screen bg-gradient-to-r from-purple-800 to-indigo-700">
        <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
            <div className="text-center">
              <Link
                href="/account"
                className="text-indigo-600 hover:text-indigo-800"
              >
                ← Back to Home
              </Link>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              List a New Product
            </h2>
            <ToastContainer />
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" value="true" />

              <div className="rounded-md shadow-sm space-y-2">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="sr-only">
                    Product Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="sr-only">
                    Description & Contact Information
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Product Description and Contact Information"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="sr-only">
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    autoComplete="price"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="sr-only">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Garden">Home & Garden</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Sports">Sports</option>
                    <option value="Food and Groceries">
                      Food and Groceries
                    </option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label htmlFor="condition" className="sr-only">
                    Condition
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                  >
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Refurbished">Refurbished</option>
                  </select>
                </div>
              </div>

              {/* Product Images */}
              {/* Product Images */}
              <div>
                <label htmlFor="images" className="sr-only">
                  Product Images
                </label>
                <input
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={handleChange}
                  required
                />
                <div className="mt-2 flex space-x-2">
                  {imagePreviews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index}`}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

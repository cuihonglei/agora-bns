"use client";

import { useState, useLayoutEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Modal from "react-modal";
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
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useLayoutEffect(() => {
    if (typeof window !== "undefined" && document.querySelector("#__next")) {
      Modal.setAppElement("#__next");
    }
  }, []);

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
    const requiredFields = ["name", "description", "price", "category", "condition", "images"];
    for (const field of requiredFields) {
      if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
        console.error(`Missing field: ${field}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData(formData)) {
      toast.error("Please fill in all fields and select at least one image to upload.", {
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
      const imageUrls = await uploadProductImages(formData.images);
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        condition: formData.condition,
        imageUrls,
        userId: user.uid,
      };
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
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding product: ", error);
      toast.error("An error occurred while adding the product. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage("");
  };

  return (
    <>
      <Head>
        <title>Sell Your Product | Agora BNS</title>
      </Head>
      <div className="relative min-h-screen bg-gradient-to-r from-purple-800 to-indigo-700 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div className="text-center">
            <Link href="/account" className="text-indigo-600 hover:text-indigo-800">
              ← Back to Home
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Sell Your Product
          </h2>
          <ToastContainer />
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm space-y-4">

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="type here..."
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Product Description & Contact Information
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="type here..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  autoComplete="price"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Sports">Sports</option>
                  <option value="Food and Groceries">Food and Groceries</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Condition */}
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                  Condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="New">Like New</option>
                  <option value="Used">Used</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
              </div>
            </div>

            {/* Product Images */}
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                Product Images
              </label>
              <input
                id="images"
                name="images"
                type="file"
                multiple
                accept="image/*"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={handleChange}
                required
              />
              <div className="mt-4 grid grid-cols-3 gap-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative h-32 cursor-pointer" onClick={() => openModal(src)}>
                    <Image
                      src={src}
                      alt={`Preview ${index}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
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

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="fixed inset-0 flex items-center justify-center z-50" overlayClassName="fixed inset-0 bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full relative">
          <button onClick={closeModal} className="absolute top-0 right-1 text-gray-700 hover:text-gray-900">
            ×
          </button>
          <Image src={selectedImage} alt="Selected Preview" layout="responsive" width={800} height={600} objectFit="contain" className="rounded-md" />
        </div>
      </Modal>
    </>
  );
}

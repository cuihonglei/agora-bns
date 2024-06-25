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
import Header from "../components/header"; 
import Footer from "../components/footer"; 

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
        imageUrls,
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
      
      <Header />

      <div className="min-h-screen bg-[#392F5A] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto p-10 mt-8 shadow-lg bg-[#FFF8F0] rounded-xl">
          <div className="mb-12 ">
            <Link href="/showproducts" className="text-indigo-600 hover:text-indigo-800">
              ← Back to Home
            </Link>
          </div>
          <h2 className="text-3xl font-extrabold text-black mb-8">Sell Your Product</h2>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black">
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="type here..."
                  type="text"
                  required
                  className="block w-full px-3 py-2 border border-gray-500 text-black"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-black">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  className="block w-full px-3 py-2 border border-gray-500 text-black"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-black">
                  Product Description & Contact Information
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="type here..."
                  rows="4"
                  required
                  className="block w-full px-3 py-2 border border-gray-500 text-black"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-black">
                  Category
                </label>
                <select
                  name="category"
                  required
                  className="block w-full px-3 py-2 border border-gray-500 text-black"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home-garden">Home & Garden</option>
                  <option value="beauty">Beauty</option>
                  <option value="automotive">Automotive</option>
                  <option value="sports">Sports</option>
                  <option value="food-groceries">Food and Groceries</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-black">
                  Condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  required
                  className="block w-full px-3 py-2 border border-gray-500 text-black"
                  value={formData.condition}
                  onChange={handleChange}
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Used">Used</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
              </div>
              <div className="col-span-2">
                <label htmlFor="images" className="block text-sm font-medium text-black">
                  Product Images
                </label>
                <input
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  required
                  className="block w-full px-3 py-2 border border-gray-500 text-black"
                  onChange={handleChange}
                />
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {imagePreviews.map((src, index) => (
                    <div key={index} className="relative h-32 cursor-pointer" onClick={() => openModal(src)}>
                      <Image
                        src={src}
                        alt={`Preview ${index}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="fixed inset-0 flex items-center justify-center z-50" overlayClassName="fixed inset-0 bg-black bg-opacity-50">
        <div className="bg-white p-4 shadow-lg max-w-2xl w-full relative">
          <button onClick={closeModal} className="absolute top-0 right-1 text-gray-700 hover:text-gray-900">
            ×
          </button>
          <Image src={selectedImage} alt="Selected Preview" layout="responsive" width={800} height={600} objectFit="contain" />
        </div>
      </Modal>

      <Footer />
    </>
  );
}

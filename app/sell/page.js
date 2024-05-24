"use client";

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useUserAuth } from 'app/_utils/auth-context';
import { storage, auth, db } from '../_utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { uploadProductImages } from '../_services/storage-service';
import { addProduct } from '../_services/product-service';
import { addUserProduct } from '../_services/user-service';
import Image from 'next/image';

export default function Sell() {
  const { user } = useUserAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    images: [], // Ensure this is always an array
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      const fileArray = Array.from(files);
      setFormData({ ...formData, images: fileArray });

      const previewArray = fileArray.map(file => URL.createObjectURL(file));
      setImagePreviews(previewArray);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateFormData = (data) => {
    const requiredFields = ['name', 'description', 'price', 'category', 'condition', 'images'];
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
      alert('Please fill in all fields and select at least one image to upload.');
      return;
    }

    if (!user) {
      console.error("No authenticated user available");
      alert('No authenticated user available');
      return;
    }

    try {
      console.log('Images to upload:', formData.images); // Debugging log
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

      console.log('Product data:', productData); // Debugging log
      const productId = await addProduct(productData);
      await addUserProduct(user.uid, productId);

      alert('Product added successfully!');
      setFormData({ name: '', description: '', price: '', category: '', condition: '', images: [] });
      setImagePreviews([]); // Clear the image previews
    } catch (error) {
      console.error("Error adding product: ", error);
      alert('Error adding product. Please try again.');
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
              <Link href="/account" className="text-indigo-600 hover:text-indigo-800">
                ← Back to Home
              </Link>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              List a New Product
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" value="true" />

              <div className="rounded-md shadow-sm space-y-2">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="sr-only">Product Name</label>
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
                  <label htmlFor="description" className="sr-only">Description & Contact Information</label>
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
                  <label htmlFor="price" className="sr-only">Price</label>
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
                  <label htmlFor="category" className="sr-only">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required>
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
                  <label htmlFor="condition" className="sr-only">Condition</label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required>
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Refurbished">Refurbished</option>
                  </select>
                </div>
              </div>

              {/* Product Images */}
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">Product Images</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm leading-tight text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="w-20 h-20 relative">
                      <Image
                        src={preview}
                        alt={`Preview ${index}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  List Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

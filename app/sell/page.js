"use client";

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { storage, auth, db } from '../_utils/firebase'; // Adjust the path as necessary to import your Firebase config
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

import { useUserAuth } from 'app/_utils/auth-context';

export default function Sell() {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please select an image to upload.');
      return;
    }

    if (!auth.currentUser) {
      console.error("No authenticated user available");
      alert('No authenticated user available');
      return;
    }

    try {
      const imageName = `${Date.now()}_${formData.image.name}`;
      console.log("Uploading image", imageName);
      const imageRef = ref(storage, `products/${imageName}`);
      const snapshot = await uploadBytes(imageRef, formData.image);
      const imageUrl = await getDownloadURL(snapshot.ref);
      console.log("Image URL", imageUrl);
  
      const docRef = await addDoc(collection(db, "products"), {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        condition: formData.condition,
        imageUrl: imageUrl, // Store image URL in Firestore
        userId: auth.currentUser.uid
      });
  
      console.log("Document written with ID: ", docRef.id);
      alert('Product added successfully!');
      setFormData({ name: '', description: '', price: '', category: '', image: null }); // Reset form after successful submission
    } catch (error) {
      console.error("Error adding document: ", error);
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
              <div className="rounded-md shadow-sm -space-y-px">
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
                    <option value="Food and groceries">Food and Groceries</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
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
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm leading-tight text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
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

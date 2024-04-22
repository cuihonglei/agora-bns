"use client";

import React, { useState, useEffect } from 'react';
import { db } from '../_utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

function ShowProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = [];
        querySnapshot.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Show Products | Agora BNS</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <header className="bg-white shadow-md fixed w-full z-50 top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6 md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <Link href="/account">
                    <Image src="/image/agoralogo.jpg" alt="Agora BNS Logo" width={80} height={70} layout="fixed" />
                </Link>
              </div>
              <nav className="hidden md:flex space-x-10">
                <Link href="/categories" className="text-base font-medium text-gray-500 hover:text-gray-900">Categories</Link>
                <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">About Us</Link>
                <Link href="/sell" className="text-base font-medium text-gray-500 hover:text-gray-900">Sell Products</Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="bg-white pt-24 pb-12 flex-grow ">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-black pt-20">Available Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-black">{product.name}</h2>
                    <p className="text-sm text-gray-600 text-black">{product.description}</p>
                    <p className="text-lg font-medium text-black">{product.price ? `$${product.price}` : 'Free'}</p>
                    <p className="text-sm text-gray-600 text-black">Category: {product.category}</p>
                    <p className="text-sm text-gray-600 text-black">Condition: {product.condition}</p>
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mt-2" onError={(e) => { e.target.onerror = null; e.target.src='/no-image-available.png'; }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/account" className="text-blue-600 hover:text-blue-800 font-semibold">
                ← Back to Home
              </Link>
            </div>
          </div>
        </main>

        <footer className="bg-white">
          <div className="max-w-7xl mx-auto py-4 px-4 overflow-hidden sm:px-6 lg:px-8">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 Agora BNS. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default ShowProducts;

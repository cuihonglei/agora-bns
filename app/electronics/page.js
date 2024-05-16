"use client";

import React, { useState, useEffect } from 'react';
import { db } from '../_utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/footer';
import { useUserAuth } from '../_utils/auth-context';

function ShowProducts() {
  const { user, firebaseSignOut } = useUserAuth();
  const [products, setProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userName = user ? user.displayName : "Not logged in";

  const handleLogout = async () => {
    await firebaseSignOut();
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), where('category', '==', 'Electronics'));
        const querySnapshot = await getDocs(q);
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
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
                <Image src="/image/agoralogo.jpg" alt="Agora BNS Logo" width={80} height={70}/>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <div
              className="relative pb-1"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <a
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Categories ↓
              </a>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg w-48">
                  <Link
                    href="/electronics"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Electronics
                  </Link>
                  <Link
                    href="/fashion"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Fashion
                  </Link>
                  <Link
                    href="/garden"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Home & Garden
                  </Link>
                  <Link
                    href="/beauty"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Beauty
                  </Link>
                  <Link
                    href="/automotive"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Automotive
                  </Link>
                  <Link
                    href="/food"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Food & Groceries
                  </Link>
                  <Link
                    href="/sports"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sports
                  </Link>
                  <Link
                    href="/others"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Others
                  </Link>
                </div>
                )}
            </div>
            <div className="hidden md:flex space-x-10">
            <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
              About Us
            </Link>
          </div>
            <Link
              href="/sell"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Sell Products
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <div className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                {user ? `Welcome, ${user.displayName}` : "Not logged in"}
            </div>
            <nav>
              <Link href="https://agora-bns.vercel.app/"> {/*change link when deployed to vercel */}
                <button
                  onClick={handleLogout}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:bg-gradient-to-br"
                >
                  Logout
                </button>
              </Link>
            </nav>
          </div>
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
        
        <Footer />
        
      </div>
    </>
  );
}

export default ShowProducts;


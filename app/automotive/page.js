"use client";

import React, { useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Header from '../components/header';
import Footer from '../components/footer';

import { db } from '../_utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function ShowProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), where('category', '==', 'Automotive'));
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

      <Header />
      <main className="bg-white pt-24 pb-12 flex-grow ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-black pt-20">Available Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-black">{product.name}</h2>
                  <p className="text-sm text-black">{product.description}</p>
                  <p className="text-lg font-medium text-black">{product.price ? `$${product.price}` : 'Free'}</p>
                  <p className="text-sm text-black">Category: {product.category}</p>
                  <p className="text-sm text-black">Condition: {product.condition}</p>
                  {product.imageUrls && Array.isArray(product.imageUrls) && product.imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={product.name} className="w-full h-40 object-cover mt-2" onError={(e) => { e.target.onerror = null; e.target.src = '/no-image-available.png'; }} />
                  ))}
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
    </>
  );
}

export default ShowProducts;


"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';

import { getProductsByCategory } from '../_services/product-service'; // Adjust the import path as necessary

function ShowProducts() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [lastDoc, setLastDoc] = useState(null);

  const pageSize = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products, lastDoc: newLastDoc, totalPages } = await getProductsByCategory(category, currentPage, pageSize, lastDoc);
        setProducts(products);
        setLastDoc(newLastDoc);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Head>
        <title>Show Products | Agora BNS</title>
      </Head>

      <Header />

      <main className="bg-white pt-24 pb-12 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-black pt-20">Available Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
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
              ))
            ) : (
              <p className="text-center text-gray-500">No products available.</p>
            )}
          </div>
          <div className="text-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'} rounded-lg hover:bg-blue-800 font-semibold`}
              >
                {index + 1}
              </button>
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

function ShowProductsEx() {
  return (
    <Suspense>
      <ShowProducts />
    </Suspense>
  );
}

export default ShowProductsEx;

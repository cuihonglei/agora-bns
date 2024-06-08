"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';
import Chatbot from '../chatbot/chatbot';

import { getProducts } from '../_services/product-service';
import { sortProductsByPrice } from '../components/price-filter';


function ShowProducts() {

  const [sortOrder, setSortOrder] = useState('desc'); // State for sorting order
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      const { products, totalPages } = await getProducts(currentPage, pageSize, sortOrder);
      setProducts(products);
      setTotalPages(totalPages);
    };

    fetchProducts();
  }, [currentPage, sortOrder]); // Include sortOrder in dependency array

  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Update sorting order state
    setCurrentPage(1); // Reset to first page on sort change
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
          <div className="text-center mb-6">
            <label htmlFor="sort" className="mr-2 text-black">Sort by Price:</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={handleSortChange}
              className="border px-4 py-2 rounded-lg"
            >
              <option value="desc">Highest to Lowest</option>
              <option value="asc">Lowest to Highest</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortProductsByPrice(products, sortOrder).map(product => (
              <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-black">{product.name}</h2>
                  <p className="text-sm text-black">{product.description}</p>
                  <p className="text-lg font-medium text-black">{product.price ? `$${product.price}` : 'Free'}</p>
                  <p className="text-sm text-black">Category: {product.category}</p>
                  <p className="text-sm text-black">Condition: {product.condition}</p>
                  {product.imageUrls && Array.isArray(product.imageUrls) && product.imageUrls.length > 0 && (
                    <Link href={`/details?id=${product.id}`}>
                      <div className="w-full h-40 mt-2 relative cursor-pointer">
                        <Image
                          src={product.imageUrls[0]}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          onError={(e) => { e.target.onerror = null; e.target.src = '/no-image-available.png'; }}
                        />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            ))}
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
      <Chatbot />
    </>
  );
}

export default ShowProducts;


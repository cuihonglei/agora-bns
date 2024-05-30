"use client";
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Modal from 'react-modal';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';
import { getProducts } from '../_services/product-service';
import { sortProductsByPrice } from '../components/price-filter';

function ShowProducts() {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [lastDocs, setLastDocs] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // State for sorting order

  const pageSize = 8;

  useLayoutEffect(() => {
    if (typeof window !== 'undefined' && document.querySelector('#__next')) {
      Modal.setAppElement('#__next');
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const { products, lastDocs: newLastDocs, totalPages } = await getProducts(currentPage, pageSize, lastDocs);
      setProducts(products);
      setLastDocs(newLastDocs);
      setTotalPages(totalPages);
    };

    fetchProducts();
  }, [currentPage, sortOrder]); // Include sortOrder in dependency array

  const openModal = (images) => {
    setSelectedImages(images);
    setCurrentIndex(0);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImages([]);
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedImages.length);
  };

  const showPreviousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + selectedImages.length) % selectedImages.length);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Update sorting order state
    setCurrentPage(1); // Reset to first page on sort change
    setLastDocs([]); // Clear last document snapshots on sort change
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
                    <div className="w-full h-40 mt-2 relative">
                      <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="cursor-pointer"
                        onClick={() => openModal(product.imageUrls)}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/no-image-available.png'; }}
                      />
                    </div>
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

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Product Images"
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
            <h2 className="text-2xl font-bold mb-4 text-center">Product Images</h2>
            <div className="flex items-center justify-center">
              <button
                onClick={showPreviousImage}
                className="absolute left-0 px-4 py-2 bg-gray-600 text-white rounded-r-lg hover:bg-gray-700"
              >
                &#9664;
              </button>
              <div className="w-full h-80 relative">
                <Image
                  src={selectedImages[currentIndex]}
                  alt={`Product Image ${currentIndex + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              <button
                onClick={showNextImage}
                className="absolute right-0 px-4 py-2 bg-gray-600 text-white rounded-l-lg hover:bg-gray-700"
              >
                &#9654;
              </button>
            </div>
            <div className="flex justify-center mt-6">
              <button onClick={closeModal}
                              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                              Close
                            </button>
                          </div>
                        </div>
                      </Modal>
                    </main>
              
                    <Footer />
                  </>
                );
              }
              
              export default ShowProducts;
              

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getProductsByUser } from '../../_services/product-service';
import { editUserProduct, removeUserProduct } from '../../_services/user-service';
import EditProduct from './edit-product';
import RemoveProduct from './remove-product';
import { useUserAuth } from '../../_utils/auth-context';

function ShowProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null);
  const { user } = useUserAuth(); // Destructure user from context

  const pageSize = 5;

  useEffect(() => {
    if (!user) {
      console.error("User is not authenticated or UID is missing");
      return;
    }

    const fetchProducts = async () => {
      try {
        //console.log("Fetching products for user:", user.uid);
        const productsData = await getProductsByUser(user.uid, currentPage, pageSize);
        //console.log("Fetched products:", productsData);
        setProducts(productsData.products);
        setTotalPages(productsData.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [user, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditSave = async (updatedProduct) => {
    try {
      if (!user) {
        console.error("User is not authenticated or UID is missing");
        return;
      }
      await editUserProduct(user.uid, editingProduct.id, updatedProduct);
      setEditingProduct(null);
      const productsData = await getProductsByUser(user.uid, currentPage, pageSize);
      setProducts(productsData.products);
      setTotalPages(productsData.totalPages);
      toast.success('Product successfully updated', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      if (!user) {
        console.error("User is not authenticated or UID is missing");
        return;
      }
      await removeUserProduct(user.uid, productId);
      const productsData = await getProductsByUser(user.uid, currentPage, pageSize);
      setProducts(productsData.products);
      setTotalPages(productsData.totalPages);
      toast.success('Product successfully removed', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error('Failed to remove product. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 3;

    const showLeftDots = currentPage > 3;
    const showRightDots = currentPage < totalPages - 2;

    // Always show first page number
    pages.push(
      <button
        key="first"
        onClick={() => handlePageChange(1)}
        className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'} rounded-lg hover:bg-blue-800 font-semibold`}
      >
        1
      </button>
    );

    // Show left dots if applicable
    if (showLeftDots) {
      pages.push(
        <span key="leftDots" className="px-4 py-2 mx-1 text-black">
          ...
        </span>
      );
    }

    // Show middle pages
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'} rounded-lg hover:bg-blue-800 font-semibold`}
        >
          {i}
        </button>
      );
    }

    // Show right dots if applicable
    if (showRightDots) {
      pages.push(
        <span key="rightDots" className="px-4 py-2 mx-1 text-black">
          ...
        </span>
      );
    }

    // Always show last page number
    if (totalPages > 1) {
      pages.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'} rounded-lg hover:bg-blue-800 font-semibold`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <>
      <main className="bg-white flex-grow">
        <ToastContainer />
        <div className="container mx-auto">
          <div className="flex flex-col gap-4"> {/* Reduced gap between items */}
            {products.map(product => (
              <div key={product.id} className="border rounded-lg overflow-hidden flex flex-col w-full relative">
                <div className="absolute top-4 right-4 text-sm text-gray-500"> {/* Date in top-right corner */}
                  {typeof product.date === 'object' && product.date.toDate ? (
                    new Date(product.date.toDate()).toLocaleDateString()
                  ) : (
                    new Date(product.date).toLocaleDateString()
                  )}
                </div>
                <div className="p-2 flex flex-col sm:flex-row">
                  <div className="relative w-32 h-32"> {/* Smaller width and height */}
                    {product.imageUrls && Array.isArray(product.imageUrls) && product.imageUrls.length > 0 && (
                      <Link href={`/details?id=${product.id}`}>
                        <Image
                          src={product.imageUrls[0]}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                          onError={(e) => { e.target.onerror = null; e.target.src = '/no-image-available.png'; }}
                        />
                      </Link>
                    )}
                  </div>
                  <div className="ml-4 flex-grow">
                    <h2 className="text-lg font-semibold text-black">{product.name}</h2>
                    <p className="text-sm text-black">{product.description}</p>
                    <p className="text-sm text-black">Category: {product.category}</p>
                    <p className="text-sm text-black">Condition: {product.condition}</p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2"> {/* Position buttons in the bottom right */}
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold text-sm"
                  >
                    Edit
                  </button>
                  <RemoveProduct productId={product.id} onRemove={() => handleRemove(product.id)} />
                </div>
              </div>
            ))}
          </div>
          {editingProduct && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg">
                <EditProduct product={editingProduct} onSave={handleEditSave} />
                <button
                  onClick={() => setEditingProduct(null)}
                  className="mt-4 px-4 py-2 mx-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {products.length > 0  && <div className="text-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-black'} rounded-lg hover:bg-blue-800 font-semibold`}
            >
              &larr;
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-black'} rounded-lg hover:bg-blue-800 font-semibold`}
            >
              &rarr;
            </button>
          </div>}
          {products.length === 0 && <div className="text-center mt-8">No products found</div>}
        </div>
      </main>
    </>
  );
}

export default ShowProducts;

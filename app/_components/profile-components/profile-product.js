import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getProductsByUser } from '../../_services/product-service';
import { editUserProduct, removeUserProduct } from '../../_services/user-service';
import EditProduct from '../edit-product';
import RemoveProduct from '../remove-product';
import { useAuth } from '../../_utils/auth-context';

function ShowProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null);
  const user = useAuth();

  const pageSize = 8;

  useEffect(() => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    const fetchProducts = async () => {
      try {
        const productsData = await getProductsByUser(user.uid, currentPage, pageSize);
        console.log("Fetched products:", productsData);
        setProducts(productsData.products);
        setTotalPages(productsData.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [user, currentPage]);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };

  const handleEditSave = async (updatedProduct) => {
    try {
      if (!user) {
        console.error("User is not authenticated");
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

  return (
    <>
      <Head>
        <title>Show Products | Agora BNS</title>
      </Head>

      <main className="bg-white pt-24 pb-12 flex-grow">
        <ToastContainer /> {/* Add ToastContainer here */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {products.map(product => (
              <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden flex flex-col h-full w-full">
                <div className="p-4 flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 w-full">
                    {product.imageUrls && Array.isArray(product.imageUrls) && product.imageUrls.length > 0 && (
                      <Link href={`/details?id=${product.id}`}>
                        <div className="w-full h-64 sm:h-full relative cursor-pointer">
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
                  <div className="sm:w-2/3 w-full sm:pl-4 pt-4 sm:pt-0">
                    <h2 className="text-xl font-semibold text-black">{product.name}</h2>
                    <p className="text-sm text-black">{product.description}</p>
                    <p className="text-lg font-medium text-black">{product.price ? `$${product.price}` : 'Free'}</p>
                    <p className="text-sm text-black">Category: {product.category}</p>
                    <p className="text-sm text-black">Condition: {product.condition}</p>
                  </div>
                </div>
                <div className="p-4 flex justify-end">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2"
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
                  className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
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
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default ShowProducts;

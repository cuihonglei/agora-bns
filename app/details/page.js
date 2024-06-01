// app/details/page.js

"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

import Header from '../components/header';
import Footer from '../components/footer';

import { db } from '../_utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

function ProductDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const category = searchParams.get('category');
  const router = useRouter();  // Initialize useRouter

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() };
          setProduct(productData);
          setMainImage(productData.imageUrls[0]);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageClick = (url) => {
    setMainImage(url);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObject = {
        text: newComment,
        rating: rating,
        date: new Date().toLocaleString()
      };
      setComments([...comments, newCommentObject]);
      setNewComment('');
      setRating(0);
    }
  };
  

  if (!product) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <Head>
        <title>{product.name} | Agora BNS</title>
      </Head>

      <Header />

      <main className="bg-gray-100 pt-24 pb-12 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 flex justify-center items-center">
                <Image
                  src={mainImage}
                  alt={product.name}
                  width={600}
                  height={400}
                  objectFit="contain"
                  className="rounded-md shadow-md"
                />
              </div>
              <div className="flex-1 p-6">
                <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
                <p className="text-2xl text-gray-600 my-4">{product.price ? `$${product.price}` : 'Free'}</p>
                <p className="text-lg text-gray-700 mb-4">{product.description}</p>
                <p className="text-sm text-gray-500 mb-1"><strong>Category:</strong> {product.category}</p>
                <p className="text-sm text-gray-500 mb-4"><strong>Condition:</strong> {product.condition}</p>
                <div className="flex flex-wrap space-x-2 mt-4">
                  {product.imageUrls.map((url, index) => (
                    <div key={index} className="w-24 h-24 relative cursor-pointer" onClick={() => handleImageClick(url)}>
                      <Image
                        src={url}
                        alt={`${product.name} image ${index + 1}`}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md border border-gray-300"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button 
                    onClick={() => router.back()} 
                    className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
                  >
                    ← Back to Products
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800">Comments and Ratings</h2>
              <div className="mt-4">
                {comments.map((comment, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">{comment.date}</p>
                    <p className="text-lg text-gray-800">{comment.text}</p>
                    <p className="text-sm text-gray-600">Rating: {comment.rating}/5</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <textarea
                  className="w-full p-2 border rounded-lg text-black"
                  rows="3"
                  placeholder="Add your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="mt-2">
                  <label className="text-gray-600">Rating: </label>
                  <select
                    className="ml-2 p-1 border rounded-lg text-black"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    <option value="0">Select Rating</option>
                    {[1, 2, 3, 4, 5].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleCommentSubmit}
                >
                  Submit Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function ProductDetailsEx() {
  return (
    <Suspense>
      <ProductDetails />
    </Suspense>
  )
}

export default ProductDetailsEx;

"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

import Header from '../_components/header';
import Footer from '../_components/footer';
import Loading from '../_components/loading';
import Map from '../_components/Map';

import { useUserAuth } from 'app/_utils/auth-context';
import { db } from '../_utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { addComment, getComments } from '../_services/comment-service';
import { getUser } from '../_services/user-service';


function ProductDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { user } = useUserAuth();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  const [sellerName, setSellerName] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!user || !id) return;
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() };
          setProduct(productData);
          setMainImage(productData.imageUrls[0]);
          const productComments = await getComments(productData.id);
          setComments(productComments || []);

          // Fetch seller info
          const userInfo = await getUser(productData.userId);
          if (userInfo) {
            const fullName = `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim();
            setSellerName(fullName || productData.userId);

            if (userInfo.address) {
              setSellerAddress(userInfo.address);
            }
          } else {
            console.error(`No user info found for userId ${productData.userId}`);
          }
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [user, id]);

  const handleImageClick = (url) => {
    setMainImage(url);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const newCommentObject = {
        text: newComment,
        rating: rating,
        date: new Date().toLocaleString()
      };
      const commentId = await addComment(id, newCommentObject);
      if (commentId) {
        setComments([...comments, { id: commentId, ...newCommentObject }]);
        setNewComment('');
        setRating(0);
      } else {
        console.error("Failed to add comment");
      }
    }
  };

  const handleChatButtonClick = () => {
    if (product && product.userId) {
      router.push(`/chat?userBId=${product.userId}`);
    }
  };

  // Avoid not logged users to access this page.
  if (!user) {
    return <Loading />;
  }

  if (!product) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <Head>
        <title>{product.name} | Agora BNS</title>
      </Head>

      <Header />

      <main className="flex flex-col items-center p-4 min-h-[calc(100vh-8rem)]">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white p-6">
          <div className="flex-1 flex justify-center items-center mb-4 md:mb-0">
            <Image
              src={mainImage}
              alt={product.name}
              width={600}
              height={400}
              style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
              className="rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="flex-1 md:ml-4">
            <h1 className="text-4xl font-bold text-black mb-4">{product.name}</h1>
            <p className="text-2xl text-black my-2"><strong>Price:</strong> {product.price ? `$${product.price}` : 'Free'}</p>
            <p className="text-sm text-black mb-4"><strong>Description:</strong> {product.description}</p>
            <p className="text-sm text-black mb-2"><strong>Category:</strong> {product.category}</p>
            <p className="text-sm text-black mb-2"><strong>Condition:</strong> {product.condition}</p>

            <div className="flex flex-wrap mt-4">
              {product.imageUrls.map((url, index) => (
                <div key={index} className="w-24 h-24 relative cursor-pointer m-1" onClick={() => handleImageClick(url)}>
                  <Image
                    src={url}
                    alt={`${product.name} image ${index + 1}`}
                    width={96}
                    height={96}
                    style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                    className="rounded-md border border-gray-300"
                    sizes="(max-width: 768px) 25vw, (max-width: 1200px) 12.5vw, 8.3vw"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-md text-black"><strong>Seller:</strong> {sellerName}</p>
              <button
                onClick={handleChatButtonClick}
                className="mt-1 px-4 py-2 bg-[#392F5A] text-white rounded-lg hover:bg-[#cc8839]"
              >
                Chat with Seller
              </button>
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => router.back()}
                className="text-[#392F5A] hover:text-[#cc8839] font-semibold inline-flex items-center"
              >
                ← Back to Products
              </button>

            </div>
            <Map address={sellerAddress} width="400px" height="200px" />
          </div>
        </div>

        <div className="w-full max-w-5xl bg-white p-6 mt-4">
          <h2 className="text-2xl font-bold text-black">Comments and Ratings</h2>
          <div className="mt-4">
            {comments.map((comment, index) => (
              <div key={index} className="mb-4 p-4 border-2 border-[#392F5A] rounded-lg bg-white">
                <p className="text-sm text-black">{comment.date}</p>
                <p className="text-lg text-black">{comment.text}</p>
                <p className="text-sm text-black">Rating: {comment.rating}/5</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <textarea
              className="w-full p-2 border-[#392F5A] border-2 rounded-lg text-black bg-white"
              rows="3"
              placeholder="Add your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="mt-2">
              <label className="text-black">Rating: </label>
              <select
                className="ml-2 p-1 border text-black"
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
              className="mt-4 px-4 py-2 bg-[#392F5A] text-white rounded-lg hover:bg-[#cc8839]"
              onClick={handleCommentSubmit}
            >
              Submit Comment
            </button>
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

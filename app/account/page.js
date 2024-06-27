"use client";

import { React, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import Header from '../components/header';
import Footer from '../components/footer';
import FeaturedCategories from '../components/featured';
import { auth, db } from '../_utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

function AccountPage() {
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (user && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          // Write the location to Firestore
          const userDoc = doc(db, `users/${user.uid}`, "location", "current");
          await setDoc(userDoc, location);
        },
        (error) => {
          console.error(error.message);
        }
      );
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Agora BNS - Buy and Sell Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <div className="bg-gradient-to-r from-purple-800 to-indigo-700 flex flex-col justify-center items-center text-center py-16 lg:py-32">
          <div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Discover Amazing Products
            </h1>
            <p className="mt-4 max-w-lg mx-auto text-xl text-indigo-200">
              Explore the best products from various categories all in one place.
            </p>
            <div className="mt-10">
              <div className="mt-10">
                <Link href="/shopproducts" className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg text-base font-medium hover:bg-indigo-700">
                  Shop Products
                </Link>
              </div>
            </div>
          </div>
        </div>

        <FeaturedCategories />
      </main>

      <Footer />
    </>
  );
}

export default AccountPage;

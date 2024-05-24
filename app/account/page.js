"use client";

import { React } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import Header from '../components/header';
import Footer from '../components/footer';
import FeaturedCategories from '../components/featured';
import FloatingChatWidget from 'app/FloatingChatWidget';

function AccountPage() {

  return (
    <>
      <Head>
        <title>Agora BNS - Buy and Sell Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="mt-20"> {/* Adjust margin top to accommodate fixed header */}
        {/* Hero section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 text-center py-16 lg:py-32">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Discover Amazing Products
            </h1>
            <p className="mt-4 max-w-lg mx-auto text-xl text-indigo-200">
              Explore the best products from various categories all in one place.
            </p>
            <div className="mt-10">
              <Link href="/shopproducts" className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg text-base font-medium hover:bg-indigo-700">
                Shop Products
              </Link>
            </div>
          </div>
        </div>
        <FeaturedCategories />
        <FloatingChatWidget />

      </main>

      <Footer />
    </>
  );
}

export default AccountPage;

"use client";

import { React , useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUserAuth } from '../_utils/auth-context';
import Head from 'next/head';
import Footer from '../components/footer';
import FeaturedCategories from '../components/featured';

function AccountPage() {
  const { user, firebaseSignOut } = useUserAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Check if user exists before destrucuring
  const userName = user ? user.displayName : "Not logged in";

  const handleLogout = async () => {
    await firebaseSignOut();
  };

  return (
    <>
    <Head>
      <title>Agora BNS - Buy and Sell Marketplace</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <header className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <Image src="/image/agoralogo.jpg" alt="Agora BNS Logo" width={80} height={70}/>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <div
              className="relative pb-1"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <a
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Categories ↓
              </a>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 bg-white rounded-md shadow-lg w-48">
                  <Link
                    href="/electronics"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Electronics
                  </Link>
                  <Link
                    href="/fashion"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Fashion
                  </Link>
                  <Link
                    href="/garden"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Home & Garden
                  </Link>
                  <Link
                    href="/beauty"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Beauty
                  </Link>
                  <Link
                    href="/automotive"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Automotive
                  </Link>
                  <Link
                    href="/food"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Food & Groceries
                  </Link>
                  <Link
                    href="/sports"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sports
                  </Link>
                  <Link
                    href="/others"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Others
                  </Link>
                </div>
                )}
            </div>
            <Link
              href="/AboutUs"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              About Us
            </Link>
            <Link
              href="/sell"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Sell Products
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <div className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                {user ? `Welcome, ${user.displayName}` : "Not logged in"}
            </div>
            <nav>
              <Link href="https://agora-bns.vercel.app/"> {/*change link when deployed to vercel */}
                <button
                  onClick={handleLogout}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:bg-gradient-to-br"
                >
                  Logout
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
    
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

    </main>

    <Footer />
    </>
);
}

export default AccountPage;

"use client";

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Header from './components/header';
import Footer from './components/footer';

import { useUserAuth } from './_utils/auth-context';

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, gitHubSignIn, googleSignIn } = useUserAuth();

  const handleSignIn = async () => {
    await googleSignIn();
  };

  return (
    <>
      <Head>
        <title>Agora BNS - Buy and Sell Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <header className="bg-white shadow-md fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                  <Image src="/image/agoralogo.jpg" alt="Agora BNS Logo" width={80} height={70}/>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-10">
              <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                About Us
              </Link>
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <button onClick={handleSignIn} className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">Sign In</button>
              {/* <Link href="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sign In
              </Link> */}
              <Link href="https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:bg-gradient-to-br">
                Sign Up
              </Link>
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
              Sign In Required to view products in the Agora-BNS Marketplace.
            </p>
            <div className="mt-10">
              <Link href="/login" className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg text-base font-medium hover:bg-indigo-700">
                Sign In to View Products
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </>
  );
}

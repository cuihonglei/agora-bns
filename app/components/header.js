"use client";

import { React, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '../_utils/auth-context';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleSignIn = () => {
    window.location.href = '/login';
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      window.location.href = '/login';
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  /*
  Function to handle category selection.
  This function is called whenever the user selects a category from the dropdown menu
  and redirects the user to the 'showproducts' page with the selected category as a query parameter.
  */
  const handleCategorySelect = (category) => {
    const url = new URL('/showproducts', window.location.href);
    url.searchParams.set('category', category);
    router.push(url.toString());
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <Image src="/image/agoralogo.jpg" alt="Agora BNS Logo" width={80} height={70} />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            {user && (
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
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleCategorySelect("Automotive")}
                    >
                      Automotive
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleCategorySelect("Beauty")}
                    >
                      Beauty
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleCategorySelect("Electronics")}
                    >
                      Electronics
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleCategorySelect("Fashion")}
                    >
                      Fashion
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleCategorySelect("Food and Groceries")}
                    >
                      Food & Groceries
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleCategorySelect("Home & Garden")}
                    >
                      Home & Garden
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleCategorySelect("Sports")}
                    >
                      Sports
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleCategorySelect("Others")}
                    >
                      Others
                    </a>
                  </div>
                )}
              </div>
            )}
            <Link
              href="/about"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              About Us
            </Link>
            {user && (
              <Link
                href="/sell"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sell Products
              </Link>
            )}
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {user ? (
              <>
                <span className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  {/* TODO get name from the database if there is no displayName, - login with Email. */}
                  {user.displayName ? `Welcome, ${user.displayName}` : 'Welcome!'}
                </span>
                <button
                  onClick={handleSignOut}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:bg-gradient-to-br"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

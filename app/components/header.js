"use client";

import { React, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { useUserAuth } from '../_utils/auth-context';

import logo from '../assets/images/logo.png';

function Header() {
  
  const router = useRouter();
  const { user, firebaseSignOut } = useUserAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      router.push('/');
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
    router.push(`/showproducts?category=${encodeURIComponent(category)}`);
  };

  return (
    <header className="bg-[#FFF8F0]">
      <div className="max-w-5xl h-16 flex justify-center items-center mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="Agora BNS Logo" width={48} height={43} />
        </Link>

        {/* Menu */}
        {true && (<nav className="flex space-x-10 mx-auto items-center">

          {/* Categories */}
          <div
            className="relative pb-1"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <a className="text-lg font-bold hover:text-[#FF8811] cursor-pointer">
              {/* TODO use the react icon, not the ↓ */}
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

          {/* Sell Products */}
          <Link href="/sell" className="text-lg font-bold hover:text-[#FF8811]">
            Sell Products
          </Link>

          {/* About */}
          <Link href="/about" className="text-lg font-bold hover:text-[#FF8811]" >
            About
          </Link>
        </nav>)}

        {/* Sign In/Logout Button */}
        <div className="flex items-center justify-end flex-1 lg:w-0">
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
                className="text-lg font-bold text-[#FF8811] hover:text-[#392F5A]"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

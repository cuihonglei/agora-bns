// Header.js
"use client"

import { React , useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import { useUserAuth } from '../_utils/auth-context';


function Header({ user, handleLogout}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userName = user ? user.displayName : "Not logged in";

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
                    href="/home"
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
                    href="/fooddrinks"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Others
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/about"
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
              {user ? `Welcome, ${user.displayName}` : 'Not logged in'}
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
  );
}

export default Header;


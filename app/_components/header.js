"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { useUserAuth } from '../_utils/auth-context';

import logo from '../_assets/images/logo.png';

// Menu component
function Menu() {

  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /*
  Function to handle category selection.
  This function is called whenever the user selects a category from the dropdown menu
  and redirects the user to the 'showproducts' page with the selected category as a query parameter.
  */
  const handleCategorySelect = (category) => {
    router.push(`/showproducts?category=${encodeURIComponent(category)}`);
  };

  return (
    <nav className="flex space-x-12 mx-auto items-center">

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
              onClick={() => handleCategorySelect("automotive")}
            >
              Automotive
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleCategorySelect("beauty")}
            >
              Beauty
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleCategorySelect("electronics")}
            >
              Electronics
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleCategorySelect("fashion")}
            >
              Fashion
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleCategorySelect("food-groceries")}
            >
              Food & Groceries
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleCategorySelect("home-garden")}
            >
              Home & Garden
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleCategorySelect("sports")}
            >
              Sports
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleCategorySelect("others")}
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
    </nav>
  );
}

function Header() {

  const router = useRouter();
  const { user, firebaseSignOut } = useUserAuth();

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

  return (
    <header className="bg-[#FFF8F0]">
      <div className="max-w-5xl h-16 flex justify-between items-center mx-auto">

        {/* Logo */}
        <Link href="/" className="ml-9">
          <Image src={logo} alt="Agora BNS Logo" width={48} height={43} />
        </Link>

        {/* Menu */}
        {user &&
          <div className="flex flex-1">
            <Menu />
          </div>
        }

        {/* Sign In/Logout Button */}
        <div className="flex items-center mr-9">
          {user ? (
            <>
              {/* Profile Image */}
              {/* TODO Use a character from the name if there's no photoURL. */}
              {user.photoURL && (
                <Link href='/profile'>
                  <Image src={user.photoURL} alt="profile image" className="rounded-full" width={36} height={36} />
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={handleSignOut}
                className="text-lg font-bold text-[#FF8811] hover:text-[#392F5A] ml-3"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Sign In button */}
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

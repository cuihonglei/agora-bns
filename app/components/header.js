import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUserAuth } from '../_utils/auth-context';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, firebaseSignOut } = useUserAuth();

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

  const handleCategorySelect = (category) => {
    // Your category selection logic here
  };
  const handleSupportClick = () => {
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    injectScript.async = true;
    document.head.appendChild(injectScript);

    const configScript = document.createElement('script');
    configScript.src = 'https://mediafiles.botpress.cloud/eacbf454-69c0-4f33-8a92-f53059a128af/webchat/config.js';
    configScript.defer = true;
    document.head.appendChild(configScript);
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
            <button
              className="text-base font-medium text-gray-500 hover:text-gray-900"
              onClick={handleSupportClick} // Use router.push for navigation
            >
              Support
            </button>
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
                    {/* Category Links */}
                  </div>
                )}
              </div>
            )}
            {user && (
              <Link
                href="/sell"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sell Products
              </Link>
            )}
            <Link
              href="/about"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              About Us
            </Link>
            
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {user ? (
              <>
                <span className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
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



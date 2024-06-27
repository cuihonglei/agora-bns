"use client";

import Header from 'app/components/header';
import React, { useState } from 'react';
import { FaUserCircle, FaStore, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const ProfilePage = () => {
  const [products] = useState([
    { id: 1, name: 'Product Name', date: 'Jun 15, 2024', description: 'Product description', sold: true },
    { id: 2, name: 'Product Name', date: 'Mar 10, 2024', description: 'Product description', sold: false },
    { id: 3, name: 'Product Name', date: 'Mar 10, 2024', description: 'Product description', sold: false },
    { id: 4, name: 'Product Name', date: 'Mar 10, 2024', description: 'Product description', sold: false },
  ]);

  return (
    <>
    <Header />
    <div className="flex">
      <div className="w-1/4 bg-purple-900 text-white h-screen">
        <div className="flex flex-col items-center p-4">
          <FaUserCircle size={100} />
          {/* <Image src={user.photoURL} alt="profile image" className="rounded-full" width={36} height={36} /> */}

          <Link href={"/profile"} className='hover:underline'>
          <p className="mt-4">General</p>
          </Link>

          <p className="mt-2">Products</p>
          <p className="mt-2">Messages</p>
          <p className="mt-2">Logout</p>
        </div>
      </div>
      <div className="w-3/4 bg-white p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">General Information</h2>
          <form className="mt-4">
            <input type="email" placeholder="Email Address" className="block w-full mb-4 p-2 border border-gray-300 rounded" />
            <input type="text" placeholder="First Name" className="block w-full mb-4 p-2 border border-gray-300 rounded" />
            <input type="text" placeholder="Last Name" className="block w-full mb-4 p-2 border border-gray-300 rounded" />
            <input type="text" placeholder="Phone Number" className="block w-full mb-4 p-2 border border-gray-300 rounded" />
            <input type="text" placeholder="Website" className="block w-full mb-4 p-2 border border-gray-300 rounded" />
            <input type="text" placeholder="Facebook" className="block w-full mb-4 p-2 border border-gray-300 rounded" />
            <input type="text" placeholder="Twitter" className="block w-full mb-4 p-2 border border-gray-300 rounded" />
            <input type="text" placeholder="Address" className="block w-full mb-4 p-2 border border-gray-300 rounded" />
            <button type="button" className="bg-orange-500 text-white px-4 py-2 rounded">Save</button>
          </form>
        </div>
        <div>
          </div>  
          </div>
    </div>
    </>
  );
};


export default ProfilePage;

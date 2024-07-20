// components/profile-components/Sidebar.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '../../_utils/auth-context';
import Image from 'next/image';
import { GrCart, GrUser, GrChatOption, GrPower } from "react-icons/gr";
import Link from 'next/link';

function Sidebar({ setActiveSection }) {
  const [activeSection, setActiveSectionState] = useState('general');
  const router = useRouter();
  const { user, firebaseSignOut } = useUserAuth();

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    setActiveSectionState(section);
  };

  return (
    <div className="w-1/4 text-white flex flex-col bg-[#392F5A] font-bold">
      <div className="flex flex-col items-center p-4 flex-grow h-full">
        {user && user.photoURL && (
          <Image src={user.photoURL} alt="profile image" className="rounded-full mt-4 mb-3" width={100} height={100} />
        )}

        <div className="w-full">
          <button
            onClick={() => handleSetActiveSection('general')}
            className={`w-full py-2 flex items-center justify-center border-b ${
              activeSection === 'general' ? 'bg-[#FF8811] text-black' : 'hover:bg-gray-700'
            }`}
            style={{ borderColor: '#FF8811' }}
          >
            <GrUser className="mr-2" />
            General
          </button>
        </div>

        <div className="w-full">
          <button
            onClick={() => handleSetActiveSection('products')}
            className={`w-full py-2 flex items-center justify-center border-b ${
              activeSection === 'products' ? 'bg-[#FF8811] text-black' : 'hover:bg-gray-700'
            }`}
            style={{ borderColor: '#FF8811' }}
          >
            <GrCart className="mr-2" />
            Products
          </button>
        </div>

        <div className="w-full">
          <button
            
            className={`w-full py-2 flex items-center justify-center border-b  ${
              activeSection === 'messages' ? 'bg-[#FF8811] text-black' : 'hover:bg-gray-700'
            }`}
            style={{ borderColor: '#FF8811' }}
          >
            <GrChatOption className="mr-2" />
            <Link href="/chat">
            Messages
            </Link>
          </button>
        </div>

        <div className="w-full">
          <button
            onClick={handleSignOut}
            className="w-full py-2 flex items-center justify-center border-b hover:bg-gray-700"
            style={{ borderColor: '#FF8811' }}
          >
            <GrPower className="mr-2" />
            Logout
          </button>
        </div>

        <div className="flex-grow"></div>
      </div>
    </div>
  );
}

export default Sidebar;

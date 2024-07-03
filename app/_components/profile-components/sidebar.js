// components/profile-components/Sidebar.js
"use client";

import { useRouter } from 'next/navigation';
import { useUserAuth } from '../../_utils/auth-context';

import Image from 'next/image';
import { GrCart, GrUser, GrChatOption, GrPower } from "react-icons/gr";

function Sidebar({ setActiveSection }) {
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

  return (
    <div className="w-1/4 bg-purple-900 text-white flex flex-col">
      <div className="flex flex-col items-center p-4 flex-grow h-full">
        {user && user.photoURL && (
          <Image src={user.photoURL} alt="profile image" className="rounded-full mt-4 mb-3" width={100} height={100} />
        )}

        <div>
        <button onClick={() => setActiveSection('general')} className="mt-4 hover:underline flex items-center">
          <GrUser className='mr-2'></GrUser>
          General
        </button>
        </div>

        <div>
        <button onClick={() => setActiveSection('products')} className="mt-2 hover:underline flex items-center">
          <GrCart className='mr-2 ml-1'></GrCart>
          Products
        </button>
        </div>
        
        <div>
        <button onClick={() => setActiveSection('messages')} className="mt-2 hover:underline flex items-center">
          <GrChatOption className='mr-2 ml-3'></GrChatOption>
          Messages
        </button>
        </div>
        
        <div>
        <button onClick={handleSignOut} className="mt-2 hover:underline flex items-center">
          <GrPower className='mr-2'></GrPower>
          Logout
        </button>
        </div>
        
        <div className="flex-grow"></div>
      </div>
    </div>
  );
}

export default Sidebar;

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useUserAuth } from '../../_utils/auth-context';
import { AiOutlineHome, AiOutlineShopping, AiOutlineMessage, AiOutlineLogout } from 'react-icons/ai';
import profileImage from '../../_assets/images/profile-image.png';


// MenuItem
function MenuItem({ Icon, text, onClick, active, first }) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-14 font-semibold text-lg flex items-center justify-start ${first && 'border-t'} border-b border-[#FF8811] ${active ? 'bg-[#FF8811] text-black' : 'hover:bg-gray-700'}`}
    >
      <Icon size={24} className="ml-10 mr-3" />{text}
    </button>
  );
}

// Sidebar
function Sidebar({ setActiveSection }) {

  const router = useRouter();
  const { user, firebaseSignOut } = useUserAuth();
  const [activeSection, setActiveSectionState] = useState('general');

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
    <div className="w-60 text-white bg-[#392F5A] flex flex-col items-center">

      {/* Profile Image */}
      <Image src={(user && user.photoURL) || profileImage} alt="profile image" className="rounded-full my-12" width={151} height={151} />

      {/* General */}
      <MenuItem
        Icon={AiOutlineHome}
        text="General"
        active={activeSection === 'general'}
        onClick={() => handleSetActiveSection('general')}
        first={true}
      />

      {/* Products */}
      <MenuItem
        Icon={AiOutlineShopping}
        text="Products"
        active={activeSection === 'products'}
        onClick={() => handleSetActiveSection('products')}
      />

      {/* Messages */}
      <MenuItem
        Icon={AiOutlineMessage}
        text="Messages"
        active={false}
        onClick={() => router.push('/chat')}
      />

      {/* Logout */}
      <MenuItem
        Icon={AiOutlineLogout}
        text="Logout"
        active={false}
        onClick={handleSignOut}
      />
    </div>
  );
}

export default Sidebar;

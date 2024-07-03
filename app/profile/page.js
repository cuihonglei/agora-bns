"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

import Header from '../_components/header';
import Footer from '../_components/footer';
import Sidebar from '../_components/profile-components/sidebar';
import { GrFormEdit } from "react-icons/gr";
import UpdateProfile from '../_components/profile-components/update-profile';

function ProfilePage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('general'); // State to manage the active section
  const [generalInfo, setGeneralInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    website: '',
    facebook: '',
    twitter: '',
    address: ''
  });

  const handleSaveGeneralInfo = (updatedInfo) => {
    // Update generalInfo state with the updated information
    setGeneralInfo(updatedInfo);
    // Update any backend or context state here
  };


  const handleUpdateClick = () => {
    setActiveSection('updateProfile');
  };

  const handleCancelUpdate = () => {
    // Set active section back to 'general'
    setActiveSection('general');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
      {/* Header component */}
      <Header />

      {/* Sidebar component */}
      <div className="flex-1 flex">
      <Sidebar setActiveSection={setActiveSection} />

      {/* Main content */}
        <div className="w-3/4 bg-white p-8">
          {activeSection === 'general' && (
            <>
            <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">General Information</h2>

        <div className='font-bold'>First Name:</div>
        <div className='mb-2'>
        {generalInfo.firstName}
        </div>

        <div className='font-bold'>Last Name:</div>
        <div className='mb-2'>
        {generalInfo.lastName}
        </div>

        <div className='font-bold'>Phone Number:</div>
        <div className='mb-2'>
        {generalInfo.phoneNumber}
        </div>

        <div className='font-bold'>Email Address:</div>
        <div className='mb-2'>
        {generalInfo.emailAddress}
        </div>

        <div className='font-bold'>Website:</div>
        <div className='mb-2'>
        {generalInfo.website}
        </div>

        <div className='font-bold'>Facebook:</div>
        <div className='mb-2'>
        {generalInfo.facebook}
        </div>

        <div className='font-bold'>Twitter:</div>
        <div className='mb-2'>
        {generalInfo.twitter}
        </div>

        <div className='font-bold'>Address:</div>
        <div className='mb-2'>
        {generalInfo.address}
        </div>
        
      </div>

              <div>
              <button type="button" className="bg-orange-500 text-white px-4 py-2 rounded hover:underline flex items-center" onClick={handleUpdateClick} onCancel={handleCancelUpdate}>
                <GrFormEdit className='mr-2'></GrFormEdit>
                Edit
              </button>
              </div>
            </>
          )}

          { /*  Render UpdateProfile component */ }
          {activeSection === 'updateProfile' && (
            <UpdateProfile onCancel={handleCancelUpdate} onSave={handleSaveGeneralInfo}/>
          )}

          { /* Render products component */ }
          {activeSection === 'products' && (
            <div>
              <h2 className="text-2xl font-bold">Listed Products</h2>
              {/* Add your products listing content here */}
            </div>
          )}

          { /* Render messages component */ }
          {activeSection === 'messages' && (
            <div>
              <h2 className="text-2xl font-bold">Messages</h2>
              {/* Add your messages content here */}
            </div>
          )}
        </div>
      </div>

      {/* Footer component */}
      <Footer />
      </div>
    </>
  );
}

export default ProfilePage;

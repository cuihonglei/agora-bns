"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import statement for useRouter
import { GrFormEdit } from "react-icons/gr";
import { useUserAuth } from '../_utils/auth-context'; // Adjust the path to useUserAuth
import { getUser } from '../_services/user-service'; // Adjust the path to getUser function

import Header from '../_components/header';
import Footer from '../_components/footer';
import Sidebar from '../_components/profile-components/sidebar';
import UpdateProfile from '../_components/profile-components/update-profile';
import ShowProducts from '../_components/profile-components/profile-product';

function ProfilePage() {
  const router = useRouter();
  const { user } = useUserAuth(); // Retrieve user from context
  const [activeSection, setActiveSection] = useState('general'); // State to manage the active section
  const [generalInfo, setGeneralInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    website: '',
    facebook: '',
    twitter: '',
    address: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          // Fetch user data from Firebase Firestore
          const userData = await getUser(user.uid); // Adjust getUser function to fetch user data

          if (userData) {
            console.log('Fetched user data:', userData); // Log retrieved data for debugging
            setGeneralInfo({
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              phoneNumber: userData.phoneNumber || '',
              email: userData.email || '',
              website: userData.website || '',
              facebook: userData.facebook || '',
              twitter: userData.twitter || '',
              address: userData.address || ''
            });
          } else {
            console.warn('No user data found'); // Log if no user data is retrieved
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error); // Log any errors that occur
        // Handle error fetching user data
      }
    };

    fetchUserData();
    
  }, [user]);

  const handleSaveGeneralInfo = (updatedInfo) => {
    // Update generalInfo state with the updated information
    setGeneralInfo(updatedInfo);
    // Update any backend or context state here
    setActiveSection('general'); // Switch back to general section after saving
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
                    {generalInfo.email}
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
                  <button type="button" className="bg-orange-500 text-white px-4 py-2 rounded hover:underline flex items-center" onClick={handleUpdateClick}>
                    <GrFormEdit className='mr-2'></GrFormEdit>
                    Edit
                  </button>
                </div>
              </>
            )}

            {/* Render UpdateProfile component */}
            {activeSection === 'updateProfile' && (
              <UpdateProfile
                onCancel={handleCancelUpdate}
                onSave={handleSaveGeneralInfo}
                initialData={generalInfo} // Pass initial data to UpdateProfile
              />
            )}

          { /* Render products component */ }
          {activeSection === 'products' && (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold">Listed Products</h2>
              <ShowProducts className="mt-0"/>
            </div>
          )}

            {/* Render messages component */}
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
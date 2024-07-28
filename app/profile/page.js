"use client";

import React, { useState, useEffect } from 'react';
import { GrFormEdit } from "react-icons/gr";
import { useUserAuth } from '../_utils/auth-context';
import { getUser } from '../_services/user-service';

import Header from '../_components/header';
import Footer from '../_components/footer';
import Loading from '../_components/loading';

import Sidebar from '../_components/profile/sidebar';
import UpdateProfile from '../_components/profile/update-profile';
import ShowProducts from '../_components/profile/profile-product';

function ProfilePage() {
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
            //console.log('Fetched user data:', userData); // Log retrieved data for debugging
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

  // Avoid not logged users to access this page.
  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <Header />

      <div className="max-w-5xl min-h-[calc(100vh-8rem)] flex flex-row justify-center mx-auto">

        {/* Sidebar */}
        <Sidebar setActiveSection={setActiveSection} />

        {/* Main content */}
        <div className="flex-grow bg-white p-9">
          {activeSection === 'general' && (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-9">General Information</h2>

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
                <button type="button" className="bg-[#FF8811] text-white px-4 py-2 rounded hover:underline flex items-center" onClick={handleUpdateClick}>
                  <GrFormEdit className='mr-2'></GrFormEdit>
                  Edit
                </button>
              </div>
            </>
          )}

          {/* Render UpdateProfile component */}
          {activeSection === 'updateProfile' && (
            <UpdateProfile
              onCanceled={handleCancelUpdate}
              onSaved={handleSaveGeneralInfo}
              initialData={generalInfo} // Pass initial data to UpdateProfile
            />
          )}

          { /* Render products component */}
          {activeSection === 'products' && (
            <div>
              <h2 className="text-xl font-bold mb-9">Listed Products</h2>
              <ShowProducts />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;
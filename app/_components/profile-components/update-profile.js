"use client";

import React, { useState, useEffect } from 'react';
import { GrFormClose, GrFormCheckmark } from "react-icons/gr";
import { updateUser, getUser } from '../../_services/user-service'; // Adjust the path to updateUser and getUser functions
import { useUserAuth } from '../../_utils/auth-context'; // Adjust the path to useUserAuth

function UpdateProfile({ onCancel }) {
  const { user } = useUserAuth(); // Retrieve user from context
  const [activeSection, setActiveSection] = useState('general'); // State to manage the active section
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    website: '',
    facebook: '',
    twitter: '',
    address: ''
  });

  const [saveMessage, setSaveMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  useEffect(() => {
    // Fetch user data from Firestore on component mount
    const fetchUserData = async () => {
      try {
        const userData = await getUser(user.uid); // Replace with your getUser function implementation
        if (userData) {
          setFormData(userData);
        } else {
          console.error('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Optionally, handle error scenario
      }
    };

    fetchUserData();
  }, [user.uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCancel = () => {
    setActiveSection('general'); // Navigate to the general section
    onCancel();
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email Address is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    try {
      if (!validateForm()) {
        return; // Exit early if form is not valid
      }
      
      // Prepare data to be saved
      const updateInfo = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        website: formData.website,
        facebook: formData.facebook,
        twitter: formData.twitter,
        address: formData.address
      };

      // Call updateUser function to save data
      await updateUser(user.uid, updateInfo); // Pass userId and updateInfo

      // Set save message
      setSaveMessage('Changes have been saved. Redirecting...');

      // Redirect to general information after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
        handleCancel(); // Redirect to general information
        setTimeout(() => {
          window.location.reload(); // Reload the page after navigation
        }, 100); // Delay to ensure navigation occurs before reload
      }, 3000); // 3 seconds

    } catch (error) {
      console.error('Error saving data:', error);
      // Optionally, handle error scenario
    }
  };

  return (
    <div className="mb-1">
      <h2 className="text-2xl font-bold">Update Your Profile!</h2>
      <div className="ml-1" style={{ color: 'grey', fontSize: '10px' }}>
        fields with * are required
      </div>

      <form className="mt-3">
        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">First Name *</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            className={`block w-full p-2 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded`}
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {formErrors.firstName && (
            <p className="text-sm text-red-500 mt-1">{formErrors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Last Name *</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            className={`block w-full p-2 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded`}
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {formErrors.lastName && (
            <p className="text-sm text-red-500 mt-1">{formErrors.lastName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter your phone number"
            className={`block w-full p-2 border ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {formErrors.phoneNumber && (
            <p className="text-sm text-red-500 mt-1">{formErrors.phoneNumber}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className={`block w-full p-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Website */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="text"
            name="website"
            placeholder="Enter your website"
            className="block w-full p-2 border border-gray-300 rounded"
            value={formData.website}
            onChange={handleInputChange}
          />
        </div>

        {/* Facebook */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Facebook</label>
          <input
            type="text"
            name="facebook"
            placeholder="Enter your Facebook URL"
            className="block w-full p-2 border border-gray-300 rounded"
            value={formData.facebook}
            onChange={handleInputChange}
          />
        </div>

        {/* Twitter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Twitter</label>
          <input
            type="text"
            name="twitter"
            placeholder="Enter your Twitter handle"
            className="block w-full p-2 border border-gray-300 rounded"
            value={formData.twitter}
            onChange={handleInputChange}
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            className="block w-full p-2 border border-gray-300 rounded"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex">
          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded flex items-center"
            onClick={handleCancel}
          >
            <GrFormClose className="mr-2" />
            Cancel
          </button>

          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded ml-5 flex items-center"
            onClick={handleSave}
          >
            <GrFormCheckmark className="mr-2" />
            Save
          </button>
        </div>

        {/* Save message */}
        {saveMessage && (
          <div className="mt-4 text-green-600">
            {saveMessage}
          </div>
        )}

      </form>
    </div>
  );
}

export default UpdateProfile;

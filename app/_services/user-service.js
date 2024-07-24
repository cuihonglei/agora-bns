import { collection, getDocs, getDoc, setDoc, doc, addDoc, deleteDoc, updateDoc, query } from "firebase/firestore";
import { db } from "../_utils/firebase"

// Add a new product to the user.
export const addUserProduct = async (userId, productId) => {
    // Construct the reference to the user document
    const userDocRef = doc(db, "users", userId);

    // Retrieve the current list of products from the user document
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.exists() ? userDocSnap.data() : {};

    // Get the current list of products or create an empty array if it doesn't exist
    const currentProducts = userData.products || [];

    // Add the new productId to the list of products
    const updatedProducts = [...currentProducts, productId];

    // Update the user document with the updated list of products
    await setDoc(userDocRef, { products: updatedProducts }, { merge: true });
};


// updates the user's profile
export const updateUser = async (userId, updateInfo) => {
  const userDocRef = doc(db, 'users', userId);

  try {
    // Fetch the current user data
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.exists() ? userDocSnap.data() : {};

    // Merge the updated info with the existing user data
    const updatedUserData = { ...userData, ...updateInfo };

    // Update the user document with the merged data
    await setDoc(userDocRef, updatedUserData, { merge: true });

    console.log('User data updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error; // Throw the error for handling in the calling component
  }
};

// gets the user's profile from firebase and displays in profile page
export const getUser = async (userId) => {
  const userDocRef = doc(db, 'users', userId);

  try {
    // Fetch the user document snapshot
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // Return user data if document exists
      return userDocSnap.data();
    } else {
      console.log('User document not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Throw the error for handling in the calling component
  }
};

// update the user's profile picture
export const updateUserPhoto = async (userId, photoURL) => {
  const userDocRef = doc(db, 'users', userId);

  try {
    // Update the user document with the new photoURL
    await updateDoc(userDocRef, { photoURL });

    console.log('User photo updated successfully');
  } catch (error) {
    console.error('Error updating user photo:', error);
    throw error; // Throw the error for handling in the calling component
  }
}
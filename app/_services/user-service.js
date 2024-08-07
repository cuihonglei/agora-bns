import { collection, getDocs, getDoc, setDoc, doc, addDoc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
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

export const editUserProduct = async (userId, productId, updatedProduct) => {
  const productDocRef = doc(db, "products", productId);
  await updateDoc(productDocRef, updatedProduct);
};

// Remove a product from the user.
export const removeUserProduct = async (userId, productId) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);
  const userData = userDocSnap.exists() ? userDocSnap.data() : {};
  const currentProducts = userData.products || [];
  const updatedProducts = currentProducts.filter(id => id !== productId);
  await setDoc(userDocRef, { products: updatedProducts }, { merge: true });
  await deleteDoc(doc(db, "products", productId));
};

export const deleteProductComments = async (productId) => {
  const commentsQuery = query(collection(db, 'comments'), where('productId', '==', productId));
  const commentsSnapshot = await getDocs(commentsQuery);

  const deletePromises = commentsSnapshot.docs.map((doc) => deleteDoc(doc.ref));

  await Promise.all(deletePromises);
};

export default deleteProductComments;

// updates the user's profile
export const updateUser = async (userId, updateInfo) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    // Fetch the current user data
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.exists() ? userDocSnap.data() : {};

    // Merge the updated info with the existing user data
    const updatedUserData = { ...userData, ...updateInfo };

    // Update the user document with the merged data
    await setDoc(userDocRef, updatedUserData, { merge: true });

    return updatedUserData;

    //console.log('User data updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error; // Throw the error for handling in the calling component
  }
};

// gets the user's profile from firebase.
export const getUser = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    // Fetch the user document snapshot
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // Return user data if document exists
      return userDocSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Throw the error for handling in the calling component
  }
};

// update the user's name and photo if the user object is not existing
export const checkAndUpdateUserNamePhoto = async (userId, firstName, lastName, photoURL) => {
  try {
    const user = await getUser(userId);
    if (!user) {
      const userDocRef = doc(db, 'users', userId);
      // Update the user document with the new name and photoURL
      await setDoc(userDocRef, {firstName, lastName, photoURL });
    }
  } catch (error) {
    console.error('Error updating user photo:', error);
    throw error; // Throw the error for handling in the calling component
  }
};

// Get the unread messages count.
// TODO Is that possible to get only the unreadMessages field?
export const getUnreadMessages = async (userId) => {
  const user = await getUser(userId);
  return (user && user.unreadMessages) || 0;
};

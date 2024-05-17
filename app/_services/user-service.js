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

export const addUser = (userId, info) => {
  // TODO
};

export const getUser = (userId) => {
  // TODO
}
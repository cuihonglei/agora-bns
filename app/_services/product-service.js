import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc, query } from "firebase/firestore";
import { db } from "../_utils/firebase"

// Add a product to firebase database.
// @param userId, the user who add the product.
// @return the product ID.
export const addProduct = async (userId, name, description, price, category, condition, imageUrl) => {

    const docRef = await addDoc(collection(db, "products"), {
      userId,
      date: Date.now(),
      name,
      description,
      price: Number(price),
      category,
      condition,
      imageUrl, // Store image URL in Firestore
    });

    return docRef.id;
};

// Get all products.
// TODO pagination
export const getProducts = async () => {

  // TODO

  return [];
};

// Get products by category.
// TODO pagination
export const getProductsByCategory = async (category) => {
  // TODO

  return [];
};

// Get products under a specific user.
// TODO pagination
export const getProductsByUser = async (userId) => {
  // TODO

  return [];
};


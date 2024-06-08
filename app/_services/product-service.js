import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc, query, orderBy, limit, startAfter, where} from "firebase/firestore";
import { db } from "../_utils/firebase"
import { sortProductsByPrice } from '../components/price-filter.js'; // Ensure the correct import path

// Add a product to firebase database.
// @param userId, the user who add the product.
// @return the product ID.
export const addProduct = async (productData) => {
  const docRef = await addDoc(collection(db, "products"), {
    ...productData,
    date: Date.now(),
    price: Number(productData.price), // Ensure price is a number
  });

  return docRef.id;
};

// Get all products.
export const getProducts = async (currentPage = 1, pageSize = 8, sortOrder = 'desc') => {
  try {
    const productsCollection = collection(db, "products");

    const q = query(productsCollection);
    const querySnapshot = await getDocs(q);
    const productList = [];
    querySnapshot.forEach((doc) => {
      productList.push({ id: doc.id, ...doc.data() });
    });

    // Sort products by price using the sortProductsByPrice function
    const sortedProducts = sortProductsByPrice(productList, sortOrder);

    // Calculate the starting index for the current page
    const startIndex = (currentPage - 1) * pageSize;
    // Extract products for the current page based on startIndex and pageSize
    const currentPageProducts = sortedProducts.slice(startIndex, startIndex + pageSize);

    return { 
      products: currentPageProducts, 
      totalPages: Math.ceil(sortedProducts.length / pageSize)
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 0 };
  }
};

// Get products by category.
export const getProductsByCategory = async (category, currentPage = 1, pageSize = 8, sortOrder = 'desc') => {
  try {
    const productsCollection = collection(db, "products");

    const q = query(
      productsCollection,
      where("category", "==", category)
    );

    const querySnapshot = await getDocs(q);
    const productList = [];
    querySnapshot.forEach((doc) => {
      productList.push({ id: doc.id, ...doc.data() });
    });

    // Sort products by price using the sortProductsByPrice function
    const sortedProducts = sortProductsByPrice(productList, sortOrder);

    // Calculate the starting index for the current page
    const startIndex = (currentPage - 1) * pageSize;
    // Extract products for the current page based on startIndex and pageSize
    const currentPageProducts = sortedProducts.slice(startIndex, startIndex + pageSize);

    return { 
      products: currentPageProducts, 
      totalPages: Math.ceil(sortedProducts.length / pageSize)
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 0 };
  }
};

// Get products under a specific user.
// TODO pagination
export const getProductsByUser = async (userId) => {
  // TODO

  return [];
};


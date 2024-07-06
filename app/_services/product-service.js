import { collection, getDocs, doc, addDoc, getDoc, deleteDoc, updateDoc, query, orderBy, limit, startAfter, where} from "firebase/firestore";
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


// Function to get the total number of products
const getTotalProductsCount = async () => {
  const productsCollection = collection(db, "products");
  const querySnapshot = await getDocs(productsCollection);
  return querySnapshot.size;
};

// Function to get the total number of products by category
const getTotalProductsCountByCategory = async (category) => {
  const productsCollection = collection(db, "products");
  const q = query(productsCollection, where("category", "==", category));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
};


// Get all products.
export const getProducts = async (currentPage, pageSize, sortOrder, cursorMap) => {
  try {
    const productsCollection = collection(db, "products");
    let q = query(productsCollection, orderBy("price", sortOrder), limit(pageSize));

    if (cursorMap[currentPage - 1]) {
      q = query(productsCollection, orderBy("price", sortOrder), startAfter(cursorMap[currentPage - 1]), limit(pageSize));
    }

    const querySnapshot = await getDocs(q);
    const productList = [];
    querySnapshot.forEach((doc) => {
      productList.push({ id: doc.id, ...doc.data() });
    });

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    const totalProducts = await getTotalProductsCount();
    const totalPages = Math.ceil(totalProducts / pageSize);

    return { products: productList, totalPages, lastVisible: lastVisibleDoc };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 0, lastVisible: null };
  }
};

export const getProductsByCategory = async (category, currentPage, pageSize, sortOrder, cursorMap) => {
  try {
    const productsCollection = collection(db, "products");

    let q = query(
      productsCollection,
      where("category", "==", category),
      orderBy("price", sortOrder),
      limit(pageSize)
    );

    if (cursorMap[currentPage - 1]) {
      q = query(
        productsCollection,
        where("category", "==", category),
        orderBy("price", sortOrder),
        startAfter(cursorMap[currentPage - 1]),
        limit(pageSize)
      );
    }

    const querySnapshot = await getDocs(q);
    const productList = [];
    querySnapshot.forEach((doc) => {
      productList.push({ id: doc.id, ...doc.data() });
    });

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    const totalProductsInCategory = await getTotalProductsCountByCategory(category);
    const totalPages = Math.ceil(totalProductsInCategory / pageSize);

    return { products: productList, totalPages, lastVisible: lastVisibleDoc };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 0, lastVisible: null };
  }
};


// Get products under a specific user.
// TODO pagination
export const getProductsByUser = async (userId, currentPage = 1, pageSize = 8) => {
  try {
    const productsCollection = collection(db, "products");

    const q = query(
      productsCollection,
      where("userId", "==", userId) // Adjust field name based on your data model
    );

    const querySnapshot = await getDocs(q);
    const productList = [];
    querySnapshot.forEach((doc) => {
      productList.push({ id: doc.id, ...doc.data() });
    });

    // Calculate the starting index for the current page
    const startIndex = (currentPage - 1) * pageSize;
    // Extract products for the current page based on startIndex and pageSize
    const currentPageProducts = productList.slice(startIndex, startIndex + pageSize);

    return { 
      products: currentPageProducts, 
      totalPages: Math.ceil(productList.length / pageSize)
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 0 };
  }
};
// Get a product by using the product ID.
export const getProductByID = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}

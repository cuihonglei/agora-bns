import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc, query, orderBy, limit, startAfter, where} from "firebase/firestore";
import { db } from "../_utils/firebase"

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
// TODO pagination
export const getProducts = async (currentPage = 1, pageSize = 8, lastDocsSnapshot = []) => {
  try {
    const productsCollection = collection(db, "products");
    let q = query(productsCollection, orderBy("date"), limit(pageSize));
    let lastVisibleDoc = null;

    if (currentPage > 1 && lastDocsSnapshot[currentPage - 2]) {
      lastVisibleDoc = lastDocsSnapshot[currentPage - 2];
      q = query(productsCollection, orderBy("date"), startAfter(lastVisibleDoc), limit(pageSize));
    }

    const querySnapshot = await getDocs(q);
    const productList = [];
    querySnapshot.forEach((doc) => {
      productList.push({ id: doc.id, ...doc.data() });
    });

    const newLastDocs = [...lastDocsSnapshot];
    newLastDocs[currentPage - 1] = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { products: productList, lastDocs: newLastDocs, totalPages: Math.ceil(querySnapshot.size / pageSize) };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], lastDocs: [], totalPages: 0 };
  }
};


// Get products by category.
// TODO pagination

export const getProductsByCategory = async (category, currentPage = 1, pageSize = 8, lastDoc = null) => {
  const productsCollection = collection(db, 'products');
  let q = query(
    productsCollection,
    where('category', '==', category),
    orderBy('date', 'desc'),
    limit(pageSize)
  );

  if (lastDoc) {
    q = query(
      productsCollection,
      where('category', '==', category),
      orderBy('date', 'desc'),
      startAfter(lastDoc),
      limit(pageSize)
    );
  }

  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

  const totalCountQuery = query(productsCollection, where('category', '==', category));
  const totalCountSnapshot = await getDocs(totalCountQuery);
  const totalPages = Math.ceil(totalCountSnapshot.docs.length / pageSize);

  return { products, lastDoc: newLastDoc, totalPages };
};










// Get products under a specific user.
// TODO pagination
export const getProductsByUser = async (userId) => {
  // TODO

  return [];
};


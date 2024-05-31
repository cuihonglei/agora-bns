import { db } from "../_utils/firebase";
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export const addComment = async (productId, comment) => {
  try {
    const docRef = await addDoc(collection(db, "comments"), {
      productId,
      ...comment
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding comment: ", error);
    return null;
  }
};

export const getComments = async (productId) => {
  try {
    const q = query(collection(db, "comments"), where("productId", "==", productId));
    const querySnapshot = await getDocs(q);
    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() });
    });
    return comments;
  } catch (error) {
    console.error("Error getting comments: ", error);
    return [];
  }
};
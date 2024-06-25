import { db } from "../_utils/firebase";
import { collection, doc, getDoc, setDoc, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

const getChatDocId = (userAId, userBId) => {
  return userAId < userBId ? `${userAId}_${userBId}` : `${userBId}_${userAId}`;
};

export const getChat = async (userAId, userBId) => {
  const chatId = getChatDocId(userAId, userBId);
  const chatDocRef = doc(db, "chats", chatId);
  const chatDoc = await getDoc(chatDocRef);
  if (!chatDoc.exists()) {
    await setDoc(chatDocRef, { users: [userAId, userBId] });
  }
  console.log("Chat ID retrieved/created:", chatId); // Debug log
  return chatId;
};

export const addMessage = async (chatId, message) => {
  try {
    if (!chatId) {
      console.error("Chat ID is null");
      return null;
    }
    console.log("Adding message to chat:", chatId, message); // Debug log
    const docRef = await addDoc(collection(db, "chats", chatId, "messages"), message);
    console.log("Message added with ID:", docRef.id); // Debug log
    return docRef.id;
  } catch (error) {
    console.error("Error adding message:", error);
    return null;
  }
};

export const getMessages = (chatId, callback) => {
  if (!chatId) {
    console.error("Chat ID is null in getMessages");
    return () => {};
  }
  console.log("Setting up listener for chat ID:", chatId); // Debug log
  const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp"));
  return onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    console.log("Messages retrieved:", messages); // Debug log
    callback(messages);
  });
};

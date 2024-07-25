import { db } from "../_utils/firebase";
import { collection, doc, getDoc, setDoc, addDoc, query, orderBy, onSnapshot, where, deleteDoc, getDocs } from "firebase/firestore";

const getChatDocId = (userAId, userBId) => {
  return userAId < userBId ? `${userAId}_${userBId}` : `${userBId}_${userAId}`;
};

export const getChat = async (userAId, userBId) => {
  const chatId = getChatDocId(userAId, userBId);
  const chatDocRef = doc(db, "chats", chatId);

  try {
    const chatDoc = await getDoc(chatDocRef);

    if (!chatDoc.exists()) {
      //console.log(`Chat document with ID ${chatId} does not exist. Creating new chat document.`);
      await setDoc(chatDocRef, { users: [userAId, userBId] });
    }

    //console.log("Chat ID retrieved/created:", chatId);
    return chatId;
  } catch (error) {
    console.error("Error getting or creating chat:", error.message);
    throw new Error("Failed to get or create chat");
  }
};

export const addMessage = async (chatId, message) => {
  if (!chatId) {
    console.error("Chat ID is null");
    return null;
  }

  try {
    const docRef = await addDoc(collection(db, "chats", chatId, "messages"), message);
    //console.log("Message added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding message:", error.message);
    return null;
  }
};

export const getMessages = (chatId, callback) => {
  if (!chatId) {
    console.error("Chat ID is null in getMessages");
    return () => {};
  }

  try {
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp"));
    return onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      //console.log("Messages retrieved:", messages);
      callback(messages);
    });
  } catch (error) {
    console.error("Error getting messages:", error.message);
  }
};

export const getUserChats = (userId, callback) => {
  try {
    const q = query(collection(db, "chats"), where("users", "array-contains", userId));
    return onSnapshot(q, (querySnapshot) => {
      const chats = [];
      querySnapshot.forEach((doc) => {
        chats.push({ id: doc.id, ...doc.data() });
      });
      //console.log("User chats retrieved:", chats);
      callback(chats);
    });
  } catch (error) {
    console.error("Error getting user chats:", error.message);
  }
};

export const deleteChat = async (chatId) => {
  try {
    const chatDocRef = doc(db, "chats", chatId);
    const messagesCollectionRef = collection(db, "chats", chatId, "messages");

    // Delete all messages in the chat
    const messagesSnapshot = await getDocs(messagesCollectionRef);
    const deletePromises = messagesSnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Delete the chat document
    await deleteDoc(chatDocRef);

    //console.log(`Chat with ID ${chatId} and its messages deleted successfully.`);
  } catch (error) {
    console.error("Error deleting chat:", error.message);
    throw new Error("Failed to delete chat");
  }
};




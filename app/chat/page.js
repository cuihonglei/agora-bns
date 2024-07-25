"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useUserAuth } from "app/_utils/auth-context";
import { getUser } from "../_services/user-service";
import { getChat, addMessage, getMessages, getUserChats, deleteChat } from "../_services/chat-service";

import Head from "next/head";
import Link from "next/link";
import Header from "app/_components/header";
import Footer from "app/_components/footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "app/_utils/firebase";
import Image from "next/image";

function ChatPage() {
  const searchParams = useSearchParams();
  const { user } = useUserAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [userInfos, setUserInfos] = useState({});
  const [showActions, setShowActions] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      const unsubscribe = getUserChats(user.uid, setChats);
      return () => unsubscribe();
    }
  }, [user]);

  const startChat = useCallback(async (userBId) => {
    if (user && userBId) {
      try {
        //console.log(`Starting chat with userBId: ${userBId}`);
        const chatId = await getChat(user.uid, userBId);
        //console.log(`Chat ID: ${chatId}`);
        const chatDocRef = doc(db, "chats", chatId);
        const chatDoc = await getDoc(chatDocRef);
        setSelectedChat({ id: chatId, ...chatDoc.data() });
        setChatId(chatId);
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    const userBId = searchParams.get('userBId');
    if (user && userBId) {
      startChat(userBId);
    }
  }, [searchParams, user, startChat]);

  useEffect(() => {
    if (selectedChat) {
      const unsubscribe = getMessages(selectedChat.id, setMessages);
      setChatId(selectedChat.id);
      return () => unsubscribe();
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchUserInfos = async () => {
      const infos = {};
      await Promise.all(chats.map(async (chat) => {
        for (const userId of chat.users) {
          if (!infos[userId]) {
            try {
              const info = await getUser(userId);
              if (info) {
                infos[userId] = info;
              } else {
                console.error(`No user info found for userId ${userId}`);
              }
            } catch (error) {
              console.error(`Error fetching user info for userId ${userId}: ${error.message}`);
            }
          }
        }
      }));
      //console.log("Fetched user infos:", infos);
      setUserInfos(infos);
    };

    if (chats.length > 0) {
      fetchUserInfos();
    }
  }, [chats]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && chatId && user) {
      const message = {
        text: newMessage,
        userId: user.uid,
        userName: user.displayName || user.email,
        timestamp: new Date(),
      };
      try {
        await addMessage(chatId, message);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.error("Cannot send message: Invalid chat ID or user", { chatId, user });
    }
  };

  const handleDeleteChat = async (chatId) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      try {
        await deleteChat(chatId);
        setSelectedChat(null);
        setChatId(null);
      } catch (error) {
        console.error("Error deleting chat:", error);
      }
    }
  };
  
  const toggleActions = (chatId) => {
    setShowActions((prev) => ({
      ...prev,
      [chatId]: !prev[chatId],
    }));
  };

  const groupMessagesByDate = (messages) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    return messages.reduce((groups, message) => {
      const messageDate = new Date(message.timestamp.toDate());
      let dateLabel;

      if (messageDate.toDateString() === today.toDateString()) {
        dateLabel = 'Today';
      } else if (messageDate.toDateString() === yesterday.toDateString()) {
        dateLabel = 'Yesterday';
      } else {
        dateLabel = messageDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }

      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p>Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Chat | Agora BNS</title>
      </Head>

      <Header/>

      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-grow w-full max-w-5xl bg-white shadow-lg m-4">
          <aside className="w-1/4 bg-[#392F5A] p-4 text-white">
            <div className="text-2xl font-bold mb-4">Chat History</div>
            <div>
              {chats.map((chat) => {
                const otherUserId = chat.users.find(uid => uid !== user.uid);
                const otherUserInfo = userInfos[otherUserId];
                const otherUserName = `${otherUserInfo?.firstName || ''} ${otherUserInfo?.lastName || ''}`.trim() || otherUserId;
                // Debugging log
                //console.log(`Chat ID: ${chat.id}, Other User ID: ${otherUserId}, Other User Name: ${otherUserName}`);

                return (
                  <div
                    key={chat.id}
                    className={`flex items-center justify-between p-2 rounded-lg mb-2 cursor-pointer ${selectedChat?.id === chat.id ? 'bg-[#e09a4b]' : 'bg-[#634d9a]'}`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div className="flex items-center">
                      {otherUserInfo?.photoURL && (
                        <Image
                         src={otherUserInfo.photoURL} 
                         alt={`${otherUserName} profile`} 
                         width={32}
                         height={32}
                         className="w-8 h-8 rounded-full mr-2" />
                      )}
                    <span>{otherUserName}</span>
                    </div>
                    <div className="relative">
                      <button
                        className="ml-2 px-2 text-white rounded-full focus:outline-none focus:ring focus:ring-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleActions(chat.id);
                        }}
                      >
                        &#8801; 
                      </button>
                      {showActions[chat.id] && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          <button
                            className="block w-full text-center px-4 py-2 text-black hover:bg-[#e09a4b]"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChat(chat.id);
                              setShowActions({});
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                  </div>
                </div>
                );
              })}
            </div>
          </aside>
          <main className="flex-grow p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <Link href="/profile" className="text-[#392F5A] hover:text-[#e09a4b]">
                ← Back to Profile
              </Link>
              <h1 className="text-2xl font-bold text-[#392F5A]">Private Chat Page</h1>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-lg p-6 overflow-y-auto" style={{ height: "60vh" }}>
              {Object.entries(groupedMessages).map(([date, messages]) => (
                <div key={date}>
                  <div className="text-center text-black my-4">{date}</div>
                  {messages.map((message) => (
                    <div key={message.id} className={`flex mb-4 ${message.userId === user?.uid ? 'justify-end' : 'justify-start'}`}>
                    {message.userId !== user?.uid && (
                      <Image
                        src={userInfos[message.userId]?.photoURL}
                        alt={`${userInfos[message.userId]?.firstName} profile`}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <div className={`max-w-xs p-3 rounded-lg ${message.userId === user?.uid ? 'bg-[#e09a4b] text-white' : 'bg-[#d8d5e2] text-black'}`} style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                      <div className="mt-1">{message.text}</div>
                      <div className="text-xs text-black mt-1">
                        {new Date(message.timestamp.toDate()).toLocaleTimeString()}
                      </div>
                    </div>
                    {message.userId === user?.uid && (
                      <Image
                        src={user.photoURL}
                        alt={`${userInfos[message.userId]?.firstName} profile`}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full ml-2"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
            </div>
            <footer className="mt-20">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  className="flex-grow p-3 border border-black rounded-full focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-[#392F5A] text-white rounded-full hover:bg-[#e09a4b] focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Send
                </button>
              </form>
            </footer>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

function ChatPageEx() {
  return (
    <Suspense>
      <ChatPage />
    </Suspense>
  );
}

export default ChatPageEx;







"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";

import { useUserAuth } from "../_utils/auth-context";
import { getUser } from "../_services/user-service";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../_utils/firebase";
import { getChat, addMessage, getMessages, getUserChats, deleteChat } from "../_services/chat-service";

import Header from "../_components/header";
import Footer from "../_components/footer";
import Loading from "../_components/loading";

import { AiOutlineSend } from "react-icons/ai";
import profileImage from '../_assets/images/profile-image.png';


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
      const unsubscribe = getUserChats(user.uid, (chats) => {
        setChats(chats);

        // Set the first one as the selected chat.
        if (chats.length > 0) {
          setSelectedChat(chats[0]);
        }
      });
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

  const handleReportChat = (chatId) => {
    alert("The admin has received the report.");
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

  // Avoid not logged users to access this page.
  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Chat | Agora BNS</title>
      </Head>

      <Header />

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="flex flex-grow w-full max-w-5xl bg-white">
          <aside className="w-60 bg-[#392F5A] text-white">
            <div className="text-lg font-bold text-center mt-12 mb-9">Chat History</div>
            <div>
              {chats.map((chat, index) => {
                const otherUserId = chat.users.find(uid => uid !== user.uid);
                const otherUserInfo = userInfos[otherUserId];
                const otherUserName = `${otherUserInfo?.firstName || ''} ${otherUserInfo?.lastName || ''}`.trim() || otherUserId;

                return (
                  <div
                    key={chat.id}
                    className={`flex items-center justify-between h-14 cursor-pointer ${index === 0 && 'border-t'} border-x border-b border-[#FF8811] ${selectedChat?.id === chat.id ? 'bg-[#FF8811] text-black' : 'hover:bg-gray-700'}`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div className="flex items-center mx-4">
                        <Image
                          src={otherUserInfo?.photoURL || profileImage}
                          alt={`${otherUserName} profile`}
                          width={32}
                          height={32}
                          className="w-9 h-9 rounded-full mr-3" />
                      <span className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis w-36">{otherUserName}</span>
                    </div>
                    <div className="relative">
                      <button
                        className="mr-4 text-white rounded-full"
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
                            className="block w-full text-center px-4 py-2 text-black hover:bg-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChat(chat.id);
                              setShowActions({});
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="block w-full text-center px-4 py-2 text-black hover:bg-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReportChat(chat.id);
                              setShowActions({});
                            }}
                          >
                            Report
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <main className="flex-grow bg-white flex flex-col h-[calc(100vh-8rem)]">
            <div className="p-4 overflow-y-auto flex-grow">
              {Object.entries(groupedMessages).map(([date, messages]) => (
                <div key={date}>
                  <div className="text-center text-black my-4">{date}</div>
                  {messages.map((message) => (
                    <div key={message.id} className={`flex mb-4 ${message.userId === user?.uid ? 'justify-end' : 'justify-start'}`}>
                      {message.userId !== user?.uid && (
                        <Image
                          src={userInfos[message.userId]?.photoURL || profileImage}
                          alt={`${userInfos[message.userId]?.firstName} profile`}
                          width={32}
                          height={32}
                          className="w-10 h-10 rounded-full mr-2"
                        />
                      )}
                      <div className={`max-w-xs p-3 rounded-lg ${message.userId === user?.uid ? 'bg-[#FFF8F0] text-black' : 'bg-[#d8d5e2] text-black'}`} style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        <div className="mt-1">{message.text}</div>
                        <div className="text-xs text-black mt-1">
                          {new Date(message.timestamp.toDate()).toLocaleTimeString()}
                        </div>
                      </div>
                      {message.userId === user?.uid && (
                        <Image
                          src={user.photoURL || profileImage}
                          alt={`${userInfos[message.userId]?.firstName} profile`}
                          width={32}
                          height={32}
                          className="w-10 h-10 rounded-full ml-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Field */}
            <form onSubmit={handleSendMessage} className="m-2 flex items-center relative">
              <input
                type="text"
                className="flex-grow p-3 border rounded-lg"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <AiOutlineSend size={24} color="#FF8811" />
              </button>
            </form>
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

"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useUserAuth } from "app/_utils/auth-context";
import { getChat, addMessage, getMessages } from "../_services/chat-service";
import Head from "next/head";
import Link from "next/link";

function ChatPage() {
  const searchParams = useSearchParams();
  const { user } = useUserAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const chatId = searchParams.get('chatId');
    if (chatId) {
      setChatId(chatId);
    }
  }, [searchParams]);

  useEffect(() => {
    if (chatId && user) {
      return getMessages(chatId, setMessages);
    }
  }, [chatId, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      const message = {
        text: newMessage,
        userId: user.uid,
        userName: user.displayName || user.email,
        timestamp: new Date(),
      };
      await addMessage(chatId, message);
      setNewMessage("");
    }
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = new Date(message.timestamp.toDate()).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  if (!chatId) {
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

      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-[#392F5A] p-4 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chat</h1>
          <Link href="/account" className="text-white hover:text-gray-200">
            ← Back to Home
          </Link>
        </header>
        <main className="flex-grow p-4 overflow-auto">
          <div className="max-w-3xl mx-auto bg-[#e4d594] rounded-lg shadow-lg p-6">
            <div className="overflow-auto max-h-[70vh]">
              {Object.entries(groupedMessages).map(([date, messages]) => (
                <div key={date}>
                  <div className="text-center text-gray-500 my-4">{date}</div>
                  {messages.map((message) => (
                    <div key={message.id} className={`flex mb-4 ${message.userId === user?.uid ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${message.userId === user?.uid ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'}`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        <div className="text-sm font-semibold">{message.userName}</div>
                        <div className="mt-1">{message.text}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(message.timestamp.toDate()).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </main>
        <footer className="p-4 bg-[#392F5A] border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Send
            </button>
          </form>
        </footer>
      </div>
    </>
  );
}

function ChatPageEx() {
  return (
    <Suspense>
      <ChatPage />
    </Suspense>
  )
}

export default ChatPageEx;

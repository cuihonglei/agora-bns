// pages/chat/[chatId].js
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useUserAuth } from "app/_utils/auth-context";
import { getChat, addMessage, getMessages } from "../_services/chat-service";
import Head from "next/head";
import Link from "next/link";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const { user } = useUserAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const chatId = searchParams.get('chatId');
    console.log("Search params chatId:", chatId); // Debug log
    if (chatId) {
      setChatId(chatId);
      console.log("Chat ID set to:", chatId); // Debug log
    }
  }, [searchParams]);

  useEffect(() => {
    if (chatId && user) {
      console.log("Fetching messages for chat ID:", chatId); // Debug log
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
      console.log("Sending message:", message); // Debug log
      await addMessage(chatId, message);
      setNewMessage("");
    }
  };

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
          <Link href="/account"
            className="text-white hover:text-gray-200">← Back to Home
          </Link>
        </header>
        <main className="flex-grow p-4 overflow-auto">
          <div className="max-w-3xl mx-auto bg-[#FFF8F0] rounded-lg shadow-lg p-6">
            <div className="overflow-auto max-h-[60vh]">
              {messages.map((message) => (
                <div key={message.id} className="mb-4">
                  <div className="text-sm text-black font-semibold">{message.userName}</div>
                  <div className="p-3 bg-gray-200 rounded-lg mt-1 text-black">{message.text}</div>
                  <div className="text-xs text-gray-500 text-right mt-1">
                    {new Date(message.timestamp?.toDate()).toLocaleString()}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </main>
        <footer className="p-4 bg-[#392F5A] shadow-lg">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              className="flex-grow p-3 border border-black rounded-lg focus:outline-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Send
            </button>
          </form>
        </footer>
      </div>
    </>
  );
}

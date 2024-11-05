"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for previous chats
const mockChats = [
  {
    id: 1,
    name: "John Doe",
    messages: [
      { from: "John", content: "Hi there!" },
      { from: "You", content: "Hello!" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    messages: [
      { from: "Jane", content: "Are you available tomorrow?" },
      { from: "You", content: "Yes, what time?" },
    ],
  },
  {
    id: 3,
    name: "Alice Johnson",
    messages: [{ from: "Alice", content: "Good morning!" }],
  },
];

type Chat = {
  id: number;
  name: string;
  messages: { from: string; content: string }[];
};

export default function StaffInboxPage() {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [filteredChats, setFilteredChats] = useState<Chat[]>(mockChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Open selected chat
  const openChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  // Send a new message in the current chat
  const handleSendMessage = () => {
    if (selectedChat && newMessage.trim()) {
      const updatedChat = {
        ...selectedChat,
        messages: [
          ...selectedChat.messages,
          { from: "You", content: newMessage },
        ],
      };
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChat.id ? updatedChat : chat
        )
      );
      setNewMessage("");
      setSelectedChat(updatedChat);
    }
  };

  // Filter contacts based on search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredChats(
      chats.filter((chat) => chat.name.toLowerCase().includes(term))
    );
  };

  return (
    <div className="p-6 flex gap-4">
      {/* Inbox List */}
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search contacts"
            value={searchTerm}
            onChange={handleSearch}
            className="mb-4"
          />
          <ul className="space-y-2">
            {filteredChats.map((chat) => (
              <li
                key={chat.id}
                className="p-2 rounded-md cursor-pointer hover:bg-gray-100"
                onClick={() => openChat(chat)}
              >
                {chat.name}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Chat Window */}
      {selectedChat ? (
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Chat with {selectedChat.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-[500px] justify-between">
            <div className="overflow-y-auto p-2 border rounded-md bg-gray-50 h-[400px]">
              {selectedChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-md ${
                    msg.from === "You"
                      ? "bg-blue-100 text-right"
                      : "bg-gray-200 text-left"
                  }`}
                >
                  <strong>{msg.from}: </strong>
                  <span>{msg.content}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p>Select a contact to start chatting.</p>
        </div>
      )}
    </div>
  );
}

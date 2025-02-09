
import React, { useState, useEffect } from 'react';
import { MessageSquare, Search, Send, Settings, Users, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { brainwaveSymbol } from "../assets";
import axios from 'axios';


function ChatPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [currentMessage, setCurrentMessage] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [activeChat, setActiveChat] = useState(1);
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("chats");
    return savedChats ? JSON.parse(savedChats) : [
      {
        id: 1,
        name: "KalRav",
        lastMessage: "",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unread: 2,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        messages: [
          { id: 1, text: "Hi there! How are you feeling today?", sender: "other", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]); // Added chats as dependency


  const activeConversation = chats.find((chat) => chat.id === activeChat);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: activeConversation.messages.length + 1,
      text: currentMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };


    // Create a new chats array with the user message
    const updatedChatsWithUserMessage = chats.map(chat => {

      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [...chat.messages, userMessage],

          lastMessage: currentMessage,

        };
      }
      return chat;
    });


    // Update state and clear input
    setChats(updatedChatsWithUserMessage);
    setCurrentMessage('');


    try {
      const response = await axios.post(
        "http://localhost:3000/api/messages/add",
        {
          msg: userMessage.text,
        }
      );

      setAnalysisData(response.data);

      const botMessage = {
        id: userMessage.id + 1,

        text: response.data.response_message, // Display response from backend

        sender: "other",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };



      // Update chats with bot message
      setChats(prevChats => prevChats.map(chat => 
        chat.id === activeChat 
          ? { ...chat, messages: [...chat.messages, botMessage] }
          : chat
      ));


    } catch (error) {
      console.error("Error sending message:", error);
      // Add error handling UI feedback here
    }
  };

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    setChats(
      chats.map((chat) => (chat.id === chatId ? { ...chat, unread: 0 } : chat))
    );
  };

  // Early return if no active conversation
  if (!activeConversation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex bg-n-6">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transform transition-transform duration-300 ease-in-out fixed lg:relative w-80 h-full bg-n-7 border-r border-gray-200 z-40`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="text-blue-400" /> Kalrav
            </h1>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings size={20} className="text-gray-400" />
            </button>
          </div>
          

          <div className="space-y-4">

            
            {chats.map((chat) => (

              <div
                key={chat.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                  activeChat === chat.id ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => handleChatSelect(chat.id)}
              >
                <img
                  src={brainwaveSymbol}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-sm text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}

            <button 
            className="bg-purple-800 text-white text-2xl p-2 rounded-lg mx-auto inline-flex w-full justify-center" 
            onClick={() => navigate("/report")}
               >
             <img src={brainwaveSymbol}  className="w-10 h-10 rounded-full object-cover mr-1" />
             <div className="mt-0.5">Report</div>

          </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-n-7 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">

            <img
              src={brainwaveSymbol}
              alt={activeConversation.name}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold text-white">
                {activeConversation.name}
              </h2>
              <p className="text-sm text-white">Online</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Users size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeConversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-l-lg rounded-tr-lg"
                    : "bg-gray-200 text-gray-900 rounded-r-lg rounded-tl-lg"
                } px-4 py-2`}
              >
                <p>{message.text}</p>
                <span
                  className={`text-xs ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  } block mt-1`}
                >
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}

        <form onSubmit={handleSendMessage} className="bg-n-7 border-t border-gray-200 p-4 flex gap-4">
          <input 
            type="text" 
            value={currentMessage} 
            onChange={(e) => setCurrentMessage(e.target.value)} 
            placeholder="Type your message..." 
            className="flex-1 px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500" 
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 rounded-lg"
          >
            <Send size={20} />
          </button>

          <button 
            className="bg-purple-800 text-white text-xl p-2 rounded-lg mx-auto inline-flex " 
            onClick={() => navigate("/report")}
          >
             <img src={brainwaveSymbol}  className="w-8 h-8 rounded-full object-cover mr-1" />
             <div className="mt-0.5">Report</div>
          </button>

        </form>

        
         
        
      </div>
    </div>
  );
}

export default ChatPage;
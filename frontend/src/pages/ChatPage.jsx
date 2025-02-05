import React, { useState } from 'react';
import { MessageSquare, Search, Send, Settings, Users, Menu, X } from 'lucide-react';

function ChatPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [activeChat, setActiveChat] = useState(1);
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Sarah Wilson",
      lastMessage: "See you tomorrow!",
      time: "12:30 PM",
      unread: 2,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      messages: [
        { id: 1, text: "Hey there! How are you?", sender: "other", time: "12:30 PM" },
        { id: 2, text: "I'm doing great, thanks! How about you?", sender: "user", time: "12:31 PM" },
        { id: 3, text: "Pretty good! Working on some new features.", sender: "other", time: "12:32 PM" }
      ]
    },
    {
      id: 2,
      name: "Tech Team",
      lastMessage: "New project update",
      time: "11:45 AM",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150",
      messages: [
        { id: 1, text: "Team meeting at 3 PM", sender: "other", time: "11:30 AM" },
        { id: 2, text: "I'll prepare the presentation", sender: "user", time: "11:35 AM" },
        { id: 3, text: "Great, thanks!", sender: "other", time: "11:45 AM" }
      ]
    },
    {
      id: 3,
      name: "John Davis",
      lastMessage: "Thanks for your help!",
      time: "Yesterday",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      messages: [
        { id: 1, text: "Can you help me with the project?", sender: "other", time: "Yesterday" },
        { id: 2, text: "Sure, what do you need?", sender: "user", time: "Yesterday" },
        { id: 3, text: "Thanks for your help!", sender: "other", time: "Yesterday" }
      ]
    }
  ]);

  const activeConversation = chats.find(chat => chat.id === activeChat);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    
    const newMessage = {
      id: activeConversation.messages.length + 1,
      text: currentMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: currentMessage,
          time: newMessage.time
        };
      }
      return chat;
    });
    
    setChats(updatedChats);
    setCurrentMessage('');

    // Simulate receiving a response after 1 second
    setTimeout(() => {
      const responses = [
        "That's interesting!",
        "Thanks for letting me know.",
        "I'll get back to you on that.",
        "Sounds good!",
        "Great idea!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage = {
        id: activeConversation.messages.length + 2,
        text: randomResponse,
        sender: "other",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updatedChatsWithResponse = chats.map(chat => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage, responseMessage],
            lastMessage: randomResponse,
            time: responseMessage.time
          };
        }
        return chat;
      });

      setChats(updatedChatsWithResponse);
    }, 1000);
  };

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    // Clear unread messages when selecting a chat
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, unread: 0 } : chat
    ));
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transform transition-transform duration-300 ease-in-out fixed lg:relative w-80 h-full bg-white border-r border-gray-200 z-40`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare className="text-blue-600" />
              ChatApp
            </h1>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          <div className="space-y-4">
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                  activeChat === chat.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleChatSelect(chat.id)}
              >
                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-sm text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={activeConversation.avatar}
              alt={activeConversation.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-gray-900">{activeConversation.name}</h2>
              <p className="text-sm text-gray-500">Online</p>
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
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-l-lg rounded-tr-lg' 
                  : 'bg-gray-200 text-gray-900 rounded-r-lg rounded-tl-lg'
              } px-4 py-2`}>
                <p>{message.text}</p>
                <span className={`text-xs ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                } block mt-1`}>
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
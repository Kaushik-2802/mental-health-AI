import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io, Socket } from "socket.io-client";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { doctorData, userData } from "../../constants/mockData";
import {
  FaPaperPlane,
  FaPaperclip,
  FaMicrophone,
  FaSmile,
  FaArrowLeft,
  FaVideo,
  FaPhoneAlt,
} from "react-icons/fa";

interface Message {
  id: number;
  sender: "user" | "doctor";
  text: string;
  timestamp: string;
}

// Mock conversation data
const mockMessages: Message[] = [
  {
    id: 1,
    sender: "doctor",
    text: "Hello Sarah, how are you feeling today?",
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 30)
    ).toISOString(),
  },
  {
    id: 2,
    sender: "user",
    text: "Hi Dr. Chen, I'm feeling a bit anxious about my upcoming presentation.",
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 25)
    ).toISOString(),
  },
  {
    id: 3,
    sender: "doctor",
    text: "That's understandable. Remember the breathing techniques we discussed last time?",
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 20)
    ).toISOString(),
  },
  {
    id: 4,
    sender: "user",
    text: "Yes, I've been trying them. They help a bit, but I still feel overwhelmed sometimes.",
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 15)
    ).toISOString(),
  },
  {
    id: 5,
    sender: "doctor",
    text: "I'm glad they're helping. Let's go over them again and add some visualization exercises that might help with the presentation anxiety specifically.",
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 10)
    ).toISOString(),
  },
];

// Message typing animation
const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-2">
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "0ms" }}
    ></div>
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "200ms" }}
    ></div>
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "400ms" }}
    ></div>
  </div>
);

const DoctorChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  // Mock socket connection
  useEffect(() => {
    // In a real app, we would connect to an actual server
    // const socket = io('https://api.kalrav.com');
    console.log("Simulating WebSocket connection");

    // Simulate auto-response from doctor
    const typingTimer = setTimeout(() => {
      if (
        messages.length > 0 &&
        messages[messages.length - 1].sender === "user"
      ) {
        setIsTyping(true);

        setTimeout(() => {
          const newMsg: Message = {
            id: messages.length + 1,
            sender: "doctor",
            text: getAutomaticResponse(),
            timestamp: new Date().toISOString(),
          };

          setMessages((prev) => [...prev, newMsg]);
          setIsTyping(false);
        }, 3000);
      }
    }, 1000);

    return () => {
      clearTimeout(typingTimer);
      // socket.disconnect();
    };
  }, [messages]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  // Handle input keypress (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp to readable time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Simulate automatic responses
  const getAutomaticResponse = () => {
    const responses = [
      "How have you been implementing the techniques we discussed in our last session?",
      "That's interesting. Could you tell me more about how that makes you feel?",
      "I understand that can be challenging. What coping mechanisms have been helpful for you?",
      "Have you been practicing the mindfulness exercises we talked about?",
      "Remember that progress isn't always linear. Small steps are still progress.",
      "I'm here to support you through this process. What would be most helpful right now?",
      "Let's focus on what you can control in this situation.",
      "That's good progress! How did it feel when you accomplished that?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <Card className="overflow-hidden flex flex-col h-[calc(100vh-180px)]">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-100 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="ghost" size="sm" className="mr-2">
              <FaArrowLeft />
            </Button>
          </motion.div>

          <div className="flex items-center">
            <img
              src={doctorData.avatar}
              alt={doctorData.name}
              className="w-10 h-10 rounded-full border border-gray-200"
            />
            <div className="ml-3">
              <h2 className="font-medium text-gray-800">{doctorData.name}</h2>
              <div className="flex items-center">
                <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
                <span className="text-sm text-gray-500">Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" color="5">
            <FaPhoneAlt />
          </Button>
          <Button variant="ghost" size="sm" color="1">
            <FaVideo />
          </Button>
        </div>
      </div>

      {/* Chat messages */}
      <div
        className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50"
        ref={messageListRef}
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "doctor" && (
                <img
                  src={doctorData.avatar}
                  alt={doctorData.name}
                  className="w-8 h-8 rounded-full self-end mb-2 mr-2"
                />
              )}

              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-kalrav-1 text-white"
                    : "bg-white border border-gray-100"
                }`}
              >
                <p className="mb-1">{message.text}</p>
                <p
                  className={`text-xs ${
                    message.sender === "user"
                      ? "text-white/70"
                      : "text-gray-400"
                  } text-right`}
                >
                  {formatTimestamp(message.timestamp)}
                </p>
              </div>

              {message.sender === "user" && (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-8 h-8 rounded-full self-end mb-2 ml-2"
                />
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <img
                src={doctorData.avatar}
                alt={doctorData.name}
                className="w-8 h-8 rounded-full self-end mb-2 mr-2"
              />
              <div className="bg-white rounded-lg p-2 border border-gray-100">
                <TypingIndicator />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* Message input */}
      <div className="bg-white border-t border-gray-100 p-4">
        <div className="flex items-center">
          <button
            className="text-gray-400 hover:text-kalrav-1 p-2"
            title="Attach a file"
          >
            <FaPaperclip />
          </button>

          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-grow bg-gray-50 rounded-lg border border-gray-200 px-4 py-2 mx-2 resize-none focus:outline-none focus:ring-2 focus:ring-kalrav-1/50"
            rows={1}
          />

          <div className="flex items-center space-x-2">
            <button
              className="text-gray-400 hover:text-kalrav-1 p-2"
              title="Send a smile"
            >
              <FaSmile />
            </button>
            <button
              className="text-gray-400 hover:text-kalrav-1 p-2"
              title="Record a voice message"
            >
              <FaMicrophone />
            </button>
            <Button
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
              size="sm"
            >
              <FaPaperPlane />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DoctorChat;

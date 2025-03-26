import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io, Socket } from "socket.io-client";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { userData } from "../../constants/mockData";
import {
  FaPaperPlane,
  FaPaperclip,
  FaMicrophone,
  FaSmile,
  FaArrowLeft,
  FaEllipsisH,
  FaUserFriends,
} from "react-icons/fa";

interface Message {
  id: number;
  sender: "user" | "peer";
  text: string;
  timestamp: string;
}

// Mock patient data
const peerPatient = {
  id: "peer-123",
  name: "Alex Rivera",
  avatar: "https://i.pravatar.cc/150?img=57",
  joinedDate: "2023-06-10",
  supportGroups: ["Anxiety Support", "Stress Management"],
};

// Mock conversation data
const mockMessages: Message[] = [
  {
    id: 1,
    sender: "peer",
    text: "Hi Sarah, thanks for connecting! I saw we're both in the Anxiety Support group.",
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 40)
    ).toISOString(),
  },
  {
    id: 2,
    sender: "user",
    text: "Hey Alex! Yes, I joined last month. It's been helpful to know I'm not alone in this journey.",
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 35)
    ).toISOString(),
  },
  {
    id: 3,
    sender: "peer",
    text: "Absolutely! Have you tried any of the techniques Dr. Chen recommended in the last group session?",
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 30)
    ).toISOString(),
  },
  {
    id: 4,
    sender: "user",
    text: "I've been trying the breathing exercises, but I'm still learning how to make them a regular habit. How about you?",
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 25)
    ).toISOString(),
  },
  {
    id: 5,
    sender: "peer",
    text: "Same here. I found setting specific times during the day helps - like right after waking up and before bed. I've also been journaling, which has been a game-changer for recognizing patterns in my anxiety triggers.",
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 20)
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

const PatientChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  // Mock socket connection
  useEffect(() => {
    console.log("Simulating WebSocket connection for patient chat");

    // Simulate auto-response from peer
    const typingTimer = setTimeout(() => {
      if (
        messages.length > 0 &&
        messages[messages.length - 1].sender === "user"
      ) {
        setIsTyping(true);

        setTimeout(() => {
          const newMsg: Message = {
            id: messages.length + 1,
            sender: "peer",
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

  // Simulate automatic responses for peer
  const getAutomaticResponse = () => {
    const responses = [
      "Have you attended any of the community workshops? I found the mindfulness one really helpful.",
      "I've been using the Kalrav app daily for check-ins. It really helps track my progress.",
      "What other coping strategies have worked for you?",
      "Sometimes I just need to talk to someone who understands what I'm going through. It's nice to have this community.",
      "Did you see the new resources Dr. Chen posted in the group? The article about anxiety management was really insightful.",
      "How long have you been working with Dr. Chen? She's been my therapist for about 6 months now.",
      "Let me know if you ever want to join the virtual walking group. We chat while taking walks in our own neighborhoods - it's both exercise and support!",
      "What's been your biggest challenge lately? For me, it's been work-related stress triggering my anxiety.",
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
            <div className="relative">
              <img
                src={peerPatient.avatar}
                alt={peerPatient.name}
                className="w-10 h-10 rounded-full border border-gray-200"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="ml-3">
              <h2 className="font-medium text-gray-800">{peerPatient.name}</h2>
              <div className="flex items-center">
                <FaUserFriends className="text-kalrav-5 text-xs mr-1" />
                <span className="text-sm text-gray-500">Anxiety Support</span>
              </div>
            </div>
          </div>
        </div>

        <Button variant="ghost" size="sm">
          <FaEllipsisH />
        </Button>
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
              {message.sender === "peer" && (
                <img
                  src={peerPatient.avatar}
                  alt={peerPatient.name}
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
                src={peerPatient.avatar}
                alt={peerPatient.name}
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
              title="Insert emoji"
            >
              <FaSmile />
            </button>
            <button
              className="text-gray-400 hover:text-kalrav-1 p-2"
              title="Send a voice message"
            >
              <FaMicrophone />
            </button>
            <Button
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
              size="sm"
              color="6"
            >
              <FaPaperPlane />
            </Button>
          </div>
        </div>
      </div>

      {/* Privacy reminder */}
      <div className="bg-gray-50 border-t border-gray-100 px-4 py-2 text-xs text-center text-gray-500">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          All conversations are confidential and subject to our community
          guidelines.
        </motion.p>
      </div>
    </Card>
  );
};

export default PatientChat;

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import axios from "axios"; // Import Axios

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);

  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      const userMessage = message;
      setMessage("");

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/chatbot/",
          {
            user_input: userMessage,
          }
        );

        const botResponse = response.data.response;
        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-900 hover:teal-400 text-white rounded-full p-4 shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <MessageCircle size={24} />
          <span className="font-medium">Ecobot</span>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-80 max-w-[calc(100vw-2rem)] flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-teal-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Chat Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-teal-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 p-4 space-y-4 overflow-y-auto"
            style={{ height: "24rem" }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Scroll target */}
          </div>

          {/* Input form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-gray-200"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

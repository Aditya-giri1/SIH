import React, { useState, useEffect, useRef } from 'react';
import { icons } from '../../utils/icons';

const FirstAidChat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI First-Aid assistant. How are you feeling today? You can tell me about what's on your mind, like 'I'm feeling stressed' or 'I have trouble sleeping'.", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8001/query', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.answer, sender: 'bot' }]);
    } catch (error) {
      setMessages([...newMessages, { text: "⚠️ Sorry, I couldn’t connect to the server. Please try again later.", sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${msg.sender === 'bot' ? 'bg-white shadow-sm' : 'bg-indigo-500 text-white'}`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-white shadow-sm">
              <p>⏳ Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-700 transition-colors"
          >
            {icons.send}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstAidChat;

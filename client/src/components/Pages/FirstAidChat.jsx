import React, { useState, useEffect, useRef } from 'react';
import { icons } from '../../utils/icons';

const FirstAidChat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI First-Aid assistant. How are you feeling today? You can tell me about what's on your mind, like 'I'm feeling stressed' or 'I have trouble sleeping'.", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };
  
  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('stress') || lowerInput.includes('anxiety')) {
        return "It sounds like you're dealing with a lot of pressure. A helpful technique is the '4-7-8' breathing exercise. Inhale for 4 seconds, hold your breath for 7, and exhale slowly for 8. Would you like to explore more resources on stress management?";
    }
    if (lowerInput.includes('sleep')) {
        return "Many students struggle with sleep. It might help to establish a relaxing pre-sleep routine, like reading a book or listening to calming music. Avoiding screens an hour before bed can also make a big difference. I can point you to some sleep audio guides in our resource hub.";
    }
    if (lowerInput.includes('sad') || lowerInput.includes('depressed')) {
        return "I'm sorry to hear you're feeling this way. Please remember that these feelings are valid. It can be very helpful to talk to someone. Would you consider booking a confidential session with a campus counselor? Your well-being is a priority.";
    }
    return "Thank you for sharing. It's brave to talk about these things. Remember, there are many resources available here to help you. You can browse the resource hub for self-help guides or book an appointment with a professional for personalized support.";
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
          <button onClick={handleSend} className="bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-700 transition-colors">
            {icons.send}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstAidChat;
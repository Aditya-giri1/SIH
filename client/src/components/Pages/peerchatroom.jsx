// src/pages/PeerChat.jsx
import { useEffect, useState, useRef } from "react";

export default function PeerChat({ email, onExit }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080"); // change to your backend URL
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "peer_join",
          payload: { email },
        })
      );
    };

    ws.onmessage = (event) => {
      // backend sends raw string messages
      console.log(event) ;
      const data = event.data;
      setMessages((prev) => [...prev, { sender: "Peer", text: data }]);
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
    };

    return () => ws.close();
  }, [email]);

  const handleSend = () => {
    if (!input.trim()) return;

    const msg = {
      type: "peer_chat",
      payload: { email, message: input },
    };

    wsRef.current.send(JSON.stringify(msg));
    setMessages((prev) => [...prev, { sender: "You", text: input }]);
    setInput("");
  };

  const handleExit = () => {
    wsRef.current.send(
      JSON.stringify({
        type: "peer_exit",
        payload: { email },
      })
    );
    wsRef.current.close();
    onExit();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-600 text-white p-4 shadow">
        <h1 className="text-lg font-bold">Peer Chat Room</h1>
        <button
          onClick={handleExit}
          className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Exit Room
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <span className="block text-xs font-semibold">
                {msg.sender}
              </span>
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center p-4 bg-white border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}





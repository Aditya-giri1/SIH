import { useEffect, useRef, useState } from "react";
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt";

export default function PersonalChat({ from, to, onBack }) {
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showCall, setShowCall] = useState(false);

  const wsRef = useRef(null);
  const zegoRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "private_chat",
          payload: { from, to },
        })
      );
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response.type === "chat_created") {
        setRoomId(response.roomId);
      }

      if (response.type === "message" && response.roomId === roomId) {
        setMessages((prev) => [
          ...prev,
          { sender: response.sender, text: response.message },
        ]);
      }
    };

    return () => ws.close();
  }, [from, to, roomId]);

  const handleSend = () => {
    if (!input.trim() || !roomId) return;

    wsRef.current.send(
      JSON.stringify({
        type: "private_msg",
        payload: { roomId, sender: from, message: input },
      })
    );

    setMessages((prev) => [...prev, { sender: "You", text: input }]);
    setInput("");
  };

  // 🎥 Video Call with ZEGOCLOUD
  const handleCall = () => {
    if (!roomId) {
      alert("Room not ready yet!");
      return;
    }

    setShowCall(true);

    const appID = 947252619; // 🔹 Replace with your Zego App ID (number)
    const serverSecret = "451546847220a5d2ecd7ceb79ebc98bc"; // 🔹 Replace with your Zego Server Secret

    // Generate Kit Token (⚠ only for testing; for production use your own token server)
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(), // userID
      from  // userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zegoRef.current = zp;

    zp.joinRoom({
      container: document.getElementById("zego-call-container"),
      scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
       showPreJoinView: true, // shows camera preview + join button
    turnOnCameraWhenJoining: true,
    turnOnMicrophoneWhenJoining: true,
    showRoomTimer: true,
    showTextChat: true,
    showScreenSharingButton: false,
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-600 text-white p-4 shadow">
        <h1 className="text-lg font-bold">Chat with {to}</h1>
        <div className="flex gap-5">
          <button
            onClick={handleCall}
            className="bg-blue-200 text-black px-3 py-1 rounded-lg hover:bg-blue-300"
          >
            Video Call
          </button>
          <button
            onClick={onBack}
            className="bg-gray-200 text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-300"
          >
            Back
          </button>
        </div>
      </div>

      {/* Chat Area */}
      {!showCall && (
        <>
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
        </>
      )}

      {/* Video Call Area */}
      {showCall && (
        <div className="flex-1 bg-black">
          <div
            id="zego-call-container"
            className="w-full h-full rounded-lg overflow-hidden"
          />
        </div>
      )}
    </div>
  );
} 
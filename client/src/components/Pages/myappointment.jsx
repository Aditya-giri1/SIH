import { useState } from "react";
import PersonalChat from "./PersonalChat";

export default function Appointments() {
  const [inChat, setInChat] = useState(false);

  // Example users
  const currentUser = "alice@example.com";
  const otherUser = "bob@example.com";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      {!inChat ? (
        <button
          onClick={() => setInChat(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          Chat with {otherUser}
        </button>
      ) : (
        <PersonalChat from={currentUser} to={otherUser} onBack={() => setInChat(false)} />
      )}
    </div>
  );
}

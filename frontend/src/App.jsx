import React, { useState } from "react";
import Background from "./components/Background.jsx";

export default function App() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const newChat = [...chat, { role: "user", content: input }];
    setChat(newChat);
    setInput("");

    try {
      const res = await fetch("https://your-backend-url.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setChat([...newChat, { role: "bot", content: data.reply }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Background />

      {/* Chat messages */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg bg-black/60 text-white p-4 rounded-lg backdrop-blur-md h-[70%] overflow-y-auto shadow-lg">
        {chat.map((c, i) => (
          <div
            key={i}
            className={`my-2 ${
              c.role === "user" ? "text-right text-blue-300" : "text-left text-green-300"
            }`}
          >
            {c.content}
          </div>
        ))}
      </div>

      {/* Floating input */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg flex bg-white/80 p-2 rounded-xl shadow-lg">
        <input
          className="flex-1 p-2 rounded-l-lg outline-none text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="px-4 bg-blue-600 text-white rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

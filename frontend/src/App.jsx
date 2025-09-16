import { useState } from "react";
import Background from "./components/Background";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // send message handler
  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    setChat((prev) => [...prev, { sender: "user", text: message }]);

    try {
      // call backend (replace with your Render URL)
      const res = await fetch("https://your-backend.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      // add bot reply
      setChat((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [...prev, { sender: "bot", text: "Error connecting to server." }]);
    }

    setMessage(""); // clear input
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Background />

      {/* Chat messages */}
      <div className="absolute inset-0 overflow-y-auto p-4 z-10 text-white">
        {chat.map((c, i) => (
          <div key={i} className={c.sender === "user" ? "text-right" : "text-left"}>
            <p className="inline-block px-3 py-2 m-1 rounded-lg bg-black/40">
              {c.text}
            </p>
          </div>
        ))}
      </div>

      {/* Floating chatbox */}
      <div className="chatbox z-20">
        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    setChat([...chat, { role: "user", text: message }]);

    const res = await fetch("https://YOUR-BACKEND-URL.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setChat((prev) => [...prev, { role: "bot", text: data.reply }]);
    setMessage("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>KAIRO AI</h1>
      <div
        style={{
          border: "1px solid gray",
          padding: 10,
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {chat.map((c, i) => (
          <div key={i}>
            <b>{c.role === "user" ? "You" : "Bot"}:</b> {c.text}
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "70%", padding: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: 8, marginLeft: 5 }}>
        Send
      </button>
    </div>
  );
}

export default App;

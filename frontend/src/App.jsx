import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (!msg) return;
    setChat([...chat, { role: "user", text: msg }]);
    setMsg("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>KAIRO AI</h1>

      <div style={{ height: 200, overflowY: "auto", border: "1px solid gray", marginBottom: 10, padding: 10 }}>
        {chat.map((c, i) => (
          <div key={i}>
            <b>{c.role}:</b> {c.text}
          </div>
        ))}
      </div>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;

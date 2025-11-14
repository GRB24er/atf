"use client";
// @ts-nocheck
import { useEffect, useState } from "react";
import { ref, onValue, push, set, get } from "firebase/database";
import { db } from "@/lib/firebase";

export default function AdminChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("patval12");
  const [chatId, setChatId] = useState("");
  const admin = "ATF Concierge";

  // === Load latest chat session for selected user ===
  useEffect(() => {
    const fetchLatestChat = async () => {
      const chatsRef = ref(db, "chats");
      const snapshot = await get(chatsRef);
      if (snapshot.exists()) {
        const allChats = Object.keys(snapshot.val());
        const userChats = allChats.filter((id) =>
          id.startsWith(`chat_${selectedUser}_`)
        );
        const latest = userChats.sort().pop();
        setChatId(latest || "");
      }
    };
    fetchLatestChat();
  }, [selectedUser]);

  // === Listen to messages for that chat ===
  useEffect(() => {
    if (!chatId) return;
    const chatRef = ref(db, `chats/${chatId}/messages`);
    return onValue(chatRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loaded = Object.values(data);
      setMessages(loaded.sort((a: any, b: any) => a.timestamp - b.timestamp));
    });
  }, [chatId]);

  // === Send message as admin ===
  const sendMessage = async (e?: any) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !chatId) return;
    try {
      const chatRef = ref(db, `chats/${chatId}/messages`);
      const newMsgRef = push(chatRef);
      await set(newMsgRef, {
        sender: admin,
        text: newMessage.trim(),
        timestamp: Date.now(),
      });
      setNewMessage("");
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>🛩️ Admin — ATF Concierge Chat</div>

      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        style={styles.dropdown}
      >
        <option value="patval12">Patrick Van Jewell</option>
        <option value="john77">John Smith</option>
        <option value="victoria88">Victoria Lane</option>
      </select>

      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.sender === admin ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === admin ? "#d4af37" : "#111",
              color: msg.sender === admin ? "#000" : "#fff",
            }}
          >
            <strong>{msg.sender}:</strong> {msg.text || ""}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={styles.inputArea}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your reply..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
}

const styles: any = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
    fontFamily: "Inter, sans-serif",
  },
  header: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
    borderBottom: "1px solid #d4af37",
    paddingBottom: "10px",
  },
  dropdown: {
    marginBottom: "10px",
    padding: "6px",
    background: "#111",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "6px",
    width: "200px",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "10px",
  },
  message: {
    padding: "8px 12px",
    borderRadius: "12px",
    maxWidth: "75%",
  },
  inputArea: {
    display: "flex",
    gap: "8px",
    paddingTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
    outline: "none",
    background: "#111",
    color: "#fff",
  },
  button: {
    background: "#d4af37",
    border: "none",
    borderRadius: "8px",
    padding: "10px 16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

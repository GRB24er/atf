"use client";
// @ts-nocheck
import { useEffect, useState } from "react";
import { ref, onValue, push, set, remove } from "firebase/database";
import { db } from "@/lib/firebase";
import mockUser from "@/lib/mockUser";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [booking, setBooking] = useState<any>(null);
  const [chatId, setChatId] = useState("");

  // --- Identify the logged-in user ---
  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("userId") || "guest"
      : "guest";
  const userName =
    typeof window !== "undefined"
      ? localStorage.getItem("userName") || mockUser.profile.fullName
      : mockUser.profile.fullName;

  // --- Initialize chat session ONCE ---
  useEffect(() => {
    // Check if there's an existing chat session
    let currentChatId = localStorage.getItem("currentChatId");
    
    // If no session exists, create a fresh one
    if (!currentChatId) {
      currentChatId = `chat_${userId}_${Date.now()}`;
      localStorage.setItem("currentChatId", currentChatId);
    }
    
    setChatId(currentChatId);
  }, [userId]);

  // --- Load active booking ---
  useEffect(() => {
    const activeId = localStorage.getItem("activeBooking");
    if (activeId) {
      const found = mockUser.travelHistory.find((b) => b.id === activeId);
      setBooking(found);
    }
  }, []);

  // --- Listen to messages ---
  useEffect(() => {
    if (!chatId) return;
    
    const chatRef = ref(db, `chats/${chatId}/messages`);
    return onValue(chatRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loaded = Object.values(data);
      setMessages(loaded.sort((a: any, b: any) => a.timestamp - b.timestamp));
    });
  }, [chatId]);

  // --- Send message ---
  const sendMessage = async () => {
    if (!newMessage.trim() || !chatId) return;
    const chatRef = ref(db, `chats/${chatId}/messages`);
    const newMsgRef = push(chatRef);
    await set(newMsgRef, {
      sender: userName,
      text: newMessage,
      timestamp: Date.now(),
    });
    setNewMessage("");
  };

  // --- Clear chat and start fresh (call this when user logs out or wants new session) ---
  const startFreshChat = () => {
    const oldChatId = localStorage.getItem("currentChatId");
    if (oldChatId) {
      const oldChatRef = ref(db, `chats/${oldChatId}`);
      remove(oldChatRef);
    }
    localStorage.removeItem("currentChatId");
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      {/* ===== Header with Booking Info ===== */}
      {booking && (
        <div style={styles.headerCard}>
          <img src="/patrick.jpg" alt="Patrick" style={styles.avatar} />
          <div style={{ flex: 1 }}>
            <div style={styles.name}>{userName}</div>
            <div style={styles.route}>
              {booking.from} → {booking.to}
            </div>
            <div style={styles.meta}>
              {booking.date} • {booking.aircraft} •{" "}
              <strong style={{ color: "#d4af37" }}>
                {booking.currency} {booking.price.toLocaleString()}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* ===== Chat Messages ===== */}
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.sender === userName ? "flex-end" : "flex-start",
              backgroundColor:
                msg.sender === userName ? "#d4af37" : "#111",
              color: msg.sender === userName ? "#000" : "#fff",
            }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* ===== Message Input ===== */}
      <div style={styles.inputArea}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
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
    padding: "16px",
    fontFamily: "Inter, sans-serif",
  },
  headerCard: {
    display: "flex",
    alignItems: "center",
    background: "#0f0f10",
    border: "1px solid #333",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "12px",
  },
  avatar: { width: 60, height: 60, borderRadius: "50%", marginRight: "14px" },
  name: { fontWeight: 700, fontSize: "1rem", color: "#d4af37" },
  route: { color: "#fff", fontSize: "0.9rem" },
  meta: { color: "#bdbdbd", fontSize: "0.8rem" },
  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "10px",
  },
  message: { padding: "8px 12px", borderRadius: "12px", maxWidth: "75%" },
  inputArea: { display: "flex", gap: "8px", paddingTop: "10px" },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
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
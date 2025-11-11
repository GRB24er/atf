"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import mockUser from "@/lib/mockUser";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // check against mock user credentials
    if (username === mockUser.username && password === mockUser.password) {
      // store minimal session (mock)
      localStorage.setItem("userId", mockUser.profile.id);
      localStorage.setItem("userName", mockUser.profile.fullName);
      router.push("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>✈️ ATF JETS — Member Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.button}>
          Sign in
        </button>
        <div style={styles.demo}>
          Demo credentials: <strong>{mockUser.username}</strong> / <strong>{mockUser.password}</strong>
        </div>
      </form>
    </div>
  );
}

const styles: any = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#020203",
    color: "#fff",
    padding: "24px"
  },
  title: { fontSize: "1.5rem", color: "#d4af37", marginBottom: "12px" },
  form: { width: "340px", display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", borderRadius: "8px", border: "1px solid #333", background: "#0f0f10", color: "#fff" },
  button: { background: "#d4af37", color: "#000", padding: "10px", borderRadius: "8px", border: "none", fontWeight: "700" },
  demo: { marginTop: "8px", fontSize: "0.85rem", color: "#bdbdbd" },
  error: { color: "#ff6b6b" }
};

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import mockUser from "@/lib/mockUser";

function formatCurrency(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const name = localStorage.getItem("userName");
    if (!id) router.push("/login");
    else setUserName(name);
  }, []);

  const handleChat = (bookingId: string) => {
    // if booking requires chat, go to chat — otherwise still allow viewing
    localStorage.setItem("activeBooking", bookingId);
    router.push("/chat");
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.h1}>Welcome back, {userName ?? mockUser.profile.fullName}</div>
          <div style={styles.sub}>VIP — {mockUser.profile.vipLevel} • {mockUser.profile.company}</div>
        </div>
        <div style={styles.account}>
          <div style={styles.avatar}></div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700 }}>{mockUser.profile.fullName}</div>
            <div style={{ fontSize: 12, color: "#ccc" }}>{mockUser.profile.email}</div>
          </div>
        </div>
      </header>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Recent Bookings</h3>
        <div style={styles.grid}>
          {mockUser.travelHistory.map((b) => (
            <article key={b.id} style={styles.card}>
              <div style={styles.row}>
                <div>
                  <div style={styles.route}><strong>{b.from}</strong> → <strong>{b.to}</strong></div>
                  <div style={styles.meta}>{b.date} • {b.aircraft}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={styles.price}>{formatCurrency(b.price, b.currency)}</div>
                  <div style={styles.status}>{b.status}</div>
                </div>
              </div>

              <div style={{ marginTop: 10, color: "#cfcfcf" }}>{b.notes}</div>

              <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                <button style={styles.primary} onClick={() => handleChat(b.id)}>
                  Chat with Concierge
                </button>
                <button style={styles.ghost} onClick={() => alert("Invoice: " + b.invoiceId)}>
                  View Invoice
                </button>
                <button style={styles.ghost} onClick={() => alert("Booking details: " + JSON.stringify(b, null, 2))}>
                  Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Recent Payments</h3>
        <div style={styles.payments}>
          {mockUser.payments.slice(0, 4).map((p) => (
            <div key={p.id} style={styles.paymentRow}>
              <div>{p.bookingId} • {p.date}</div>
              <div style={{ fontWeight: 700 }}>{p.currency} {p.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles: any = {
  page: { minHeight: "100vh", background: "#070709", color: "#fff", padding: 24, fontFamily: "Inter, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  h1: { fontSize: 20, color: "#ffd27a", fontWeight: 700 },
  sub: { color: "#bdbdbd", marginTop: 6 },
  account: { display: "flex", alignItems: "center", gap: 12 },
  avatar: { width: 52, height: 52, borderRadius: 8, background: "#222" },

  section: { marginTop: 16 },
  sectionTitle: { color: "#d4af37", marginBottom: 12 },

  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 12 },

  card: { background: "#0f0f10", padding: 14, borderRadius: 10, border: "1px solid #232323" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  route: { fontSize: 15 },
  meta: { color: "#bdbdbd", marginTop: 6, fontSize: 13 },
  price: { color: "#fff", fontWeight: 800 },
  status: { background: "#222", padding: "4px 8px", borderRadius: 8, fontSize: 12 },

  primary: { background: "#d4af37", color: "#000", padding: "8px 12px", border: "none", borderRadius: 8, fontWeight: 700 },
  ghost: { background: "transparent", border: "1px solid #333", color: "#ddd", padding: "8px 12px", borderRadius: 8 },

  payments: { marginTop: 8, display: "flex", flexDirection: "column", gap: 8 },
  paymentRow: { background: "#0b0b0c", padding: 12, borderRadius: 8, display: "flex", justifyContent: "space-between" }
};

export default function LeaderboardList({ data }) {
  return (
    <div className="card" style={{ maxWidth: 600 }}>
      {data.map((u, i) => (
        <div
          key={u._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "12px 0",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          <div
            style={{
              fontSize: 18,
              minWidth: 32,
              textAlign: "center",
            }}
          >
            {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
          </div>

          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--primary)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
            }}
          >
            {u.name[0]?.toUpperCase()}
          </div>

          <div style={{ flex: 1, fontWeight: 500 }}>{u.name}</div>

          <div
            style={{
              fontWeight: 700,
              color: "var(--primary)",
            }}
          >
            {u.points} pts
          </div>
        </div>
      ))}
    </div>
  );
}

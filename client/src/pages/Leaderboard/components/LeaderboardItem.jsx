export default function LeaderboardItem({ user, index }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "14px 0",
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
        {index === 0
          ? "🥇"
          : index === 1
            ? "🥈"
            : index === 2
              ? "🥉"
              : `#${index + 1}`}
      </div>

      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "var(--primary)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        {user.name[0]?.toUpperCase()}
      </div>

      <div
        style={{
          flex: 1,
          fontWeight: 500,
          fontSize: 15,
        }}
      >
        {user.name}
      </div>

      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "var(--primary)",
        }}
      >
        {user.points} pts
      </div>
    </div>
  );
}

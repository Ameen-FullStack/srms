export default function AdminTabs({ tab, loadTab }) {
  return (
    <div className="admin-tabs">
      {[
        ["pending", "⏳ Pending"],
        ["materials", "📁 All materials"],
        ["users", "👥 Users"],
        ["leaderboard", "🏆 Leaderboard"],
      ].map(([t, l]) => (
        <button
          key={t}
          className={`tab-btn ${tab === t ? "active" : ""}`}
          onClick={() => loadTab(t)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

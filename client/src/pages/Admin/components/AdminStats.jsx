export default function AdminStats({ stats }) {
  return (
    <div className="stats-bar" style={{ marginBottom: 24 }}>
      {[
        ["Users", stats.totalUsers, "var(--text)"],
        ["Materials", stats.totalMaterials, "var(--text)"],
        ["Pending", stats.pendingCount, "var(--warning)"],
        ["Approved", stats.approvedCount, "var(--accent)"],
        ["Downloads", stats.totalDownloads, "var(--text)"],
      ].map(([l, v, c]) => (
        <div key={l} className="stat-card">
          <div className="stat-label">{l}</div>

          <div className="stat-value" style={{ color: c }}>
            {(v || 0).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

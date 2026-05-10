const StatsBar = ({ stats }) => {
  return (
    <div className="stats-bar">
      <div className="stat-card">
        <div className="stat-label">Total materials</div>

        <div className="stat-value">
          {stats.totalMaterials.toLocaleString()}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Total downloads</div>

        <div className="stat-value">
          {stats.totalDownloads.toLocaleString()}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Contributors</div>

        <div className="stat-value">
          {stats.totalContributors.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;

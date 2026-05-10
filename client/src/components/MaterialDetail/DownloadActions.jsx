const DownloadActions = ({
  user,
  bookmarked,
  handleDownload,
  handleBookmark,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <button className="btn btn-primary" onClick={handleDownload}>
        ↓ Download file
      </button>

      {user ? (
        <button
          className={`btn ${bookmarked ? "btn-success" : "btn-outline"}`}
          onClick={handleBookmark}
        >
          {bookmarked ? "Bookmarked ✓" : "Bookmark"}
        </button>
      ) : (
        <span
          style={{
            fontSize: 13,
            color: "var(--text-hint)",
            display: "flex",
            alignItems: "center",
          }}
        >
          Login to bookmark
        </span>
      )}
    </div>
  );
};

export default DownloadActions;

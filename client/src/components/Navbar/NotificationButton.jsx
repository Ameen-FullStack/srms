const NotificationButton = ({ unread, navigate }) => {
  return (
    <button
      onClick={() => navigate("/notifications")}
      style={{
        position: "relative",
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-muted)",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>

      {unread > 0 && (
        <span
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            background: "var(--danger)",
            color: "#fff",
            fontSize: 10,
            fontWeight: 600,
            width: 16,
            height: 16,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {unread > 9 ? "9+" : unread}
        </span>
      )}
    </button>
  );
};

export default NotificationButton;

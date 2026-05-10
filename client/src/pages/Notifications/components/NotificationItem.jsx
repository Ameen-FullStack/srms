import formatDate from "../../../utils/formatDate";

export default function NotificationItem({ notification, navigate }) {
  return (
    <div
      onClick={() =>
        notification.link &&
        navigate(notification.link.replace("/material.html?id=", "/material/"))
      }
      style={{
        display: "flex",
        gap: 14,
        padding: "14px 0",
        borderBottom: "0.5px solid var(--border)",
        cursor: notification.link ? "pointer" : "default",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: notification.isRead ? "var(--border)" : "var(--primary)",
          flexShrink: 0,
          marginTop: 6,
        }}
      />

      <div>
        <div
          style={{
            fontSize: 14,
            color: "var(--text)",
            lineHeight: 1.5,
          }}
        >
          {notification.message}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "var(--text-hint)",
            marginTop: 4,
          }}
        >
          {formatDate(notification.createdAt)}
        </div>
      </div>
    </div>
  );
}

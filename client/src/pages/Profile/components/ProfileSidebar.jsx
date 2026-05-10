import formatDate from "../../../utils/formatDate";

export default function ProfileSidebar({ user }) {
  return (
    <div className="card" style={{ height: "fit-content" }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "var(--primary)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        {user?.name?.[0]?.toUpperCase() || "U"}
      </div>

      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        {user?.name}
      </h2>

      <p
        style={{
          fontSize: 13,
          color: "var(--text-hint)",
          marginTop: 2,
        }}
      >
        {user?.email}
      </p>

      {user?.bio && (
        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            marginTop: 10,
          }}
        >
          {user.bio}
        </p>
      )}

      <hr className="divider" />

      {[
        ["Role", user?.role],
        ["Points", user?.points],
        ["Joined", formatDate(user?.createdAt)],
      ].map(([k, v]) => (
        <div
          key={k}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            padding: "5px 0",
          }}
        >
          <span
            style={{
              color: "var(--text-hint)",
            }}
          >
            {k}
          </span>

          <span className={k === "Role" ? "badge badge-info" : ""}>{v}</span>
        </div>
      ))}
    </div>
  );
}

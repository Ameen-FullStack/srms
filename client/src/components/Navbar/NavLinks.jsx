import { Link, useLocation } from "react-router-dom";

const NavLinks = ({ user, isAdmin }) => {
  const location = useLocation();

  const linkStyle = (path) => ({
    padding: "6px 12px",
    borderRadius: "var(--radius)",
    fontSize: 14,
    color: location.pathname === path ? "var(--primary)" : "var(--text-muted)",
    background:
      location.pathname === path ? "var(--primary-light)" : "transparent",
    transition: "all 0.15s",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        flex: 1,
      }}
    >
      <Link to="/" style={linkStyle("/")}>
        Browse
      </Link>

      <Link to="/leaderboard" style={linkStyle("/leaderboard")}>
        Leaderboard
      </Link>

      {user && (
        <Link to="/upload" style={linkStyle("/upload")}>
          Upload
        </Link>
      )}

      {user && (
        <Link to="/bookmarks" style={linkStyle("/bookmarks")}>
          Bookmarks
        </Link>
      )}

      {isAdmin && (
        <Link
          to="/admin"
          style={{
            ...linkStyle("/admin"),
            color: "var(--warning)",
            fontWeight: 500,
          }}
        >
          Admin
        </Link>
      )}
    </div>
  );
};

export default NavLinks;

import { Link, useLocation } from "react-router-dom";

const NavLinks = ({ user, isAdmin, mobile = false }) => {
  const location = useLocation();

  const linkStyle = (path) => ({
    padding: mobile ? "12px 14px" : "10px 14px",
    borderRadius: "var(--radius)",
    fontSize: 14,
    fontWeight: location.pathname === path ? 500 : 400,
    textDecoration: "none",
    color: location.pathname === path ? "var(--primary)" : "var(--text-muted)",
    background:
      location.pathname === path ? "var(--primary-light)" : "transparent",
    transition: "all 0.2s ease",
    width: mobile ? "100%" : "auto",
    textAlign: "left",
    boxSizing: "border-box",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        alignItems: mobile ? "flex-start" : "center",
        justifyContent: "flex-start",
        gap: mobile ? 4 : 8,
        width: "100%",
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
            fontWeight: 600,
          }}
        >
          Admin
        </Link>
      )}
    </div>
  );
};

export default NavLinks;

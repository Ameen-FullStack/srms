import { Link } from "react-router-dom";

const UserDropdown = ({
  user,
  logout,
  navigate,
  dropdownOpen,
  setDropdownOpen,
}) => {
  return (
    <div
      style={{ position: "relative" }}
      onClick={(e) => {
        e.stopPropagation();
        setDropdownOpen((o) => !o);
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "var(--primary)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        {user.name?.[0]?.toUpperCase() || "U"}
      </div>

      {dropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "var(--bg)",
            border: "0.5px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: 8,
            minWidth: 180,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            zIndex: 200,
          }}
        >
          {/* User Name */}
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              padding: "4px 8px 10px",
              borderBottom: "1px solid var(--border)",
              marginBottom: 8,
            }}
          >
            {user.name}
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                color: "var(--text)",
                padding: "8px",
                borderRadius: 6,
              }}
              onClick={() => setDropdownOpen(false)}
            >
              My Profile
            </Link>

            <Link
              to="/my-uploads"
              style={{
                textDecoration: "none",
                color: "var(--text)",
                padding: "8px",
                borderRadius: 6,
              }}
              onClick={() => setDropdownOpen(false)}
            >
              My Uploads
            </Link>
          </div>

          {/* Divider */}
          <hr style={{ margin: "8px 0" }} />

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              navigate("/");
              setDropdownOpen(false);
            }}
            style={{
              width: "100%",
              padding: "8px",
              border: "none",
              borderRadius: 6,
              background: "transparent",
              cursor: "pointer",
              textAlign: "left",
              color: "var(--danger)",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

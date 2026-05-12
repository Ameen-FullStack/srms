import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getNotifications } from "../../api";

import NavLinks from "./NavLinks";
import NotificationButton from "./NotificationButton";
import UserDropdown from "./UserDropdown";

import iconImg from "../../assets/images/icon.png";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (user) {
      getNotifications()
        .then((d) => setUnread(d.unreadCount || 0))
        .catch(() => {});
    }
  }, [user, location.pathname]);

  useEffect(() => {
    const close = () => setDropdownOpen(false);

    document.addEventListener("click", close);

    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--bg)",
        borderBottom: "0.5px solid var(--border)",
        height: "var(--nav-height)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 32,
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontWeight: 600,
          fontSize: 18,
          color: "var(--primary)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={iconImg}
            alt="SRMS Logo"
            style={{
              height: 55,
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      </Link>

      <NavLinks user={user} isAdmin={isAdmin} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginLeft: "auto",
        }}
      >
        {user ? (
          <>
            <NotificationButton unread={unread} navigate={navigate} />

            <UserDropdown
              user={user}
              logout={logout}
              navigate={navigate}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
            />
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">
              Login
            </Link>

            <Link to="/register" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

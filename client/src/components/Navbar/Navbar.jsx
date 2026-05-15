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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      getNotifications()
        .then((d) => setUnread(d.unreadCount || 0))
        .catch(() => {});
    }
  }, [user, location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Top Navbar */}
      <div
        style={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          gap: 20,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <img
            src={iconImg}
            alt="Logo"
            style={{
              height: 50,
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div
          className="desktop-nav"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: 10,
          }}
        >
          <NavLinks user={user} isAdmin={isAdmin} />
        </div>

        {/* Right Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
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
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>

              <Link to="/register" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Toggle Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="menu-btn">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          className="mobile-nav"
          style={{
            padding: "14px 16px",
            borderTop: "1px solid var(--border)",
            background: "var(--bg)",
          }}
        >
          <NavLinks user={user} isAdmin={isAdmin} mobile />
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        .menu-btn {
          display: none;
          background: transparent;
          border: none;
          font-size: 26px;
          cursor: pointer;
          color: var(--text);
          padding: 4px;
        }

        .auth-buttons{
          display:flex;
          align-items:center;
          gap:10px;
        }

        @media (max-width: 768px) {

  .desktop-nav {
    display: none !important;
  }

  .menu-btn {
    display: block;
  }

  .auth-buttons {
    display: flex;
    align-items: center;
    gap: 8px;
  }

}

        @media (min-width: 769px) {

          .mobile-nav {
            display: none;
          }

        }
      `}</style>
    </nav>
  );
};

export default Navbar;

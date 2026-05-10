import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getNotifications, markAllRead } from "../../api";

import Spinner from "../../components/Spinner/Spinner";

import NotificationItem from "./components/NotificationItem";

import { useToast } from "../../context/ToastContext";

export default function Notifications() {
  const toast = useToast();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  const [unread, setUnread] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications()
      .then((d) => {
        setNotifications(d.notifications);
        setUnread(d.unreadCount);
      })
      .catch((e) => toast(e.message, "error"))
      .finally(() => setLoading(false));
  }, []);

  const handleMarkAll = async () => {
    try {
      await markAllRead();
      setUnread(0);

      toast("All marked as read.");
    } catch (err) {
      toast(err.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="page" style={{ maxWidth: 700 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Notifications
          </h1>
        </div>

        {unread > 0 && (
          <button className="btn btn-outline btn-sm" onClick={handleMarkAll}>
            Mark all read
          </button>
        )}
      </div>

      <div className="card">
        {notifications.length === 0 ? (
          <p
            style={{
              color: "var(--text-hint)",
              textAlign: "center",
              padding: 24,
            }}
          >
            No notifications yet.
          </p>
        ) : (
          notifications.map((n) => (
            <NotificationItem
              key={n._id}
              notification={n}
              navigate={navigate}
            />
          ))
        )}
      </div>
    </div>
  );
}

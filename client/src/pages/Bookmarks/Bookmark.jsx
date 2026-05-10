import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getBookmarks } from "../../api";

import MaterialCard from "../../components/MaterialCard/MaterialCard";
import Spinner from "../../components/Spinner/Spinner";

import { useToast } from "../../context/ToastContext";

export default function Bookmarks() {
  const toast = useToast();
  const navigate = useNavigate();

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookmarks()
      .then((d) => setBookmarks(d.bookmarks))
      .catch((e) => toast(e.message, "error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Bookmarks</h1>
        <p>Materials you've saved for later</p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="empty-state">
          <p>No bookmarks yet. Browse materials and save them.</p>
        </div>
      ) : (
        <div className="materials-grid">
          {bookmarks
            .filter((b) => b.material)
            .map((b) => (
              <MaterialCard
                key={b._id}
                material={b.material}
                onClick={() => navigate(`/material/${b.material._id}`)}
              />
            ))}
        </div>
      )}
    </div>
  );
}

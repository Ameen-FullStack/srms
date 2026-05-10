import { useState, useEffect } from "react";

import { getLeaderboard } from "../../api";

import Spinner from "../../components/Spinner/Spinner";

import LeaderboardItem from "./components/LeaderboardItem";

import { useToast } from "../../context/ToastContext";

export default function Leaderboard() {
  const toast = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard()
      .then((d) => setUsers(d.users))
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
    <div className="page" style={{ maxWidth: 700 }}>
      <div className="page-header">
        <h1>Leaderboard</h1>
        <p>Top contributors on the platform</p>
      </div>

      <div className="card">
        {users.map((u, i) => (
          <LeaderboardItem key={u._id} user={u} index={i} />
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import {
  getDashboard,
  getPending,
  getAllMaterials as apiGetAll,
  approveMaterial,
  rejectMaterial,
  getAdminUsers,
  toggleUser,
  getLeaderboard,
} from "../../api";

import { Spinner } from "../../components";
import { useToast } from "../../context/ToastContext";

import AdminStats from "./components/AdminStats";
import AdminTabs from "./components/AdminTabs";
import PendingMaterialsTable from "./components/PendingMaterialsTable";
import AllMaterialsTable from "./components/AllMaterialsTable";
import UsersTable from "./components/UsersTable";
import LeaderboardList from "./components/LeaderboardList";
import RejectModal from "./components/RejectModal";

export default function Admin() {
  const toast = useToast();

  const [tab, setTab] = useState("pending");
  const [stats, setStats] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    loadDashboard();
    loadTab("pending");
  }, []);

  const loadDashboard = async () => {
    try {
      const d = await getDashboard();
      setStats(d.stats);
    } catch {}
  };

  const loadTab = async (t) => {
    setTab(t);
    setLoading(true);

    try {
      let d;

      if (t === "pending") d = (await getPending()).materials;
      if (t === "materials") d = (await apiGetAll()).materials;
      if (t === "users") d = (await getAdminUsers()).users;
      if (t === "leaderboard") d = (await getLeaderboard()).users;

      setData(d || []);
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    try {
      await approveMaterial(id);
      toast("Material approved!");
      loadTab("pending");
      loadDashboard();
    } catch (err) {
      toast(err.message, "error");
    }
  };

  const reject = async () => {
    if (!rejectReason.trim()) {
      toast("Please provide a reason.", "error");
      return;
    }

    try {
      await rejectMaterial(rejectModal, rejectReason);

      toast("Material rejected.", "info");

      setRejectModal(null);
      setRejectReason("");

      loadTab("pending");
      loadDashboard();
    } catch (err) {
      toast(err.message, "error");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Admin Panel</h1>
      </div>

      {stats && <AdminStats stats={stats} />}

      <AdminTabs tab={tab} loadTab={loadTab} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {tab === "pending" && (
            <PendingMaterialsTable
              data={data}
              approve={approve}
              setRejectModal={setRejectModal}
            />
          )}

          {tab === "materials" && <AllMaterialsTable data={data} />}

          {tab === "users" && (
            <UsersTable data={data} toggleUser={toggleUser} />
          )}

          {tab === "leaderboard" && <LeaderboardList data={data} />}
        </>
      )}

      {rejectModal && (
        <RejectModal
          rejectReason={rejectReason}
          setRejectReason={setRejectReason}
          setRejectModal={setRejectModal}
          reject={reject}
        />
      )}
    </div>
  );
}

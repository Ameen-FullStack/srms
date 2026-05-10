import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getMyMaterials, deleteMaterial } from "../../api";

import Spinner from "../../components/Spinner/Spinner";

import UploadCard from "./components/UploadCard";

import { useToast } from "../../context/ToastContext";

export default function MyUploads() {
  const toast = useToast();
  const navigate = useNavigate();

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const d = await getMyMaterials();
      setMaterials(d.materials);
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this material?")) return;

    try {
      await deleteMaterial(id);
      toast("Deleted.");
      load();
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
    <div className="page">
      <div className="page-header">
        <h1>My Uploads</h1>
        <p>Track and manage your submitted materials</p>
      </div>

      {materials.length === 0 ? (
        <div className="empty-state">
          <p>You haven't uploaded any materials yet.</p>

          <button
            className="btn btn-primary"
            style={{ marginTop: 12 }}
            onClick={() => navigate("/upload")}
          >
            Upload now
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {materials.map((m) => (
            <UploadCard key={m._id} material={m} handleDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

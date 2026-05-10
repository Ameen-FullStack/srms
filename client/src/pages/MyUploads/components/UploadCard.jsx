import { useNavigate } from "react-router-dom";

import formatDate from "../../../utils/formatDate";

export default function UploadCard({ material, handleDelete }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
          }}
        >
          <strong>{material.title}</strong>

          <span className={`badge badge-${material.status}`}>
            {material.status}
          </span>
        </div>

        <p
          style={{
            fontSize: 13,
            color: "var(--text-hint)",
          }}
        >
          {material.subject} · Sem {material.semester}
          {" · "}
          {formatDate(material.createdAt)}
        </p>

        {material.status === "rejected" && material.rejectionReason && (
          <p
            style={{
              fontSize: 12,
              color: "var(--danger)",
              marginTop: 4,
            }}
          >
            Reason: {material.rejectionReason}
          </p>
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {material.status === "approved" && (
          <button
            className="btn btn-outline btn-sm"
            onClick={() => navigate(`/material/${material._id}`)}
          >
            View
          </button>
        )}

        <button
          className="btn btn-sm"
          style={{
            background: "var(--danger-light)",
            color: "var(--danger)",
            border: "none",
          }}
          onClick={() => handleDelete(material._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

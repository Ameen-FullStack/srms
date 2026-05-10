import { formatDate } from "../../../components";

export default function PendingMaterialsTable({
  data,
  approve,
  setRejectModal,
}) {
  if (data.length === 0) {
    return (
      <div className="empty-state">
        <p>🎉 No pending materials!</p>
      </div>
    );
  }

  return (
    <div className="card table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Sem</th>
            <th>Uploaded by</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((m) => (
            <tr key={m._id}>
              <td>
                <strong>{m.title}</strong>
              </td>

              <td>{m.subject}</td>

              <td>{m.semester}</td>

              <td>{m.uploadedBy?.name || "—"}</td>

              <td>
                <span className="badge badge-pending">
                  {(m.fileType || "").toUpperCase()}
                </span>
              </td>

              <td style={{ whiteSpace: "nowrap" }}>
                {formatDate(m.createdAt)}
              </td>

              <td>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => approve(m._id)}
                  >
                    ✓ Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setRejectModal(m._id)}
                  >
                    ✗ Reject
                  </button>

                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => window.open(`/material/${m._id}`, "_blank")}
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

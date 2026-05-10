import { formatDate } from "../../../components";

export default function AllMaterialsTable({ data }) {
  return (
    <div className="card table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Uploader</th>
            <th>Status</th>
            <th>Downloads</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((m) => (
            <tr
              key={m._id}
              style={{ cursor: "pointer" }}
              onClick={() => window.open(`/material/${m._id}`, "_blank")}
            >
              <td>
                <strong>{m.title}</strong>
              </td>

              <td>{m.subject}</td>

              <td>{m.uploadedBy?.name || "—"}</td>

              <td>
                <span className={`badge badge-${m.status}`}>{m.status}</span>
              </td>

              <td>{m.downloadCount}</td>

              <td style={{ whiteSpace: "nowrap" }}>
                {formatDate(m.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

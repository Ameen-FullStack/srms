import { formatDate } from "../../../components";

export default function UsersTable({ data, toggleUser }) {
  return (
    <div className="card table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Points</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((u) => (
            <tr key={u._id}>
              <td>
                <strong>{u.name}</strong>
              </td>

              <td>{u.email}</td>

              <td>
                <span className="badge badge-info">{u.role}</span>
              </td>

              <td>{u.points}</td>

              <td>
                <span
                  className={`badge ${
                    u.isActive ? "badge-approved" : "badge-rejected"
                  }`}
                >
                  {u.isActive ? "Active" : "Inactive"}
                </span>
              </td>

              <td style={{ whiteSpace: "nowrap" }}>
                {formatDate(u.createdAt)}
              </td>

              <td>
                {u.role !== "admin" && (
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => toggleUser(u._id)}
                  >
                    {u.isActive ? "Deactivate" : "Activate"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

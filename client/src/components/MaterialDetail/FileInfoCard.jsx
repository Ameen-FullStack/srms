import { formatDate, formatSize } from "../index";

const FileInfoCard = ({ material }) => {
  return (
    <div className="card">
      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        File info
      </h3>

      {[
        ["Type", (material.fileType || "").toUpperCase()],
        ["Size", formatSize(material.fileSize)],
        ["Uploaded", formatDate(material.createdAt)],
        ["Downloads", material.downloadCount],
        [
          "Rating",
          material.avgRating ? material.avgRating.toFixed(1) + " / 5" : "—",
        ],
        ["Subject", material.subject],
        ["Semester", material.semester],
        ["Course", material.course],
      ].map(([k, v]) => (
        <div
          key={k}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            padding: "5px 0",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          <span
            style={{
              color: "var(--text-hint)",
            }}
          >
            {k}
          </span>

          <span
            style={{
              fontWeight: 500,
            }}
          >
            {v}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FileInfoCard;

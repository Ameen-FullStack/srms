import { renderStars, formatDate } from "../index";

const MaterialHeader = ({ material, isOwner, handleDelete }) => {
  return (
    <div className="card fade-in">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <span className="badge badge-info">
          {(material.fileType || "FILE").toUpperCase()}
        </span>

        {isOwner && (
          <button
            className="btn btn-sm"
            style={{
              background: "var(--danger-light)",
              color: "var(--danger)",
              border: "none",
            }}
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>

      <h1
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        {material.title}
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 12,
        }}
      >
        {[
          material.subject,
          `Semester ${material.semester}`,
          material.course,
          formatDate(material.createdAt),
        ].map((t) => (
          <span key={t} className="meta-pill">
            {t}
          </span>
        ))}
      </div>

      {material.description && (
        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            marginBottom: 12,
          }}
        >
          {material.description}
        </p>
      )}

      {material.tags?.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 14,
          }}
        >
          {material.tags.map((t) => (
            <span key={t} className="tag-pill">
              {t}
            </span>
          ))}
        </div>
      )}

      <div
        style={{
          fontSize: 13,
          color: "var(--text-muted)",
          marginBottom: 16,
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <span>
          By <strong>{material.uploadedBy?.name || "Unknown"}</strong>
        </span>

        <span>{material.downloadCount} downloads</span>

        <span>
          <span className="stars">{renderStars(material.avgRating)}</span>{" "}
          {material.avgRating
            ? material.avgRating.toFixed(1) + " / 5"
            : "No ratings"}{" "}
          ({material.ratingCount})
        </span>
      </div>
    </div>
  );
};

export default MaterialHeader;

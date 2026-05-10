import { renderStars, FILE_COLORS } from "./materialUtils";

const MaterialCard = ({ material, onClick }) => {
  const color = FILE_COLORS[material.fileType] || "#888780";

  return (
    <div className="material-card fade-in" onClick={onClick}>
      <span
        className="card-type-badge"
        style={{
          background: `${color}20`,
          color,
        }}
      >
        {(material.fileType || "FILE").toUpperCase()}
      </span>

      <h3 className="card-title">{material.title}</h3>

      <p className="card-meta">
        {material.subject} · Sem {material.semester} · {material.course}
      </p>

      {material.description && (
        <p className="card-desc">{material.description}</p>
      )}

      <div className="card-footer">
        <div className="card-rating">
          <span className="stars">{renderStars(material.avgRating)}</span>

          <span>
            {material.avgRating ? material.avgRating.toFixed(1) : "No ratings"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;

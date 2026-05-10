import { formatDate } from "../index";

const ReviewsCard = ({ ratings }) => {
  return (
    <div className="card">
      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        Reviews ({ratings.length})
      </h3>

      {ratings.length === 0 ? (
        <p
          style={{
            fontSize: 13,
            color: "var(--text-hint)",
          }}
        >
          No reviews yet.
        </p>
      ) : (
        ratings.slice(0, 5).map((r) => (
          <div
            key={r._id}
            style={{
              padding: "8px 0",
              borderBottom: "0.5px solid var(--border)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                marginBottom: 4,
              }}
            >
              <strong>{r.user?.name || "User"}</strong>

              <span className="stars">
                {"★".repeat(r.stars)}
                {"☆".repeat(5 - r.stars)}
              </span>
            </div>

            {r.review && (
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                {r.review}
              </p>
            )}

            <p
              style={{
                fontSize: 11,
                color: "var(--text-hint)",
                marginTop: 2,
              }}
            >
              {formatDate(r.createdAt)}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsCard;

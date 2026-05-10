import { formatDate } from "../index";

const CommentsSection = ({
  comments,
  user,
  comment,
  setComment,
  handleComment,
}) => {
  return (
    <div className="card">
      <h3
        style={{
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 14,
        }}
      >
        Comments ({comments.length})
      </h3>

      {user ? (
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 16,
            alignItems: "flex-end",
          }}
        >
          <textarea
            className="form-control"
            placeholder="Add a comment..."
            rows="2"
            style={{ flex: 1 }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button className="btn btn-primary btn-sm" onClick={handleComment}>
            Post
          </button>
        </div>
      ) : (
        <p
          style={{
            fontSize: 13,
            color: "var(--text-hint)",
            marginBottom: 14,
          }}
        >
          <a
            href="/login"
            style={{
              color: "var(--primary)",
            }}
          >
            Login
          </a>{" "}
          to comment.
        </p>
      )}

      {comments.length === 0 ? (
        <p
          style={{
            fontSize: 13,
            color: "var(--text-hint)",
          }}
        >
          No comments yet. Be the first!
        </p>
      ) : (
        comments.map((c) => (
          <div
            key={c._id}
            style={{
              padding: "12px 0",
              borderBottom: "0.5px solid var(--border)",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              {c.user?.name || "User"}
            </div>

            <div
              style={{
                fontSize: 14,
                color: "var(--text-muted)",
              }}
            >
              {c.content}
            </div>

            <div
              style={{
                fontSize: 11,
                color: "var(--text-hint)",
                marginTop: 4,
              }}
            >
              {formatDate(c.createdAt)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentsSection;

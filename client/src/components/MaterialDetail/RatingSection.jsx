const RatingSection = ({
  stars,
  setStars,
  review,
  setReview,
  handleRating,
}) => {
  return (
    <div className="card">
      <h3
        style={{
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        Rate this material
      </h3>

      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 12,
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            className={`star-btn ${stars >= i ? "active" : ""}`}
            onClick={() => setStars(i)}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        className="form-control"
        placeholder="Write a review (optional)..."
        rows="2"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={{
          marginBottom: 10,
        }}
      />

      <button className="btn btn-primary btn-sm" onClick={handleRating}>
        Submit rating
      </button>
    </div>
  );
};

export default RatingSection;

const Pagination = ({ page, pages, loadMaterials }) => {
  return (
    <div className="pagination">
      {page > 1 && (
        <button className="page-btn" onClick={() => loadMaterials(page - 1)}>
          ‹
        </button>
      )}

      {Array.from({ length: pages }, (_, i) => i + 1)
        .filter((i) => i === 1 || i === pages || Math.abs(i - page) <= 2)
        .reduce((acc, i, idx, arr) => {
          if (idx > 0 && i - arr[idx - 1] > 1) {
            acc.push("...");
          }

          acc.push(i);

          return acc;
        }, [])
        .map((i, idx) =>
          i === "..." ? (
            <span
              key={idx}
              style={{
                padding: "0 4px",
                color: "var(--text-hint)",
              }}
            >
              …
            </span>
          ) : (
            <button
              key={i}
              className={`page-btn ${i === page ? "active" : ""}`}
              onClick={() => loadMaterials(i)}
            >
              {i}
            </button>
          ),
        )}

      {page < pages && (
        <button className="page-btn" onClick={() => loadMaterials(page + 1)}>
          ›
        </button>
      )}
    </div>
  );
};

export default Pagination;

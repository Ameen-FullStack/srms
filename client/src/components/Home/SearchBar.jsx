const SearchBar = ({ filters, setFilters, handleSearch }) => {
  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        placeholder="Search notes, PDFs, subjects..."
        value={filters.search}
        onChange={(e) =>
          setFilters((f) => ({
            ...f,
            search: e.target.value,
          }))
        }
      />

      <input
        placeholder="Subject..."
        value={filters.subject}
        onChange={(e) =>
          setFilters((f) => ({
            ...f,
            subject: e.target.value,
          }))
        }
        style={{
          flex: "0 0 120px",
          border: "0.5px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "5px 10px",
          fontSize: 13,
          background: "var(--bg-secondary)",
          color: "var(--text-muted)",
        }}
      />

      <select
        value={filters.semester}
        onChange={(e) =>
          setFilters((f) => ({
            ...f,
            semester: e.target.value,
          }))
        }
      >
        <option value="">All semesters</option>

        {[1, 2, 3, 4, 5, 6].map((s) => (
          <option key={s} value={s}>
            Sem {s}
          </option>
        ))}
      </select>

      <select
        value={filters.fileType}
        onChange={(e) =>
          setFilters((f) => ({
            ...f,
            fileType: e.target.value,
          }))
        }
      >
        <option value="">All types</option>

        {["pdf", "docx", "pptx", "jpg", "txt", "png"].map((t) => (
          <option key={t} value={t}>
            {t.toUpperCase()}
          </option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(e) =>
          setFilters((f) => ({
            ...f,
            sort: e.target.value,
          }))
        }
      >
        <option value="newest">Newest</option>

        <option value="popular">Most downloaded</option>

        <option value="rating">Top rated</option>
      </select>

      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() =>
          setFilters({
            search: "",
            subject: "",
            semester: "",
            fileType: "",
            sort: "newest",
          })
        }
      >
        Reset
      </button>
    </form>
  );
};

export default SearchBar;

import formatSize from "../../../utils/formatSize";

export default function SelectedFilePreview({ file, setFile }) {
  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        border: "0.5px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 12,
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginTop: 10,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />

        <polyline points="14 2 14 8 20 8" />
      </svg>

      <span
        style={{
          fontSize: 13,
          flex: 1,
        }}
      >
        {file.name}
      </span>

      <span
        style={{
          fontSize: 12,
          color: "var(--text-hint)",
        }}
      >
        {formatSize(file.size)}
      </span>

      <button
        type="button"
        onClick={() => setFile(null)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--danger)",
          fontSize: 16,
        }}
      >
        ×
      </button>
    </div>
  );
}

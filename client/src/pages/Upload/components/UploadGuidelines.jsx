export default function UploadGuidelines() {
  return (
    <div
      style={{
        background: "var(--primary-light)",
        borderRadius: "var(--radius-lg)",
        padding: 20,
      }}
    >
      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "var(--primary-dark)",
          marginBottom: 10,
        }}
      >
        Upload guidelines
      </h3>

      {[
        "Content must be relevant to academics",
        "No plagiarised or copyrighted material",
        "Files should be clearly named",
        "Admin approval takes 1–2 days",
        "Earn 10 points per approved upload",
      ].map((t) => (
        <p
          key={t}
          style={{
            fontSize: 13,
            color: "var(--primary-dark)",
            marginBottom: 6,
          }}
        >
          ✓ {t}
        </p>
      ))}
    </div>
  );
}

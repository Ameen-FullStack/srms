export default function AcceptedFormats() {
  return (
    <div className="card">
      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        Accepted formats
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
        }}
      >
        {[
          ["PDF", "#FCEBEB", "#A32D2D"],
          ["DOCX", "#E6F1FB", "#0C447C"],
          ["PPTX", "#FAECE7", "#712B13"],
          ["JPG", "#EAF3DE", "#27500A"],
          ["PNG", "#EAF3DE", "#27500A"],
          ["TXT", "#F1EFE8", "#444441"],
        ].map(([t, bg, c]) => (
          <span
            key={t}
            style={{
              background: bg,
              color: c,
              padding: "2px 10px",
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

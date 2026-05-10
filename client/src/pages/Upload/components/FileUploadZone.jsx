export default function FileUploadZone({
  fileRef,
  dragOver,
  setDragOver,
  handleFile,
}) {
  return (
    <div className="form-group">
      <label className="form-label">File *</label>

      <div
        className={`upload-zone ${dragOver ? "drag-over" : ""}`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);

          handleFile(e.dataTransfer.files[0]);
        }}
      >
        <input
          ref={fileRef}
          type="file"
          style={{ display: "none" }}
          accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.txt"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "var(--primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />

            <polyline points="17 8 12 3 7 8" />

            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Click to choose or drag & drop
        </p>

        <p
          style={{
            fontSize: 12,
            color: "var(--text-hint)",
            marginTop: 4,
          }}
        >
          PDF, DOCX, PPTX, JPG, PNG · Max 20MB
        </p>
      </div>
    </div>
  );
}

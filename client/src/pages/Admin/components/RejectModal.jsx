export default function RejectModal({
  rejectReason,
  setRejectReason,
  setRejectModal,
  reject,
}) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && setRejectModal(null)}
    >
      <div className="modal-box">
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          Reject material
        </h3>

        <p
          style={{
            fontSize: 13,
            color: "var(--text-hint)",
            marginBottom: 14,
          }}
        >
          Provide a reason so the uploader knows what to fix.
        </p>

        <textarea
          className="form-control"
          placeholder="Reason for rejection..."
          rows="3"
          style={{ marginBottom: 14 }}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
          }}
        >
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setRejectModal(null)}
          >
            Cancel
          </button>

          <button className="btn btn-danger btn-sm" onClick={reject}>
            Confirm rejection
          </button>
        </div>
      </div>
    </div>
  );
}

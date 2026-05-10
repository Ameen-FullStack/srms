export default function ChangePasswordForm({
  pwForm,
  setPwForm,
  handlePassword,
}) {
  return (
    <div className="card">
      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        Change password
      </h3>

      <form onSubmit={handlePassword}>
        <div className="form-group">
          <label className="form-label">Current password</label>

          <input
            className="form-control"
            type="password"
            value={pwForm.currentPassword}
            onChange={(e) =>
              setPwForm((f) => ({
                ...f,
                currentPassword: e.target.value,
              }))
            }
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">New password</label>

          <input
            className="form-control"
            type="password"
            minLength={6}
            value={pwForm.newPassword}
            onChange={(e) =>
              setPwForm((f) => ({
                ...f,
                newPassword: e.target.value,
              }))
            }
            required
          />
        </div>

        <button className="btn btn-outline" type="submit">
          Update password
        </button>
      </form>
    </div>
  );
}

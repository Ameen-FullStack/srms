export default function EditProfileForm({
  profileForm,
  setProfileForm,
  handleProfile,
  loading,
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
        Edit profile
      </h3>

      <form onSubmit={handleProfile}>
        <div className="form-group">
          <label className="form-label">Full name</label>

          <input
            className="form-control"
            value={profileForm.name}
            onChange={(e) =>
              setProfileForm((f) => ({
                ...f,
                name: e.target.value,
              }))
            }
          />
        </div>

        <div className="form-group">
          <label className="form-label">Bio</label>

          <textarea
            className="form-control"
            rows="3"
            placeholder="Tell others about yourself..."
            value={profileForm.bio}
            onChange={(e) =>
              setProfileForm((f) => ({
                ...f,
                bio: e.target.value,
              }))
            }
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}

import FileUploadZone from "./FileUploadZone";
import SelectedFilePreview from "./SelectedFilePreview";

export default function UploadForm({
  form,
  setForm,
  file,
  setFile,
  fileRef,
  dragOver,
  setDragOver,
  handleFile,
  handleSubmit,
  loading,
}) {
  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title *</label>

          <input
            className="form-control"
            placeholder="e.g. DBMS Unit 3 — ER Diagrams"
            required
            maxLength={100}
            value={form.title}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                title: e.target.value,
              }))
            }
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>

          <textarea
            className="form-control"
            placeholder="Brief description..."
            maxLength={500}
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                description: e.target.value,
              }))
            }
          />
        </div>

        <div className="two-col">
          <div className="form-group">
            <label className="form-label">Subject *</label>

            <input
              className="form-control"
              placeholder="e.g. DBMS, OS"
              required
              value={form.subject}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  subject: e.target.value,
                }))
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Course *</label>

            <input
              className="form-control"
              placeholder="e.g. BCA, B.Tech"
              required
              value={form.course}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  course: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Semester *</label>

          <select
            className="form-control"
            required
            value={form.semester}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                semester: e.target.value,
              }))
            }
          >
            <option value="">Select semester</option>

            {[1, 2, 3, 4, 5, 6].map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Tags (comma separated)</label>

          <input
            className="form-control"
            placeholder="e.g. notes, unit3, important"
            value={form.tags}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                tags: e.target.value,
              }))
            }
          />
        </div>

        <FileUploadZone
          fileRef={fileRef}
          dragOver={dragOver}
          setDragOver={setDragOver}
          handleFile={handleFile}
        />

        {file && <SelectedFilePreview file={file} setFile={setFile} />}

        <button
          className="btn btn-primary btn-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit for Approval"}
        </button>
      </form>
    </div>
  );
}

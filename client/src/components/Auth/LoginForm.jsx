const LoginForm = ({ form, setForm, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Email address</label>

        <input
          className="form-control"
          type="email"
          placeholder="you@example.com"
          required
          value={form.email}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              email: e.target.value,
            }))
          }
        />
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>

        <input
          className="form-control"
          type="password"
          placeholder="Enter your password"
          required
          value={form.password}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              password: e.target.value,
            }))
          }
        />
      </div>

      <button
        className="btn btn-primary btn-full"
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;

const RegisterForm = ({ form, setForm, handleSubmit, loading }) => {
  const fields = [
    ["name", "Full name", "text", "Your full name"],
    ["email", "Email address", "email", "you@example.com"],
    ["password", "Password", "password", "At least 6 characters"],
    ["confirm", "Confirm password", "password", "Re-enter password"],
  ];

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(([key, label, type, placeholder]) => (
        <div className="form-group" key={key}>
          <label className="form-label">{label}</label>

          <input
            className="form-control"
            type={type}
            placeholder={placeholder}
            required
            minLength={key === "password" ? 6 : undefined}
            value={form[key]}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                [key]: e.target.value,
              }))
            }
          />
        </div>
      ))}

      <button
        className="btn btn-primary btn-full"
        type="submit"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};

export default RegisterForm;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register as apiRegister } from "../../api";
import { useAuth } from "../../context/AuthContext";

import AuthLayout from "../../components/Auth/AuthLayout";
import RegisterForm from "../../components/Auth/RegisterForm";

const Register = () => {
  const navigate = useNavigate();

  const { saveSession } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");

      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await apiRegister({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      saveSession(data.token, data.user);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join thousands of students sharing notes"
    >
      {error && <div className="error-box">{error}</div>}

      <RegisterForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      <p
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 13,
          color: "var(--text-muted)",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "var(--primary)",
            fontWeight: 500,
          }}
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;

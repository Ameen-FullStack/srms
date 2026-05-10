import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login as apiLogin } from "../../api";
import { useAuth } from "../../context/AuthContext";

import AuthLayout from "../../components/Auth/AuthLayout";
import LoginForm from "../../components/Auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const { saveSession } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await apiLogin(form);

      saveSession(data.token, data.user);

      navigate(data.user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to access and share study materials"
    >
      {error && <div className="error-box">{error}</div>}

      <LoginForm
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
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{
            color: "var(--primary)",
            fontWeight: 500,
          }}
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;

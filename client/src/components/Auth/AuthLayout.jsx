import AuthHeader from "./AuthHeader";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: 420,
          padding: "36px 32px",
        }}
      >
        <AuthHeader />

        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            marginBottom: 24,
          }}
        >
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

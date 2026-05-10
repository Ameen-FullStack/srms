const AuthHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 28,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: "var(--primary)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        S
      </div>

      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "var(--primary)",
        }}
      >
        StudyShare
      </span>
    </div>
  );
};

export default AuthHeader;

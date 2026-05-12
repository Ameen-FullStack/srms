import iconImg from "../../assets/images/icon.png";

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
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={iconImg} alt="Logo" width={150} />
      </div>
    </div>
  );
};

export default AuthHeader;

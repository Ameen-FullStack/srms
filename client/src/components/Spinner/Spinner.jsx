const Spinner = ({ small }) => {
  return <div className={`spinner ${small ? "spinner-sm" : ""}`} />;
};

export default Spinner;

import { MaterialCard } from "../index";

const MaterialsGrid = ({ materials, navigate }) => {
  return (
    <div className="materials-grid">
      {materials.map((m) => (
        <MaterialCard
          key={m._id}
          material={m}
          onClick={() => navigate(`/material/${m._id}`)}
        />
      ))}
    </div>
  );
};

export default MaterialsGrid;

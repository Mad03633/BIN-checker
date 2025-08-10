import React from "react";

const InfoField = ({ label, subLabel }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">{label}</h2>
      {subLabel && <p className="text-gray-500">{subLabel}</p>}
    </div>
  );
};

export default InfoField;

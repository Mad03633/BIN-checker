import React from "react";

const ReqButton = ({ label, onClick }) => {
  return (
    <button
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ReqButton;

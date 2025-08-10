import React from "react";

const Dropdown = ({ options, selected, setSelected }) => {
  return (
    <select
      className="w-full border border-gray-300 rounded-md py-2 px-2"
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
    >
      <option value="">Select Bank</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  );
};

export default Dropdown;

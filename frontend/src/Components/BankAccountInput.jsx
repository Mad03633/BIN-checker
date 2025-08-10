import React, { useState, useEffect } from "react";
import axios from "axios";

function formatCardNumber(input) {
  let digits = input.replace(/\D/g, "");
  if (digits.length > 16) {
    digits = digits.substring(0, 16);
  }
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join("-") : "";
}

const BankAccountInput = ({ value, onValueChange, onBankDetected, placeholder }) => {
  const [loading, setLoading] = useState(false);
  const [lastBin, setLastBin] = useState(""); 

  const rawDigits = value.replace(/\D/g, "");

  useEffect(() => {
    if (rawDigits.length >= 6) {
      const bin = rawDigits.substring(0, 6);

      if (bin !== lastBin) {
        setLastBin(bin);
        setLoading(true);

        axios
          .get(`http://localhost:8000/bin/${bin}`)
          .then((response) => {
            if (response.data && response.data.bank) {
              onBankDetected(response.data.bank);
            } else {
              onBankDetected("NN");
            }
          })
          .catch(() => {
            onBankDetected("NN");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [rawDigits, lastBin, onBankDetected]);

  const handleChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    onValueChange(formatted);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md py-2 px-4"
      />
      {loading && <div className="text-sm text-gray-500">Bank Searching...</div>}
    </div>
  );
};

export default BankAccountInput;

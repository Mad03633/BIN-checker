import React, { useState } from "react";
import BankAccountInput from "./Components/BankAccountInput";
import Dropdown from "./Components/Dropdown";
import ReqButton from "./Components/ReqButton";
import InfoField from "./Components/InfoField";

const NATIONAL_BANKS = [];
const TRANS_BANKS = [];

function App() {
  const [selectedType, setSelectedType] = useState("national");
  const [nationalBank, setNationalBank] = useState("");
  const [nationalAccount, setNationalAccount] = useState("");
  const [transBank, setTransBank] = useState("");
  const [transAccount, setTransAccount] = useState("");
  const [wallets, setWallets] = useState([]);

  const handleAddWallet = () => {
    if (selectedType === "national") {
      setWallets([...wallets, { type: "national", bankName: nationalBank, account: nationalAccount }]);
      setNationalAccount("");
    }
    if (selectedType === "transnational") {
      setWallets([...wallets, { type: "transnational", bankName: transBank, account: transAccount }]);
      setTransAccount("");
    }
  };

  const handleRemoveWallet = (index) => {
    setWallets(wallets.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <InfoField label="Wallets" subLabel="Select the required type of props and enter the data" />

      <div className="flex gap-6 mt-8">
        <div className="flex flex-col w-48 space-y-2">
          <button
            type="button"
            className={`px-4 py-2 rounded ${selectedType === "national" ? "bg-black text-white" : "bg-gray-300"}`}
            onClick={() => setSelectedType("national")}
          >
            National Bank
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${selectedType === "transnational" ? "bg-black text-white" : "bg-gray-300"}`}
            onClick={() => setSelectedType("transnational")}
          >
            International Bank
          </button>
        </div>

        <div className="flex-1 mt-8">
          {selectedType === "national" && (
            <div className="flex items-center gap-2">
              <div className="w-40">
                <Dropdown options={NATIONAL_BANKS} selected={nationalBank} setSelected={setNationalBank} />
              </div>
              <div className="flex-1">
                <BankAccountInput
                  value={nationalAccount}
                  onValueChange={setNationalAccount}
                  onBankDetected={setNationalBank}
                  placeholder="####-####-####-####"
                />
              </div>
              <ReqButton label="Add" onClick={handleAddWallet} />
            </div>
          )}

          {selectedType === "transnational" && (
            <div className="flex items-center gap-2">
              <div className="w-40">
                <Dropdown options={TRANS_BANKS} selected={transBank} setSelected={setTransBank} />
              </div>
              <div className="flex-1">
                <BankAccountInput
                  value={transAccount}
                  onValueChange={setTransAccount}
                  onBankDetected={setTransBank}
                  placeholder="####-####-####-####"
                />
              </div>
              <ReqButton label="Add" onClick={handleAddWallet} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <InfoField label="Bank details" subLabel="All added accounts" />
        {wallets.length > 0 ? (
          wallets.map((item, index) => (
            <div key={index} className="border p-2 mb-2 flex justify-between items-center">
              {item.type === "national" && (
                <div>
                  <div>Bank (RK): {item.bankName}</div>
                  <div>BIN: {item.account}</div>
                </div>
              )}
              {item.type === "transnational" && (
                <div>
                  <div>Internationak Bank: {item.bankName}</div>
                  <div>BIN: {item.account}</div>
                </div>
              )}
              <button
                type="button"
                onClick={() => handleRemoveWallet(index)}
                className="text-red-500 hover:text-red-700 text-xl font-bold ml-4"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-400">No details added</div>
        )}
      </div>
    </div>
  );
}

export default App;

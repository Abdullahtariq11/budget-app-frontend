// InitialSetupCard.js
import React, { useState } from "react";
import "./InitialSetupPortal.css";

function InitialSetupCard({ nextStep }) {
  const [cardData, setCardData] = useState({
    cardName: "",
    balance: 0,
    availableBalance: 0,
    totalCreditLimit: 0,
    cardType: "",
    subCardType: "",
  });

  const handleChange = (field, value) => {
    setCardData((prev) => ({
      ...prev,
      [field]: field.includes("balance") ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep(cardData);
  };

  return (
    <div className="portal-overlay">
      <div className="portal-content">
        <h2>Step 1: Add Card</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Card Name"
            value={cardData.cardName}
            onChange={(e) => handleChange("cardName", e.target.value)}
            required
          />
          <select
            value={cardData.cardType}
            onChange={(e) => handleChange("cardType", e.target.value)}
            required
          >
            <option value="">Select Card Type</option>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
          </select>
          {cardData.cardType === "Debit" ? (
            <>
              <input
                type="number"
                placeholder="Balance"
                value={cardData.balance}
                onChange={(e) => handleChange("balance", e.target.value)}
                required
              />
              <select
                value={cardData.subCardType}
                onChange={(e) => handleChange("subCardType", e.target.value)}
                required
              >
                <option value="">Select Type</option>
                <option value="Chequing">Chequing</option>
                <option value="Saving">Saving</option>
              </select>
            </>
          ) : (
            cardData.cardType === "Credit" && (
              <>
                <input
                  type="number"
                  placeholder="Available Balance"
                  value={cardData.availableBalance}
                  onChange={(e) => handleChange("availableBalance", e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Total Credit Limit"
                  value={cardData.totalCreditLimit}
                  onChange={(e) => handleChange("totalCreditLimit", e.target.value)}
                  required
                />
              </>
            )
          )}
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}

export default InitialSetupCard;
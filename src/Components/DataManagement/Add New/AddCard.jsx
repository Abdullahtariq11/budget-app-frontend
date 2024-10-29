import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { createCard } from "../../../Service/DataService";

function AddCard({ cancelHandler }) {
  const { token } = useContext(AuthContext);
  const [cardData, setCardData] = useState({
    categoryName: "",
    balance: 0,
    availableBalance: 0,
    totalCreditLimit: 0,
    cardType: "",
    subCardType: "",
  });
  const handleChange = (field, value) => {
    const formattedValue =
      field === "balance" ||
      field === "availableBalance" ||
      field === "totalCreditLimit"
        ? parseFloat(value)
        : value;
    setCardData((prev) => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCard(cardData, token);
      //console.log("Transaction created successfully:", response);
      alert("Card created successfully");
      cancelHandler();
      // Optional: Reset form or display success message if needed
    } catch (error) {
      console.error("Error creating transaction:", error);
      console.log(cardData);
    }
  };

  return (
    <div className="addEntity-container">
      <h1>Add Card</h1>
      <form className="Add-Form" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => handleChange("cardName", e.target.value)}
          name="cardName"
          value={cardData.cardName}
          placeholder="Card Name"
          required
        />
        <select
          onChange={(e) => handleChange("cardType", e.target.value)}
          value={cardData.cardType}
          name="cardType"
          required
        >
          <option value="">Select Card Type</option>
          <option value="Debit">Debit</option>
          <option value="Credit">Credit</option>
        </select>
        {cardData.cardType == "Debit" ? (
          <>
            <input
              onChange={(e) => handleChange("balance", e.target.value)}
              name="balance"
              value={cardData.balance || ""}
              type="number"
              placeholder="Balance"
              required
            />

            <select
              onChange={(e) => handleChange("subCardType", e.target.value)}
              value={cardData.subCardType}
              name="subCardType"
              required
            >
              <option value="">Select Type</option>
              <option value="Chequing">Chequing</option>
              <option value="Saving">Saving</option>
            </select>
          </>
        ) : cardData.cardType == "Credit" &&(
          <>
            <input
              onChange={(e) => handleChange("availableBalance", e.target.value)}
              name="availableBalance"
              value={cardData.availableBalance || ""}
              type="number"
              placeholder="Available Balance"
              required
            />
            <input
              onChange={(e) => handleChange("totalCreditLimit", e.target.value)}
              name="totalCreditLimit"
              value={cardData.totalCreditLimit || ""}
              type="number"
              placeholder="Total Credit Limit"
              required
            />
          </>
        )}

        <button type="submit">Add Card</button>
      </form>
    </div>
  );
}

export default AddCard;

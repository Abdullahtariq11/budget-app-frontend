import React, { useContext, useState } from "react";
import "./AddEntity.css";
import { AuthContext } from "../../../context/AuthContext";
import { createBudget } from "../../../Service/DataService";

function AddBudget({ cancelHandler }) {
  const { token } = useContext(AuthContext);
  const [budgetdata, setBudgetdata] = useState({
    allocatedAmount: 0,
    remainingAmount: 0,
    lastUpdated: new Date().toISOString(),
    categoryName: "",
  });

  const handleChange = (field, value) => {
    const formattedValue =
      field === "transactionDate"
        ? new Date(value).toISOString()
        : field === "allocatedAmount" || field ==="remainingAmount"
        ? parseFloat(value)
        : value;
    setBudgetdata((prev) => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBudget(budgetdata, token);
      //console.log("Transaction created successfully:", response);
      alert("Card created successfully");
      cancelHandler();
      // Optional: Reset form or display success message if needed
    } catch (error) {
      console.error("Error creating transaction:", error);
      console.log(budgetdata);
    }
  };

  return (
    <div className="addEntity-container">
      <h1>Add Budget</h1>
      <form className="Add-Form" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => handleChange("categoryName", e.target.value)}
          name="categoryName"
          value={budgetdata.categoryName}
          placeholder="Category Name"
          required
        />
        <input
          onChange={(e) => handleChange("allocatedAmount", e.target.value)}
          name="allocatedAmount"
          value={budgetdata.allocatedAmount || ""}
          type="number"
          placeholder="Allocated Amount"
          required
        />
        <input
          onChange={(e) => handleChange("remainingAmount", e.target.value)}
          name="remainingAmount"
          value={budgetdata.remainingAmount || ""}
          type="number"
          placeholder="Remaining Amount"
          required
        />
        <input
          onChange={(e) => handleChange("lastUpdated", e.target.value)}
          name="lastUpdated"
          value={new Date(budgetdata.lastUpdated).toISOString().slice(0, 10)}
          type="date"
          placeholder="Last Updated"
          required
        />
        <button type="submit">Add Budget</button>
      </form>
    </div>
  );
}

export default AddBudget;

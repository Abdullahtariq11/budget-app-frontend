// InitialSetupBudget.js
import React, { useState } from "react";
import "./InitialSetupPortal.css";

function InitialSetupBudget({ nextStep, stepLabel }) {
  const [budgetData, setBudgetData] = useState({
    categoryName: "",
    allocatedAmount: 0,
    remainingAmount: 0,
    lastUpdated: new Date().toISOString(),
  });

  const handleChange = (field, value) => {
    const formattedValue =
      field === "lastUpdated"
        ? new Date(value).toISOString()
        : field === "allocatedAmount" || field === "remainingAmount"
        ? parseFloat(value)
        : value;
    setBudgetData((prev) => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep(budgetData); // Send data to parent component
  };

  return (
    <div className="portal-overlay">
      <div className="portal-content">
        <h2>{stepLabel}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={budgetData.categoryName}
            onChange={(e) => handleChange("categoryName", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Allocated Amount"
            value={budgetData.allocatedAmount || ""}
            onChange={(e) => handleChange("allocatedAmount", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Remaining Amount"
            value={budgetData.remainingAmount || ""}
            onChange={(e) => handleChange("remainingAmount", e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Last Updated"
            value={new Date(budgetData.lastUpdated).toISOString().slice(0, 10)}
            onChange={(e) => handleChange("lastUpdated", e.target.value)}
            required
          />
          <button type="submit">
            {stepLabel === "Step 3: Add Second Budget" ? "Complete Setup" : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default InitialSetupBudget;
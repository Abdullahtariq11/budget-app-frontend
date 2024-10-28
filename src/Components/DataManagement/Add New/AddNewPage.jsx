// AddNewPage.js

import React from "react";
import "./AddNewPage.css";
import AddTransaction from "./AddTransaction";
import AddCard from "./AddCard";
import AddBudget from "./AddBudget";

function AddNewPage({ tab,selectTab, setIsAddNew }) {

    const cancelHandler=()=>{
        setIsAddNew(false);
        selectTab("");
    }
  return (
    <div className="AddNewPage-container">
      <div className="AddNewPage-content">
        {tab === "Transaction" ? (
          <AddTransaction />
        ) : tab === "Card" ? (
          <AddCard />
        ) : (
          <AddBudget />
        )}
        <div className="AddNewPage-buttons">
          <button onClick={cancelHandler}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddNewPage;

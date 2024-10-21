import React, { useState } from "react";
import "./DataNavTab.css";

function DataNavTab({tab,selectTab}) {

  return (
    <ul className="data-nav-container">
      <li
        className={tab == "transaction" ? "selected" : ""}
        onClick={() => selectTab("transaction")}
      >
        Transactions
      </li>
      <li
        className={tab == "card" ? "selected" : ""}
        onClick={() => selectTab("card")}
      >
        Cards
      </li>
      <li
        className={tab == "category" ? "selected" : ""}
        onClick={() => selectTab("category")}
      >
        Budget Categories
      </li>
    </ul>
  );
}

export default DataNavTab;

import React, { useState } from "react";
import "./DataManagement.css";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import DataHeader from "../Components/DataManagement/DataHeader";
import DataNavTab from "../Components/DataManagement/DataNavTab";
import TransactionTab from "../Components/DataManagement/TransactionTab";
import CardsTab from "../Components/DataManagement/CardsTab";
import BudgetsTab from "../Components/DataManagement/BudgetsTab";

function DataManagement() {
  const [tab, selectTab] = useState("transaction");
  return (
    <div className="Datamanagement-container">
      <Navbar />
      <DataHeader />
      <DataNavTab tab={tab} selectTab={selectTab} />
      <div className="tab-data">
        {tab == "transaction" ? <TransactionTab /> : ""}
        {tab == "card" ? <CardsTab /> : ""}
        {tab == "category" ? <BudgetsTab/>: ""}
      </div>
      <div className="footer">
      <Footer />
      </div>
      
    </div>
  );
}

export default DataManagement;

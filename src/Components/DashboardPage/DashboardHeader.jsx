import React, { useContext } from "react";
import "./DashboardHeader.css";
import { AuthContext } from "../../context/AuthContext";

function DashboardHeader() {
  const { user } = useContext(AuthContext);
  return (
    <div className="dashboard-header">
      <h1>
        Welcome back {user?.firstName} {user?.lastName}!
      </h1>
    </div>
  );
}

export default DashboardHeader;
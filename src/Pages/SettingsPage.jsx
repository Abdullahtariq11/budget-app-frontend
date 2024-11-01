import React from "react";
import "./SettingsPage.css";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import UserSetting from "../Components/SettingsPage/UserSetting";

function SettingsPage() {
  return (
    <div className="SettingsPage-container">
      <Navbar />
      <UserSetting/>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default SettingsPage;

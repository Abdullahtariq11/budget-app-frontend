import React, { useState } from "react";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import LoginForm from "../Components/LoginPage/LoginForm";
import InformationSide from "../Components/LoginPage/InformationSide";
import "./LoginPage.css"
import SignupForm from "../Components/LoginPage/SignupForm";

function LoginPage() {
    const[tab,setTab]=useState("login")
  return (
    <div className="LoginPage">
      <div className="side">
        {
            tab=="Login"? <LoginForm setTab={setTab}/>: <SignupForm setTab={setTab}/>
        } 
      </div>
      <div className="side">
        <InformationSide/>
      </div>
    </div>
  );
}

export default LoginPage;

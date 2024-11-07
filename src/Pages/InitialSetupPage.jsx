import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InitialSetupCard from "../Components/LoginPage/InitialSetup/InitialSetupCard";
import InitialSetupBudget from "../Components/LoginPage/InitialSetup/InitialSetupBudget";
import "../Components/LoginPage/InitialSetup/InitialSetupPortal.css";
import { AuthContext } from "../context/AuthContext";
import { InitalSetup } from "../Service/DataService";
import InitialSetupMessage from "../Components/LoginPage/InitialSetup/InitialSetupMessage";
import axios from "axios";

function InitialSetupPage() {
  const navigate = useNavigate();
  const { token, setSetupComplete, setupComplete, isAuthenticated } =
    useContext(AuthContext); // Get token from AuthContext
  const [step, setStep] = useState(1);
  const [cardData, setCardData] = useState(null);
  const [budget1, setBudget1] = useState(null);
  const [budget2, setBudget2] = useState(null);

  const nextStep = (data) => {
    if (step === 1) {
      setCardData(data); // Store card data
      setStep(2); // Move to the first budget step
    } else if (step === 2) {
      setBudget1(data); // Store first budget data
      setStep(3); // Move to the second budget step
    } else if (step === 3) {
      setBudget2(data); // Store second budget data and complete setup
    }
  };

  // Complete setup when all data (cardData, budget1, budget2) is available
  useEffect(() => {
    if (cardData && budget1 && budget2) {
      completeSetup();
    }
  }, [cardData, budget1, budget2]);

  const completeSetup = async () => {
    try {
      const setupData = {
        card: cardData,
        category1: budget1,
        category2: budget2,
      };
      
      const { token: newToken, setupComplete: isSetup } = await InitalSetup(setupData, token);
      
      if (isSetup) {
        // Update token and setupComplete in AuthContext
        setSetupComplete(isSetup);
        localStorage.setItem("authToken", newToken); // Store new token
        navigate("/DashboardPage"); // Redirect to dashboard
        alert("Setup completed successfully!");
      }
    } catch (error) {
      console.error("Setup failed:", error);
      alert("Setup failed. Please try again.");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/LoginPage");
    } else if (setupComplete) {
      navigate("/DashboardPage");
    }
  }, [setupComplete, isAuthenticated, navigate]);

  return (
    <div>
      <InitialSetupMessage />
      {step === 1 && <InitialSetupCard nextStep={nextStep} />}
      {step === 2 && (
        <InitialSetupBudget
          nextStep={nextStep}
          stepLabel="Step 2: Add First Budget"
        />
      )}
      {step === 3 && (
        <InitialSetupBudget
          nextStep={nextStep}
          stepLabel="Step 3: Add Second Budget"
        />
      )}
    </div>
  );
}

export default InitialSetupPage;
 
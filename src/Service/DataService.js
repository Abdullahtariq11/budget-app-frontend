//src/services/dataService.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const API_Base_URL="http://localhost:5115/api/Users/";



export const createTransaction = async (transactionData, token) => {
  try {
    const response = await axios.post(`${API_Base_URL}transactions`, transactionData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Assuming the response contains the created transaction data
  } catch (error) {
    console.error("Failed to create transaction:", error.response?.data?.Message);
    throw error;
  }
};

export const InitalSetup = async (setupData, token) => {
  try {
    const response = await axios.post(`${API_Base_URL}InitialSetup`, setupData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return both the new token and setupComplete status
  } catch (error) {
    console.error("Failed to complete initial setup:", error.response?.data?.Message);
    throw error;
  }
};

export const createBudget = async (budgetData, token) => {
  try {
    const response = await axios.post(`${API_Base_URL}BudgetCategories`, budgetData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Failed to create budget:", error.response?.data?.Message);
    return[];
  }
};

export const UserDetailInfo = async ( token) => {
  try {
    const response = await axios.get(`${API_Base_URL}DetailUserInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Failed to get user details:", error.response?.data?.Message);
    return[];
  }
};

export const createCard = async (budgetData, token) => {
  try {
    const response = await axios.post(`${API_Base_URL}Card`, budgetData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Failed to create card:", error.response?.data?.Message);
    return[];
  }
};

export const editUser = async (userData, token) => {
  try {
    const response = await axios.put(`${API_Base_URL}Edit`, userData, { 
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Failed to edit user:", error.response?.data?.Message);
    return[];
  }
};

export const Signup = async (signUpData) => {
  const { login } = useContext(AuthContext);
  try {
    const response = await axios.post(`${API_Base_URL}Register`, signUpData);
    const { token } = response.data;
    login(token);
  } catch (error) {
    console.error("Failed to edit user:", error.response?.data?.Message);
    return[];
  }
};

export const LogoutUser= async(token)=>{
  if (!token) return;
  try {
    const response = await axios.post(`${API_Base_URL}Logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

   return response.data

  } catch (error) {
    console.log(error.response?.data?.Message);
    return[];
  }
};


export const fetchCardData= async(token)=>{
    if (!token) return;
    try {
      const response = await axios.get(`${API_Base_URL}Card`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

     return response.data.cards

    } catch (err) {
      console.log(err.response?.data?.Message);
      return[];
      
    }
}

export const fetchBudgetData= async(token)=>{
    
    if (!token) return;
    try {
      const response = await axios.get(`${API_Base_URL}BudgetCategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

     return response.data.budgets

    } catch (err) {
      console.log(err.response?.data?.Message);
      return[];
      
    }
}

 
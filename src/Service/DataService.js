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
    throw error;
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
    throw error;
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

 
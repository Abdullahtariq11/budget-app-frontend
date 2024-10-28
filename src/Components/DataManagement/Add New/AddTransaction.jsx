import React, { useContext, useEffect, useState } from "react";
import "./AddEntity.css";
import { AuthContext } from "../../../context/AuthContext";
import { fetchBudgetData, fetchCardData, createTransaction } from "../../../Service/DataService";

function AddTransaction() {
  const { token } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [budgetCategories, setBudgetCategories] = useState([]);
  
  const [transactionData, setTransactionData] = useState({
    amount: 0,
    transactionType: "",
    category: "",
    transactionDate: new Date().toISOString(),
    description: "",
    cardId: "",
    budgetCategoryId: "",
  });

  const handleCategoryChange = (field, value, categoryName) => {
    setTransactionData((prev) => ({
      ...prev,
      [field]: value,
      category: categoryName,
    }));
  };

  const handleChange = (field, value) => {
    const formattedValue = field === "transactionDate" 
      ? new Date(value).toISOString() 
      : field === "amount" 
      ? parseFloat(value) 
      : value;
    setTransactionData((prev) => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTransaction(transactionData, token);
      console.log("Transaction created successfully:", response);
      // Optional: Reset form or display success message if needed
    } catch (error) {
      console.error("Error creating transaction:", error);
      console.log(transactionData);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const cardData = await fetchCardData(token);
      const budgetData = await fetchBudgetData(token);
      setBudgetCategories(budgetData);
      setCards(cardData);
    };
    loadData();
  }, [token]);

  return (
    <div className="addEntity-container">
      <h1>Add Transaction</h1>
      <form className="Add-Form" onSubmit={handleSubmit}>
        <input 
          onChange={(e) => handleChange('amount', e.target.value)} 
          name='amount' 
          value={transactionData.amount || ""} 
          type="number" 
          placeholder='Amount' 
          required
        />
        <select 
          onChange={(e) => handleChange('transactionType', e.target.value)} 
          value={transactionData.transactionType} 
          name="transactionType"
          required
        >
          <option value="">Select Transaction Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input 
          onChange={(e) => handleChange('transactionDate', e.target.value)} 
          name='transactionDate' 
          value={new Date(transactionData.transactionDate).toISOString().slice(0, 10)} 
          type="date" 
          placeholder='Transaction Date' 
          required
        />
        <textarea 
          onChange={(e) => handleChange('description', e.target.value)} 
          name='description' 
          value={transactionData.description} 
          placeholder='Description'
        />
        <select 
          onChange={(e) => handleChange('cardId', e.target.value)} 
          name="cardId" 
          value={transactionData.cardId}
          required
        >
          <option value="">Select Card</option>
          {cards.map(card => (
            <option key={card.id} value={card.id}>{card.cardName}</option>
          ))}
        </select>
        <select 
          onChange={(e) => handleCategoryChange('budgetCategoryId', e.target.value, e.target.selectedOptions[0].text)}
          name="budgetCategoryId" 
          value={transactionData.budgetCategoryId}
        >
          <option value="">Select Budget Category</option>
          {budgetCategories.map(category => (
            <option key={category.id} value={category.id}>{category.categoryName}</option>
          ))}
        </select>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;
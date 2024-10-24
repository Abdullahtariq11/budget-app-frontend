import React, { useContext, useEffect, useState } from "react";
import "./StatsOverview.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

function StatsOverview() {
  const { token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // Fetch budget categories from the backend
  const fetchBudgetCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5115/api/Users/BudgetCategories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data.budgets);
    } catch (error) {
      setError(
        error.response?.data?.Message || "Failed to fetch budget categories"
      );
    }
  };

  useEffect(() => {
    if (token) {
      fetchBudgetCategory();
    }
  }, [token]);

  // Generate chart data for each category
  const generateChartData = (category) => {
    const spentAmount = category.allocatedAmount - category.remainingAmount;
    const remainingAmount = category.remainingAmount;

    // Handle cases where the remaining amount is negative (overused)
    const overusedAmount = remainingAmount < 0 ? Math.abs(remainingAmount) : 0;
    const actualRemainingAmount = remainingAmount > 0 ? remainingAmount : 0;

    return {
      labels: ["Spent", "Remaining", "Overused"],
      datasets: [
        {
          data: [spentAmount, actualRemainingAmount, overusedAmount],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors for the chart
        },
      ],
    };
  };

  // Chart options to customize the tooltips
  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="stats-overview-container">
      <h1>Budget Categories Overview</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="chart-container">
        {categories.length === 0 ? (
          <p>No budget categories available.</p>
        ) : (
          categories.map((category, index) => (
            <div key={index} className="chart-item">
              <h3>{category.categoryName}</h3>
              <Pie data={generateChartData(category)} options={chartOptions} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StatsOverview;
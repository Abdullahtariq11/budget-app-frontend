import React, { useCallback, useContext, useEffect, useState } from "react";
import "./BudgetsTab.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function BudgetsTab() {
  const [budgets, setBudgets] = useState([]);
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [filterOn, setFilterOn] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(2);

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get(
        "http://localhost:5115/api/Users/BudgetCategories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBudgets(response.data.budgets);
    } catch (err) {
      setError(err.response?.data?.Message || "Failed to fetch transactions");
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="budgets-tab-container">
      <h3>Card Data</h3>

      {/*Error Handling */}
      {error && <div className="error-message">{error}</div>}
      {/* Filter Section */}
      <div className="filter-section">
        <select >
          <option value={2}>2 Items</option>
          <option value={5}>5 Items</option>
          <option value={10}>10 Items</option>
        </select>
        <select

        >
          <option value="">Filter Type</option>
          <option value="Type">Transaction Type</option>
          <option value="Category">Category</option>
        </select>
        {filterOn === "Category" ? (
          <select

          >
            <option value="">All Categories</option>
            <option value="Groceries">Groceries</option>
            <option value="transport">Transport</option>
            <option value="Utilities">Utilities</option>
          </select>
        ) : filterOn === "Type" ? (
          <select

          >
            <option value="">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        ) : (
          <select disabled>
            <option value="" disabled>
              Select Filter
            </option>
          </select>
        )}
      </div>

      {/* Transactions Table */}
      <table className="budgets-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Allocated Amount</th>
            <th>Remaining Amount</th>
            <th>Category</th>
            <th>Last Update</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.length > 0 ? (
            budgets.map((budget) => (
              <tr key={budget.id}>
                <td>{budget.id}</td>
                <td>${budget.allocatedAmount}</td>
                <td>${budget.remainingAmount}</td>
                <td>{budget.categoryName}</td>
                <td>{budget.lastUpdated}</td>
                <td>
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No cards found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BudgetsTab;

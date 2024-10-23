import React, { useContext, useEffect, useState, useCallback } from "react";
import "./TransactionTab.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function TransactionTab() {
  const [transactions, setTransactions] = useState([]);
  const [filterOn, setFilterOn] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  const fetchData = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        "http://localhost:5115/api/Users/transactions",
        {
          params: {
            FilterOn: filterOn,
            FilterQuery: filterQuery,
            PageNumber: currentPage,
            PageSize: pageSize,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalItems(response.data.totalItems);
      setTotalPages(Math.ceil(response.data.totalItems / pageSize));
      setTransactions(response.data.transactions);
      setError("");
    } catch (err) {
      setError(err.response?.data?.Message || "Failed to fetch transactions");
    }
  }, [token, filterOn, filterQuery, currentPage, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page whenever page size changes
  };

  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1); // Reset to first page when changing filter
    if (filterType === "filterOn") {
      setFilterOn(value);
      setFilterQuery(""); // Reset filter query when filter type changes
    } else if (filterType === "filterQuery") {
      setFilterQuery(value);
    }
  };



  return (
    <div className="transaction-container">
      <h3>Transaction Data</h3>

      {/* Error Handling */}
      {error && <div className="error-message">{error}</div>}

      {/* Filter Section */}
      <div className="filter-section">
        <select onChange={handlePageSizeChange} value={pageSize}>
          <option value={2}>2 Items</option>
          <option value={5}>5 Items</option>
          <option value={10}>10 Items</option>
        </select>
        <select
          onChange={(e) => handleFilterChange("filterOn", e.target.value)}
          value={filterOn}
        >
          <option value="">Filter Type</option>
          <option value="Type">Transaction Type</option>
          <option value="Category">Category</option>
        </select>
        {filterOn === "Category" ? (
          <select
            onChange={(e) => handleFilterChange("filterQuery", e.target.value)}
            value={filterQuery}
          >
            <option value="">All Categories</option>
            <option value="Groceries">Groceries</option>
            <option value="transport">Transport</option>
            <option value="Utilities">Utilities</option>
          </select>
        ) : filterOn === "Type" ? (
          <select
            onChange={(e) => handleFilterChange("filterQuery", e.target.value)}
            value={filterQuery}
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
      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.type === 0 ? "Income" : "Expense"}</td>
                <td>{transaction.category}</td>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TransactionTab;
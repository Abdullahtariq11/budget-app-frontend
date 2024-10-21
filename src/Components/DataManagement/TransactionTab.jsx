import React, { useContext, useEffect, useState } from "react";
import "./TransactionTab.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function TransactionTab() {
  const [transactions, setTransactions] = useState([]);
  const [filterOn, setFilterOn] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [Error, setError] = useState("");
  const { token } = useContext(AuthContext);
  
  //totalPages=Math.ceil(totalItems/pageSize)

  const fetchData = async (token) => {
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
      setTransactions(response.data);
      //setTotalItems(response.data)
    } catch (error) {
      setError(error.response?.data?.Message || "Failed to fetch transactions");
    }
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [ currentPage, token]);

    // Handlers for pagination
    const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

  const applyFilter = () => {
    setCurrentPage(1); // Reset to first page when applying a new filter
    fetchData(token);
  };

  return (
    <div className="transaction-container">
      <h3>Transaction Data</h3>

      {/* Filter Section */}
      <div className="filter-section">
        <input type="text" placeholder="Search by description..." />
        <select onChange={(e) => setFilterOn(e.target.value)}>
          <option value="">All Types</option>
          <option value="Type">Transaction Type</option>
          <option value="Category">Category</option>
        </select>
        {filterOn == "Category" ? (
            
          <select onChange={(e) => setFilterQuery(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Groceries">Groceries</option>
            <option value="transport">Transport</option>
            <option value="Utilities">Utilities</option>
            {/* Add endpoint to get all available cvategories */}
          </select>
        ) : (
          <select onChange={(e) => setFilterQuery(e.target.value)}>
            <option value="">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        )}
        <button onClick={applyFilter}>Filter</button>
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
          {transactions.map((transaction) => (
            <tr>
              <td>{transaction.id}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type == 0 ? "Income" : "Expense"}</td>
              <td>{transaction.category}</td>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </td>
            </tr>
          ))}

          {/* Add more rows as needed */}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button>Previous</button>
        <span>Page 1 of 5</span>
        <button>Next</button>
      </div>
    </div>
  );
}

export default TransactionTab;

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
  const [categoriesData, setCategoriesdata] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    amount: 0,
    transactionType: "",
    category: "",
    transactionDate: "",
    description: "",
    budgetCategoryId: "",
  });

  const getCategories = async () => {
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
      setCategoriesdata(response.data.budgets);
    } catch (err) {}
  };

  const updateTransaction = async (id, updatedData) => {
    if (!token) return; // Ensure the token is available
    console.log(updatedData);
    // Prepare the data in the expected format
    const dataToUpdate = {
      amount: parseFloat(updatedData.amount), // Ensure it's a number
      transactionType: updatedData.transactionType, // Should be a string "0" or "1"
      category: updatedData.category==undefined?"":updatedData.category, // Category as a string
      transactionDate: updatedData.transactionDate, // Convert to ISO string
      description: updatedData.description, // Description as a string
      budgetCategoryId: updatedData.budgetCategoryId==undefined?"":updatedData.budgetCategoryId,
    };

    try {
      await axios.put(
        `http://localhost:5115/api/Users/transactions/${id}`, // Use the transaction ID in the URL
        dataToUpdate, // The data to be updated
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authorization
          },
        }
      );
      // Refresh data after successful update
      fetchData();
      setEditMode(false); // Exit edit mode
    } catch (err) {
      console.error("Failed to update the transaction:", err);
      setError("Failed to update the transaction");
    }
  };

  const handleDeleteClick = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this transaction?");
    if (!isConfirmed) return; // If the user cancels, do nothing
  
    try {
      await axios.delete(`http://localhost:5115/api/Users/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(); // Refresh data after deletion
    } catch (err) {
      setError("Failed to delete the transaction");
    }
  };

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

  useEffect(() => {
    getCategories();
  }, [editMode]);

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
    getCategories();
    setCurrentPage(1); // Reset to first page when changing filter
    if (filterType === "filterOn") {
      setFilterOn(value);
      setFilterQuery(""); // Reset filter query when filter type changes
    } else if (filterType === "filterQuery") {
      setFilterQuery(value);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: field === "amount" ? parseFloat(value) : value, // Parse amount as a number
    }));
  };

  const handleEditCategory = (field, value, key) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
      budgetCategoryId: key, // Parse amount as a number
    }));
  };

  const initialiseEditData = (transaction) => {
    setEditData({
      id: transaction.id,
      amount: parseFloat(transaction.amount),
      transactionType: transaction.transactionType ?? "",
      category: transaction.category,
      transactionDate: transaction.transactionDate,
      description: transaction.description,
      budgetCategoryId: transaction.budgetCategoryId 
    });
    setEditMode(true);
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
          <option value="Category">Category</option>{" "}
          {/*Add categories recieve from backend here to populate this */}
        </select>
        {filterOn === "Category" ? (
          <select
            onChange={(e) => handleFilterChange("filterQuery", e.target.value)}
            value={filterQuery}
          >
            <option value="">All Categories</option>
            {categoriesData.map((category) => (
              <option key={category.id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
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
                {editMode && editData.id == transaction.id ? (
                  // Edit Mode Row
                  <>
                    <td>{transaction.id}</td>
                    <td>
                      <input
                        type="number"
                        onChange={(e) =>
                          handleEditChange("amount", e.target.value)
                        }
                        value={editData.amount}
                        required
                      />
                    </td>
                    <td>
                      <select 
                        value={editData.transactionType}
                        onChange={(e) =>
                          handleEditChange("transactionType", e.target.value)
                        }
                        required
                      >
                       <option value="" disabled></option>
                        <option value={"0"}>Income</option>
                        <option value={"1"}>Expense</option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={editData.budgetCategoryId}
                        onChange={(e) => {
                          const selectedCategory = e.target.value==""?"": categoriesData.find(
                            (category) => category.id === e.target.value
                          );
                          handleEditCategory(
                            "category",
                            selectedCategory.categoryName,
                            selectedCategory.id
                          );
                        }}
                        required
                      >
                        <option value="">Select Category</option>
                        {categoriesData.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{transaction.transactionDate}</td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) =>
                          handleEditChange("description", e.target.value)
                        }
                        value={editData.description}
                        required
                      />
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          updateTransaction(transaction.id, editData)
                        }
                        className="edit-button"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="delete-button"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  // View Mode Row
                  <>
                    <td>{transaction.id}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.type === 0 ? "Income" : "Expense"}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.transactionDate}</td>
                    <td>{transaction.description}</td>
                    <td>
                      <button
                        onClick={() => initialiseEditData(transaction)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={()=>handleDeleteClick(transaction.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
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

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
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    allocatedAmount: 0,
    remainingAmount: 0,
    categoryName: "",
  });

  const handleDeleteClick = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5115/api/Users/BudgetCategories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      setError("Failed to delete the card");
    }
  };

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get(
        "http://localhost:5115/api/Users/BudgetCategories",
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
      setBudgets(response.data.budgets);
    } catch (err) {
      setError(err.response?.data?.Message || "Failed to fetch categories");
    }
  }, [token, filterOn, filterQuery, currentPage, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const initialiseEditData = (budget) => {
    setEditData({
      id: budget.id,
      allocatedAmount: budget.allocatedAmount,
      remainingAmount: budget.remainingAmount,
      categoryName: budget.categoryName,
    });
    setEditMode(true);
  };

  const updateBudget = async (id, updatedData) => {
    if (!token) return;
    try {
      await axios.put(
        `http://localhost:5115/api/Users/BudgetCategories/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchData();
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update the budget:", err);
      setError("Failed to update the budget");
    }
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: field === "allocatedAmount" || field === "remainingAmount"
        ? parseFloat(value)
        : value,
    }));
  };

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
    <div className="budgets-tab-container">
      <h3>Categories Data</h3>

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
          <option value="">All</option>
          <option value="categoryName">Category</option>
        </select>
        {filterOn === "categoryName" ? (
          <select
            onChange={(e) => handleFilterChange("filterQuery", e.target.value)}
            value={filterQuery}
          >
            <option value="">All Categories</option>
            <option value="Grocery">Grocery</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        ) : (
          <select disabled>
            <option value="" disabled>
              Select Filter
            </option>
          </select>
        )}
      </div>

      {/* Budgets Table */}
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
                {editMode && editData.id === budget.id ? (
                  <>
                    <td>{budget.id}</td>
                    <td>
                      <input
                        type="number"
                        value={editData.allocatedAmount}
                        onChange={(e) => handleEditChange("allocatedAmount", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editData.remainingAmount}
                        onChange={(e) => handleEditChange("remainingAmount", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editData.categoryName}
                        onChange={(e) => handleEditChange("categoryName", e.target.value)}
                      />
                    </td>
                    <td>{budget.lastUpdated}</td>
                    <td>
                      <button
                        onClick={() => updateBudget(budget.id, editData)}
                        className="edit-button"
                      >
                        Save
                      </button>
                      <button onClick={() => setEditMode(false)} className="delete-button">
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{budget.id}</td>
                    <td>${budget.allocatedAmount}</td>
                    <td>${budget.remainingAmount}</td>
                    <td>{budget.categoryName}</td>
                    <td>{budget.lastUpdated}</td>
                    <td>
                      <button
                        onClick={() => initialiseEditData(budget)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                      onClick={() => handleDeleteClick(budget.id)}
                       className="delete-button">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No categories found
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

export default BudgetsTab;
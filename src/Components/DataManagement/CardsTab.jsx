import React, { useCallback, useContext, useEffect, useState } from "react";
import "./CardsTab.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function CardsTab() {
  const [cards, setCards] = useState([]);
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    cardName: "",
    balance: 0,
    availableBalance: 0,
    totalCreditLimit: 0,
    subCardType: "",
    cardType: "",
  });

  // Fetching cards data
  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get("http://localhost:5115/api/Users/Card", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCards(response.data.cards || []);
      setError(""); // Clear error on successful fetch
    } catch (err) {
      setError(err.response?.data?.Message || "Failed to fetch card data");
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: field === "balance" || field === "availableBalance" || field === "totalCreditLimit"
        ? parseFloat(value)
        : value,
    }));
  };

  const initialiseEditData = (card) => {
    setEditData({
      id: card.id,
      cardName: card.cardName,
      balance: card.balance || 0,
      availableBalance: card.availableBalance || 0,
      totalCreditLimit: card.totalCreditLimit || 0,
      subCardType: card.subCardType || "",
      cardType: card.cardType,
    });
    setEditMode(true);
  };

  const updateCard = async (id, updatedData) => {
    if (!token) return;

    try {
      await axios.put(
        `http://localhost:5115/api/Users/Card/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchData();
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update the card:", err);
      setError("Failed to update the card");
    }
  };

  const handleDeleteClick = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5115/api/Users/Card/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      setError("Failed to delete the card");
    }
  };

  return (
    <div className="cards-tab-container">
      <h3>Card Data</h3>

      {/* Error Handling */}
      {error && <div className="error-message">{error}</div>}

      {/* Cards Table */}
      <table className="cards-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Balance</th>
            <th>Available Balance</th>
            <th>Total Credit Limit</th>
            <th>Card Type</th>
            <th>Sub Card Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.length > 0 ? (
            cards.map((card) => (
              <tr key={card.id}>
                {editMode && editData.id === card.id ? (
                  <>
                    <td>{card.id}</td>
                    <td>
                      <input
                        type="text"
                        value={editData.cardName}
                        onChange={(e) => handleEditChange("cardName", e.target.value)}
                      />
                    </td>

                    {/* Conditional Inputs based on Card Type */}
                    {card.cardType === "Debit" ? (
                      <>
                        <td>
                          <input
                            type="number"
                            value={editData.balance}
                            onChange={(e) => handleEditChange("balance", e.target.value)}
                          />
                        </td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>{card.cardType}</td>
                        <td>
                          <input
                            type="text"
                            value={editData.subCardType}
                            onChange={(e) => handleEditChange("subCardType", e.target.value)}
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td>N/A</td>
                        <td>
                          <input
                            type="number"
                            value={editData.availableBalance}
                            onChange={(e) => handleEditChange("availableBalance", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editData.totalCreditLimit}
                            onChange={(e) => handleEditChange("totalCreditLimit", e.target.value)}
                          />
                        </td>
                        <td>{card.cardType}</td>
                        <td>N/A</td>
                      </>
                    )}

                    <td>
                      <button
                        onClick={() => updateCard(card.id, editData)}
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
                    <td>{card.id}</td>
                    <td>{card.cardName}</td>
                    <td>{card.cardType === "Debit" ? `$${card.balance}` : "N/A"}</td>
                    <td>{card.cardType === "Credit" ? `$${card.availableBalance}` : "N/A"}</td>
                    <td>{card.cardType === "Credit" ? `$${card.totalCreditLimit}` : "N/A"}</td>
                    <td>{card.cardType}</td>
                    <td>{card.cardType === "Debit" ? card.subCardType : "N/A"}</td>
                    <td>
                      <button
                        onClick={() => initialiseEditData(card)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(card.id)}
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
              <td colSpan="8" className="no-data">
                No cards found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CardsTab;
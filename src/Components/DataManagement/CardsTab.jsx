import React, { useCallback, useContext, useEffect, useState } from "react";
import "./CardsTab.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function CardsTab() {
  const [cards, setCards] = useState([]);
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");

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
                <td>{card.id}</td>
                <td>{card.cardName}</td>
                {card.cardType === "Credit" ? (
                  <>
                    <td>N/A</td>
                    <td>${card.availableBalance ?? "N/A"}</td>
                    <td>${card.totalCreditLimit ?? "N/A"}</td>
                    <td>{card.cardType}</td>
                    <td>N/A</td>
                  </>
                ) : (
                  <>
                    <td>${card.balance ?? "N/A"}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>{card.cardType}</td>
                    <td>{card.subCardType ?? "N/A"}</td>
                  </>
                )}
                <td>
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </td>
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
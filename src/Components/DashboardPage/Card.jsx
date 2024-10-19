import React, { useContext, useEffect, useState } from "react";
import "./Card.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Card() {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [cardData, setCardData] = useState([]);

  const fetchCard = async (token) => {
    try {
      const response = await axios.get("http://localhost:5115/api/Users/Card", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCardData(response.data);
    } catch (error) {
      setError(error.response?.data?.Message || "Failed to fetch card data");
    }
  };

  useEffect(() => {
    if (token) {
      fetchCard(token);
    }
  }, [token]);

  return (
    <div className="card-container">
      {error && <p className="error-message">{error}</p>}
      {cardData.length === 0 ? (
        <p>No card data available.</p>
      ) : (
        cardData.map((data, index) => (
          <div key={index} className="card">
            <div className="card-content">
              <h3>{data.cardName}</h3>
            </div>
            <div className="card-details">
              <ul>
                <li><strong>Card Type:</strong> {data.cardType}</li>
                {data.cardType === "Credit" ? (
                  <>
                    <li><strong>Available Balance:</strong> ${data.availableBalance}</li>
                    <li><strong>Total Credit Limit:</strong> ${data.totalCreditLimit}</li>
                  </>
                ) : (
                  <>
                    <li><strong>Balance:</strong> ${data.balance}</li>
                    <li><strong>Sub Card Type:</strong> {data.subCardType}</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Card;
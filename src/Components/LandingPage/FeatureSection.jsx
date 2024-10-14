import React from 'react';
import "./FeatureSection.css";
import bank from "../../Assets/bank-50.png";         // Go up one level to access the Assets folder
import magnifying from "../../Assets/magnifying-glass-50.png";
import wallet from "../../Assets/wallet-50.png";
import pie from "../../Assets/pie-chart-50.png";  

function FeatureSection() {
  return (
    <div className='feature-container'>
        <ul className='feature-list'>
            <li>
                <img src={bank} alt="Savings Goal" />
                <p>Set goals for saving and track your progress over time.</p>
            </li>
            <li>
                <img src={magnifying} alt="Track Expenses" />
                <p>Easily track all your daily expenses in one place.</p>
            </li>
            <li>
                <img src={pie} alt="Budgeting" />
                <p>Set up budgets for different categories and track your spending.</p>
            </li>
            <li>
                <img src={wallet} alt="Track Wallet" />
                <p>Easily track all your daily expenses in one place.</p>
            </li>
        </ul>
    </div>
  )
}

export default FeatureSection;
import React from 'react';
import "./AddNewSelect.css";

function AddNewSelect({tab,selectTab}) {
    
  return (
    <div className='AddNewSelect-container'>
        <select value={tab} onChange={(e)=>selectTab(e.target.value)}  name="Select" id="Select">
            <option value={""}>Select </option>
            <option value="Transaction">Transaction</option>
            <option value="Card">Card</option>
            <option value="Budget">Budget</option>
        </select>
    </div>
  )
}

export default AddNewSelect
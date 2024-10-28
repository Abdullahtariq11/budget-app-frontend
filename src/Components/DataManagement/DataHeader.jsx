// DataHeader.js

import React, { useState } from 'react';
import "./DataHeader.css";
import AddNewSelect from './Add New/AddNewSelect';
import AddNewPage from './Add New/AddNewPage';

function DataHeader() {
  const [isAddNew, setIsAddNew] = useState(false);
  const [tab, selectTab] = useState("");

  return (
    <div className='data-header-container'>
        <h1>Data Management</h1>
        <button onClick={() => setIsAddNew(true)}>Add New</button>
        {isAddNew && <AddNewSelect tab={tab} selectTab={selectTab} />}
        {tab !== "" && isAddNew && (
          <AddNewPage tab={tab} selectTab={selectTab} setIsAddNew={setIsAddNew} />
        )}
    </div>
  )
}

export default DataHeader;
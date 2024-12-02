
"use client"

import { useState } from "react";

const CheckboxList = () => {
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const handleCheckboxChange = (item) => {
    const updatedCheckedItems = checkedItems.includes(item)
      ? checkedItems.filter((checkedItem) => checkedItem !== item)
      : [...checkedItems, item];

    setCheckedItems(updatedCheckedItems);
  };

  const handleAddItem = () => {
    if (newItem.trim() && !items.includes(newItem)) {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  const handleDeleteItem = (item) => {
    setItems(items.filter((i) => i !== item));
    setCheckedItems(checkedItems.filter((checkedItem) => checkedItem !== item));
  };

  return (
    <div>

      <div style={{ marginBottom: "20px"}}>
        <input
          type="text"
          placeholder="New Task"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={{fontFamily:"Saira", backgroundColor:"#FDFDFD", borderRadius:"5px", border:"1px solid #E0E0E0", padding:"3px", fontSize:"11pt", marginTop:"3%"}}
        />
        <button onClick={handleAddItem} style={{ marginLeft: "10px", fontFamily:"Saira", border:"1px solid #D1D1D1", padding:"3px", borderRadius:"5px", color:"#7B7B7B" }}>
          Add
        </button>
      </div>

      {/* Checkbox List */}
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
          <label style={{ flex: 1}}>
            <input
              type="checkbox"
              checked={checkedItems.includes(item)}
              onChange={() => handleCheckboxChange(item)}
              style={{marginRight:"3%"}}
            />
            {item}
          </label>
          <button
            onClick={() => handleDeleteItem(item)}
            style={{
              marginLeft: "10px",
              backgroundColor: "#D8D8D8",
              color: "white",
              border: "none",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius:"5px"
            }}
          >
            X
          </button>
        </div>
      ))}

    </div>
  );
};

export default CheckboxList;

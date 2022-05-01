// import { json } from "mocha/lib/reporters";
import React, { useState } from "react";
// import Item from "./Item";

function ItemForm({ url, handleNewItems }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({   
        name: name,
        category: category,
        isInCart: false,
      })
    })
      .then(res => res.json())
      .then(item => handleNewItems(item))

      setName('')
      setCategory('Produce')
  } 

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;

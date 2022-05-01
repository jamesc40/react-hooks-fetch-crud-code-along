import React from "react";

function Item({ item, url, handleUpdateItem, handleDeleteItem }) {

  const handleAddToCart = () => {
    fetch(`${url}/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isInCart: !item.isInCart})
    })
    .then(res => res.json())
    .then(item => handleUpdateItem(item));
  }

  const handleDelete = () => {
    fetch(`${url}/${item.id}`, {
      method: 'DELETE',
    })
    .then(r => r.json())
    .then(handleDeleteItem(item.id)) 
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCart}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;

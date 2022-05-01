import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

const url = "http://localhost:4000/items";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  const handleUpdateItem = (item) => setItems(items.map(el => el.id === item.id ? item : el))
  const handleDeleteItem = (id) => setItems(items.filter(el => el.id !== id))
  const handleNewItems = (item) => setItems([...items, item])

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => setItems(data))
  }, []);

  const handleCategoryChange = (category) => setSelectedCategory(category);
  const itemsToDisplay = items.filter((item) => selectedCategory === "All" ? true : item.category === selectedCategory)

  return (
    <div className="ShoppingList">
      <ItemForm url={url} handleNewItems={handleNewItems}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} url={url} handleUpdateItem={handleUpdateItem} handleDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

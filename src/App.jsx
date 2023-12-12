import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import menuItems from "./data";

// USE STATES 
function App() {
  const [currentOrder, setCurrentOrder] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

// Function to add an item to the current order
function addToOrder(menuItem) {
  // Check if the item already exists in the current order
  const existingItemIndex = currentOrder.findIndex(item => item.id === menuItem.id);

  // If the item exists, update its quantity
  if (existingItemIndex !== -1) {
    setCurrentOrder(prevOrder => {
      const newOrder = [...prevOrder];
      newOrder[existingItemIndex].quantity += 1;
      return newOrder;
    });
  } else {
    // If the item is not in the order, add it with quantity 1
    setCurrentOrder(prevOrder => [...prevOrder, { ...menuItem, quantity: 1 }]);
  }
}

  // REMOVES AN ITEM FROM THE CURRENT ORDER
  function removeFromOrder(itemId, itemPrice) {
    // FILTER OUT THE ITEM WITH THE ID
    setCurrentOrder(function (prevOrder) {
      return prevOrder.filter(function (item) {
        return item.id !== itemId;
      });
    });
  }

  function tidyOrder() {
    const itemMap = new Map();

    currentOrder.forEach(function (item) {
      const existingItem = itemMap.get(item.id);

      if (existingItem) {
        itemMap.set(item.id, { ...existingItem, quantity: existingItem.quantity + 1 });
      } else {
        itemMap.set(item.id, { ...item, quantity: 1 });
      }
    });

    const tidiedOrder = Array.from(itemMap.values());

    setCurrentOrder(tidiedOrder);
  }

// Function to close the current order and move it to past orders
// Use the spread operator to make a copy of the data and update the state.
function closeOrder() {
  setPastOrders(prevOrders => [...prevOrders, ...currentOrder]);
  setCurrentOrder([]);
}

// Function to calculate the total cost of an order
// The reduce function helps it sum up the total cost of items in the order
function calculateTotal(order) {
  return order.reduce((total, item) => total + item.price * item.quantity, 0);
}

  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(function (menuItem) {
                return (
                  <tr key={menuItem.id} onClick={() => addToOrder(menuItem)}>
                    <td>
                      <img src={menuItem.image} alt={menuItem.name} />
                    </td>
                    <td className="item-name">
                      <span>{menuItem.name}</span> <br />
                      <span>{"🌶️".repeat(menuItem.spiceLevel)}</span>
                    </td>
                    <td>${menuItem.price.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>
              {currentOrder.map(function (orderItem) {
                return (
                  <li key={orderItem.id}>
                    {orderItem.name} - ${orderItem.price.toFixed(2)} x {orderItem.quantity}{" "}
                    <button onClick={() => removeFromOrder(orderItem.id, orderItem.price)}>❌</button>
                  </li>
                );
              })}
            </ul>
            <h4>Total: ${calculateTotal(currentOrder).toFixed(2)}</h4>
            <div>
              <button onClick={tidyOrder}>Tidy Order</button>
              <button onClick={closeOrder}>Close Order</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

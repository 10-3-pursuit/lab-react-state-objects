import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import menuItems from "./data";

function App() {
  // State for current order and past orders
  const [currentOrder, setCurrentOrder] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  // Function to add an item to the current order
  // .Find to get item id
  function addToOrder(menuItem) {
    const existingItem = currentOrder.find(item => item.id === menuItem.id);

    if (existingItem) {
      // If item exists, update quantity
      setCurrentOrder(prevOrder => prevOrder.map(item =>
        item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // If item is not in order, add with quantity 1
      setCurrentOrder(prevOrder => [...prevOrder, { ...menuItem, quantity: 1 }]);
    }
  }

  // Function to remove an item from the current order
  // .Filter to remove item
  function removeFromOrder(itemId) {
    setCurrentOrder(prevOrder => prevOrder.filter(item => item.id !== itemId));
  }

  // Function to tidy the order (combine items with quantity)
  function tidyOrder() {
    const itemMap = new Map();
    currentOrder.forEach(item => {
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
  function closeOrder() {
    setPastOrders(prevOrders => [...prevOrders, ...currentOrder]);
    setCurrentOrder([]);
  }

  // Function to calculate the total cost of an order
  function calculateTotal(order) {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  }




//FULL RENDER AND DISPLAY
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
                    <td> {menuItem.image} </td>
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

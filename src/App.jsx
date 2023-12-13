import { useState } from "react";

import { v1 as generateUniqueID } from "uuid";

import Footer from "./Footer";
import Header from "./Header";

import menuItems from "./data.js";

import "./index.css";

function App() {
  // create a state to hold the menu data
  const [menu, setMenu] = useState(menuItems);
  // create a state to hold the current order in. initial value would be an empty array
  const [currentOrder, setCurrentOrder] = useState([]);

  // create a state for the total
  const [total, setTotal] = useState(0);

  // add to order function
  const addToOrder = (item) => {
    const newItem = {
      id: generateUniqueID(),
      name: item.name,
      price: item.price,
    };

    // function to calculate the total order
    setCurrentOrder((prevOrder) => [...prevOrder, newItem]);
    setTotal(total + newItem.price);
  };

  // function to close the order
  const closeOrder = () => {
    setCurrentOrder([]);
    setTotal(0);
  };

  // function to remove an item from the order
  const removeFromOrder = (itemId) => {
    const foundOrder = currentOrder.find(
      (orderItem) => orderItem.id === itemId
    );

    const filteredOrder = currentOrder.filter(
      (orderItem) => orderItem.id !== itemId
    );

    setCurrentOrder(filteredOrder);
    setTotal((prevTotal) => prevTotal - foundOrder.price);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            <tbody>
              {menu.map((item) => (
                <tr onClick={() => addToOrder(item)} key={item.id}>
                  <td>{item.image}</td>
                  <td className="item-name">
                    <span>{item.name}</span>
                    <br />
                    <span>{"🌶️".repeat(item.spiceLevel)}</span>
                  </td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>
              {currentOrder.map((order) => (
                <li key={order.id}>
                  <span onClick={() => removeFromOrder(order.id)}>❌</span>
                  <span>{order.name}</span>
                  <span>${order.price}</span>
                </li>
              ))}
            </ul>
            <h4>Total: ${total} </h4>
            <div>
              <button>Tidy order</button>
              <button onClick={closeOrder}>Close order</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

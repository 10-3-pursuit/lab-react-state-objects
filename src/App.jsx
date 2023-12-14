import Footer from "./Footer";
import Header from "./Header";
import data from "./data"
import { useState } from "react";
import "./index.css"
import menuItems from "./data";

function App() {
  const [menu, setMenu] = useState(data);
  // state for managing the current order and price
  const [currentOrder, setCurrentOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCurrentOrder = (item) => {
    setCurrentOrder([...currentOrder, item]);
    setTotalPrice(totalPrice + item.price);
  };

  const removeOrders = (index, price) => {
    // had 'menu' as the spread before
    const anotherOrder = [...currentOrder];
    anotherOrder.splice(index, 1);
    setCurrentOrder(anotherOrder);
    setTotalPrice(totalPrice - price);
  };

  const closedOrder = () => {
    setCurrentOrder([]);
    setTotalPrice(0);
  };

  const Order = currentOrder.map((item, index) => (
    <li key={index}>
      <span onClick={() => removeOrders(index, item.price)}>
      ❌
      {item.name}: {item.quantity} - ${item.price.toFixed(2)} {" "}
      {/* extra line below may or may not be needed - will see */}
      <button onClick={() => removeOrders}></button>
      </span>
    </li>
  ));

  const tidyOrder = () => {
    const anotherOrder = [];
    const extraItem = {};
    currentOrder.forEach((item) => {
      const itemName = item.name;
      if(extraItem[itemName]){
        extraItem[itemName]++;
      } else {
        extraItem[itemName] = 1;
      }
    });

    setCurrentOrder([]);
  setTotalPrice(0);
  Object.keys(extraItem).forEach((itemName) => {
    const amount = extraItem[itemName];
    const myItem = currentOrder.find((item) => item.name === itemName);
    if (myItem) {
      const newItem = {...myItem, amount};
      anotherOrder.push(newItem);
    }
  });
  setCurrentOrder(anotherOrder);
  const newTotal = anotherOrder.reduce((total, item) => total + (item.price * item.amount), 0);
  setTotalPrice(newTotal);
  };
  
  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
          <tbody>
            {menu.map(menuItem => <tr key={menuItem.id} > 
              <td>{menuItem.image}</td>
              <td className="item-name">
              <span>{menuItem.name}</span> <br></br>
              <span>{"🌶️".repeat(menuItem.spiceLevel)}</span>
              </td>
              <td>{menuItem.price}</td>
               </tr>)}
               </tbody>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>{currentOrder}</ul>
            <h4>Total: ${totalPrice.toFixed(2)}</h4>
            <div>
              <button onClick={tidyOrder}>Tidy order</button>
              <button onClick={closedOrder}>Close order</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

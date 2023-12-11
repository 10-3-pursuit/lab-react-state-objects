import { v1 as generateUniqueID } from "uuid";
import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

import data from "./data";

function App() {
  const [currentOrder, setCurrentOrder] = useState([]);
  const totalCost = currentOrder.reduce((acc, curr) => acc + curr.price * (curr.quantity || 1), 0);

  function deleteItem(id) {
    const index = currentOrder.findIndex(item => item.id === id);
    const item = currentOrder[index];
    const quantity = item.quantity;
    if (quantity && quantity > 1) {
      item.quantity = item.quantity - 1;
    } else if (quantity === 1) {
      item.quantity = 0;
    }

    const newOrder = [];
    currentOrder.forEach(itm => {
      if (itm.id === item.id) {
        if (item.quantity && item.quantity >= 1) {
          newOrder.push(item);
        }
      } else {
        newOrder.push(itm);
      }
    })

    setCurrentOrder(newOrder);
  }

  function addItem(menuItem) {
    // console.log("New item added to order,", menuItem.name);
    const newItem = JSON.parse(JSON.stringify(menuItem));
    newItem.id = generateUniqueID();
    setCurrentOrder(currentVal => [newItem, ...currentVal]);
  }

  function closeOrder () {
    setCurrentOrder([]);
  }

  function tidyOrder () {
    console.log("Tidying up order...");
    const newOrder = [];
    const uniqueItemsObj = {};
    for (const item of currentOrder) {
      const name = item.name;
      if (Object.keys(uniqueItemsObj).includes(name)) {
        uniqueItemsObj[name] = uniqueItemsObj[name] + (item.quantity || 1);
      }
      else {
        uniqueItemsObj[name] = item.quantity || 1;
        newOrder.push(item);
      }
    }

    for (const item of newOrder) {
      item.quantity = uniqueItemsObj[item.name];
    }

    setCurrentOrder([...newOrder]);
  }

  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            <tbody>  
              {data.map(item =>
              <tr onClick={() => addItem(item)} key={item.id}>
                <td>{item.image}</td>
                <td className="item-name">
                  <span>{item.name}</span> <br />
                  <span>
                    {"🌶️".repeat(item.spiceLevel)}
                  </span>
                  </td>
                <td>{item.price}</td>
              </tr>)}
            </tbody>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>
                {currentOrder.map(item => (
                  <li key={item.id}>
                    <p onClick={() => {
                      deleteItem(item.id)}}>❌</p>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>Qty: {item.quantity || 1}</p>
                  </li>
                ))}
            </ul>
            <h4>Total: ${totalCost}</h4>
            <div>
              <button onClick={() => tidyOrder()}>Tidy order</button>
              <button onClick={() => closeOrder()}>Close order</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

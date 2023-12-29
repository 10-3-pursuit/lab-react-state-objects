import React, { useState } from 'react'; // import useState!!!
import menuData from './data'; // import data (array of objects)
import Footer from "./Footer"; // Header and Footer components are rendered at the top and bottom
import Header from "./Header";
// import "./index.css";

function App() {
  const [currentOrder, setCurrentOrder] = useState([]); // Initializes currentOrder state to store the items in the current order array which is initially empty
  const [total, setTotal] = useState(0);

  const addItemToOrder = (item) => {
    setCurrentOrder([...currentOrder, item]);
    setTotal(total + item.price);
  };

  const removeItemFromOrder = (index) => {
    const newOrder = [...currentOrder];
    setTotal(total - newOrder[index].price);
    newOrder.splice(index, 1);
    setCurrentOrder(newOrder);
  };

  const closeOrder = () => {
    setCurrentOrder([]);
    setTotal(0);
  };

  const renderSpiceLevel = (spiceLevel) => {
    return '🌶️'.repeat(spiceLevel);
  };

  return (
    <div className="App">
      {/* header prop */}
      <Header />
      <main>
        <aside>
          <table>
            <tbody>
              {/* maps over menuData to render each menu item in a table row. The map function iterates over each item in the menuData array, and for each item, a row (tr) is created. */}
              {/* index isn't needed here because key is item.id {menuData.map((item, index) => (
              <tr key={item.id} onClick={() => addItemToOrder(item)}> */}
              {menuData.map((item) => (
              <tr key={item.id} onClick={() => addItemToOrder(item)}>
                <td>
                  {item.image}
                </td> {/* Render emoji as text and not image*/}
                <td className="item-name">
              <span>
                {item.name}
              </span> 
              <br/>
                  <span>
                    {renderSpiceLevel(item.spiceLevel)}
                  </span>
                </td>
                <td>
                  ${item.price}
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>
              {currentOrder.map((item, index) => (
                <li key={index}>
                  <span onClick={() => removeItemFromOrder(index)}> ❌</span>
                  <span>{item.name}</span> <span>${item.price} </span>
                </li>
              ))}
            </ul>
            <h4>Total: ${total}</h4>
            <div>
              <button>
                Tidy Order
              </button>
              <button onClick={closeOrder}>Close Order
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
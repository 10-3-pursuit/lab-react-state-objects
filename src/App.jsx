import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import menuItems from './data';

function App() {


  const [currentOrder, setCurrentOrder] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const addToOrder = (menuItem) => {
    setCurrentOrder([...currentOrder, menuItem]);
    setTotalCost(totalCost + menuItem.price);
  };

  const removeFromOrder = (id, price) => {
    const indexToRemove = currentOrder.findIndex((item) => item.id === id);
    const removedItem = currentOrder[indexToRemove];
    const updatedOrder = [
      ...currentOrder.slice(0, indexToRemove),
      ...currentOrder.slice(indexToRemove + 1)
    ];
    setCurrentOrder(updatedOrder);
    const updatedTotal = totalCost - removedItem.price;
    setTotalCost(updatedTotal < 0 ? 0 : updatedTotal);
  };

  const closeOrder = () => {
    setCurrentOrder([]);
    setTotalCost(0);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
          <tbody>
              {menuItems.map((menuItem) => (
                <tr key={menuItem.id}>
                  <td>
                    <span role="img" aria-label={menuItem.name}>
                      {menuItem.image}
                    </span>
                  </td>
                  <td className="item-name" onClick={() => addToOrder(menuItem)}>
                    <span>{menuItem.name}</span> <br />
                    <span>{'🌶️'.repeat(menuItem.spiceLevel)}</span>
                  </td>
                  <td>
                    ${menuItem.price}
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
            {currentOrder.map((orderItem) => (
                <li key={orderItem.id}>
                  <div>
                    <button onClick={() => 
                      removeFromOrder(orderItem.id, orderItem.price)}>
                      ❌
                    </button>
                  </div>
                  <div>
                    {orderItem.name} 
                  </div>
                  <div>
                    ${orderItem.price}
                  </div>
                </li>
              ))}
            </ul>
            <h4>Total: ${totalCost}</h4>
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

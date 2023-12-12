import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import menuItems from "./data";

function App() {
  const [menu, setMenu] = useState([]);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [totalCost, setTotalCost] = useState([0])

  

  const spiceLevelEmoji = (level) => {
    switch (level) {
      case 1:
        return "🌶️";
      case 2:
        return "🌶️🌶️";
      case 3:
        return "🌶️🌶️🌶️";
      case 4:
        return "🌶️🌶️🌶️🌶️";
      case 5:
        return "🌶️🌶️🌶️🌶️🌶️";
      default:
        return " ";
    }
  };

  useEffect(() => {
    setMenu(menuItems);
    const newTotalCost =
      currentOrder.reduce((acc, item) => acc + item.price, 0);
    setTotalCost(newTotalCost);
  }, [currentOrder]);
  

  const addToOrder = (item) => {
    setCurrentOrder((prevOrder) => [...prevOrder, item]);
  };

  const clearOrder = () => {
    setCurrentOrder([]);
  }

  const tidyOrder = () => {
    const mergedItems = currentOrder.reduce((acc, item) => {
      const existingItemIndex = acc.findIndex(
        (mergedItem) => mergedItem.id === item.id
      );
  
      if (existingItemIndex !== -1) {
        acc[existingItemIndex].quantity += 1;
      } else {
        // Ensure each new item has a unique key
        acc.push({ ...item, quantity: 1, key: `${item.id}-${Date.now()}` });
      }
  
      return acc;
    }, []);
  
    setCurrentOrder(mergedItems);
  };
  

  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            <tbody>
              {menu.map((item) => (
                <tr key={item.id} onClick={() => addToOrder(item)}>
                  <td>{item.image}</td>
                  <td className="item-name">
                    <span>{item.name}</span>
                    <br />
                    <span>{spiceLevelEmoji(item.spiceLevel)}</span>
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
              {currentOrder.map((item) => (
                <li key={item.id}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>{spiceLevelEmoji(item.spiceLevel)}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
            <h4>Total:${totalCost}</h4>
            <div>
              <button onClick={tidyOrder}>Tidy order</button>
              <button onClick = {clearOrder}>Close order</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

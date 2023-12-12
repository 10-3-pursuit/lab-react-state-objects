// import usestate and menuitems
import { useState } from "react"
import menuItems from "./data";

import Footer from "./Footer";
import Header from "./Header";


function App() {

  const [ currentOrder, setCurrentOrder ] = useState([])
  const [ total, setTotal] = useState(0);

  function spiceLevel(level) {
    return '🌶️'.repeat(level);
  }

  function addItem(clickedItem) {
    setCurrentOrder([...currentOrder, clickedItem]);
    updateTotal(clickedItem);
  }

  function updateTotal(clickedItem) {
    setTotal(total + clickedItem.price);
  }

  function removeItem(id) {
    const updatedOrder = currentOrder.filter((item) => item.id !== id);
    setCurrentOrder(updatedOrder);

    const removedItem = currentOrder.find((item) => item.id === id);
    setTotal(total - removedItem.price);
  }
  
  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            <tbody>
            {menuItems.map((menuItem) => (
              <tr key={menuItem.id} onClick={()=>addItem(menuItem)}>
                <td>{menuItem.image}</td>
                <td className="item-name"> <span>{menuItem.name}</span><br></br>
                <span>{spiceLevel(menuItem.spiceLevel)}</span>
                </td>
                <td>{menuItem.price}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>{currentOrder.map((orderItem) => (
                <li key={orderItem.id}>
                  <span onClick={()=>removeItem(orderItem.id)}>❌</span>
                  <span>{orderItem.name}</span> 
                  <span>${orderItem.price}</span>
                </li>
              ))}</ul>
            <h4>Total:${total}</h4>
            <div>
              <button>Tidy order</button>
              <button>Close order</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
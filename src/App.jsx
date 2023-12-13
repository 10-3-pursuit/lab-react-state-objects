import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import menu from "./data.js";

function App() {

  const [menuItems, setMenuItems] = useState(menu)
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(0)
  
  function addOrder(itemId){
    const selectedItem = menuItems.find((item)=> item.id === itemId);
    setOrder([...order, selectedItem]);
    setTotal(total + selectedItem.price);
  }

  function removeOrder(itemId){
    const selectedItemIndex = order.findIndex((item) => item.id === itemId);
    const filtered = order.filter((item,index) => selectedItemIndex !== index)
    setOrder(filtered);

    const selectedItem = menuItems.find((item) => item.id === itemId);
    setTotal(total - selectedItem.price);
  }

  function closeOrder(){
    setTotal(0);
    setOrder([]);
  }

  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
              {menuItems.map((item) => <tr key={item.id} onClick={() => addOrder(item.id)}>
                <td>{item.image}</td>
                <td className="item-name">
                  <span>{item.name}</span><br></br>
                  <span>{"🌶️".repeat(item.spiceLevel)}</span>
                </td>
                <td>{item.price}</td>
              </tr>)}
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>
              {order.map((item)=> <li>
                <div onClick={() => removeOrder(item.id)}>❌</div>
                <div>{item.name}</div>
                <div>${item.price}</div>
              </li>)}
            </ul>
            <h4>Total:${total}
            </h4>
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

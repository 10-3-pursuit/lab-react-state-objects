import { useState } from "react";
// import Menu from "./Menu.jsx";

import Footer from "./Footer";
import Header from "./Header";
import menuItemsData from "./data";

function App() {

  // State for all menu items
  const [menuItems, setMenuItems] = useState(menuItemsData)

  // State for all order items
  const [currentOrder, setCurrentOrder] = useState([])

  // State for total cost
  const [total, setTotal] = useState(0)


  function generateSpiceLevel(spiceLevel){
    const chilis = "🌶️".repeat(spiceLevel)
    return <span>{chilis}</span>
}

function addToOrder(item){
  const newOrderItem = {
      name: item.name,
      price: item.price
    }
    setCurrentOrder([...currentOrder, newOrderItem])
}

const removeItem = (name) => {
  const updatedOrder = currentOrder.filter((item) => item.name !== name)
  setCurrentOrder(updatedOrder)
}

  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            <tbody>
              {menuItems.map((singleItem) => (
              <tr key={singleItem.id} onClick={()=>addToOrder(singleItem)}>
                <td>{singleItem.image}</td>
                <td className="item-name">
                  <span>{singleItem.name}</span>
                  <br></br>
                  <span>{generateSpiceLevel(singleItem.spiceLevel)}</span>
                </td>
                <td>{singleItem.price}</td>
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
                  <span onClick={()=>removeItem(item.name)}>❌</span>
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
            <h4>Total:</h4>
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

import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import  menuItems  from "./data"


function App() {
  const [menu, setMenu] = useState(menuItems)
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(0)

  const spiceConvert = (spiceLevel) => {
    const emoji = "🌶️"
    const emojis = emoji.repeat(spiceLevel)
    return emojis
  }
  const addToOrder = (item) => {
    const selectedItem = <li key={order.length}><span onClick={() => removeItem(item.name, item.price)}>❌</span>  <span>{item.name}</span>  ${item.price}</li>
    setOrder((prevOrder) => [...prevOrder, selectedItem]);
    setTotal((prevTotal)=> prevTotal +item.price)
  }
  const removeItem = (name, price) => {
    const filteredMenu = order.filter(item => item.name !== name)
    setOrder(filteredMenu)
    setTotal((prevTotal)=> prevTotal - price)
  }

  const closeOrder = () => {
    setOrder([])
    setTotal(0)
  }
  

  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            {menu.map((item) => 
              <tr key="item.id">
                <td className="item-image">
                  {item.image}
                </td>
                <td className="item-name" onClick={() => addToOrder(item)}>
                  <span>{item.name}</span> 
                  <br />
                  <span>{spiceConvert(item.spiceLevel)}</span>
                </td> 
                <td className="item-price">
                  ${item.price}
                </td>
              </tr>)}
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>
              {order}
            </ul>
            <h4>Total: ${total}</h4>
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

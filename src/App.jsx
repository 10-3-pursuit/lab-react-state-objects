import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import menuItems from "./data";

function App() {
  const [items, setItems] = useState(menuItems)
  const pepper = "🌶️"

  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(0)

  const updateOrder = (item) => {
    const selectedOrder = {
      id: order.length,
      name: item.name,
      price: item.price,
    };

    setOrder((prevOrder) => [...prevOrder, selectedOrder])
    setTotal((prevTotal) => prevTotal + item.price)
  };

  const removeItem = (index, price) => {
    setOrder((prevOrder) => {
      const updatedOrder = [...prevOrder]
      updatedOrder.splice(index, 1)
      return updatedOrder
    })
    setTotal((prevTotal) => prevTotal - price)
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
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.image}</td>
                <td className="item-name" onClick={() => updateOrder(item)}>
                  <span>{item.name}</span> <br />
                  <span>{pepper.repeat(item.spiceLevel)}</span>
                </td>
                <td>${item.price}</td>
              </tr>
            ))}
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>
              {order.map((item, index) => (
                <li key={item.id}>
                  <span onClick={() => removeItem(index, item.price)}>❌</span>{" "}
                  <span>{item.name}</span> ${item.price}
                </li>
              ))}
            </ul>
            <h4>Total: ${total}</h4>
            <div>
              <button>Tidy order</button>
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

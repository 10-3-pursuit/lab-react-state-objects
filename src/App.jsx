import  menuItems  from "./data"
import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

const orders = [];

function App() {
  const [menu, setMenu] = useState(menuItems)
  const [order, setOrder] = useState(orders)
  const [total, setTotal] = useState(0)
  
  // console.log(menu)

  const moveToCurrentOrder = (id) => {
    console.log(`${id} was selected!`)
    const selectedItem = menu.find(item => item.id === id);
    const newItem = { 
      id: selectedItem.id, 
      name: selectedItem.name, 
      price: selectedItem.price 
    }

      setOrder([...order, newItem]);
      setTotal(total + selectedItem.price)
    
  }


  const removeItem = (id) => {
    console.log(`${id} was clicked to be removed!!!`)
    const removedOrder = order.find(item => item.id === id)

    const filteredOrders = order.filter(item => item.id !== id)

    setOrder(filteredOrders)
    setTotal( total - removedOrder.price);
    
  }


  const closeOrder = () => {
    setOrder(orders)
    setTotal(0)
  }

  const displayChiliPeppers = (spiceLvl) => {
    const chili = '🌶️';

    const chiliPeppers = chili.repeat(spiceLvl);
    return chiliPeppers
  }


  
  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            <tbody>

            {menu.map(item => 
              <tr key={item.id} onClick={ () => moveToCurrentOrder(item.id)}>
                <td>{item.image}</td>
                <td className="item-name">
                  <span>{item.name}</span>
                  <br />
                  <span>{displayChiliPeppers(item.spiceLevel)}</span>
                </td>
                <td>{item.price}</td>
              </tr>
            )}
            </tbody>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>
              {order.map(item => 
                <li key={item.id}>
                  <span onClick={()=> removeItem(item.id)}>❌</span>
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </li>  
              )}
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

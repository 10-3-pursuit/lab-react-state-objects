import { useState } from "react";
import { v1 as generateUniqueID } from "uuid"
import Footer from "./Footer";
import Header from "./Header";
import menuItems from "./data";

function App() {
  const [menu, setMenu] = useState(menuItems)
  const [orderItems, setOrderItems] = useState([...menuItems])
  const [currentOrder, setCurrentOrder] = useState([])
  const [cost, setCost] = useState(0)

  const chilli = '🌶️'

  
  const addItemToOrder = (item) => {
    const newItem = {
      id: generateUniqueID(),
      image: '❌',
      name: item.name,
      price: item.price
    }
    setCurrentOrder([...currentOrder, newItem])
    setCost(cost + newItem.price)
  }
  
  const removeItem = (item) => {
    const index = currentOrder.indexOf(item)
    if(index !== -1) {
      const filteredItems = [...currentOrder]
      filteredItems.splice(index, 1)
      setCurrentOrder(filteredItems)
      setCost(cost - item.price)
    }
  }

  const closeOrder = () => {
    setCost(0)
    setCurrentOrder([])
  }

  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            <tbody>
            {menu.map((item)=> 
             <tr key={item.id}>
                <td>{item.image}</td>
                <td onClick={()=>addItemToOrder(item)} className="item-name">
                  <span>{item.name}</span>
                  <br></br>
                  <span>{chilli.repeat(item.spiceLevel)}</span>
                </td>
                <td>{item.price}</td>
              </tr>
              )
            }
            </tbody>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>
              {currentOrder.map(item=> 
                <li key={item.id}>
                  <span onClick={()=>removeItem(item)}>{item.image}</span> 
                  <span>{item.name}</span> 
                  <span>${item.price}</span>
                </li>
              )}
            </ul>
            <h4>Total: ${cost}</h4>
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

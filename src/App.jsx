import Footer from "./Footer";
import Header from "./Header";
import TableRow from "./TableRow";
import menuItems from "./data";
import { useState } from "react";
import {v1 as generateUniqueID } from "uuid"
function App() {
  const [menu, setMenu] = useState(menuItems)
  const [currentOrder, setCurrentOrder] = useState([])
  const [orderTotal, setTotal] = useState(0)

  function addOrder(itemID){
    const foundItem = menu.find(item=> item.id === itemID)
    const newItem = {
      id:generateUniqueID(),
      name:foundItem.name,
      price:foundItem.price
    }
    setCurrentOrder([...currentOrder, newItem])
    setTotal(orderTotal + newItem.price)
  }

  function removeOrder(itemID){
    const modifiedArr = [...currentOrder]
    const foundItem = modifiedArr.findIndex(item=> item.id===itemID)
    if(modifiedArr[foundItem].quantity > 1){
      modifiedArr[foundItem].quantity -= 1
      setCurrentOrder(modifiedArr)
    }else{
      const newArr = modifiedArr.filter(item=> item.id!==itemID)
      setCurrentOrder(newArr)
    }
    setTotal(orderTotal - modifiedArr[foundItem].price)
  }
    
  function closeOrder(){
    setTotal(0)
    setCurrentOrder([])
  }

  function tidyOrder(){
    const tidyList = [];

    currentOrder.forEach(item=>{
      const existingItem = tidyList.find(tidyItem=> tidyItem.name === item.name)
      if(existingItem){
        existingItem.quantity = (existingItem.quantity||0) + 1
      }else{
        item.quantity = 1
        tidyList.push(item)
      }
    })
    setCurrentOrder(tidyList)
  }
 
  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            {menu.map(item=> <TableRow addOrder={addOrder} key={item.id} item={item}/>)}
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>{currentOrder.map((item,index)=> (
            <li key={item.id}>
              <span onClick={()=>removeOrder(item.id)}>❌</span>
              {item.quantity > 1? (
              <>
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </>
            ) : (
              <>
              <span>{item.name}</span>
              <span>${item.price}</span>
              </>
            )}
            </li>
            )
            )}
              </ul>
            <h4>Total:${orderTotal}</h4>
            <div>
              <button onClick={tidyOrder}>Tidy order</button>
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

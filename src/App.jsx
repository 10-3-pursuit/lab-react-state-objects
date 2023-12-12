import Footer from "./Footer";
import Header from "./Header";
import TableRow from "./TableRow";
import menuItems from "./data";
import { useState } from "react";
import {v1 as generateUniqueID } from "uuid"
import Menu from "./Menu";
import CurrentOrder from "./CurrentOrder";
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
      const newArr = modifiedArr.filter((item,index)=>index !== foundItem )
      setCurrentOrder(newArr)
    }
    setTotal(orderTotal - modifiedArr[foundItem].price)
  }
    
  function closeOrder(){
    setTotal(0)
    setCurrentOrder([])
  }

  function tidyOrder(){
    const tidyList = currentOrder.filter(item=> item.quantity);
    const untidiedList = currentOrder.filter(item=> !item.quantity)

    untidiedList.forEach(item=>{
      const existingItem = tidyList.find(tidyItem=> tidyItem.name === item.name)
      if(existingItem){
        existingItem.quantity +=1
      }else{
        tidyList.push(item)
        const addeditem = tidyList.findIndex(tidyItem=> tidyItem.name === item.name)
        tidyList[addeditem].quantity = 1
      }
      
    })
    setCurrentOrder(tidyList)
  }
 
  return (
    <div className="App">
      <Header />
      <main>
        <aside>
      <Menu menu={menu} addOrder={addOrder}/>
        </aside>
        <section>
        <CurrentOrder currentOrder={currentOrder} removeOrder={removeOrder} tidyOrder={tidyOrder} closeOrder={closeOrder} orderTotal={orderTotal}/>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

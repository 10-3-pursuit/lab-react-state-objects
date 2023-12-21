import { useState } from "react";
import menuItems from "./data"
import Footer from "./Footer";
import Header from "./Header";

function App() {
  // const [menuItem, set menuItem] = useState(menuItem);

const [menuOrder, setMenuOrder] = useState([]);

const [menuPrice, setMenuPrice] = useState(0);


const addToOrder = (item) => {
setMenuOrder([...menuOrder, item]);
setMenuPrice(menuPrice + item.price);
};

const removeOrder = (index, price) => {
const oldOrder = [...menuOrder];
oldOrder.splice(index, 1);
setMenuOrder(oldOrder);
setMenuPrice(menuPrice - price);
};

const closeOrder = () => {
  setMenuOrder([]);
  setMenuPrice(0);
};

const menuItemsList = menuItems.map((item) => (
  <tbody>
<tr key={item.id} onClick={() => addToOrder(item)}>
<td>
  {item.image}
</td>
<td className="item-name">
  <span>
    {item.name};
  </span>
  <br />
  <span>
    {"🌶️".repeat(item.spiceLevel)}
  </span>
  </td>
  <td>${item.price.toFixed(2)}</td>
</tr>
</tbody>
));

const currentOrder = menuOrder.map((item, index) => {
  <li key={index}>
    <span>
      ❌
    </span>
    {item.name} - Quantity: {item.quantity} - ${item.price.toFixed(2)} {" "}
    <span onClick={() => removeOrder(index, item.price) }></span>
  </li>
})


  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>{menuItemsList}</table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>{currentOrder}</ul>
            <h4>Total: ${menuPrice.toFixed(2)}</h4>
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
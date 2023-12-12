import Footer from "./Footer";
import Header from "./Header";

import menuItems from "./data";
import { useState } from "react";

// function to calculate the total order
const calculateTotal = ([...menuItems]) => {
  return menuItems
    .map((item) => item.price)
    .reduce((acc, curr) => acc + curr, 0);

  setCurrentOrder(menuItems);
};

// function to generate the spice level
const generateSpiceLevel = (spiceLevel) => {
  const spice = "🌶️".repeat(spiceLevel);
  return <span>{spice}</span>;
};

// menu item function
const handleMenuItem = () => {
  console.log(menuList);
};

function App() {
  const [menuList, setMenuList] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(0);

  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            {menuItems.map((item) => (
              <tbody onClick={handleMenuItem} key={item.id}>
                <tr>
                  <td>{item.image}</td>
                  <td className="item-name">
                    <span>{item.name}</span>
                    <br />
                    <span>{generateSpiceLevel(item.spiceLevel)}</span>
                  </td>
                  <td>{item.price}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul></ul>
            <h4>Total: ${currentOrder}</h4>
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

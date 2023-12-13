import Footer from "./Footer";
import Header from "./Header";
import data from "./data"
import { useState } from "react";



function App() {
  const [menu, setMenu] = useState(data);
  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
          <tbody>
            {menu.map(menuItem => <tr key={menuItem.id} > 
              <td>{menuItem.image}</td>
              <td className="item-name">
              <span>{menuItem.name}</span> <br></br>
              <span>{"🌶️".repeat(menuItem.spiceLevel)}</span>
              </td>
              <td>{menuItem.price}</td>
               </tr>)}
               </tbody>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul></ul>
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

import { useState } from "react";

import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";

function App() {
  const [orderItems, setOrderItems] = useState();
  const [total, setTotal] = useState(0);


  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <Menu orderItems={orderItems} setOrderItems={setOrderItems} total={total} setTotal={setTotal} />
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>
              {orderItems && orderItems.map((item) => {
                return (
                  <li key={item.id}>
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </li>
                )
              })}
            </ul>
            <h4>Total: ${total}</h4>
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

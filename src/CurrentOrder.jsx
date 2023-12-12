

export default function CurrentOrder({currentOrder,removeOrder,tidyOrder,closeOrder, orderTotal}){

    return (
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
    )
}
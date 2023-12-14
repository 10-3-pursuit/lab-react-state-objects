const OrderItem = ({ item, orderItems, setOrderItems, total, setTotal }) => {
    const removeItemFromOrder = (removedItem) => {
        const filteredArray = orderItems.filter((item) => item.id !== removedItem.id);
        setOrderItems([...filteredArray]);
        setTotal(total - removedItem.price)
    }
    return (
        <li key={item.id}>
            <span onClick={() => removeItemFromOrder(item)}>❌</span>
            <span>{item.name}</span>
            <span>${item.price}</span>
        </li>
    )
}

export default OrderItem
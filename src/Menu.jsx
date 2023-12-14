import menu from "./data"

const showPeppers = (num) => {
    let peppers = '';
    for (let i = 0; i < num; i++) {
        peppers += '🌶️';
    }
    return peppers;
}

const Menu = ({ orderItems, setOrderItems, total, setTotal }) => {
    const addItemToOrder = (item) => {
        orderItems === undefined ? setOrderItems([item]) : setOrderItems([...orderItems, item]);
        setTotal(total + item.price);
    }

    return (
        <table>
            <tbody>
                {menu.map((item) => {
                    const { id, image, name, price, spiceLevel } = item;
                    return (
                        <tr key={id}
                            onClick={() => addItemToOrder(item)}>
                            <td>{image}</td>
                            <td className="item-name">
                                <span>{name}</span><br />
                                <span>{showPeppers(spiceLevel)}</span>
                            </td>
                            <td>{price}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Menu
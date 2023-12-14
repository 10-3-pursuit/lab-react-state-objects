import menu from "./data"

const showPeppers = (num) => {
    let peppers = '';
    for (let i = 0; i < num; i++) {
        peppers += '🌶️';
    }
    return peppers;
}

const Menu = () => {
    return (
        <table>
            <tbody>
                {menu.map((item) => {
                    const { id, image, name, price, spiceLevel } = item;
                    return (
                        <tr key={id}>
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
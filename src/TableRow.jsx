
export default function TableRow({item,addOrder}){

    return (
        <tbody>
            <tr onClick={()=>addOrder(item.id)}>
                <td>{item.image}</td>
                <td className={item.name}>
                    <span>{item.name}</span> <br></br>
                    <span>{"🌶️".repeat(item.spiceLevel)}</span>
                </td>
                <td>${item.price}</td>
            </tr>      
        </tbody>
    )
}
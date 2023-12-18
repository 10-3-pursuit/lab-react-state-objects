import TableRow from "./TableRow"

export default function Menu({menu,addOrder}){
    return(
    <table>
    {menu.map(item=> <TableRow addOrder={addOrder} key={item.id} item={item}/>)}
    </table>
    )
}
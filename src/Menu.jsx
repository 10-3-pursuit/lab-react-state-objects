// import React from 'react'

// const Menu = ({menuItems}) => {

//     function generateSpiceLevel(spiceLevel){
//         const chilis = "🌶️".repeat(spiceLevel)
//         return <span>{chilis}</span>
//     }

//   return (
//     <tbody>
//         {menuItems.map((singleItem) => (
//         <tr key={singleItem.id}>
//             <td>{singleItem.image}</td>
//             <td className="item-name">
//                 <span>{singleItem.name}</span>
//                 <br></br>
//                 <span>{generateSpiceLevel(singleItem.spiceLevel)}</span>
//             </td>
//             <td>{singleItem.price}</td>
//         </tr>
//         ))}
//     </tbody>
//     )
// }

// export default Menu
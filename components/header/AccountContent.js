// // import { ListItem } from '@material-ui/core';
// // import React from 'react';

// export default function AccountContent({id, icon, title}) {
// 	return (
// 		<ListItem onClick={(e) => {
// 			getId(e)
// 			setState({ "right": false })
// 			router.push({
// 				pathname: `/account/${id}`,
// 				query: {
// 					account: `${id}`
// 				},
// 			})
// 		}} button id={id} key={id} className="burgerList">
// 			<ListItemText
// 				// onMouseEnter={handlerHover}
// 				// onMouseLeave={handlerHover}
// 				style={{ height: "30px", display: "flex", alignItems: "center", }}
// 				className={`${item.id == active ? item.name + "Active" : item.name} ${item.id == active ? `${classes.accountItem} ${classes.accountItemActive}` : classes.accountItem} ${item.id == active ? classes.activeItem : ""}`} primary={item.title} />
// 		</ListItem>
// 	)
// }
import { ListItem, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';
import Link from 'next/link'

const CategoriesAliasFour = ({alias, alias2, alias3, alias4, label, placeOffer, toggleDrawer}) => {



	const [active, setActive] = useState(false)

	const handlerClick = (str) => {
		placeOffer(str)
		setActive(true)
	}

	if (placeOffer) {
		return (
			<ListItem className="burgerList pl-2" onClick={() => handlerClick(`${alias},${alias2},${alias3},${alias4}`)}>
				<ListItemText><div className={`burgerItem burgerLink ${active ? 'burgerItemClicked' : ''}`}>{label}</div></ListItemText>
			</ListItem>
		)
	}

	return (
		<ListItem className="burgerList pl-2">
			<Link href={`/search/${alias}`}><a onClick={() => toggleDrawer({left: false})} className="burgerItem burgerLink">{label}</a></Link>
		</ListItem>
	)
}

export default CategoriesAliasFour
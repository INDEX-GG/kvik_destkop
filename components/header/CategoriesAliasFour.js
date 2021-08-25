import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import Link from 'next/link'

export default function CategoriesAliasFour({alias, alias2, alias3, alias4, label, placeOffer, toggleDrawer}) {

	if (placeOffer) {
		return (
			<ListItem className="burgerList pl-2" onClick={() => placeOffer(`${alias},${alias2},${alias3},${alias4}`)}>
				<ListItemText><div className="burgerItem burgerLink">{label}</div></ListItemText>
			</ListItem>
		)
	}

	return (
		<ListItem className="burgerList pl-2" onClick={() => toggleDrawer("left", false)}>
			<Link href={`/search/${alias}`}><a className="burgerItem burgerLink">{label}</a></Link>
		</ListItem>
	)
}
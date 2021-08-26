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
		<ListItem className="burgerList pl-2">
			<Link href={`/search/${alias}`}><a onClick={() => toggleDrawer({left: false})} className="burgerItem burgerLink">{label}</a></Link>
		</ListItem>
	)
}
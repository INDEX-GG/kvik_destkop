import { Collapse, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useCategory } from '../../hooks/useCategory';
import Link from 'next/link'
import CategoriesAliasFour from './CategoriesAliasFour';

export default function CategoriesAliasThree({alias, alias2, alias3, label, placeOffer}) {

	const [open, setOpen] = useState(false);

	const {categoriesByAlias} = useCategory();

	if (categoriesByAlias(alias, alias2, alias3) == null) {
		if (placeOffer) {
			return (
				<ListItem className="burgerList" onClick={() => placeOffer(`${alias},${alias2},${alias3}`)}>
					<ListItemText><div className="burgerItem burgerLink">{label}</div></ListItemText>
				</ListItem>
			)
		}
		return (
			<ListItem className="burgerList pl-1">
				<Link href={`/search/${alias3}`}><a className="burgerItem burgerLink">{label}</a></Link>
			</ListItem>
		)
	}

	return (
		<>
			<ListItem className="burgerList pl-1" button onClick={() => setOpen(!open)}>
				<ListItemText className={`burgerItem ${open ? "burgerItemActive" : ""}`} primary={label} />
			</ListItem>
			<Collapse in={open}>
				{categoriesByAlias(alias, alias2, alias3)?.map((item, index) => {
					return <CategoriesAliasFour key={index} alias={item.alias} label={item.label} />
				})}
			</Collapse>
		</>
	)
}
import { Collapse, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useCategory } from '../../hooks/useCategory';
import Link from 'next/link'
import CategoriesAliasFour from './CategoriesAliasFour';

const CategoriesAliasThree = ({alias, alias2, alias3, label, placeOffer, toggleDrawer}) => {

	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(false)

	const handlerClick = (str) => {
		placeOffer(str)
		setActive(true)
	}

	const {categoriesByAlias} = useCategory();

	if (categoriesByAlias(alias, alias2, alias3) == null) {
		if (placeOffer) {
			return (
				<ListItem className="burgerList pl-1" onClick={() => handlerClick(`${alias},${alias2},${alias3}`)}>
					<ListItemText><div className={`burgerItem burgerLink ${active ? 'burgerItemClicked' : ''}`}>{label}</div></ListItemText>
				</ListItem>
			)
		}
		return (
			<ListItem className="burgerList pl-1">
				<Link href={`/search/${alias3}`}><a onClick={() => toggleDrawer({left: false})} className="burgerItem burgerLink">{label}</a></Link>
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
					return <CategoriesAliasFour key={index} alias={alias} alias2={alias2} alias3={alias3} alias4={item.alias} label={item.label} placeOffer={placeOffer} toggleDrawer={toggleDrawer} />
				})}
			</Collapse>
		</>
	)
}

export default CategoriesAliasThree
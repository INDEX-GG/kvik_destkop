import { Collapse, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useCategory } from '../../hooks/useCategory';
import Link from 'next/link'
import CategoriesAliasThree from './CategoriesAliasThree';

const CategoriesAliasTwo = ({alias, alias2, label, placeOffer, toggleDrawer}) => {

	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(false)

	const {categoriesByAlias} = useCategory();

	function generateStr(str) {
		return str[0].toUpperCase() + str.substring(1,)
	}

	const handlerClick = (str) => {
		placeOffer(str)
		setActive(true)
	}



	if (categoriesByAlias(alias, alias2) == null) {

		if (placeOffer) {
			return (
				<ListItem className="burgerList" onClick={() => handlerClick(`${alias},${alias2}`)}>
					<ListItemText><div className={`burgerItem burgerLink ${active ? 'burgerItemClicked' : ''}`}>{label}</div></ListItemText>
				</ListItem>
			)
		}

		return (
			<ListItem className="burgerList">
				<Link href={`/search/${alias2}`}><a onClick={() => toggleDrawer({left: false})} className="burgerItem burgerLink">{label}</a></Link>
			</ListItem>
		)
	}

	return (
		<>
			<ListItem className="burgerList" button onClick={() => setOpen(!open)}>
				<ListItemText className={`burgerItem ${open ? "burgerItemActive" : ""}`} primary={label} />
			</ListItem>
			<Collapse in={open}>
				{categoriesByAlias(alias, alias2)?.map((item, index) => {
					return <CategoriesAliasThree key={index} alias={alias} alias2={alias2} alias3={item.alias} label={generateStr(item.label)} placeOffer={placeOffer} toggleDrawer={toggleDrawer} />
				})}
			</Collapse>
		</>
	)
}

export default CategoriesAliasTwo;
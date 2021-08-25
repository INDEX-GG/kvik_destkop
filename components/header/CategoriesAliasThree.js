import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useCategory } from '../../hooks/useCategory';
import Link from 'next/link'
import CategoriesAliasFour from './CategoriesAliasFour';

export default function CategoriesAliasThree({alias, alias2, alias3, label}) {

	const [open, setOpen] = useState(false);

	const {categoriesByAlias} = useCategory();

	if (categoriesByAlias(alias, alias2, alias3) == null) {
		return (
			<ListItem className="burgerList">
				<Link href={`/search/${alias3}`}><a className="burgerItem burgerLink">{label}</a></Link>
			</ListItem>
		)
	}

	return (
		<>
			<ListItem className="burgerList" button onClick={() => setOpen(!open)}>
				<ListItemText className={`burgerItem ${open ? "burgerItemActive" : ""}`} primary={label} />
			</ListItem>
			<Collapse in={open}>
				<List>
					{categoriesByAlias(alias, alias2, alias3)?.map((item, index) => {
						return <CategoriesAliasFour key={index} alias={item.alias} label={item.label} />
					})}
				</List>
			</Collapse>
		</>
	)
}
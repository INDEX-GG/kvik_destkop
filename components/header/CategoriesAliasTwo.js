import { Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useCategory } from '../../hooks/useCategory';
import Link from 'next/link'
import CategoriesAliasThree from './CategoriesAliasThree';

export default function CategoriesAliasTwo({alias, alias2, label}) {

	const [open, setOpen] = useState(false);

	const {categoriesByAlias} = useCategory();

	function generateStr(str) {
		return str[0].toUpperCase() + str.substring(1,)
	}

	if (categoriesByAlias(alias, alias2) == null) {
		return (
			<ListItem className="burgerList">
				<Link href={`/search/${alias2}`}><a className="burgerItem burgerLink">{label}</a></Link>
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
					{categoriesByAlias(alias, alias2)?.map((item, index) => {
						return <CategoriesAliasThree key={index} alias={alias} alias2={alias2} alias3={item.alias} label={generateStr(item.label)} />
					})}
				</List>
			</Collapse>
		</>
	)
}
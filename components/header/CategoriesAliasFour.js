import { ListItem } from '@material-ui/core';
import React from 'react';
import Link from 'next/link'

export default function CategoriesAliasFour({alias, label}) {

	return (
		<ListItem className="burgerList pl-2">
			<Link href={`/search/${alias}`}><a className="burgerItem burgerLink">{label}</a></Link>
		</ListItem>
	)
}
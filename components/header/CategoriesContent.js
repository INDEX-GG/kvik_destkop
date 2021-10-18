import React from 'react';
import List from '@material-ui/core/List';
import CategoriesAliasOne from './CategoriesAliasOne';
import { generateAliasStr } from '../../lib/services';

const CategoriesContent = ({ changeCategories, toggleDrawer, categoryMainAlias }) =>  {

	return (
		<List className="burgerContainer">
			{categoryMainAlias?.map((item, index) => {
				return (
					<div key={index}>
						<CategoriesAliasOne key={index + 1} label={generateAliasStr(item.label)} alias={item.alias} iconId={index} placeOffer={changeCategories}  toggleDrawer={toggleDrawer}/>
					</div>
				)
			})}
		</List>
	)
}

export default CategoriesContent;
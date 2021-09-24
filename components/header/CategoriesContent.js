import React from 'react';
import List from '@material-ui/core/List';
import CategoriesAliasOne from './CategoriesAliasOne';

const CategoriesContent = ({ changeCategories, toggleDrawer, categoryMainAlias }) =>  {

	function generateStr(str) {
		return str[0].toUpperCase() + str.substring(1,)
	}



	return (
		<List className="burgerContainer">
			{categoryMainAlias?.map((item, index) => {
				return (
					<div key={index}>
						<CategoriesAliasOne key={index + 1} label={generateStr(item.label)} alias={item.alias} iconId={index} placeOffer={changeCategories}  toggleDrawer={toggleDrawer}/>
					</div>
				)
			})}
		</List>
	)
}

export default CategoriesContent;
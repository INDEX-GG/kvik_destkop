import React from 'react';
import List from '@material-ui/core/List';
import CategoriesAliasOne from './CategoriesAliasOne';

const CategoriesContent = ({ changeCategories, categoryMainAlias }) =>  {

    const changePlaceOfferCategories = (string) => {
        if (string) {
            changeCategories(string)
        }
    }


	return (
		<List className="burgerContainer">
			{categoryMainAlias?.map((item, index) => {
				return (
					<div key={index}>
						<CategoriesAliasOne
                            key={index + 1}
                            label={item.name}
                            alias={item.alias}
                            iconId={index}
                            categoryAlias={categoryMainAlias}
                            changeCategories={changePlaceOfferCategories}
                        />
					</div>
				)
			})}
		</List>
	)
}

export default CategoriesContent;
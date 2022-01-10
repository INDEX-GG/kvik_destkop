import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, {useMemo, useState} from 'react';
import BurgerAnimal from '../../UI/icons/BurgerAnimal';
import BurgerAuto from '../../UI/icons/BurgerAuto';
import BurgerBusiness from '../../UI/icons/BurgerBusiness';
import BurgerElectronic from '../../UI/icons/BurgerElectronic';
import BurgerHobby from '../../UI/icons/BurgerHobby';
import BurgerHome from '../../UI/icons/BurgerHome';
import BurgerRealEstate from '../../UI/icons/BurgerRealEstate';
import BurgerServices from '../../UI/icons/BurgerServices';
import BurgerThing from '../../UI/icons/BurgerThing';
import BurgerWork from '../../UI/icons/BurgerWork';
import CategoriesAliasTwo from './CategoriesAliasTwo';
import {searchItemInArray} from "#components/placeOffer/newPlaceOffer/AdditionalServices";


const generateListItem = (array, alias, changeCategories) => {
    return (
        Array.isArray(array) ? (
            array.map((item, index) => {
                if (!item?.children?.length) {
                    return (
                        <ListItem className="burgerList" key={item.alias}>
                            <ListItemText>
                                <div
                                    onClick={() => changeCategories(`${alias},${item.alias}`)}
                                    className="burgerItem burgerLink">
                                    {item.name}
                                </div>
                            </ListItemText>
                        </ListItem>
                    )
                }

                return (
                    <CategoriesAliasTwo
                        key={index}
                        alias={`${alias},${item.alias}`}
                        label={item.name}
                        currentAlias={item?.children}
                        changeCategories={changeCategories}
                    />
                )
            })
        ) : null
    )
}




const CategoriesAliasOne = ({iconId, label, alias, categoryAlias, changeCategories}) => {

    const [open, setOpen] = useState(false)

    const aliasIcon = [
		<BurgerRealEstate key={0} />,
		<BurgerAuto key={1} />,
		<BurgerElectronic key={3} />,
        <BurgerHome key={4} />,
        <BurgerWork key={2} />,
        <BurgerAnimal key={5} />,
        <BurgerServices key={9} />,
        <BurgerThing key={6} />,
		<BurgerBusiness key={7} />,
		<BurgerHobby key={8} />,
	];

    const categories = useMemo(() => {
        if (categoryAlias && alias) {
            return searchItemInArray(categoryAlias, alias, 'alias')?.children
        }
        return  []
    } ,[categoryAlias, alias])


	return (
		<>
			<ListItem style={{ backgroundColor: open ? "#E9E9E9" : "#fff" }} className="burgerList" button onClick={() => setOpen(!open)}>
				<ListItemIcon>
					{aliasIcon[iconId]}
				</ListItemIcon>
				<ListItemText className="burgerItem" primary={label} />
			</ListItem>
			<Collapse in={open}>
				<List component="div" disablePadding>
                    {generateListItem(categories, alias, changeCategories)}
				</List>
			</Collapse>
		</>
		
	)
}

export default CategoriesAliasOne;
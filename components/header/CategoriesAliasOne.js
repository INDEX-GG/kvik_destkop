import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';
import { useCategory } from '../../hooks/useCategory';
import { generateAliasStr } from '../../lib/services';
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


const CategoriesAliasOne = ({iconId, label, alias, placeOffer, toggleDrawer}) => {

	const aliasIcon = [
		<BurgerRealEstate key={0} />,
		<BurgerRealEstate key={1} />,
		<BurgerAuto key={2} />,
		<BurgerWork key={3} />,
		<BurgerElectronic key={4} />,
		<BurgerHome key={5} />,
		<BurgerAnimal key={6} />,
		<BurgerThing key={7} />,
		<BurgerBusiness key={8} />,
		<BurgerHobby key={9} />,
		<BurgerServices key={10} />
	];

	const [open, setOpen] = useState(false)

	const {categoriesByAlias} = useCategory();
	
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
				{categoriesByAlias(alias).map((item, index) => {
					return <CategoriesAliasTwo key={index} alias={alias} alias2={item.alias} label={generateAliasStr(item.label)} placeOffer={placeOffer} toggleDrawer={toggleDrawer}/>
				})}
				</List>
			</Collapse>
		</>
		
	)
}

export default CategoriesAliasOne;
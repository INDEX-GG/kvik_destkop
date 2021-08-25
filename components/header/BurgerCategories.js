import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MobileMenu from '../../UI/icons/MobileMenu';
import CategoriesContent from './CategoriesContent';

const useStyles = makeStyles({
	list: {
		width: "384px"
	},
	fullList: {
		width: 'auto',
	},
	container: {
		alignSelf: "flex-end"
	}
});

export default function BurgerCategories() {
	const classes = useStyles();
	const [state, setState] = useState({ left: false });


	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({[anchor]: open });
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role="presentation"
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<div className="burgerTitle" onClick={toggleDrawer("left", false)}>Категории</div>
			<Divider />
			<CategoriesContent toggleDrawer={() => toggleDrawer("left", false)} />
		</div>
	);

	return (
		<div className={classes.container}>
			<React.Fragment key={"left"}>
				<button style={{ backgroundColor: "#00A0AB", width: "32px", height: "32px", borderRadius: "4px" }} onClick={toggleDrawer("left", true)}><MobileMenu /></button>
				<Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
					{list("left")}
				</Drawer>
			</React.Fragment>
		</div>
	);
}

import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, Divider, Drawer } from '@material-ui/core';
import MobileMenu from '../../UI/icons/MobileMenu';
import CategoriesContent from './CategoriesContent';
import { useCategory } from '../../hooks/useCategory';

const useStyles = makeStyles((theme) => ({
	list: {
		width: "384px",
		[theme.breakpoints.down(375)]: {
			width: '330px'
		}
	},
	fullList: {
		width: 'auto',
	},
	container: {
		alignSelf: "flex-end",
		height: '32px',
		[theme.breakpoints.down("1024")]: {
			marginBottom: '5px',
		}
	},
	button: {
		backgroundColor: "#00A0AB", 
		width: "32px", 
		height: "32px", 
		borderRadius: "4px"
	}
}));

export default function BurgerCategories() {
	const classes = useStyles();
	const { categoryMainAlias } = useCategory()
	// eslint-disable-next-line no-unused-vars
	const [state, setState] = useState({ left: false });


	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ [anchor]: open });
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role="presentation"
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<div className='burgerBox'>
				<div className="burgerTitle">Категории</div>
				<div className="burgerIcon" onClick={toggleDrawer("left", false)}></div>
			</div>
			<Divider />
			<CategoriesContent toggleDrawer={setState} categoryMainAlias={categoryMainAlias} />
		</div>
	);

	return (
		<div className={classes.container}>
			<React.Fragment key={"left"}>
				<button className={classes.button} onClick={toggleDrawer("left", true)}><MobileMenu /></button>
				<Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
					{list("left")}
				</Drawer>
			</React.Fragment>
		</div>
	);
}

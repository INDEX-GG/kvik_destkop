import { ListItem, ListItemText } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles(() => ({
	accountItem: {
		paddingLeft: "33px",
		"& > span": {
			fontSize: "14px",
			fontWeight: "500"
		}
	},
	accountItemActive: {
		"& > span": {
			color: "#00A0AB",
		}
	},
	accountItemHover: {
		color: '#00A0AB'
	}

}))


export default function AccountContent({id, icon, title, setState}) {
	const classes = useStyles();
	const router = useRouter();
	const [hover, setHover] = useState(false);
	const [active, setActive] = useState(0);

	useEffect(() => {
		if (router.query) setActive(+router.query?.account)
	}, [router])

	const handlerClick = () => {
		setState({ right: false })
		router.push({
			pathname: `/account/${id}`,
			query: {
				account: `${id}`
			},
		})
	}

	const handlerMouse = (boolean) => {
		setHover(boolean)
	}

	return (
		<ListItem
		onClick={handlerClick}
		onMouseEnter={() => handlerMouse(true)}
		onMouseLeave={() => handlerMouse(false)}
		button 
		className="burgerList">
			<ListItemText
				style={{ height: "30px", display: "flex", alignItems: "center", }}
				className={`${id == active || hover ? icon + "Active" : icon} 
				${id == active ? `${classes.accountItem} ${classes.accountItemActive}` : classes.accountItem} 
				${id == active ? classes.activeItem : ''}
				${hover ? classes.accountItemHover : ''}`} 
				primary={title} />
		</ListItem>
	)
}
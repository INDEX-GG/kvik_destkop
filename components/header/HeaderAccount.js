import React from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { makeStyles, Button, List, ListItem, ListItemText, Divider, Avatar, Dialog, DialogTitle } from "@material-ui/core";
import { useState } from 'react';
import { mutate } from "swr";
import { initials, stringToColor } from '../../lib/services';
import { useAuth } from '../../lib/Context/AuthCTX';
import { useRouter } from 'next/router';
import { useMedia } from '../../hooks/useMedia';
import AccountContent from './AccountContent';
import MobileMenu from '../../UI/icons/MobileMenu';

const useStyles = makeStyles((theme) => ({
	list: {
	},
	accountBox: {
		position: "relative",
		display: "flex",
		flexFlow: "row nowrap",
		alignItems: "center",
		gap: "1em"
	},
	button: {
		backgroundColor: "#00A0AB",
		width: "32px",
		height: "32px",
		borderRadius: "4px",
		cursor: "pointer"
	},
	accountTitle: {
		position: "absolute",
		left: "50%",
		width: "200px",
		color: "#2C2C2C",
		fontWeight: "500",
		fontSize: "22px",
		textAlign: "center",
		transform: "translateX(-50%)"
	},
	fullList: {
		width: 'auto',
	},
	avatar: {
		width: "32px",
		height: "32px",
		alignSelf: "flex-end",
		[theme.breakpoints.down("1024")]: {
			marginBottom: '5px',
		},
	},
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

	accountIcon: {
		cursor: 'pointer',
		"&::before": {
			content: "''",
			backgroundColor: "#C7C7C7",
			borderRadius: "10px",
			width: "18px",
			height: "3px",
			position: "absolute",
			top: "8px",
			left: "0px",
			transform: "rotate(45deg)"
		},
		"&::after": {
			content: "''",
			backgroundColor: "#C7C7C7",
			borderRadius: "10px",
			width: "18px",
			height: "3px",
			position: "absolute",
			top: "8px",
			left: "0px",
			transform: "rotate(-45deg)"
		}
	},
	logout: {
		marginLeft: "10px"
	},

}));

/**
 * @param {object} props
 * @param {(arg: boolean) => void} props.changeAccPage
 * @param {API.User} props.userInfo
 * @param {string} props.userPhoto
 * @param {string} props.name
 */
export default function HeaderAccount({ changeAccPage, userInfo, userPhoto, name }) {
	const router = useRouter()
	const classes = useStyles();
	const [state, setState] = useState({
		left: false,
	});
	const [logout, setLogout] = useState(false);
	const { signOut, id } = useAuth();

	const { matchesMobile, matchesTablet, matchesCustom1024, matchesCustom1080 } = useMedia();
	const isMatchingAThreshold = matchesMobile || matchesTablet || matchesCustom1024 || matchesCustom1080;
	const isAccountPage = router.pathname === "/account/[id]";
	const avatarProps = { userInfo, isMatchingAThreshold, isAccountPage }

	const menuItems = [
		{ id: 1, name: "menuOffers", title: "Объявления" },
		{ id: 2, name: "menuDeals", title: "Сделки" },
		{ id: 3, name: "menuWallet", title: "Кошелек" },
		{ id: 4, name: "menuFavorites", title: "Избранное" },
		{ id: 5, name: "menuNotifications", title: "Уведомления" },
		{ id: 6, name: "menuCompare", title: "Сравнить" },
		{ id: 7, name: "menuReviews", title: "Отзывы" },
		{ id: 8, name: "menuSettings", title: "Настройки" },
	];

	/**
	 * @param {string} anchor 
	 * @param {boolean} open 
	 * @returns {(event: KeyboardEvent) => void}
	 */
	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const logOut = () => {
		axios.get("/api/logout").then(() => {
			mutate("/api/user");
			signOut();
			router.push("/");
		});
	};

	// const avatar = () => {}

	/**
	 * @param {string} anchor 
	 */
	const list = (anchor) => (
		<>
			<div
				className={clsx(classes.list, {
					[classes.fullList]: anchor === 'top' || anchor === 'bottom',
				})}
				role="presentation"
				onKeyDown={toggleDrawer(anchor, false)}
			>
				<List className="burgerContainer burgerAccount">
					<div className={classes.accountBox}>
						<button
							className={classes.button}
							onClick={() => { changeAccPage(false) }}
						>
							<MobileMenu />
						</button>
						<p className={classes.accountTitle}>Личный кабинет</p>
					</div>
					{menuItems.map(item => (
						<AccountContent
							key={item.id}
							id={item.id}
							icon={item.name}
							title={item.title}
							setState={setState}
						/>
					))}
				</List>
				<Divider />
				<ListItem
					button
					id={"10"}
					className="burgerList"
					onClick={() => setLogout(!logout)}
				>
					<ListItemText
						className={`${classes.accountItem} ${classes.logout} menuLogoff`}
						primary={"Выход"}
					/>
				</ListItem>
			</div>
			<Dialog open={logout || false} onClose={() => setLogout(!logout)} fullWidth maxWidth="xs">
				<DialogTitle className="accountLogout">Вы уверены, что хотите выйти?</DialogTitle>
				<div className="accountLogoutBtnBox">
					<Button
						variant="text"
						color="primary"
						style={{ textTransform: "uppercase" }}
						onClick={() => setLogout(!logout)}
					>
						Отмена
					</Button>
					<Button
						onClick={() => logOut()}
						className="accountLogoutYes"
						style={{ color: "red", textTransform: "uppercase" }}
					>
						Выйти
					</Button>
				</div>
			</Dialog>
		</>
	);

	if (isAccountPage) {
		if (isMatchingAThreshold) {
			return (
				<>
					<AccountAvatar {...avatarProps} />
					{list("left")}
				</>
			)
		} else {
			return (
				<AccountAvatar {...avatarProps} />
			)
		}

	}

	if (isMatchingAThreshold) {
		return (<>
			<Avatar
				className={classes.avatar}
				src={userPhoto}
				style={{ backgroundColor: `${stringToColor(name)}`, cursor: "pointer" }}
				onClick={toggleDrawer("left", true)}
			>
				{initials(name)}
			</Avatar>
			{list("left")}
		</>)
	} else {
		return (
			<Avatar
				className={classes.avatar}
				src={userPhoto}
				style={{ backgroundColor: `${stringToColor(name)}`, cursor: "pointer" }}
				onClick={() => {
					toggleDrawer("left", true)
					router.push({
						pathname: `/account/${id}`,
						query: {
							account: "1",
							content: "1"
						}
					})
				}} >
				{initials(name)}
			</Avatar>)
	}
}

/**
 * @param {object} props
 * @param {API.User} props.userInfo
 * @param {boolean} props.isMatchingAThreshold
 * @param {boolean} props.isAccountPage
 */
function AccountAvatar({ userInfo, isMatchingAThreshold, isAccountPage }) {
	const classes = useStyles();
	const { name, userPhoto } = userInfo;
	if (isAccountPage) {
		if (isMatchingAThreshold) {
			return (
				<Avatar
					className={classes.avatar}
					src={userPhoto}
					style={{ backgroundColor: `${stringToColor(name)}`, cursor: "pointer" }}
				// onClick={toggleDrawer("left", true)}
				>
					{initials(name)}
				</Avatar>)
		} else {
			return (<Avatar
				className={classes.avatar}
				src={userPhoto}
				style={{ backgroundColor: `${stringToColor(name)}` }}
			>
				{initials(name)}
			</Avatar >)
		}
	} else {
		if (isMatchingAThreshold) {
			return (<Avatar
				className={classes.avatar}
				src={userPhoto}
				style={{ backgroundColor: `${stringToColor(name)}`, cursor: "pointer" }}
				onClick={toggleDrawer("left", true)}
			>
				{initials(name)}
			</Avatar>)
		} else {
			return (<Avatar
				className={classes.avatar}
				src={userPhoto}
				style={{ backgroundColor: `${stringToColor(name)}`, cursor: "pointer" }}
				onClick={() => {
					toggleDrawer("left", true)
					router.push({
						pathname: `/account/${id}`,
						query: {
							account: "1",
							content: "1"
						}
					})
				}} >
				{initials(name)}
			</Avatar>)
		}
	}
}

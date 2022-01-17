import React from 'react';
import clsx from 'clsx';
import axios from 'axios';
import NextLink from "next/link";
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
	accountBox: {
		position: "relative",
		display: "flex",
		flexFlow: "row nowrap",
		alignItems: "center",
		gap: "1em",
		// переписываю сассовское правило в `sass/components/burger.scss#.burger-list`
		padding: "0 8px 8px !important"
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
		transform: "translateX(-45%)"
	},
	fullList: {
		width: 'auto',
	},
	avatarWrapper: {
		display: "flex",
		flexFlow: "row nowrap",
		gap: "1em",
		alignItems: "center",
		padding: "0 8px"
	},
	avatar: {
		width: "34px",
		height: "34px",
		alignSelf: "flex-end",
		[theme.breakpoints.down("1024")]: {
			marginBottom: '5px',
		},
	},
	avatarName: {
		fontSize: "22px",
		fontWeight: "500",
		lineHeight: '26px',
	},
	list: {
		width: "176px",
		// переписываю сассовское правило в `sass/components/burger.scss#.burger-list`
		padding: "0 !important",
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
	logoutItem: {
		padding: "0.5em 0 !important"
	},
	logout: {
		marginLeft: "10px"
	},

}));

/**
 * @param {object} props
 * @param {API.User} props.userInfo
 * @param {boolean} props.isMatchingAThreshold
 * @param {boolean} props.isAccountPage
 * @param {(anchor: string, open: boolean) => void} props.toggleDrawer
 */
export const AccountAvatar = ({ userInfo, isMatchingAThreshold, isAccountPage, toggleDrawer }) => {
	const router = useRouter()
	const classes = useStyles();
	const { id: AccountID } = useAuth();
	const { name, userPhoto } = userInfo;

	/**
	 * @param {object} props 
	 * @param {string} [props.name]
	 */
	const AvatarWrapper = ({ name = undefined, children }) => {
		return (<div className={classes.avatarWrapper}>
			{children}
			<span className={classes.avatarName}>{name}</span>
		</div>)
	}

	if (isAccountPage) {
		if (isMatchingAThreshold) {
			return (
				<AvatarWrapper name={name}>
					<Avatar
						className={classes.avatar}
						src={userPhoto}
						style={{ backgroundColor: `${stringToColor(name)}`, cursor: "pointer" }}
						onClick={() =>{
								toggleDrawer("left", true)
								router.push({
									pathname: `/account/${AccountID}`,
									query: {
										account: "1",
										content: "1"
									}
								})
							}
						}
					>
						{initials(name)}
					</Avatar>
					
				</AvatarWrapper>
			)
		} else {
			return (
				<AvatarWrapper name={name}>
					<Avatar
						className={classes.avatar}
						src={userPhoto}
						style={{ backgroundColor: `${stringToColor(name)}` }}
					>
						{initials(name)}
					</Avatar>
				</AvatarWrapper>)
		}
	} else {
		if (isMatchingAThreshold) {
			return (
				<AvatarWrapper name={name}>
					<NextLink href={{
						pathname: "/account/[id]",
						query: { 
							id: AccountID, 
							account: "1",
							content: "1" 
						}
					}}>
						<Avatar
							className={classes.avatar}
							src={userPhoto}
							style={{ backgroundColor: `${stringToColor(name)}`, cursor: "pointer" }}
							onClick={toggleDrawer("left", true)}
						>
							{initials(name)}
						</Avatar>
					</NextLink >
				</AvatarWrapper>)
		} else {
			return (<AvatarWrapper name={name}>
				<Avatar
					className={classes.avatar}
					src={userPhoto}
					style={{ backgroundColor: `${stringToColor(name)}`, cursor: "pointer" }}
					onClick={() => {
						toggleDrawer("left", true)
						router.push({
							pathname: `/account/${AccountID}`,
							query: {
								account: "1",
								content: "1"
							}
						})
					}} >
					{initials(name)}
				</Avatar>
			</AvatarWrapper>)
		}
	}
}

/**
 * @param {object} props
 * @param {(arg: boolean) => void} props.changeAccPage
 * @param {API.User} props.userInfo
 * @param {string} props.userPhoto
 * @param {string} props.name
 */
export default function HeaderAccount({ changeAccPage, userInfo }) {
	const router = useRouter()
	const classes = useStyles();
	const [state, setState] = useState({
		left: false,
	});
	const [logout, setLogout] = useState(false);
	const { signOut } = useAuth();

	const { matchesMobile, matchesTablet, matchesCustom1024, matchesCustom1080 } = useMedia();
	const isMatchingAThreshold = matchesMobile || matchesTablet || matchesCustom1024 || matchesCustom1080;
	const isAccountPage = router.pathname === "/account/[id]";

	const menuItems = [
		{ id: 1, name: "menuOffers", title: "Объявления" },
		{ id: 2, name: "menuDeals", title: "Сделки" },
		{ id: 3, name: "menuWallet", title: "Кошелек" },
		{ id: 4, name: "menuFavorites", title: "Избранное" },
		{ id: 5, name: "menuNotifications", title: "Сообщения" },
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
	const avatarProps = { userInfo, isMatchingAThreshold, isAccountPage, toggleDrawer }

	const logOut = () => {
		axios.get("/api/logout").then(() => {
			mutate("/api/user");
			signOut();
			router.push("/");
		});
	};

	/**
	 * @param {string} anchor 
	 */
	const list = (anchor) => (
		<>
			<AccountAvatar {...avatarProps} />
			<div
				className={clsx(classes.list, {
					[classes.fullList]: anchor === 'top' || anchor === 'bottom',
				})}
				role="presentation"
				onKeyDown={toggleDrawer(anchor, false)}
			>
				<List className={`burgerContainer burgerAccount ${classes.itemList}`}>
					{menuItems.map(item => (
						<AccountContent
							key={item.id}
							id={item.id}
							icon={item.name}
							title={item.title}
							setState={setState}
							closeModal={changeAccPage}
						/>
					))}
				</List>
				<Divider />
				<ListItem
					button
					id={"10"}
					className={`burgerList ${classes.logoutItem}`}
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
			{list("left")}
		</>)
	} else {
		return (
			<AccountAvatar {...avatarProps} />
		)
	}
}


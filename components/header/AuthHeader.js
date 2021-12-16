import { useState } from 'react';
import { makeStyles, Avatar, Drawer } from "@material-ui/core";
// import BurgerCategories from "./BurgerCategories";
import HeaderAccount from "./HeaderAccount";
import MobileMenu from '../../UI/icons/MobileMenu';
// import Login from "../auth/Login";


const useStyles = makeStyles((theme) => ({
	block: {
	},
	modal: {
		width: "360px",
		height: "70%",
		padding: "1.5em 1em"
	},
	header: {
		position: "relative",
		display: "flex",
		alignItems: "center",
		gap: "1em"
	},
	title: {
		position: "absolute",
		left: "50%",
		fontWeight: "500",
		fontSize: "22px",
		lineHeight: "26px",
		transform: "translateX(-50%)"
	},
	button: {
		backgroundColor: "#00A0AB",
		width: "32px",
		height: "32px",
		borderRadius: "4px"
	},

	avatar: {
		width: "32px",
		height: "32px",
		alignSelf: "flex-end",
		[theme.breakpoints.down("1024")]: {
			marginBottom: '5px',
		},
	},
}))

/**
 * @param {object} props
 * @param {Boolean} props.isAuth
 * @param {() => void} props.setOpenLoginForm
 * @param {boolean} props.openLoginForm
 * @param {API.User} [props.userInfo]
 */
export const AuthHeader = ({ isAuth, setOpenLoginForm, openLoginForm, userInfo }) => {
	const classes = useStyles();
	const [modalState, setModalState] = useState({ left: false });

	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setModalState({ [anchor]: open });
	};

	if (!isAuth) {
		return (<div className={classes.block}>
			<button className={classes.button} onClick={toggleDrawer("left", true)}><MobileMenu /></button>
			<Drawer
				anchor="left"
				classes={{ paper: classes.modal }}
				open={modalState.left}
				onClose={toggleDrawer("left", false)}
			>
				<header className={classes.header}>
					<button className={classes.button} onClick={toggleDrawer("left", false)}><MobileMenu /></button>
					<p className={classes.title}>
						Регистрация
					</p>
				</header>
				
			</Drawer >
		</div>)
	}

	return (<div className={classes.block}>
		<button className={classes.button} onClick={toggleDrawer("left", true)}><MobileMenu /></button>
		<Drawer
			anchor="left"
			open={modalState.left}
			onClose={toggleDrawer("left", false)}
		>
			{/* <BurgerCategories /> */}
			{(userInfo !== undefined)
				? <HeaderAccount name={userInfo.name} userPhoto={userInfo.userPhoto} />
				: <Avatar onClick={() => setOpenLoginForm(!openLoginForm)} className={classes.avatar} />}

		</Drawer>
	</div>)
}
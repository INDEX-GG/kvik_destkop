import { useState } from 'react';
import { makeStyles, Avatar, Drawer } from "@material-ui/core";
// import BurgerCategories from "./BurgerCategories";
import HeaderAccount from "./HeaderAccount";
import MobileMenu from '../../UI/icons/MobileMenu';
import { LoginV2 } from "../auth/LoginV2";
import { RegFormV2 } from "../auth/RegFormV2";


const useStyles = makeStyles((theme) => ({
	block: {
		height: "100%"
	},
	modal: {
		width: "320px",
		height: "90%",
		padding: "1.5em 1em",
		[theme.breakpoints.down("480")]: {
			marginBottom: '5px',
		},
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
 * @param {[boolean, () => void]} props.logFormState
 * @param {[boolean, () => void]} props.regFormState
 * @param {boolean} props.openLoginForm
 * @param {API.User} [props.userInfo]
 */
export const AuthHeader = (
	{
		isAuth,
		logFormState: [openLoginForm, setOpenLoginForm],
		regFormState: [openRegForm, setOpenRegForm],
		userInfo
	}
) => {
	const classes = useStyles();
	const [modalState, setModalState] = useState({ left: false });
	const [isRegForm, changeAuthForm] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [isAccPage, changeAccPage] = useState(true);

	/**
	 * @param {string} anchor 
	 * @param {boolean} open 
	 */
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
				{
					isRegForm
						? (<>
							<header className={classes.header}>
								<button className={classes.button} onClick={toggleDrawer("left", false)}><MobileMenu /></button>
								<p className={classes.title}>
									Регистрация
								</p>
							</header>
							<RegFormV2
								regFormState={[openRegForm, setOpenRegForm]}
								changeAuthForm={changeAuthForm}
							/>
						</>)
						: (<>
							<header className={classes.header}>
								<button className={classes.button} onClick={toggleDrawer("left", false)}><MobileMenu /></button>
								<p className={classes.title}>
									Вход
								</p>
							</header>
							<LoginV2
								loginFormState={[openLoginForm, setOpenLoginForm]}
								changeAuthForm={changeAuthForm}
							/>
						</>)
				}
			</Drawer >
		</div>)
	}

	return (
		<div className={classes.block}>
			<button className={classes.button} onClick={toggleDrawer("left", true)}><MobileMenu /></button>
			<Drawer
				anchor="left"
				classes={{ paper: classes.modal }}
				open={modalState.left}
				onClose={toggleDrawer("left", false)}
			>
				{/* <BurgerCategories /> */}
				{userInfo !== undefined
					? (<HeaderAccount
						changeAccPage={toggleDrawer("left", false)}
						userInfo={userInfo}
						name={userInfo.name}
						userPhoto={userInfo.userPhoto}
					/>)
				: (<Avatar
					className={classes.avatar}
					onClick={() => {
						changeAuthForm(true)
						changeAccPage(false)
					}}
				/>)
				}
			</Drawer>
		</div>
	)
}
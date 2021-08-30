import { AppBar, Avatar, Button, Container, makeStyles } from "@material-ui/core";
import Logo from "./Logo";
import Search from "./Search";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import MobileFilter from "../../UI/icons/MobileFilter";
import { useAuth } from "../../lib/Context/AuthCTX";
import { useRouter } from "next/router";
import { DialogCTX } from "../../lib/Context/DialogCTX";
import { useState } from "react";
import { useMedia } from "../../hooks/useMedia"
import Login from "../auth/Login";
import BurgerCategories from "./BurgerCategories";
import HeaderAccount from "./HeaderAccount";
import { useStore } from "../../lib/Context/Store";

const useStyles = makeStyles((theme) => ({
	container: {
		flexDirection: "column",
		padding: "0 12px",
	},
	info: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		margin: "4px 0 12px"
	},
	menu: {
		width: "32px",
		heighth: "32px",
		borderRadius: "4px",
		backgroundColor: "#00A0AB",
		display: "flex",
		alignItems: "center",
	},
	logo: {
		width: "100px",
		height: "53px",
	},
	avatar: {
		width: "32px",
		height: "32px",
		alignSelf: "flex-end",
		[theme.breakpoints.down("1024")]: {
			marginBottom: '5px',
		},
	},
	block2: {
		display: "flex",
		marginBottom: "19px",
	},
	changeMenu: {
		marginLeft: "24px",
		position: "relative",
	},
	filter: {
		display: "none",
		transition: "0.2s all linear",
	},
	test: {
		marginBottom: "124px",
	},
}));

function HeaderMobile({ chageMenu = false }) {
	const { isAuth } = useAuth()
	const {userInfo} = useStore();
	const classes = useStyles();
	const [openRegForm, setOpenRegForm] = useState(false);
	const [openLoginForm, setOpenLoginForm] = useState(false);
	const Router = useRouter()
	const { matchesMobile, matchesCustom1024 } = useMedia()

	return (
		<>
			<AppBar position="fixed" color="secondary">
				<Container className={classes.container}>
					<div className={classes.info}>
						<BurgerCategories className={classes.categories} />
						<Logo className={classes.logo} />
						{(isAuth && userInfo !==undefined) ?
							<HeaderAccount name={userInfo.name} userPhoto={userInfo.userPhoto} /> :
							<Avatar onClick={() => setOpenLoginForm(!openLoginForm)} className={classes.avatar} />}
					</div>
					<div className={classes.block2}>
						<Search text={matchesMobile ? "Поиск" : false} />
						{isAuth ?
							(chageMenu ? (
								<Button className={classes.changeMenu} onClick={() => Router.push("/placeOffer")} variant="contained" color="primary">
									<AddRoundedIcon />
									Подать объявление
								</Button>
							) : (
								<div className={classes.changeMenu}>
									<MobileFilter className={classes.filter} number={10} />
								</div>
							)) : null}
					</div>
				</Container>
				<DialogCTX.Provider value={{ openRegForm, setOpenRegForm, openLoginForm, setOpenLoginForm }}>
					<Login />
				</DialogCTX.Provider>
			</AppBar>
			<div style={{ marginBottom: matchesCustom1024 ? "25px" : "124px" }} className={classes.test}></div>
		</>
	);
}
export default HeaderMobile;
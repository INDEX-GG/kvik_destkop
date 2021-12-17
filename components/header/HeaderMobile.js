import { AppBar, Button, Container, makeStyles, useScrollTrigger, Slide} from "@material-ui/core";
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
import { AuthHeader } from "./AuthHeader";
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
		margin: "4px 0 0"
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
	filler: {
		width: "32px",
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
		margin: "12px 0 19px",
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
	/**
	 * @type {{userInfo: API.User}}
	 */
	const {userInfo} = useStore();
	const classes = useStyles();
	const [openRegForm, setOpenRegForm] = useState(false);
	const [openLoginForm, setOpenLoginForm] = useState(false);
	const Router = useRouter()
	const { matchesMobile, matchesCustom1024 } = useMedia()
	
	function HideOnScroll(props) {
		const { children, window } = props;
		const trigger = useScrollTrigger({
		  target: window ? window() : undefined,
		});
		return (
		  <Slide appear={false} direction="down" in={!trigger}  style={trigger ? {display: "none"} : {display: "flex"}}>
			{children}
		  </Slide>
		);
	}

	return (
			<>
				<AppBar position="fixed" color="secondary">
					<Container className={classes.container}>
						<HideOnScroll>
							<div className={classes.info}>
								<AuthHeader 
									isAuth={isAuth} 
									logFormState={[openLoginForm, setOpenLoginForm]}
									regFormState={[openRegForm, setOpenRegForm]}
									userInfo={userInfo} 
								/>
								<Logo className={classes.logo} />
								<div className={classes.filler}></div>
							</div>
						</HideOnScroll>
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
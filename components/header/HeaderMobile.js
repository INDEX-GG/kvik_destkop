import {AppBar, Button, Container, makeStyles, useScrollTrigger, Slide} from "@material-ui/core";
import Logo from "./Logo";
import Search from "./Search";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import MobileFilter from "../../UI/icons/MobileFilter";
import { useAuth } from "../../lib/Context/AuthCTX";
import { useRouter } from "next/router";
import { DialogCTX } from "../../lib/Context/DialogCTX";
import {useEffect, useState, useContext} from "react";
import { useMedia } from "../../hooks/useMedia"
import Login from "../auth/Login";
import { AuthHeader } from "./AuthHeader";
import { useStore } from "../../lib/Context/Store";
import MobileModal from "#components/MobileModal";
import {LoginDrawerCTX} from '../../lib/Context/DialogCTX.js'
import FilterMobile from "#components/newFilter/filterMobile/FilterMobile";

const useStyles = makeStyles((theme) => ({
	container: {
		flexDirection: "column",
		padding: "0 12px",
	},
	info: {
		display: "flex",
		justifyContent: "center",
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
		position: 'relative',
		display: "flex",
		alignItems: 'center',
		// margin: "12px 0 19px",
		marginTop: '12px',
		paddingBottom: '12px'
	},
	changeMenu: {
		right: '5px',
		marginLeft: '24px',
		top: '0.5px'
	},
	// filter: {
	// 	display: "none",
	// 	transition: "0.2s all linear",
	// },
	test: {
		marginBottom: "124px",
	},

	['@media screen and (max-width: 599px)']: {
		changeMenu: {
			position: 'absolute',
		},
	},
    tabletFilter: {
        display: 'none',
        [theme.breakpoints.down(960)]: {
            display: 'block',
            position: 'absolute',
            // right: '225px',
			right: '10px',
            top: '0px',
        },
        [theme.breakpoints.down(600)]: {
            display: 'none'
        }
    }
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
    const [dialogFilter, setDialogFilter] = useState(false);
    const router = useRouter();

	const Router = useRouter()
	const { matchesMobile, matchesCustom1024 } = useMedia()
	const {
		setModalState
	} = useContext(LoginDrawerCTX)

	function HideOnScroll(props) {
		const { children, window } = props;
		const trigger = useScrollTrigger({
		  target: window ? window() : undefined,
		  disableHysteresis: true,
  		  threshold: 0,
		});
		return (
		  <Slide appear={false} direction="down" in={!trigger}  style={trigger ? {display: "none"} : {display: "flex"}}>
			{children}
		  </Slide>
		);
	}

    useEffect(() => {
        setDialogFilter(false)
    }, [router])

		const handlerAddOffer = () => {
			if(isAuth) {
				Router.push("/placeOffer")
			} else {
				setModalState({ left: true });
			}
		}

		console.log('chageMenu: ', chageMenu)

	return (
			<>
				<AppBar position="fixed" color="secondary">
					<Container className={classes.container}>
						<HideOnScroll>
							<div className={classes.info}>
								{/* <AuthHeader
									isAuth={isAuth}
									logFormState={[openLoginForm, setOpenLoginForm]}
									regFormState={[openRegForm, setOpenRegForm]}
									userInfo={userInfo}
								/> */}
								<Logo className={classes.logo} />
								{/* <div className={classes.filler}></div> */}
							</div>
						</HideOnScroll>
						<div className={classes.block2}>
							<AuthHeader
								isAuth={isAuth}
								logFormState={[openLoginForm, setOpenLoginForm]}
								regFormState={[openRegForm, setOpenRegForm]}
								userInfo={userInfo}
							/>
							<Search text={matchesMobile ? "Поиск" : false}>
								<div className={classes.tabletFilter} onClick={() => setDialogFilter(true)}>
										<MobileFilter number={0} />
								</div>
							</Search>
							<div className={classes.tabletFilter} onClick={() => setDialogFilter(true)}>
									<MobileFilter number={0} />
							</div>
							{/* отрисовка фильтров для поска в мобильной версии. Тут не нужно будет рендерится внутри инпута поиса */}
							{chageMenu ? (
								<Button className={classes.changeMenu} onClick={handlerAddOffer} variant="contained" color="primary">
									<AddRoundedIcon />
									Подать объявление
								</Button>
							) : (
								<div className={classes.changeMenu} onClick={() => setDialogFilter(true)}>
									<MobileFilter className={classes.filter} number={0} />
								</div>
							)}
							{/* отрисовка фильтров для поска в мобильной версии. Тут не нужно будет рендерится внутри инпута поиса */}
						</div>
					</Container>
					<DialogCTX.Provider value={{ openRegForm, setOpenRegForm, openLoginForm, setOpenLoginForm }}>
						<Login />
					</DialogCTX.Provider>
                    <MobileModal
                        title='Фильтры'
                        dialog={dialogFilter}
                        close={() => setDialogFilter(false)}
                    >
                        <FilterMobile/>
                    </MobileModal>
				</AppBar>
				<div style={{ marginBottom: matchesCustom1024 ? "124px" : "124px" }} className={classes.test}></div>
			</>

	);
}
export default HeaderMobile;

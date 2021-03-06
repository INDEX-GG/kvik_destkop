import { useState, useEffect } from "react";
import NextLink from "next/link";
import { AppBar, Button, Container, Box, makeStyles, Avatar } from "@material-ui/core";
import UpPanel from "./UpPanel";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Logo from "./Logo";
import Categories from "./Categories";
import CategoriesMobile from "./CategoriesMobile";
import { useMedia } from "../../hooks/useMedia";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DialogCTX } from "../../lib/Context/DialogCTX";
import Search from "./Search";
import Login from "../auth/Login";
import { useAuth } from "../../lib/Context/AuthCTX";
import { useStore } from "../../lib/Context/Store";
import {Skeleton} from "@mui/material";
import { initials, stringToColor } from "../../lib/services";
import { useCustomRouter } from "src/hook/globalHooks/useCustomRouter";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    justifyContent: "space-between",
    padding: "9px 12px 25px 12px",
    display: 'flex',
    alignItems: "flex-end",
    background: "#FFFFFF",
    "&>*": {
      margin: "0 12px",
    },
    "&>*:first-child": {
      marginLeft: 0,
    },
    "&>*:last-child": {
      marginRight: 0,
    },
  },
  header: {
    boxShadow: theme.shadows[0],
  },
  shadow: {
    boxShadow: "0px 9px 14px 0px rgb(0 0 0 / 12%)",
  },
  logo: {
    borderRadius: theme.shape.borderRadius,
    padding: "8px 8px 0px 8px",
  },
  avatar: {
    cursor: "pointer",
    width: "32px",
    height: "32px",
  },
  input: {
    position: "relative",
    flexGrow: 1,
  },
  icon: {
    position: "absolute",
    right: "14px",
    height: "100%",
  },
  categories__back: {
    width: '100%',
    minHeight: '110vh',
    position: 'absolute',
    left: '0px',
    top: '0px',
    zIndex: '0',
  },
  menu__categorys: {
    minWidth: "123px",
    justifyContent: "space-between",
    '& span': {
      gap: '15px',
    }
  }
}));

const Header = () => {
  const {isAuth, id: accountID} = useAuth();

  const {userInfo} = useStore();
  const classes = useStyles();
	const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD, matchesCustom1024 } = useMedia();
  const [openCat, setCategories] = useState();
  const [openRegForm, setOpenRegForm] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [headerScroll, setHeaderScroll] = useState(classes.header);
const [isAlreadyExistForm, setIsAlreadyExistForm] = useState(false)

  const listenScroll = () => {
    if (scrollY > 0) {
      setHeaderScroll(classes.shadow);
    } else {
      setHeaderScroll(classes.header);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", listenScroll);
    return () => document.removeEventListener("scroll", listenScroll);
  }, []);

  const {pushTo} = useCustomRouter();

  const handleCreate = () => {
    if (!isAuth) {
      setOpenLoginForm(true)
      return;
    }
    pushTo("/placeOffer")
  }
  
 

  return (
    <>
			{!matchesCustom1024 && <>
				<UpPanel />
				<AppBar className={headerScroll} position="sticky" color="secondary">
					<Container className={classes.root}>
						<Logo />
						<Button
							className={classes.menu__categorys}
							variant="contained"
							color="primary"
							aria-controls="simple-menu"
							aria-haspopup="true"
							onClick={() => setCategories(!openCat)}
						>
							??????????????????
							<ExpandMoreIcon />
						</Button>
						<Search />


						<Button onClick={handleCreate} variant="contained" color="primary">
							<AddRoundedIcon />
						?????????? ????????????????????
						</Button>

						{!isAuth && <Button onClick={() => setOpenLoginForm(!openLoginForm)} variant="contained">
							??????????
						</Button>
							|| (userInfo === undefined) && (<Skeleton variant="circular" width={32} height={32} /> )
							|| (userInfo !== undefined) && (
								<NextLink href={{
									pathname: "/account/[id]",
									query: {
                    id: accountID,
                    account: "1",
										content: "1"
                   }
								}}>
                  <Avatar
										className={classes.avatar}
										src={userInfo.userPhoto}
										style={{ backgroundColor: `${stringToColor(userInfo.name)}`, cursor: "pointer" }}
									>
										{initials(userInfo.name)}
									</Avatar>

								</NextLink>
							)
						}
					</Container>
					{openCat && !matchesMobile && !matchesTablet && <Box onClick={() => setCategories(!openCat)} className={classes.categories__back} ><Categories /></Box>}
					{openCat && !matchesLaptop && !matchesDesktop && !matchesHD && <CategoriesMobile />}
				</AppBar>
			</>
			}
      <DialogCTX.Provider value={{ openRegForm, setOpenRegForm, openLoginForm, setOpenLoginForm, isAlreadyExistForm, setIsAlreadyExistForm }}>
        <Login />
      </DialogCTX.Provider>
    </>
  );
};

export default Header;

import React, {useState, useEffect, useRef, useMemo} from "react";
import MetaLayout from "../../layout/MetaLayout";
import StarRating from "../../components/StarRating";
import Offers from "../../components/account/Offers/Offers";
import Deals from "../../components/account/Deals/Deals";
import Wallet from "../../components/account/Wallet/Wallet";
import Favorites from "../../components/account/Favorites/Favorites";
import Notifications from "../../components/account/Notifications/Notifications";
import Compare from "../../components/account/Compare/Compare";
import Reviews from "../../components/account/Reviews/Reviews";
import Settings from "../../components/account/Settings/Settings";
import UserPicUpload from "../../components/UserPicUpload";
import {initials, stringToColor, ToRusAccountDate} from "../../lib/services";
// import {ModalRating, ModalSubscription} from "../../components/Modals";
import {Avatar, Box, Button, Dialog, DialogTitle, makeStyles} from "@material-ui/core";
import axios from "axios";
import {useRouter} from "next/router";
import {mutate} from "swr";
import {useMedia} from "../../hooks/useMedia";
import {useAuth} from "../../lib/Context/AuthCTX";
import OfferAccountProvider from "../../lib/Context/OfferAccountCTX";
import {useStore} from "../../lib/Context/Store";
import AccountPlaceHolder from "../../components/placeHolders/AccountPlaceHolder/AccountPlaceHolder";
import {Grid, Skeleton, Tooltip} from "@mui/material";
import {MenuItem} from "../../components/placeHolders/AccountCardPlaceHolder/AccountCardPlaceHolder";
// import {getTokenDataByPost} from "../../lib/fetch";
import ScrollTop from '../../UI/ScrollTop';
import {useStatistics} from '../../lib/Context/StatisticsCTX'
import clsx from 'clsx'
import MobileModal from "../../components/MobileModal"

const menuItems = [
    {id: 1, name: "menuOffers", title: "Мои объявления"},
    {id: 2, name: "menuDeals", title: "Сделки"},
    {id: 3, name: "menuWallet", title: "Кошелек"},
    {id: 4, name: "menuFavorites", title: "Избранное"},
    {id: 5, name: "menuNotifications", title: "Сообщения"},
    {id: 6, name: "menuCompare", title: "Сравнить"},
    {id: 7, name: "menuReviews", title: "Отзывы"},
    {id: 8, name: "menuSettings", title: "Настройки"},
];

const menuItemsIcon = ["menuOffers", "menuDeals", "menuWallet", "menuFavorites", "menuNotifications", "menuCompare", "menuReviews", "menuSettings"]
const menuItemsTitle = ["Мои объявления", "Сделки", "Кошелек", "Избранное", "Сообщения", "Сравнить", "Отзывы", "Настройки"]


const useStyles = makeStyles(() => ({
    tooltip: {
        border: "#8F8F8F solid 1px",
        background: "#FFFFFF",
        color: "#5A5A5A",
        fontSize: "12px",
        textAlign: 'center',
        maxWidth: '190px',
    },
    arrow: {
        color: '#FFFFFF',
        "&:before": {
            content: '""',
            border: "#8F8F8F solid 1px",
        }
    },
    userStats: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "none",
        color: "#5a5a5a",
        transition: "all 200ms ease-in-out",
        cursor: "pointer",
        '&:hover': {
            // transition: 'all 200ms ease-in-out',
            // color: '#52B9C5FF',
            textDecoration: "none",
        },

    },
    highlight: {
        color: "#00a0ab",
        '& button': {
            color: "#00a0ab",
        }
    },
    buttonDesc: {
        fontSize: "11px",
    }
}));

const Account = () => {
    const classes = useStyles();
    const router = useRouter();
    const {userInfo} = useStore();
    // const {subscriptions_count} = userInfo
    const countRender = useRef(0)
    const [content, setContent] = useState(0)
    const [openPicUpload, setPicUpload] = useState(false);
    const [subscribersCount, setSubscibersCount] = useState(0)
    const [subscriptionsCount, setSubscriptionsCount] = useState(0)
    // const [subList, setSubList] = useState([])
    // const [subscribersList, setSubscribersList] = useState([])
    const [logout, setLogout] = useState(false);
    const [reviewsModal, setReviewsModal] = useState(false);
    // const [subscriptionsModal, setSubscriptionsModal] = useState(false);
    const {signOut, id, token} = useAuth();
    const {matchesMobile, matchesTablet, matchesCustom1024, matchesLowHD} = useMedia()
    const [isShowModalMenu, setIsShowModalMenu] = useState(true)
    const [menuItem, setMenuItem] = useState(
			router.query.favorite === ''
				? {
						i: 4,
						itm: "menuFavorites",
						ttl: "idИзбранное"
					}
				: router.query?.account
					? {
							i: +router.query.account,
							itm: menuItemsIcon[+router.query.account - 1],
							ttl: menuItemsTitle[+router.query.account - 1]
						}
					: {i: "1", itm: "menuOffers", ttl: "Мои объявления"}
		);
    	// буль который передается в юзэфект контекста сбора статистики
    const {setIsLogout} = useStatistics()

    useEffect(() => {
        setMenuItem({
            i: +router.query.account,
            itm: menuItemsIcon[+router.query.account - 1],
            ttl: menuItemsTitle[+router.query.account - 1]
        })
    }, [router])

    useEffect(() => {
        countRender.current += 1
        setContent(content + 1)
    }, [])


    useEffect(() => {
        if(!userInfo) return
        setSubscibersCount(userInfo.subscribers_count)
        setSubscriptionsCount(userInfo.subscriptions_count)
    }, [userInfo])

    // useEffect(() => {
	// 		if (token) {
	// 			(async () => {
	// 				if (id !== undefined && subList?.length === 0) {
	// 					getTokenDataByPost("/api/getSubscriptions", { user_id: `${id}` }, token)
	// 					.then((res) => setSubList(res))
	// 				}

	// 				if (id !== undefined && subscribersList?.length === 0) {
	// 					getTokenDataByPost("/api/getSubscribers", { user_id: `${id}` }, token)
	// 					.then((res) => setSubscribersList(res))
	// 				}
	// 			})();
	// 		}
    // }, [userInfo])

    // переадресация на корретные квери, если юзер в ручную перешел по ссылке типа .../account/[id]
    // useEffect(()=>{
    //     if(!router.query.account && id) {
    //         router.push({
    //             pathname: `/account/${id}`,
    //             query: {
    //                 account: "1",
    //                 content: "1"
    //             }
    //         })
    //     }
    // }, [id])


    // function closeModal(modal, changeModal) {
    //     changeModal(!modal)
    // }

    const handleClickSubscribe = () => router.push(`/account/${id}?account=4&content=2`)
    const closePicUpload = () => {
        setPicUpload(p => !p)
    }


    const logOut = async () => {
        setIsLogout(true)
        axios.get("/api/logout").then(() => {
            mutate("/api/user");
            signOut();
            router.push("/");
        });
    };

    const accountContent = () => {
        return (
            <>
            {countRender.current > 1 ? (
                <>
                    {(
                        menuItem.i === 1 &&
                        <OfferAccountProvider>
                            <Offers router={router}/>
                        </OfferAccountProvider>
                    )
                    || (menuItem.i === 2 && <Deals/>)
                    || (menuItem.i === 3 && <Wallet/>)
                    || (menuItem.i === 4 && <Favorites router={router}/>)
                    || (menuItem.i === 5 && <Notifications />)
                    || (menuItem.i === 6 && <Compare/>) || ( menuItem.i === 7 && <Reviews/>)
                    || (menuItem.i === 8 && <Settings username/>)
                    }
                </>
            ) : router.query?.account ? (
                <>
                    {(+router.query.account === 1 &&
                        <OfferAccountProvider>
                            <Offers router={router}/>
                        </OfferAccountProvider>
                    )
                    || (+router.query.account === 2 && <Deals/>)
                    || (+router.query.account === 3 && <Wallet/>)
                    || (+router.query.account === 4 && <Favorites router={router}/>)
                    || (+router.query.account === 5 && <Notifications/>)
                    || (+router.query.account === 6 && <Compare/>)
                    || (+router.query.account === 7 && <Reviews/>)
                    || (+router.query.account === 8 && <Settings username userId={id} token={token}/>)}
                </>) : (
                <OfferAccountProvider>
                    <Offers router={router}/>
                </OfferAccountProvider>
            )}
        </>
        )
    }

    /* eslint-disable no-unused-vars */
    const accountContentDesktop = () => {
        return accountContent()
    }
    /* eslint-disable no-unused-vars */
    const accountContentMobile = () => {
        return (
            <MobileModal
                title={menuItem?.ttl}
                dialog={isShowModalMenu || false}
                close={() => {
                    // TODO: добавить роутинг на предыдущую страницу
                    router.push('/')
                        .then(() => {
                            setIsShowModalMenu((prevState => !prevState))
                        })
                }}
            >
                {matchesMobile && +router.query.account === 8 &&
                    <div className="clientPage__menu">
                                <div className="clientPage__userinfo">

                                    {!userInfo ? <Box style={{display: "flex", justifyContent: "center", paddingBottom: "10px"}}>
                                            <Skeleton  animation="wave" variant="circular"    sx={{ bgcolor: '#F2F3F4', width: "80px", height: "80px"}}/>
                                        </Box>
                                        :<div className="clientPage__userpic">

                                        <Avatar src={userInfo.userPhoto}
                                                style={{backgroundColor: `${stringToColor(userInfo.name)}`}}>
                                            {initials(userInfo.name)}
                                        </Avatar>

                                        <button onClick={() => setPicUpload(!openPicUpload)} className="addPhoto"/>
                                    </div>}


                                    {!userInfo ? <Box style={{display: "flex", justifyContent: "center", paddingBottom: "6px"}}>
                                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "134px", height: "16px"}} />
                                            </Skeleton>
                                        </Box>
                                        :<div className="clientPage__username">{userInfo.name}</div>}


                                    {!userInfo ? <Box style={{paddingBottom: "10px"}}>
                                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "196px", height: "16px"}} />
                                            </Skeleton>
                                        </Box>
                                        :<div className="clientPage__userRegDate light small">на Kvik
                                        c {ToRusAccountDate(userInfo.createdAt)}</div>}


                                    {!userInfo
                                        ? <Box style={{display: "flex", justifyContent: "center", paddingBottom: "10px"}}>
                                                <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "144px", height: "16px"}} />
                                                </Skeleton>
                                            </Box>
                                        :
                                        <Tooltip title="В разработке" arrow  classes={{tooltip: classes.tooltip, arrow: classes.arrow}}>
                                            <div className="clientPage__userrate">
                                                <div className="clientPage__userrate__num">{userInfo.raiting}</div>
                                                <StarRating {...{rating: userInfo.raiting}} />
                                            </div>
                                        </Tooltip>
                                    }


                                    {!userInfo ? <Box >
                                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "200px", height: "18px"}} />
                                            </Skeleton>
                                        </Box>
                                        :
                                        <div className="clientPage__userstats highlight small">

                                            <Tooltip title="В разработке" arrow  classes={{tooltip: classes.tooltip, arrow: classes.arrow}}>
                                                {/* как будет не disabled, добавить класс classes.hightlight */}
                                                <Box className={classes.userStats}>
                                                    <span>{'0'}</span>
                                                    <Button className={classes.buttonDesc} size="small" variant="text" disabled onClick={() => setReviewsModal(!reviewsModal)} >
                                                        <p>Отзывы</p>
                                                    </Button>
                                                </Box>
                                            </Tooltip>


                                            <Box className={clsx(classes.userStats, classes.highlight)}>
                                                <span>{subscribersCount}</span>
                                                <Button className={classes.buttonDesc} size="small" variant="text" >
                                                    <p>Подписчиков</p>
                                                </Button>
                                            </Box>


                                            <Box className={clsx(classes.userStats, classes.highlight)}>
                                                <span>{subscriptionsCount}</span>
                                                <Button className={classes.buttonDesc} size="small" variant="text"  onClick={handleClickSubscribe} >
                                                    <p>Подписки</p>
                                                </Button>
                                            </Box>

                                </div>}
                                </div>
                                {!userInfo
                                    ?   <Grid item container xs={10} spacing={1}>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        </Grid>
                                    :   <div className="userMenuContainer">
                                        {matchesMobile || matchesTablet ? null :
                                            <>
                                                {menuItems.map((item) => {
                                                    return (
                                                        <a
                                                            key={item.id}
                                                            onClick={() => {
                                                                setMenuItem({i: item.id, itm: item.name, ttl: item.title})
                                                                router.push({
                                                                    pathname: `/account/${id}`,
                                                                    query: {
                                                                        account: item.id,
                                                                        content: "1"
                                                                    }
                                                                })
                                                            }}
                                                            className={item.name + (item.title === menuItem.ttl
                                                                ? ` ${item.name}Active highlight smooth`
                                                                : " smooth")}
                                                        >
                                                            {item.title}
                                                        </a>
                                                    );
                                                })}
                                            </>}
                                            {matchesMobile || matchesTablet  ? null :
                                                <a onClick={() => setLogout(!logout)}
                                                className="offerUnpublish thin superLight menuLogoff smooth">
                                                    Выход
                                                </a>}
                                        </div>
                                }
                    </div>
                }
                {accountContent()}
            </MobileModal>
        )
    }

    const isShowMenu = useMemo(() => {
        if(matchesLowHD) {
            return true
        } else {
            if(matchesCustom1024 && +router.query.account === 8) {
                return true
            }else{
                if(matchesMobile || +router.query.account === 8) {
                    return true
                }else {
                    return false
                }
            }
        }
    }, [matchesLowHD, matchesCustom1024, matchesMobile, router.query.account])

    return (
        <MetaLayout title={"Личный кабинет"}>
            {!userInfo && !matchesMobile ?
                <AccountPlaceHolder/>
                : <div className="clientPage text">
                    {/* <div className="clientPage__breadcrumbs thin">
					<Link href="/">
						<a className="breadCrumb light">Главная</a>
					</Link>
					<Link href={`/account/${id}?account=1&content=1`}>
						<a style={{ color: "#2C2C2C" }} className="line light">Личный кабинет</a>
					</Link>
				</div> */}
                    {/* clientPage__userinfo на мобилке показываем только в настройках */}
                    {isShowMenu ? (
                            <div className="clientPage__menu">
                                <div className="clientPage__userinfo">
                                    {!userInfo ? <Box style={{display: "flex", justifyContent: "center", paddingBottom: "10px"}}>
                                            <Skeleton  animation="wave" variant="circular"    sx={{ bgcolor: '#F2F3F4', width: "80px", height: "80px"}}/>
                                        </Box>
                                        :<div className="clientPage__userpic">

                                        <Avatar src={userInfo.userPhoto}
                                                style={{backgroundColor: `${stringToColor(userInfo.name)}`}}>
                                            {initials(userInfo.name)}
                                        </Avatar>

                                        <button onClick={() => setPicUpload(!openPicUpload)} className="addPhoto"/>
                                    </div>}


                                    {!userInfo ? <Box style={{display: "flex", justifyContent: "center", paddingBottom: "6px"}}>
                                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "134px", height: "16px"}} />
                                            </Skeleton>
                                        </Box>
                                        :<div className="clientPage__username">{userInfo.name}</div>}


                                    {!userInfo ? <Box style={{paddingBottom: "10px"}}>
                                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "196px", height: "16px"}} />
                                            </Skeleton>
                                        </Box>
                                        :<div className="clientPage__userRegDate light small">на Kvik
                                        c {ToRusAccountDate(userInfo.createdAt)}</div>}


                                    {!userInfo
                                        ? <Box style={{display: "flex", justifyContent: "center", paddingBottom: "10px"}}>
                                                <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "144px", height: "16px"}} />
                                                </Skeleton>
                                            </Box>
                                        :
                                        <Tooltip title="В разработке" arrow  classes={{tooltip: classes.tooltip, arrow: classes.arrow}}>
                                            <div className="clientPage__userrate">
                                                <div className="clientPage__userrate__num">{userInfo.raiting}</div>
                                                <StarRating {...{rating: userInfo.raiting}} />
                                            </div>
                                        </Tooltip>
                                    }


                                    {!userInfo ? <Box >
                                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "200px", height: "18px"}} />
                                            </Skeleton>
                                        </Box>
                                        :
                                        <div className="clientPage__userstats highlight small">

                                            <Tooltip title="В разработке" arrow  classes={{tooltip: classes.tooltip, arrow: classes.arrow}}>
                                                {/* как будет не disabled, добавить класс classes.hightlight */}
                                                <Box className={classes.userStats}>
                                                    <span>{'0'}</span>
                                                    <Button className={classes.buttonDesc} size="small" variant="text" disabled onClick={() => setReviewsModal(!reviewsModal)} >
                                                        <p>Отзывы</p>
                                                    </Button>
                                                </Box>
                                            </Tooltip>


                                            <Box className={clsx(classes.userStats, classes.highlight)}>
                                                <span>{subscribersCount}</span>
                                                <Button className={classes.buttonDesc} size="small" variant="text" >
                                                    <p>Подписчиков</p>
                                                </Button>
                                            </Box>


                                            <Box className={clsx(classes.userStats, classes.highlight)}>
                                                <span>{subscriptionsCount}</span>
                                                <Button className={classes.buttonDesc} size="small" variant="text"  onClick={handleClickSubscribe} >
                                                    <p>Подписки</p>
                                                </Button>
                                            </Box>

                                </div>}
                                </div>
                                {!userInfo
                                    ?   <Grid item container xs={10} spacing={1}>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        <MenuItem/>
                                        </Grid>
                                    :   <div className="userMenuContainer">
                                        {matchesMobile || matchesTablet ? null :
                                            <>
                                                {menuItems.map((item) => {
                                                    return (
                                                        <a
                                                            key={item.id}
                                                            onClick={() => {
                                                                setMenuItem({i: item.id, itm: item.name, ttl: item.title})
                                                                router.push({
                                                                    pathname: `/account/${id}`,
                                                                    query: {
                                                                        account: item.id,
                                                                        content: "1"
                                                                    }
                                                                })
                                                            }}
                                                            className={item.name + (item.title === menuItem.ttl
                                                                ? ` ${item.name}Active highlight smooth`
                                                                : " smooth")}
                                                        >
                                                            {item.title}
                                                        </a>
                                                    );
                                                })}
                                            </>}
                                            {matchesMobile || matchesTablet  ? null :
                                                <a onClick={() => setLogout(!logout)}
                                                className="offerUnpublish thin superLight menuLogoff smooth">
                                                    Выход
                                                </a>}
                                        </div>
                                }
                            </div>
                     ): null}
                    <div className="clientPage__container">
                        {matchesMobile ? accountContentMobile() : accountContentDesktop()}
                        {/* {accountContentDesktop()} */}
                        {/* {accountContent()} */}
                    </div>
                    <ScrollTop />
                </div>
                }
            <div className="userPageWhiteSpace"/>
            <Dialog open={openPicUpload || false} onClose={() => setPicUpload(p => !p)} fullWidth maxWidth="xs">
                <UserPicUpload {...{imageType: "webp", optimiztionLevel: 0.7, maxScale: 5, Close: closePicUpload}} />
            </Dialog>
            <Dialog open={logout || false} onClose={() => setLogout(!logout)} fullWidth maxWidth="xs">
                <DialogTitle className="accountLogout">Вы уверены, что хотите выйти?</DialogTitle>
                <div className="accountLogoutBtnBox">
                    <Button onClick={() => setLogout(!logout)} variant="text" color="primary"
                            style={{textTransform: "uppercase"}}>
                        Отмена
                    </Button>
                    <Button onClick={() => logOut()} className="accountLogoutYes"
                            style={{color: "red", textTransform: "uppercase"}}>Выйти</Button>
                </div>
            </Dialog>
            {/* <Dialog open={reviewsModal || false} onClose={() => setReviewsModal(!reviewsModal)}
                    fullScreen={matchesMobile || matchesTablet}>
                {<ModalRating rate={2} comments={2} modal={() => closeModal(reviewsModal, setReviewsModal)}
                              mobile={matchesTablet || matchesMobile}/>}
            </Dialog> */}
            {/* <Dialog open={subscriptionsModal || false} onClose={() => setSubscriptionsModal(!subscriptionsModal)}
                    fullScreen={matchesMobile || matchesTablet}>
                <ModalSubscription
                                    // data={subList} subscription={subList?.length}
                                   modal={() => closeModal(subscriptionsModal, setSubscriptionsModal)}
                                   mobile={matchesTablet || matchesMobile}/>
            </Dialog> */}
        </MetaLayout>
    );
}

export default Account;

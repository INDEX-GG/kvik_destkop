import { useState, useEffect, useRef } from "react";
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
import { initials, stringToColor, ToRusAccountDate } from "../../lib/services";
import { ModalRating, ModalSubscription } from "../../components/Modals";
import { Avatar, Button, Dialog, DialogTitle } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { useMedia } from "../../hooks/useMedia";
import { useAuth } from "../../lib/Context/AuthCTX";
import OfferAccountProvider from "../../lib/Context/OfferAccountCTX";
import { useStore } from "../../lib/Context/Store";

const menuItems = [
	{ id: 1, name: "menuOffers", title: "Мои объявления" },
	{ id: 2, name: "menuDeals", title: "Сделки" },
	{ id: 3, name: "menuWallet", title: "Кошелек" },
	{ id: 4, name: "menuFavorites", title: "Избранное" },
	{ id: 5, name: "menuNotifications", title: "Уведомления" },
	{ id: 6, name: "menuCompare", title: "Сравнить" },
	{ id: 7, name: "menuReviews", title: "Отзывы" },
	{ id: 8, name: "menuSettings", title: "Настройки" },
];

const menuItemsIcon = ["menuOffers", "menuDeals", "menuWallet", "menuFavorites", "menuNotifications", "menuCompare", "menuReviews", "menuSettings"]
const menuItemsTitle = ["Мои объявления", "Сделки", "Кошелек", "Избранное", "Уведомления", "Сравнить", "Отзывы", "Настройки"]

function Account() {
	const router = useRouter();
	const { userInfo } = useStore();
	const countRender = useRef(0)
	const [content, setContent] = useState(0)
	const [openPicUpload, setPicUpload] = useState(false);
	const [subList, setSubList] = useState([])
	const [subscribersList, setSubscribersList] = useState([])
	const [logout, setLogout] = useState(false);
	const [reviewsModal, setReviewsModal] = useState(false);
	const [subscriptionsModal, setSubscriptionsModal] = useState(false);
	const { signOut, id } = useAuth();

	const [menuItem, setMenuItem] = useState(router.query.favorite === '' ? { i: 4, itm: "menuFavorites", ttl: "idИзбранное" } : router.query?.account ? { i: +router.query.account, itm: menuItemsIcon[+router.query.account - 1], ttl: menuItemsTitle[+router.query.account - 1] } : { i: "1", itm: "menuOffers", ttl: "Мои объявления" });

	useEffect(() => {
		setMenuItem({ i: +router.query.account, itm: menuItemsIcon[+router.query.account - 1], ttl: menuItemsTitle[+router.query.account - 1] })
	}, [router])

	useEffect(() => {
		countRender.current += 1
		setContent(content + 1)
	}, [menuItem])

	const { matchesMobile, matchesTablet, matchesCustom1024, matchesCustom1080 } = useMedia()

	function closeModal(modal, changeModal) {
		changeModal(!modal)
	}

	const closePicUpload = () => {
		setPicUpload(p => !p)
	}

	useEffect(() => {
		if (id != undefined && subList.length == 0) {
			axios.post("/api/getSubscriptions", { user_id: `${id}` }).then((res) => setSubList(res.data))
		}

		if (id != undefined && subscribersList.length == 0) {
			axios.post("/api/getSubscribers", { user_id: `${id}` }).then((res) => setSubscribersList(res.data))
		}
	})

	const logOut = () => {
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
						{(menuItem.i === 1 &&
							<OfferAccountProvider>
								<Offers router={router} />
							</OfferAccountProvider>)
							|| (menuItem.i === 2 && <Deals />)
							|| (menuItem.i === 3 && <Wallet />)
							|| (menuItem.i === 4 && <Favorites router={router.query.id} />)
							|| (menuItem.i === 5 && <Notifications />)
							|| (menuItem.i === 6 && <Compare />) || (menuItem.i === 7 && <Reviews />) || (menuItem.i === 8 && <Settings username />)}
					</>
				) : router.query?.account ? (
					<>
						{(+router.query.account === 1 &&
							<OfferAccountProvider>
								<Offers router={router} />
							</OfferAccountProvider>)
							|| (+router.query.account === 2 && <Deals />)
							|| (+router.query.account === 3 && <Wallet />)
							|| (+router.query.account === 4 && <Favorites router={router.query.id} />)
							|| (+router.query.account === 5 && <Notifications />)
							|| (+router.query.account === 6 && <Compare />) || (+router.query.account === 7 && <Reviews />) || (+router.query.account === 8 && <Settings username />)}
					</>) : (
					<OfferAccountProvider>
						<Offers router={router} />
					</OfferAccountProvider>
				)}
			</>
		)
	}

	return (
		<MetaLayout title={"Личный кабинет"}>
			<div className="clientPage text">
				{/* <div className="clientPage__breadcrumbs thin">
					<Link href="/">
						<a className="breadCrumb light">Главная</a>
					</Link>
					<Link href={`/account/${id}?account=1&content=1`}>
						<a style={{ color: "#2C2C2C" }} className="line light">Личный кабинет</a>
					</Link>
				</div> */}
				<div className="clientPage__menu">
					{userInfo !== undefined && (
						<div className="clientPage__userinfo">
							<div className="clientPage__userpic">

								<Avatar src={userInfo.userPhoto} style={{ backgroundColor: `${stringToColor(userInfo.name)}` }}>
									{initials(userInfo.name)}
								</Avatar>

								<button onClick={() => setPicUpload(!openPicUpload)} className="addPhoto"></button>
							</div>
							<div className="clientPage__username">{userInfo.name}</div>
							<div className="clientPage__userRegDate light small">на Kvik c {ToRusAccountDate(userInfo.createdAt)}</div>
							<div className="clientPage__userrate">
								<div className="clientPage__userrate__num">{userInfo.raiting}</div>
								<StarRating {...{ rating: userInfo.raiting }} />
							</div>
							<div className="clientPage__userstats highlight small">
								<a onClick={() => setReviewsModal(!reviewsModal)} className="offerUnpublish thin superLight userInfoReviews" >
									{'0'}
									<p>отзывов</p>
								</a>
								<a className="offerUnpublish thin superLight userInfoSubscribers">
									{subscribersList?.message ? 0 : subscribersList.length}
									<p>подписчиков</p>
								</a>
								<a onClick={() => setSubscriptionsModal(!subscriptionsModal)} className="offerUnpublish thin superLight userInfoSubscribtions">
									
									{userInfo && userInfo?.subscriptions !== undefined ? JSON.parse(userInfo.subscriptions)?.length : '0'}
									<p>подписок</p>
								</a>
							</div>
						</div>
					)}
					<div className="userMenuContainer">
						{matchesMobile || matchesTablet || matchesCustom1024 || matchesCustom1080 ? null :
							<>
								{menuItems.map((item) => {
									return (
										<a key={item.id} onClick={() => {
											setMenuItem({ i: item.id, itm: item.name, ttl: item.title })
											router.push({
												pathname: `/account/${id}`,
												query: {
													account: item.id,
													content: "1"
												}
											})
										}} className={item.name + (item.title === menuItem.ttl ? ` ${item.name}Active highlight smooth` : " smooth")}>
											{item.title}
										</a>
									);
								})}
							</>}
						{matchesMobile || matchesTablet || matchesCustom1024 || matchesCustom1080 ? null :
							<a onClick={() => setLogout(!logout)} className="offerUnpublish thin superLight menuLogoff smooth">
								Выход
							</a>}
					</div>
				</div>
				<div className="clientPage__container">
					{accountContent()}
				</div>
			</div>
			<div className="userPageWhiteSpace"></div>
			<Dialog open={openPicUpload} onClose={() => setPicUpload(p => !p)} fullWidth maxWidth="xs">
				<UserPicUpload {...{ imageType: "webp", optimiztionLevel: 0.7, maxScale: 5, Close: closePicUpload }} />
			</Dialog>
			<Dialog open={logout} onClose={() => setLogout(!logout)} fullWidth maxWidth="xs">
				<DialogTitle className="accountLogout">Вы уверены, что хотите выйти?</DialogTitle>
				<div className="accountLogoutBtnBox">
					<Button onClick={() => setLogout(!logout)} variant="text" color="primary" style={{ textTransform: "uppercase" }}>
						Отмена
					</Button>
					<Button onClick={() => logOut()} className="accountLogoutYes" style={{ color: "red", textTransform: "uppercase" }}>Выйти</Button>
				</div>
			</Dialog>
			<Dialog open={reviewsModal} onClose={() => setReviewsModal(!reviewsModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
				{<ModalRating rate={2} comments={2} modal={() => closeModal(reviewsModal, setReviewsModal)} mobile={matchesTablet || matchesMobile} />}
			</Dialog>
			<Dialog open={subscriptionsModal} onClose={() => setSubscriptionsModal(!subscriptionsModal)} fullScreen={matchesMobile || matchesTablet ? true : false}>
				<ModalSubscription data={subList} subscription={subList.length} modal={() => closeModal(subscriptionsModal, setSubscriptionsModal)} mobile={matchesTablet || matchesMobile} />
			</Dialog>
		</MetaLayout>
	);
}
export default Account;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Dialog } from "@material-ui/core";
import { getDataByPost } from '../../lib/fetch';
import MetaLayout from "../../layout/MetaLayout";
import ProductCarousel from "../../components/ProductCarousel";
import Statistics from "../../components/Statistics";
import ProductInformation from "../../components/product/ProductInformation";
import ProductAction from "../../components/product/ProductAction";
import ProductUserInfo from "../../components/product/ProductUserInfo";
import { modifyGetPostsData, ToRusDate } from "../../lib/services";
import { useMedia } from "../../hooks/useMedia";
import { useProduct } from "../../hooks/useProduct";
import OffersRender from "../../components/OffersRender";
import BreadCrumbsProduct from "../../components/product/BreadCrumbsProduct";
import BreadCrumbs from "../../components/header/BreadСrumbs";
import { useAuth } from "../../lib/Context/AuthCTX";
import PhoneModule from "../../components/product/PhoneModule";
import OfferAccountProvider from "../../lib/Context/OfferAccountCTX";
import Loader from "../../UI/icons/Loader";
import { CHAT_URL_API, STATIC_URL } from "../../lib/constants";
import ProductDate from "../../components/product/ProductSmallComponents/ProductDate";
import ProductPrice from "../../components/product/ProductPrice";
import ProductReviewed from "../../components/product/ProductSmallComponents/ProductReviewed";
import ProductStats from "../../components/product/ProductSmallComponents/ProductStats";
import ProductFavoriteNoteComp from "../../components/product/ProductSmallComponents/ProductFavoriteNoteCom";
import ProductMobileButtons from "../../components/product/ProductMobile/ProductMobileButtons";
// import axios from "axios";
import { firstAds, scrollAds } from "../../lib/scrollAds";
import { useStore } from "../../lib/Context/Store";
import axios from "axios";
import { chatPush } from "../../components/account/Notifications/tabs/chatFunctions";

/* const objP = {
	id: 1,
	title: "Продам 2-комню квартиру, 95м в центре",
	offerImg: [
		{ id: 1, offerpic: "https://source.unsplash.com/random?interior" },
		{ id: 2, offerpic: "https://source.unsplash.com/random?interior" },
		{ id: 3, offerpic: "https://source.unsplash.com/random?interior" },
		{ id: 4, offerpic: "https://source.unsplash.com/random?interior" },
		{ id: 5, offerpic: "https://source.unsplash.com/random?interior" },
		{ id: 6, offerpic: "https://source.unsplash.com/random?interior" },
		{ id: 7, offerpic: "https://source.unsplash.com/random?interior" },
		{ id: 8, offerpic: "https://source.unsplash.com/random?interior" },
		{ id: 9, offerpic: "https://source.unsplash.com/random?interior" },
	],
	locality: "Челябинск, ул. Елькина, 94з",
	date: "12 апреля 11:37",
	price: 4200000,
	oldprice: 5000000,
	bargain: true,
	userid: 777  id пользователя для проверки отображения блока объявления ,
	username: "Иван Иванов" статус для отображения блока объявления 1-активное, 2-истек срок размещения, 3-продано, 4-отклонено, 5-архив, 6-черновик, 7-неактивное (другой пльзователь) 8-активное (другой пльзователь),
	
	userpic: "https://source.unsplash.com/random?portrait",
	userrate: 3.7,
	userOffers: [
		{ id: 1, offerimg: "https://source.unsplash.com/random?1", offerprice: 56, offertitle: "Товар" },
		{ id: 2, offerimg: "https://source.unsplash.com/random?2", offerprice: 3453, offertitle: "Продукт" },
		{ id: 3, offerimg: "https://source.unsplash.com/random?3", offerprice: 25600, offertitle: "Авто" },
		{ id: 4, offerimg: "https://source.unsplash.com/random?4", offerprice: 30000, offertitle: "Услуга" },
		{ id: 5, offerimg: "https://source.unsplash.com/random?5", offerprice: 3458, offertitle: "Квартира" },
		{ id: 6, offerimg: "https://source.unsplash.com/random?6", offerprice: 33, offertitle: "Стул" },
		{ id: 7, offerimg: "https://source.unsplash.com/random?7", offerprice: 800, offertitle: "Недвижимость" },
		{ id: 8, offerimg: "https://source.unsplash.com/random?8", offerprice: 12079000, offertitle: "Телевизор" },
	],
};
 */


const Product = () => {
	const { query } = useRouter();
	const router = useRouter()
	const { id, isAuth } = useAuth();
	const { userInfo } = useStore()
	const [openStatForm, setopenStatForm] = useState(false);
	const handleStatFormDialog = () => setopenStatForm(!openStatForm);
	const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();

	const [page, setPage] = useState(1);
	const [limitRenderPage, setLimitRanderPage] = useState(0);
	const [lastIdAds ,setLastIdAds] = useState(0);
	const limit = 10

	useEffect(() => {
		scrollAds(id, isAuth, page, limit, data, setData, setLastIdAds, setLimitRanderPage, setPage)
		console.log(lastIdAds)
	}, [page])
	
	useEffect(() => {
		 firstAds(id, isAuth, page, limit, setData, setLastIdAds)
	}, [id]);
	
	// const [collSO, setCollSO] = useState(true);
	/* const handleCollSO = (e) => {
		e.preventDefault();
		if (collSO) {
			setCollSO(false);
		} else {
			setCollSO(true);
		}
	}; */

	const [data, setData] = useState();
	useEffect(() => {
		getDataByPost('/api/getPosts', { of: 0, 'user_id': id }).then(r => setData(modifyGetPostsData(r)));
		
	}, []);


	const {active, productInfoFields, address, subcategory, name, raiting, userPhoto, category_id, user_id, created_at, delivery, description, photo, reviewed, secure_transaction, title, trade, price, oldprice, coordinates} = useProduct(query.id);
	const productInfo = useProduct(query.id)


	const [userAd, setUserAd] = useState();
	const [phoneModal, setPhoneModal] = useState();


	const createChat = async () => {
		if (productInfo && userInfo && id) {
			try {
				const obj = {
				'seller_id': productInfo?.user_id, 
				'customer_id': id,
				'product_id': productInfo?.id,
				}
				console.log(obj)

				await axios.post(`${CHAT_URL_API}/make_room`, obj).then(r => console.log(r.data))
				// router.push({
				// 	pathname: `/account/${id}`,
				// 	query: {
				// 		account: 5,
				// 		content: 1,
				// 		companion_id: productInfo?.user_id,
				// 		product_id: productInfo?.id,
				// 		mobile: matchesMobile || matchesTablet ? 'true' : ''
				// 	},
				// })
				const routerObj = {
					id, 
					companion_id: productInfo.user_id, 
					product_id: productInfo?.id,
					mobile: matchesMobile || matchesTablet
				}
				chatPush(router, routerObj)

			} catch (e) {
				const routerObj = {
					id, 
					companion_id: productInfo.user_id, 
					product_id: productInfo?.id,
					mobile: matchesMobile || matchesTablet
				}
				chatPush(router, routerObj)
			}
		}
	}


	// useEffect(() => {
	// 	if (id && query.id) {	
	// 		if (viewing_bool != true && viewing_bool != undefined) {
	// 			axios.post('/api/post_viewing',{"post_id": Number(query.id), "user_id": id})
	// 		}
	// 	}
	// }, [query.id, viewing_bool, id])


	useEffect(() => {

		if (user_id !== undefined) {
			getDataByPost("/api/getProductOfUser", { user_id: user_id }).then((r) => {
				if (r !== undefined && r.length > 0) {
					const userOffers = r.map(offer => {
						return {
							...offer,
							photo: JSON.parse(offer.photo).photos.map(img => `${STATIC_URL}/${img}`)
						}
					})

					setUserAd(userOffers);
				}
			});
		}
	}, [user_id]);

	let breadData = null;

	if (category_id !== undefined) {
		breadData = BreadCrumbsProduct(category_id);
	}
	//const [update, setUpdate] = useState(false);
	/* if(update) {
		const { active } = useProduct(query.id)
		
	} */
	const [defaultStatus, setDefaultStatus] = useState(active);
	useEffect( () => {
		setDefaultStatus(active)
		//console.log("updated update", update)

		//console.log("default defaultStatus", defaultStatus)
	}, [active])


	return (
		<MetaLayout>
			<OfferAccountProvider>
				<div className="productPage" id="productPage">
					{title == undefined ? <div className='product__placeholder_loader'><div><Loader /></div></div> : ''}
					<div className="productPageContainer text">
						{!matchesMobile && !matchesTablet && <BreadCrumbs data={breadData} product={title} />}
						{/* Блок объявления */}
						<div className="product__wrapper">
							<div className="productPageWrapper">
								<div className={title == undefined ? 'placeholder_product__main_block product__main_block' : 'product__main_block'}>
									<div className="productPageDescription">
										{matchesMobile || matchesTablet ? <ProductFavoriteNoteComp id={id} sellerId={user_id} isOffer={+query.id} mobile /> : null}
										<ProductCarousel title={title} photo={photo} mobile={matchesMobile || matchesTablet} />
										{!matchesLaptop && !matchesDesktop && !matchesHD && (
											photo == undefined ?
												<div className="placeholder_animation product__placeholder_mobil-action"></div>
												:
												<div className="productPageAdaptive">
													<ProductPrice price={price} oldPrice={oldprice} id={id} sellerId={user_id} trade={trade} status={1} mobile />
													<div className="SellerInfo__adaptive_info">
														<div className="SellerInfo__adaptive_info_top">
															<ProductReviewed reviewed={reviewed} />
															<ProductStats sellerId={user_id} id={id} dialog={openStatForm} setDialog={setopenStatForm} mobile />
														</div>
														<ProductDate id={id} sellerId={user_id} mobile date={ToRusDate(created_at)} leftDay={30} />
													</div>
												</div>

										)}
										{<ProductMobileButtons id={id} sellerId={user_id} delivery={delivery} status={defaultStatus} secure_transaction={secure_transaction} setDialog={setPhoneModal} photo={photo} mobile={matchesMobile || matchesTablet} productInfo={productInfo} /*update={update}*/ setUpdate={setDefaultStatus} createChat={createChat} />}
										{/* адрес, карта, свойства и значения */}
										<ProductInformation address={address} coordinates={coordinates} description={description} productionInfo={productInfoFields} caterory={subcategory} />
									</div>

									{/* Блок информации*/}
									<div className="block__my_active_ad">
										{/* статус объявления, кнопки */}
										{<ProductAction router={query.id} reviewed={reviewed} user_id={user_id} status={defaultStatus} oldprice={oldprice} price={price} created_at={created_at} delivery={delivery} trade={trade} secure_transaction={secure_transaction} productInfo={productInfo} /*update={update}*/ setUpdate={setDefaultStatus} createChat={createChat}/>}
										{/* пользователь и его объявления */}
										<ProductUserInfo name={name} userPhoto={userPhoto} raiting={raiting} user_id={user_id} userAd={userAd} productTitle={title} />
									</div>
								</div>
								{!matchesMobile && !matchesTablet && !matchesLaptop && (
									<div className="showsmthWrapper">
										<div className="freedomBlock_1"></div>
										<div className="freedomBlock_2"></div>
									</div>
								)}
							</div>
							<div className="productPageContent">
								<div className="productPageCard">
									<OffersRender isProduct data={data} title={"Похожие объявления"} page={page} limitRender={limitRenderPage} setLimitRenderPage={setLimitRanderPage} setPage={setPage} /* endMessage={!collSO} */ />
									<div style={{ marginTop: '60px' }}></div>
									{/* <div className={`SimilarOffersColl highlight underline ${collSO && "SOCColl"}`} onClick={(e) => handleCollSO(e)}>
										{(collSO && "Показать ещё") || "Скрыть"}
									</div> */}
								</div>
								<div className="productPageSimilar__advertisement">
									{!matchesMobile && !matchesTablet && !matchesDesktop && !matchesHD && (
										<div className="showsmthWrapper">
											<div className="freedomBlock_1"></div>
											<div className="freedomBlock_2"></div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="productPageWhiteSpace"></div>
					<Dialog open={openStatForm} onClose={() => setopenStatForm(!openStatForm)} fullWidth maxWidth="sm">
						{" "}
						<Statistics /* views={viewing ? JSON.parse(viewing).length : 0}  */Close={handleStatFormDialog} />{" "}
					</Dialog>
					<PhoneModule dialog={phoneModal} setDialog={setPhoneModal} productInfo={productInfo} />
				</div>
			</OfferAccountProvider>
		</MetaLayout>
	);
};

export default Product;

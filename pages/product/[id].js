import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import {Dialog} from "@material-ui/core";
import { getTokenDataByPost,/* getDataByPost*/} from '../../lib/fetch';
import MetaLayout from "../../layout/MetaLayout";
import ProductCarousel from "../../components/ProductCarousel";
import Statistics from "../../components/Statistics";
import ProductInformation from "../../components/product/ProductInformation";
import ProductAction from "../../components/product/ProductAction";
import ProductUserInfo from "../../components/product/ProductUserInfo";
import {useMedia} from "../../hooks/useMedia";
import {useProduct} from "../../hooks/useProduct";
import BreadCrumbsProduct from "../../components/product/BreadCrumbsProduct";
import BreadCrumbs from "../../components/header/BreadСrumbs";
import {useAuth} from "../../lib/Context/AuthCTX";
import PhoneModule from "../../components/product/PhoneModule";
import OfferAccountProvider from "../../lib/Context/OfferAccountCTX";
import {CHAT_URL_API, /*SIGN_SECRET*/} from "../../lib/constants";
import ProductPrice from "../../components/product/ProductPrice";
import ProductReviewed from "../../components/product/ProductSmallComponents/ProductReviewed";
import ProductStats from "../../components/product/ProductSmallComponents/ProductStats";
import ProductFavoriteNoteComp from "../../components/product/ProductSmallComponents/ProductFavoriteNoteCom";
import ProductMobileButtons from "../../components/product/ProductMobile/ProductMobileButtons";
import {useStore} from "../../lib/Context/Store";
import {chatPush} from "../../components/account/Notifications/tabs/chatFunctions";
import ProductPlaceHolder from "../../components/placeHolders/ProductPlaceHolder/ProductPlaceHolder";
// import CategoryScrollPostData from "#components/CategoryScrollPostData";
import NewCategoryScrollPostData from "#components/NewCategoryScrollPostData";
import { useStatistics } from "#lib/Context/StatisticsCTX";
import ScrollTop from '../../UI/ScrollTop'




const Product = () => {
    const {addView} = useStatistics()

    const {userInfo} = useStore()

    const {id, token} = useAuth();
    const {query} = useRouter();
    const router = useRouter()
    const {matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD} = useMedia();

    const productInfo = useProduct(query.id)

    const {
        status,
        productInfoFields,
        address,
        subcategory,
        user_name: name,
        raiting,
        userPhoto,
        category_id,
        user_id,
        id: productId,
        created_at,
        delivery,
        description,
        photo,
        reviewed,
        secure_transaction,
        title,
        trade,
        price,
        oldprice,
        coordinates,
        full_stat,
        all_time_viewing_count,
        last_day_viewing_count,
        // likes_count,
        all_time_contact_count,
        last_day_contact_count,
        user_products_count,
    } = productInfo
    

    // const [stats, setStats] = useState({})

    const [openStatForm, setopenStatForm] = useState(false);
    const [defaultStatus, setDefaultStatus] = useState(status);
    const [userAd, setUserAd] = useState();
    const [phoneModal, setPhoneModal] = useState();



    const handleStatFormDialog = () => setopenStatForm(!openStatForm);
    let breadData = null;


    const createChat = async () => {
        if (productInfo && userInfo && id) {
            try {
                const obj = {
                    'seller_id': productInfo?.user_id,
                    'customer_id': id,
                    'product_id': productInfo?.id,
                }

                await getTokenDataByPost(`${CHAT_URL_API}/make_room`, obj, token).then(r => console.log(r.data))
                const routerObj = {
                    id,
                    companion_id: productInfo.user_id,
                    product_id: productInfo?.id,
                    mobile: matchesMobile || matchesTablet,
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



    useEffect(() => {
        // setStats({
        //     full_stat,
        //     all_time_viewing_count,
        //     last_day_viewing_count,
        //     all_time_contact_count,
        //     last_day_contact_count,
        // })
        if(productId && (user_id !== id)){
            addView(productId)()
        }
    }, [productId, id])
    


    useEffect(() => {

        if (user_id !== undefined) {
            // этот запрос больше не нужен. Все есть в useProduct, нужно заменить
            // getDataByPost("/api/getProductOfUser", {user_id: user_id}).then((r) => {
            //     if (r !== undefined && r.length > 0) {
            //         const userOffers = r?.map(offer => {
            //             return {
            //                 ...offer,
            //                 photo: JSON.parse(offer.photo)?.photos?.map(img => `${STATIC_URL}/${img}`)
            //             }
            //         })
            //         console.log(userOffers, 'offers')
            //         setUserAd(userOffers);
            //     }
            // });
            // console.log(productInfo)
            setUserAd(productInfo.user_products)
        }
    }, [productInfo.id]);


    if (category_id !== undefined) {
        breadData = BreadCrumbsProduct(category_id);
    }

    useEffect(() => {
        setDefaultStatus(status)
    }, [status])

    return (
        <MetaLayout>
            <OfferAccountProvider>
                <div className="productPage" id="productPage">
                    <div className="productPageContainer text">
                        {!title ? null : !matchesMobile && !matchesTablet &&
                            <BreadCrumbs data={breadData} product={title}/>}
                        {/* Блок объявления */}
                        {!title ? <ProductPlaceHolder/>
                            : <div className="product__wrapper">
                                <div className="productPageWrapper">
                                    {!matchesMobile && !matchesTablet &&
                                    <div className="productHeader">
                                        <div className="productPageTitle xl">{title}</div>
                                        <ProductFavoriteNoteComp 
                                            id={id} 
                                            sellerId={user_id} 
                                            isOffer={+query.id}
                                            mobile
                                            // stats={stats}
                                            stats={{
                                                full_stat,
                                                all_time_viewing_count,
                                                last_day_viewing_count,
                                                all_time_contact_count,
                                                last_day_contact_count,
                                            }}
                                        />
                                    </div>}
                                    <div>
                                        <div className='product__main_block'>
                                            <div className="productPageDescription">
                                                {(matchesMobile || matchesTablet) &&
                                                <ProductFavoriteNoteComp
                                                    id={id}
                                                    sellerId={user_id}
                                                    isOffer={+query.id}
                                                    mobile
                                                />}
                                                {/* {!matchesMobile && !matchesTablet ? <div className="productPageTitle xl">{title}</div> : null} */}
                                                <ProductCarousel title={title} photo={photo}
                                                                 mobile={matchesMobile || matchesTablet}/>
                                                {!matchesLaptop && !matchesDesktop && !matchesHD &&
                                                <div className="productPageAdaptive">
                                                    <ProductPrice price={price} oldPrice={oldprice} id={id}
                                                                  sellerId={user_id} trade={trade} status={1} mobile/>
                                                    <div className="productPageTitle xl">{title}</div>
                                                    <div className="SellerInfo__adaptive_info">
                                                        <div className="SellerInfo__adaptive_info_top">
                                                            <ProductReviewed reviewed={reviewed}/>
                                                            <ProductStats sellerId={user_id} id={id}
                                                                          dialog={openStatForm}
                                                                          setDialog={setopenStatForm} mobile/>
                                                        </div>
                                                        {/* закоментил. для нового дизайна данные компоненты пока не нужны */}
                                                        {/* <ProductDate id={id} sellerId={user_id} mobile
                            date={ToRusDate(created_at)} leftDay={30}/> */}
                                                        {/* закоментил. для нового дизайна данные компоненты пока не нужны */}
                                                    </div>
                                                </div>
                                                }
                                                {<ProductMobileButtons id={id} sellerId={user_id} delivery={delivery}
                                                                       status={defaultStatus}
                                                                       secure_transaction={secure_transaction}
                                                                       setDialog={setPhoneModal} photo={photo}
                                                                       mobile={matchesMobile || matchesTablet}
                                                                       productInfo={productInfo} /*update={update}*/
                                                                       setUpdate={setDefaultStatus}
                                                                       createChat={createChat}/>}
                                                {/* адрес, карта, свойства и значения */}
                                                <ProductInformation address={address} coordinates={coordinates}
                                                                    description={description}
                                                                    productionInfo={productInfoFields}
                                                                    caterory={subcategory}
                                                                    category_id={category_id}
                                                                    allProductInfo={productInfo}
                                                                    />
                                            </div>
                                            {/* Блок информации*/}
                                            <div className="block__my_active_ad">
                                                {/* статус объявления, кнопки */}
                                                {/* {!matchesMobile && !matchesTablet && <ProductFavoriteNoteComp id={id} sellerId={user_id} isOffer={+query.id}
                        mobile/>} */}
                                                {<ProductAction 
                                                    router={query.id} 
                                                    reviewed={reviewed} 
                                                    user_id={user_id}
                                                    status={defaultStatus} 
                                                    oldprice={oldprice} 
                                                    price={price}
                                                    created_at={created_at} 
                                                    delivery={delivery}
                                                    trade={trade}
                                                    secure_transaction={secure_transaction}
                                                    productInfo={productInfo} /*update={update}*/
                                                    setUpdate={setDefaultStatus} 
                                                    createChat={createChat}
                                                />}
                                                                
                                                {/* пользователь и его объявления */}
                                                <ProductUserInfo
                                                    name={name}
                                                    userPhoto={userPhoto}
                                                    raiting={raiting}
                                                    user_id={user_id}
                                                    userAd={userAd}
                                                    productTitle={title}
                                                    totalProducts={user_products_count}
                                                />


                                            </div>
                                            {matchesTablet || matchesMobile &&
                                                <div className="ad__block_bottom__adaptive_right">
                                                        <a className="SellerInfoComplain small light underline">Пожаловаться</a>
                                                </div>
                                            }
                                        </div>
                                    </div>


                                    {/*{!matchesMobile && !matchesTablet && !matchesLaptop && (*/}
                                    {/*  <div className="showsmthWrapper">*/}
                                    {/*    <div className="freedomBlock_1"></div>*/}
                                    {/*    <div className="freedomBlock_2"></div>*/}
                                    {/*  </div>*/}
                                    {/*)}*/}
                                </div>
                                <div className="productPageContent">
                                    <div className="productPageCard">
                                        {/*<OffersRender isProduct data={data} title={"Похожие объявления"} page={page}*/}
                                        {/*              limitRender={limitRenderPage} setLimitRenderPage={setLimitRanderPage}*/}
                                        {/*              setPage={setPage} /* endMessage={!collSO} */ }
                                        {/* ниже старый вариант отрисовки карточек на странице объявления, заменено на рекомендумые */}
                                        {/* {category_id && (<CategoryScrollPostData url='/api/similarPosts'  title={'Похожие объявления'} category={category_id} />)} */}
                                        {category_id && (<NewCategoryScrollPostData url='/api/similarPosts' product={productInfo} />)}
                                        <div style={{marginTop: '60px'}}/>
                                        {/* <div className={`SimilarOffersColl highlight underline ${collSO && "SOCColl"}`} onClick={(e) => handleCollSO(e)}>
										{(collSO && "Показать ещё") || "Скрыть"}
									</div> */}
                                    </div>
                                    {/*<div className="productPageSimilar__advertisement">*/}
                                    {/*  {!matchesMobile && !matchesTablet && !matchesDesktop && !matchesHD && (*/}
                                    {/*    <div className="showsmthWrapper">*/}
                                    {/*      <div className="freedomBlock_1"></div>*/}
                                    {/*      <div className="freedomBlock_2"></div>*/}
                                    {/*    </div>*/}
                                    {/*  )}*/}
                                    {/*</div>*/}
                                </div>
                            </div>}
                    </div>
                    <div className="productPageWhiteSpace"/>
                    <Dialog open={openStatForm} onClose={() => setopenStatForm(!openStatForm)} fullWidth maxWidth="sm">
                        {" "}
                        <Statistics /* views={viewing ? JSON.parse(viewing).length : 0}  */
                            Close={handleStatFormDialog}/>{" "}
                    </Dialog>
                    {/* ничего не делало, закоментил */}
                    {productInfo.id && <PhoneModule dialog={phoneModal} setDialog={setPhoneModal} productInfo={productInfo}/>}
                    <ScrollTop />
                </div>
            </OfferAccountProvider>
        </MetaLayout>
    );
};

export default Product;

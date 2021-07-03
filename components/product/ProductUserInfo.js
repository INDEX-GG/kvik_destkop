import React, { useState } from 'react';
import { useMedia } from '../../hooks/useMedia';
import { ToRubles } from '../../lib/services';

export default function ProductUserInfo({data}) {

    const [collapsed, setCollapsed] = useState(true);
    const handleCollapse = e => {
        e.preventDefault();
        if (collapsed) {
            setCollapsed(false);
        } else {
            setCollapsed(true);
        }
    }

    const objP={adstatus: 8}
    
    const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();

    return (
        <>
            <div className="ad__block_bottom">
                <div className="SellerInfoUserBlock">
                    <img className="SellerInfoUserPic" /* src={objP.userpic} */ />
                    <div>
                        <div>{/* {objP.username} */}</div>
                        <div>
                            <div className="SellerInfoRateNumber">{/* {objP.userrate} */}</div>
                            <div className="rating">
                                <div className="stars">
                                    <div className="on" style={{ width: `${/* objP.userrate */2 * 20}%` }}></div>
                                    <div className="live">
                                        <span data-rate="1"></span>
                                        <span data-rate="2"></span>
                                        <span data-rate="3"></span>
                                        <span data-rate="4"></span>
                                        <span data-rate="5"></span>
                                    </div>
                                </div>
                            </div>
                            {objP.adstatus === 1 || objP.adstatus === 2 || objP.adstatus === 3 || objP.adstatus === 4 || objP.adstatus === 5 || objP.adstatus === 6 ?
                                !matchesLaptop && !matchesDesktop && !matchesHD ? <>
                                    <span className="count__ad">00 объявлений</span>
                                    <a className="SellerInfoloarmore"></a>  </> : '' : ''}
                        </div>
                    </div>
                    {objP.adstatus === 7 && objP.adstatus === 8 ? !matchesMobile && !matchesTablet ? <a className="SellerInfoUserAdd"></a> : '' : ''}
                    {!matchesLaptop && !matchesDesktop && !matchesHD && !matchesMobile && !matchesTablet ? <> <span className="count__ad">00 объявлений</span> <a className="SellerInfoloarmore"></a></> : ''}
                </div>

                {objP.adstatus === 7 || objP.adstatus === 8 ?
                    !matchesMobile && !matchesTablet ? <div className="SellerInfoOffers">
                       {/*  {(collapsed) &&
                            (objP.userOffers.slice(0, 3).map(offer => {
                                return (
                                    <div  key= {offer.id}  className="SellerInfoOfferCard small">
                                        <img  src={offer.offerimg} />
                                        <div>{ {ToRubles(offer.offerprice)} }</div>
                                        <div>{ {offer.offertitle} }</div>
                                    </div>
                                )
                            }))
                            ||
                            (objP.userOffers.map(offer => {
                                return (
                                    <div key= {offer.id} className="SellerInfoOfferCard small">
                                        <img src= {offer.offerimg}  />
                                        <div>{ {ToRubles(offer.offerprice)} }</div>
                                        <div>{ {offer.offertitle} }</div>
                                    </div>
                                )
                            }))
                        } */}
                    </div> : "" : ''}
                {objP.adstatus === 7 || objP.adstatus === 8 ? !matchesMobile && !matchesTablet ? <a className="SellerInfoUserOffersCollapse highlight underline" onClick={e => { handleCollapse(e) }}>{(collapsed) && `Все объявления продавца (123)` || `Скрыть`}</a> : '' : ''}
            </div>
            {objP.adstatus === 7 || objP.adstatus === 8 ?
                <div className="ad__block_bottom__adaptive">
                    {!matchesLaptop && !matchesDesktop && !matchesHD && <div className="ad__block_bottom__adaptive_left"> <a className="SellerInfoUserAdd"></a>Подписаться</div>}
                    <div className="ad__block_bottom__adaptive_right">
                        <a className="SellerInfoShutUp small light underline">Заблокировать пользователя</a>
                        {objP.adstatus === 8 ? <a className="SellerInfoComplain small light underline">Пожаловаться</a> : ''}
                    </div>
                </div>
                : ''}
        </>
    )
}

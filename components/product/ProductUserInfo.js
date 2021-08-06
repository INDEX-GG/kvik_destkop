import React, { useState, useEffect } from "react";
import { useMedia } from "../../hooks/useMedia";
import { ToRubles } from "../../lib/services";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar } from "@material-ui/core";
import { useAuth } from "../../lib/Context/AuthCTX";
export default function ProductUserInfo(data) {


  const router = useRouter();
  const { id } = useAuth();
  const [collapsed, setCollapsed] = useState(true);
  // const handleCollapse = (e) => {
  //   e.preventDefault();
  //   if (collapsed) {
  //     setCollapsed(false);
  //   } else {
  //     setCollapsed(true);
  //   }
  // };

  const objP = { adstatus: 8 };

  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();
  let userSmallAd;

  useEffect(() => {
    localStorage.setItem("Title", data.productTitle)
    localStorage.setItem("Query", router.query.id)
  })

  return (
    <>
      <div className="ad__block_bottom">
        <div className="SellerInfoUserBlock">
          <Avatar alt="User" src={data.userPhoto} className="SellerInfoUserPic" onClick={() => {
            router.push(`/user/${data.user_id}`)
          }} />

          {data.user_id === undefined ? <div className="placeholder_animation product__placeholder_userinfo"></div> :
            <>
              <div>
                <div className='productUserName' onClick={() => {
                  router.push(`/user/${data.user_id}`)
                }}> {data.name} </div>
                <div>
                  <div className="SellerInfoRateNumber">{objP.userrate} </div>
                  <div className="rating">
                    <div className="stars">
                      <div className="on" style={{ width: `${data.raiting * 20}%` }}></div>
                      <div className="live">
                        <span data-rate="1"></span>
                        <span data-rate="2"></span>
                        <span data-rate="3"></span>
                        <span data-rate="4"></span>
                        <span data-rate="5"></span>
                      </div>
                    </div>
                  </div>
                  {data.user_id === id || objP.adstatus === 2 || objP.adstatus === 3 || objP.adstatus === 4 || objP.adstatus === 5 || objP.adstatus === 6 ? (

                    matchesLaptop || matchesDesktop || matchesHD && !matchesMobile ? (
                      <>
                        {data.user_id != id && <span className="count__ad">{data.userAd == undefined ? "" : ((data.userAd).filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active === 0)).length} объявлений</span>}
                        {data.user_id != id && <a className="SellerInfoloarmore"></a>}
                      </>

                    ) : ("")) : ("")}
                </div>
                {matchesMobile ?
                  (
                    <>
                      <span style={{ marginLeft: "0px" }} className="count__ad">{data.userAd == undefined ? "" : ((data.userAd).filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active === 0)).length} объявлений</span>
                    </>
                  ) : null}
              </div>


              {data.user_id !== id ?
                matchesTablet || matchesMobile ? '' :
                  <div className="ad__block_bottom__adaptive_left">
                    <a className="SellerInfoUserAdd"></a>
                  </div>
                : ''
              }

              {/* {objP.adstatus === 7 && data.user_id === id ? !matchesMobile && !matchesTablet ? <a className="SellerInfoUserAdd"></a> : "" : ""} */}

              {!matchesLaptop && !matchesDesktop && !matchesHD ? (
                matchesMobile ? null : (
                  <>
                    <div className="SellerProductInfo">
                      {data.user_id != id && <span className="count__ad">{data.userAd == undefined ? "" : ((data.userAd).filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active === 0)).length} объявлений</span>}
                      {data.user_id != id && <a className="SellerInfoloarmore">&nbsp;</a>}
                    </div>
                  </>
                )
              ) : (
                ""
              )}
            </>
          }
        </div>
        {
          objP.adstatus === 7 || data.user_id != id ? (
            !matchesMobile && !matchesTablet ? (
              data.user_id === undefined ?
                <>
                  <div className="SellerInfoOffers">
                    <div className='placeholder_animation product__placeholder_useroffer'>
                      <div className="placeholder_animation product__placeholder_useroffer_block-top"></div>
                      <div className="placeholder_animation product__placeholder_useroffer_block-bottom"></div>
                    </div>
                    <div className='placeholder_animation product__placeholder_useroffer'>
                      <div className="placeholder_animation product__placeholder_useroffer_block-top"></div>
                      <div className="placeholder_animation product__placeholder_useroffer_block-bottom"></div>
                    </div>
                    <div className='placeholder_animation product__placeholder_useroffer'>
                      <div className="placeholder_animation product__placeholder_useroffer_block-top"></div>
                      <div className="placeholder_animation product__placeholder_useroffer_block-bottom"></div>
                    </div>
                  </div>
                </>
                :
                <div className="SellerInfoOffers">

                  {collapsed &&
                    (userSmallAd = data.userAd?.filter((item) => item.id != router.query.id)) &&
                    userSmallAd.slice(0, 3).map((userAd) => {
                      return (
                        <Link key={userAd.id} href={`/product/${userAd.id}`}>
                          <div className="SellerInfoOfferCard small">
                            {console.log(userAd)}
                            {JSON.parse(userAd.photo)?.photos.slice(0, 1).map((imgs, i) => {
                              return <img key={i} src={imgs} />;
                            })}
                            <div>{ToRubles(userAd.price)}</div>
                            <div>{userAd.title.length > 15 ? userAd.title.slice(0, 12) + "..." : userAd.title}</div>
                          </div>
                        </Link>
                      );
                    }
                    )
                    // ||
                    // data.userAd.map((userAd) => {
                    //   return (
                    //     <Link key={userAd.id} href={`/product/${userAd.id}`}>
                    //       <div className="SellerInfoOfferCard small">
                    //         {JSON.parse(userAd.photo)
                    //           .photos.slice(0, 1)
                    //           .map((imgs, i) => {
                    //             return <img key={i} src={imgs} />;
                    //           })}
                    //         <div>{ToRubles(userAd.price)}</div>
                    //         <div>{userAd.title.length > 15 ? userAd.title.slice(0, 12) + "..." : userAd.title}</div>
                    //       </div>
                    //     </Link>
                    //   );
                    // })
                  }

                </div>
            ) : (
              ""
            )
          ) : ("")
        }
        {userSmallAd == undefined ? (
          ""
        ) : data.user_id != id ? (
          !matchesMobile && !matchesTablet ? (
            <a className="SellerInfoUserOffersCollapse highlight underline" target="_blank" onClick={() => router.push({
              pathname: `/user/${data.user_id}`
            })}
              /* onClick={(e) => { handleCollapse(e)}} */>

              {(collapsed && `Все объявления продавца (${userSmallAd == undefined ? "0" : data.userAd.length})`) || `Скрыть`}
            </a>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
      {data.user_id != id ? (
        <div className="ad__block_bottom__adaptive">
          {!matchesLaptop && !matchesDesktop && !matchesHD && (
            <div className="ad__block_bottom__adaptive_left">
              {" "}
              <a className="SellerInfoUserAdd"></a>Подписаться
            </div>
          )}
          <div className="ad__block_bottom__adaptive_right">
            <a className="SellerInfoShutUp small light underline">Заблокировать пользователя</a>
            {data.user_id != id ? <a className="SellerInfoComplain small light underline">Пожаловаться</a> : ""}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

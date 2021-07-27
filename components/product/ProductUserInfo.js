import React, { useState, useEffect } from "react";
import { useMedia } from "../../hooks/useMedia";
import { ToRubles } from "../../lib/services";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar } from "@material-ui/core";

export default function ProductUserInfo(data) {
  const router = useRouter();

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

  return (
    <>
      <div className="ad__block_bottom">
        <div className="SellerInfoUserBlock">
          <Avatar alt="User" src={data.userPhoto} className="SellerInfoUserPic" onClick={() => router.push({
            pathname: `/user/${data.id}`,
          })}/>
          <div>
            <div className='productUserName' onClick={() => router.push({
            pathname: `/user/${data.id}`
            })}> {data.name} </div>
            <div>
              <div className="SellerInfoRateNumber">{/* {objP.userrate} */}</div>
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
              {objP.adstatus === 1 || objP.adstatus === 2 || objP.adstatus === 3 || objP.adstatus === 4 || objP.adstatus === 5 || objP.adstatus === 6 ? (
                !matchesLaptop && !matchesDesktop && !matchesHD ? (
                  <>
                    <span className="count__ad">00 объявлений</span>
                    <a className="SellerInfoloarmore"></a>{" "}
                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
          {matchesTablet || matchesMobile ? null : (
            <div className="ad__block_bottom__adaptive_left">
              <a className="SellerInfoUserAdd"></a>
            </div>
          )}
          {objP.adstatus === 7 && objP.adstatus === 8 ? !matchesMobile && !matchesTablet ? <a className="SellerInfoUserAdd"></a> : "" : ""}
          {!matchesLaptop && !matchesDesktop && !matchesHD ? (
            <>
              {" "}
              <span className="count__ad">{data.userAd == undefined ? "" : data.userAd.length} объявлений</span> <a className="SellerInfoloarmore"></a>
            </>
          ) : (
            ""
          )}
        </div>
        {data.userAd == undefined ? (
          ""
        ) : objP.adstatus === 7 || objP.adstatus === 8 ? (
          !matchesMobile && !matchesTablet ? (
            <div className="SellerInfoOffers">
              {(collapsed &&
                (userSmallAd = data.userAd.filter((item) => item.id != router.query.id)) &&
                userSmallAd.slice(0, 3).map((userAd) => {
                  return (
                    <Link key={userAd.id} href={`/product/${userAd.id}`}>
                      <div  className="SellerInfoOfferCard small">
                        {JSON.parse(userAd.photo)
                          .photos.slice(0, 1)
                          .map((imgs, i) => {
                            return <img key={i} src={imgs} />;
                          })}
                        <div>{ToRubles(userAd.price)}</div>
                        <div>{userAd.title.length > 15 ? userAd.title.slice(0, 12) + "..." : userAd.title}</div>
                      </div>
                    </Link>
                  );
                })) ||
                data.userAd.map((userAd) => {
                  return (
                    <Link key={userAd.id} href={`/product/${userAd.id}`}>
                      <div  className="SellerInfoOfferCard small">
                        {JSON.parse(userAd.photo)
                          .photos.slice(0, 1)
                          .map((imgs, i) => {
                            return <img key={i} src={imgs} />;
                          })}
                        <div>{ToRubles(userAd.price)}</div>
                        <div>{userAd.title.length > 15 ? userAd.title.slice(0, 12) + "..." : userAd.title}</div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        {userSmallAd == undefined ? (
          ""
        ) : objP.adstatus === 7 || objP.adstatus === 8 ? (
          !matchesMobile && !matchesTablet ? (
            <a className="SellerInfoUserOffersCollapse highlight underline" target="_blank" onClick={() => router.push({
              pathname: `/user/${data.id}`
              })}
              /* onClick={(e) => { handleCollapse(e)}} */>
              {(collapsed && `Все объявления продавца (${userSmallAd == undefined ? "0" : userSmallAd.length})`) || `Скрыть`}
            </a>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
      {objP.adstatus === 7 || objP.adstatus === 8 ? (
        <div className="ad__block_bottom__adaptive">
          {!matchesLaptop && !matchesDesktop && !matchesHD && (
            <div className="ad__block_bottom__adaptive_left">
              {" "}
              <a className="SellerInfoUserAdd"></a>Подписаться
            </div>
          )}
          <div className="ad__block_bottom__adaptive_right">
            <a className="SellerInfoShutUp small light underline">Заблокировать пользователя</a>
            {objP.adstatus === 8 ? <a className="SellerInfoComplain small light underline">Пожаловаться</a> : ""}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

import {Avatar, makeStyles, Tooltip} from '@material-ui/core';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useMedia} from '../../../hooks/useMedia';
import {useSubBool} from '../../../hooks/useSubscriptions';
import StarRating from '../../StarRating';
import {getTokenDataByPost} from "../../../lib/fetch";

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
}))


const ProductUser = ({id, sellerId, userPhoto, name, raiting, mobile, userAd, status, userrate, token}) => {
  const router = useRouter();
  const {matchesMobile, matchesTablet} = useMedia();
  const {userSub} = useSubBool(id, sellerId)
  const [userBool, setUserBool] = useState(false)
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    setUserBool(userSub)
  }, [userSub])

  async function subscribeUser() {
    if (id && sellerId) {
      setLoading(true)

      const subscribe = {
        user_id: id + "",
        seller_id: sellerId + ""
      }

      setUserBool(!userBool)

      await getTokenDataByPost("/api/subscriptions", subscribe, token)
      await getTokenDataByPost('/api/subscribers', {user_id: '' + sellerId, subscriber_id: '' + id}, token);


      setLoading(false)
    }
  }

  // console.log(mobile, matchesMobile)

  return (
    <>
      <div className='ProductuserContainer'>
        <Avatar alt="User" src={userPhoto} className="SellerInfoUserPic" onClick={() => {
          router.push(`/user/${sellerId}`)
        }}/>
        <div className='ProductUserSubContainer'>

          <div className='productUserName' onClick={() => {
                  router.push(`/user/${sellerId}`)
            }}> 
            {name} 
          </div>

            {sellerId === undefined ? 
            <div className="placeholder_animation product__placeholder_userinfo"/> :
            <>
                <div className='productSubDesktop'>
                  {/* <div className='productUserName' onClick={() => {
                    router.push(`/user/${sellerId}`)

                  }}> {name} </div> */}
                  <div>
                    <div className="SellerInfoRateNumber">{userrate} </div>
                    <StarRating rating={raiting}/>
                    {sellerId === id || status === 2 || status === 3 || status === 4 || status === 5 || status === 6 ? (
                      mobile ? (
                        <>
                          {/* {sellerId != id && <span
                            className="count__ad">{userAd == undefined ? "" : ((userAd).filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active === 0)).length} объявлений</span>}
                          {sellerId != id && <a className="SellerInfoloarmore"/>} */}
                        </>
                      ) : ("")) : ("")}
                  </div>
                  {/* {matchesMobile ?
                    (
                      <>
                        <span style={{marginLeft: "0px"}}
                              className="count__ad">{userAd == undefined ? "" : ((userAd).filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active === 0)).length} объявлений</span>
                      </>
                    ) : null} */}

                  {sellerId !== id ?
                    mobile ? '' :
                      <div className="ad__block_bottom__adaptive_left">
                        <Tooltip title='Подписаться' classes={{tooltip: classes.tooltip, arrow: classes.arrow}} arrow>
                          <button onClick={() => subscribeUser()} disabled={loading}
                                  className={`SellerInfoUserAdd ${userBool ? 'SellerInfoUserAdd__active' : ''}`}></button>
                        </Tooltip>
                      </div>
                    : ''
                  }
                </div>




                {/* {status === 7 && sellerId === id ? !matchesMobile && !matchesTablet ? <a className="SellerInfoUserAdd"></a> : "" : ""} */}

                {mobile ? (
                  matchesTablet | matchesMobile ? null : (
                    <>
                      <div className="SellerProductInfo">
                        {sellerId != id && <span
                          className="count__ad">{userAd == undefined ? "" : ((userAd).filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active === 0)).length} объявлений</span>}
                        {sellerId != id && <a className="SellerInfoloarmore">&nbsp;</a>}
                      </div>
                    </>
                  )
                ) : (
                  ""
                )}
            </>
            }
            
        </div>
      </div>
      


    </>
  )
}

export default ProductUser;

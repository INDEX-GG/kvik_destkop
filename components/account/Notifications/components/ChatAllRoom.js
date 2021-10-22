import React from 'react';
import {chatPush, generateProductPhoto, generateTime} from "../tabs/chatFunctions";
import {STATIC_URL} from "../../../../lib/constants";
import ChatDefaultAvatar from "./ChatDefaultAvatar";
import {useAuth} from "../../../../lib/Context/AuthCTX";
import {ellipsis} from "../../../../lib/services";
import {useRouter} from "next/router";
import {useMedia} from "../../../../hooks/useMedia";

const ChatAllRoom = ({allRooms, setData}) => {

  const {id} = useAuth();
  const router = useRouter()
  const {matchesMobile, matchesTablet} = useMedia()

  const handleClickUser = (e, senderId) => {
    e.stopPropagation();
    if (senderId == id) return;

    router.push(`/user/${senderId}`)
  }

  const handleClickProduct = (e, productId) => {
    e.stopPropagation();
    router.push(`/product/${productId}`)
  }

  const onSenderMessage = (senderMessage) => {
    if (senderMessage) {

      if (senderMessage.match('images/ch')) {
        if (senderMessage.match('.webp')) {
          return {img: true, src: `${STATIC_URL}/${senderMessage}`}
        }
      }

      return senderMessage
    }

    return null
  }

  const changeChat = (data) => {
    const routerObj = {
      id,
      companion_id: data?.seller_id == id ? data?.customer_id : data?.seller_id,
      product_id: data?.product_id,
      mobile: matchesMobile || matchesTablet
    }
    chatPush(router, routerObj)
  }

  return (
      <>
        {allRooms?.length ?
            allRooms.map((item, i) => {

              const productPhoto = generateProductPhoto(item.product_photo)
              const time = item.time && generateTime(0, item.time)

              const senderPhoto =
                  (item.seller_id === id ?
                      item?.sender_id === id ? item?.seller_photo : item?.customer_photo
                      : item?.sender_id == id ? item?.customer_photo : item?.seller_photo)

              const senderName =
                  (item.seller_id === id ?
                      item?.sender_id === id ? item?.seller_name : item?.customer_name
                      : item?.sender_id == id ? item?.customer_name : item?.seller_name)

              const senderMessage = item?.message && onSenderMessage(item?.message)

              return (
                  <a key={i} className="messageDialog"
                     onClick={() => {
                       matchesMobile || matchesTablet ? setData?.setMessageModal(true) : null
                       changeChat(allRooms[i]);
                       setData?.setLoadingRoom(true)
                     }
                     }>
                    <div className="messageOffer small">
                      <div className="messageDiaCheck">
                        <label className="checkbox">
                          <input type="checkbox" />
                          <div className="checkbox__text"></div>
                        </label>
                      </div>
                      <div className='messageProductBlock' onClick={(e) => handleClickProduct(e, item?.product_id)}>
                        <img src={`${STATIC_URL}/${productPhoto}?${item.product_id}`} />
                        <div>{item.product_price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</div>
                        <div>{ellipsis(item.product_name, 12)}</div>
                      </div>
                    </div>
                    <div className="messageUser small">
                      <div onClick={(e) => handleClickUser(e, item?.sender_id)} className="messageUserBlock">
                        <span>
                            {senderPhoto ? <img src={`${STATIC_URL}/${senderPhoto}`} /> :
                                senderName && <ChatDefaultAvatar name={senderName}/>
                            }
                        </span>
                        <div>
                          <div>{senderName}</div>
                          <div className="light">{time}</div>
                        </div>
                      </div>
                      {senderMessage ? senderMessage?.img ?
                          <div className='light messageMiniatureBlock'>
                            <span>Фотография: </span>
                            <img src={senderMessage.src} alt='miniatureImg'  className="messageMiniatureImg"/>
                          </div>:
                          <div className="light">{ellipsis(senderMessage, 20)}</div> : null
                      }
                    </div>
                  </a>
              )
            })
            : null
        }
      </>
  );
};

export default ChatAllRoom;
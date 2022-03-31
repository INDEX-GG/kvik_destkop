import React from 'react';
import {chatPush, generateProductPhoto, generateTime} from "../tabs/chatFunctions";
import {STATIC_URL} from "../../../../lib/constants";
import ChatDefaultAvatar from "./ChatDefaultAvatar";
import {useAuth} from "../../../../lib/Context/AuthCTX";
import {ellipsis} from "../../../../lib/services";
import {useRouter} from "next/router";
import {useMedia} from "../../../../hooks/useMedia";
import ChatMessageIsSend from '../../../../UI/icons/ChatMessageIsSend';
import ChatMessageIsRead from '../../../../UI/icons/ChatMessageIsRead';
import { Divider } from '@material-ui/core';
import Loader from '#UI/icons/Loader';

const ChatAllRoom = ({allRooms, setData,loadingAllRooms}) => {

  const {id} = useAuth();
  const router = useRouter()
  const {matchesMobile, matchesTablet} = useMedia()

  console.log(router);

  //! Клик на пользлвателя
  const handleClickUser = (e, senderId) => {
    e.stopPropagation();
    if (senderId == id) return;

    router.push(`/user/${senderId}`)
  }

  // Клик на объявление
  const handleClickProduct = ( productId) => {
    // e.stopPropagation();
    router.push(`/product/${productId}`)
  }

  // Клик на Чекбокс
  const handleClickСheckbox = (e) => {
    e.stopPropagation()
  }

  // Миниатюра фоток, если пользователь отправиль картинку
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

  // Изменение комнаты
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
      {/* Чекбокс и удалить над списком сообщений */}
        { matchesMobile || matchesTablet
        ? <Divider/>
        : <div className="clientPage__container_nav__radio">
            <label className="checkbox">
              <input type="checkbox"/>
              <div className="checkbox__text"></div>
              <div style={{margin: '0px 0px 0px 25px'}}>Удалить</div>
            </label>
          </div>
        }
    
        <div className='messageDialogsStyles'>
        {loadingAllRooms && !matchesMobile && <div className='offer__placeholder_loader messagePlaceholder'><Loader/></div>}
        {allRooms?.length ?
            allRooms.map((item, i) => {

              const productPhoto = generateProductPhoto(item.product_photo)
              const time = item.time && generateTime(0, item.time, true)

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
                       setData?.setLocalRoom(false)
                     }
                     }
                     >
                       <form>
                    <div className="messageOffer small">
                      <div className="messageDiaCheck"  onClick={(e) => handleClickСheckbox(e)}>
                        <label className="checkbox">
                          <input type="checkbox"/>
                          <div className="checkbox__text"></div>
                        </label>
                      </div>
                      <div className='messageProductBlock' onClick={(e) => handleClickProduct(e, item?.product_id)}>
                        <img src={`${STATIC_URL}/${productPhoto}?${item.product_id}`} />
                        {/* <div>{item?.product_price && item.product_price?.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</div>
                        <div>{ellipsis(item.product_name, 12)}</div> */}
                      </div>
                    </div>
                    </form>
                    <div className="messageUser small">
                      <div onClick={(e) => handleClickUser(e, item?.sender_id)} className="messageUserBlock">
                        <span >
                            {senderPhoto ? <img src={`${STATIC_URL}/${senderPhoto}`} /> :
                                senderName && <ChatDefaultAvatar name={senderName}/>
                              }
                        </span >
                        <div>
                          <div>{senderName}</div>
                          <div className="messageUserBlockRight">
                            <div className="messageUserBlockStatus">{id === item?.sender_id ? (item?.messages_is_read ? <ChatMessageIsRead /> : <ChatMessageIsSend />) : null }</div>
                            <div className="messageUserBlockTime">{time}</div>
                          </div>
                        </div>
                      </div>
                      {senderMessage ?
                      senderMessage?.img ?
                      <div className='light messageMiniatureBlock'>
                        <span>Фотография: </span>
                        <img src={senderMessage.src} alt='miniatureImg'  className="messageMiniatureImg"/>
                      </div>:
                          <>
                            <div className='messageUserBlockInfo'>
                              <div className='messageUserBlockName'>{ellipsis(item.product_name, matchesMobile ? 20 : 50)}</div>
                              <div className='messageUserBlockPrice'>{item?.product_price && item.product_price?.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</div>
                            </div>
                          <div className="light">{ellipsis(senderMessage, 40)}</div>
                          </>
                          : null
                        }

                      {/* стили для мобильной верстки, ждут пока подвяжем логику */}
                      {/* <p className='previewPrice'>30 000 Р/Мес</p>
                      <p className='previewDesc'>2-х комнатная квартира, 95 м</p>
                      <p className='previewMessage'>Здравствуйте подскажите пожал</p> */}
                      {/* стили для мобильной верстки, ждут пока подвяжем логику */}

                    </div>
                  </a>
              )
            })
            : null
        }
        </div>
      </>
  );
};

export default ChatAllRoom;

import React, {useEffect, useState} from "react";
import {Dialog} from "@material-ui/core";
import { ModalMessage } from "../../../Modals";
import { useMedia } from "../../../../hooks/useMedia"
import Chat from "./Chat";
import { useRouter } from "next/router";
import { useAuth } from "../../../../lib/Context/AuthCTX";
import { CHAT_URL_API, STATIC_URL } from "../../../../lib/constants";
import axios from "axios";
import { useStore } from "../../../../lib/Context/Store";
import { generateTime, generateProductPhoto, generateDataToken, chatPush } from "./chatFunctions";
import { askForPermissioToReceiveNotifications, initializeFirebase } from '../../../../firebase/clientApp';
import registerServiceWorkerNoSSR from '../../../../firebase/InitServiceWorker'
import ChatDefaultAvatar from "../components/ChatDefaultAvatar";
import Loader from "../../../../UI/icons/Loader";
import ChatPlaceholder from "../../../../UI/icons/ChatPlaceholder";


function Messages() {

  function ellipsis(string, count) {
    if (string.length > count) {
      return `${string.substr(0, count - 1)}...`;
    } else {
      return string;
    }
  }

  const [messageModal, setMessageModal] = useState(false)
  const [room, setRoom] = useState({})
  const [allRooms, setAllRooms] = useState([])
  const [chatUsers, setChatUsers] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingRoom, setLoadingRoom] = useState(true);


  const {query} = useRouter()
  const router = useRouter()
  const {id} = useAuth()
  const {userInfo} = useStore()
  const {matchesTablet, matchesMobile} = useMedia()

  useEffect(() => setLoading(true), [])

  useEffect(() => {
    initializeFirebase()
    registerServiceWorkerNoSSR()
    const token = askForPermissioToReceiveNotifications()
    if (id) {
      try {
        generateDataToken(id, token)
      } catch(e) {
        console.log(e)
      }
    }
  }, [loading, id])


  function changeModal() {
    setMessageModal(!messageModal)
    router.push({
      pathname: `/account/${id}`,
      query: {
        account: 5,
        content: 1
      }
    })
  }


  useEffect(() => {
    if (id && query?.companion_id) {
      const obj = {
        "page_limit": 50,
        "last_message_id": 0,
        "user_id": id,
        "companion_id": +query?.companion_id,
        "product_id": +query?.product_id
      }

      if (obj.companion_id && obj.product_id) {
        axios.post(`${CHAT_URL_API}/chat_history`, obj).then(r => {
          axios.post(`/api/roomInfo`, [r.data.room])
              .then(r => {
                setRoom(r.data.list[0])
                setLoadingRoom(false)
              })
        })
      }
    }
  }, [id, query])



  useEffect(() => {
    if (query?.companion_id && id && userInfo?.name) {
      const sender = {"id": id, "name": userInfo?.name}
      const recipient = {
        'id': +query?.companion_id
      }
      const product = {"id": +query?.product_id}
      setChatUsers({sender, recipient, product})
    }
  }, [query, id, userInfo])

  useEffect(() => {
    if (id) {
      axios.post(`${CHAT_URL_API}/chat_last_messages`, {"user_id": id})
          .then(r => {
            axios.post(`/api/roomInfo`, r.data.data)
                .then(r => {
                  setAllRooms(r.data.list)
                })
          })
    }
  }, [id])

  useEffect(() => {
    if (!matchesTablet && !matchesMobile && messageModal) {
      setMessageModal(false)
      router.push({
        pathname: `/account/${id}`,
        query: {
          account: 5,
          content: 1,
          companion_id: chatUsers?.recipient?.id,
          product_id: chatUsers?.product?.id
        }
      })
    }
  })

  useEffect(() => {
    if (query?.mobile && room) {
      if (!messageModal) {
        setMessageModal(true)
      }
    }
  }, [room])

  const changeChat = (data) => {
    const routerObj = {
      id,
      companion_id: data?.seller_id == id ? data?.customer_id : data?.seller_id,
      product_id: data?.product_id,
      mobile: matchesMobile || matchesTablet
    }
    chatPush(router, routerObj)
  }

  const handleClickUser = (e, senderId) =>  {
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


  return (
      (
          // 	<div className="clientPage__container_bottom">
          //     <div className="clientPage__container_content">
          //       <div className="notInfContainer">
          //         <div className="notInf__title">Здесь буду ваши диалоги</div>
          //         <p className="notInf__subtitle">
          //           Нажмите на иконку чата, чтобы договориться
          //           <br /> о покупке или продаже товаров и услуг
          //         </p>
          //       </div>
          //     </div>
          //   </div>
          !'1'
      ) || (
          <div className="clientPage__container_bottom">
            <div className="clientPage__container_nav__radio">
              <label className="checkbox">
                <input type="checkbox" />
                <div className="checkbox__text"></div>
              </label>
              <a>Удалить</a>
              <a>Заблокировать</a>
            </div>
            <div className="clientPage__container_content">
              <div className="messageContainer">
                <div className="messageDialogs">
                  {allRooms?.length ?
                      allRooms.map((item, i) => {

                        const productPhoto = generateProductPhoto(item.product_photo)
                        const time = generateTime(0, item.time)

                        const senderPhoto =
                            (item.seller_id === id ?
                                item?.sender_id === id ? item?.seller_photo : item?.customer_photo
                                : item?.sender_id == id ? item?.customer_photo : item?.seller_photo)

                        const senderName =
                            (item.seller_id === id ?
                                item?.sender_id === id ? item?.seller_name : item?.customer_name
                                : item?.sender_id == id ? item?.customer_name : item?.seller_name)

                        const senderMessage = onSenderMessage(item?.message)

                        return (
                            <a key={i} className="messageDialog"
                               onClick={() => {
                                 matchesMobile || matchesTablet ? setMessageModal(true) : null
                                 changeChat(allRooms[i]);
                                 setLoadingRoom(true)
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
                                {senderMessage?.img ?
                                    <div className='light messageMiniatureBlock'>
                                      <span>Фотография: </span>
                                      <img src={senderMessage.src} alt='miniatureImg'  className="messageMiniatureImg"/>
                                    </div>:
                                    <div className="light">{ellipsis(senderMessage, 20)}</div>
                                }
                              </div>
                            </a>
                        )
                      })
                      : null
                  }
                </div>
                {!router.query?.companion_id && !router.query?.product_id ? (
                        <div className='chatPlaceholder'>
                          <h2>Для начала переписки выберете чат</h2>
                          <div className='chatPlaceholderCircleBlock'>
                            <ChatPlaceholder/>
                            <ChatPlaceholder/>
                            <ChatPlaceholder/>
                          </div>
                        </div>
                    ) :
                  loadingRoom ?
                    <div className='offer__placeholder_loader messagePlaceholder'><Loader /></div> :
                    <div className="messageWindow">
                      {room?.seller_id ?
                          <div className="messageHeader small">
                            <img src={`${STATIC_URL}/${generateProductPhoto(room?.product_photo)}`}/>
                            <div>
                              <div>
                                <div>
                                  <div>{room?.seller_name}</div>
                                  <div className="light">00.00.00 00:00</div>
                                </div>
                                {room?.seller_photo ? <img src={`${STATIC_URL}/${room?.seller_photo}`} /> :
                                    <ChatDefaultAvatar name={room?.seller_name}/>}
                              </div>
                              <div>{room?.product_price} ₽</div>
                              <div>{room?.product_name}</div>
                            </div>
                          </div> : null}
                      {chatUsers?.product && chatUsers?.recipient && chatUsers?.sender &&
                      <Chat
                          usersData={chatUsers}
                          userChatPhoto={room?.customer_id == id ? room?.seller_photo : room?.customer_photo}
                          userChatName={room?.customer_id == id ? room?.seller_name : room?.customer_name}
                      />}
                    </div>}
              </div>
            </div>
            <Dialog open={messageModal || false} onClose={() => setMessageModal(!messageModal)} fullScreen={true}>
              <ModalMessage
                  modal={changeModal}
                  usersData={chatUsers}
                  room={room}
                  loadingRoom={loadingRoom}
                  userChatPhoto={room?.customer_id == id ? room?.seller_photo : room?.customer_photo}
                  userChatName={room?.customer_id == id ? room?.seller_name : room?.customer_name}
              />
            </Dialog>
          </div>
      )
  );
}

export default Messages;

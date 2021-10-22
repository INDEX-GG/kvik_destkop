import React, {useEffect, useState} from "react";
import {Dialog} from "@material-ui/core";
import {ModalMessage} from "../../../Modals";
import {useMedia} from "../../../../hooks/useMedia"
import Chat from "./Chat";
import {useRouter} from "next/router";
import {useAuth} from "../../../../lib/Context/AuthCTX";
import {CHAT_URL_API, STATIC_URL} from "../../../../lib/constants";
import axios from "axios";
import {useStore} from "../../../../lib/Context/Store";
import {generateProductPhoto, generateDataToken} from "./chatFunctions";
import {askForPermissioToReceiveNotifications, initializeFirebase} from '../../../../firebase/clientApp';
import registerServiceWorkerNoSSR from '../../../../firebase/InitServiceWorker'
import ChatDefaultAvatar from "../components/ChatDefaultAvatar";
import Loader from "../../../../UI/icons/Loader";
import ChatPlaceholder from "../../../../UI/icons/ChatPlaceholder";
import ChatAllRoom from "../components/ChatAllRoom";


function Messages() {

  const [messageModal, setMessageModal] = useState(false)
  const [room, setRoom] = useState({})
  const [allRooms, setAllRooms] = useState([])
  const [chatUsers, setChatUsers] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingRoom, setLoadingRoom] = useState(true);
  const [loadingAllRooms, setLoadingAllRooms] = useState(true)

  //! Сценарий для комнаты, которой ещё нет в база и на сокете
  const [localRoom, setLocalRoom] = useState(false);
  const [localHistoryMessage, setLocalHistoryMessage] = useState(false);


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
      } catch (e) {
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
                console.log(allRooms);
                setRoom(r.data.list[0])
                setLoadingRoom(false)
              })
        })
      }
    }
  }, [id, query])

  //Добовление несуществующей комнаты в список (Если нет сообщений в диалоге)
  useEffect(() => {
    if (router?.query) {
      const productId = router.query.product_id;

      if (room && !loadingAllRooms) {
        const findItem = allRooms?.find(item => item.product_id == productId);
        if (!findItem) {
          console.log(findItem)
          setLocalRoom(true)
        }
      }
    }
  }, [room, allRooms, router])

  useEffect(() => {
    if (localRoom) {
      const sendObj2 = {
        "customer_id": room?.customer_id,
        "product_id": room?.product_id,
        "seller_id": room?.seller_id,
        "product_name": room?.product_name,
        "product_photo": room?.product_photo,
        "product_price": room?.product_price,
        "seller_name": room?.customer_name,
        "seller_photo": room?.customer_photo,
        'time': localHistoryMessage?.time,
        'message': localHistoryMessage?.message,
      }

      if (localHistoryMessage?.message) {
        const productId = router.query.product_id;
        const findItem = allRooms?.find(item => item.product_id == productId);


        if (!findItem) {
          setAllRooms(prev => {
            if (prev) {
              return [sendObj2, ...prev]
            } else {
              return [sendObj2]
            }
          })
          console.log(localHistoryMessage)
        } else {
          setAllRooms(prev => {
            return [sendObj2, ...prev.splice(1,)]
          })
        }
      }
    }
  }, [localHistoryMessage])


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
                  setLoadingAllRooms(false)
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


  return (
      !loadingAllRooms && !allRooms?.length && !room.product_id ?
        <div className="clientPage__container_bottom">
          <div className="clientPage__container_content">
            <div className="notInfContainer">
              <div className="notInf__title">Здесь буду ваши диалоги</div>
              <p className="notInf__subtitle">
                Нажмите на иконку чата, чтобы договориться
                <br /> о покупке или продаже товаров и услуг
              </p>
            </div>
          </div>
        </div> :
      (
          <div className="clientPage__container_bottom">
            <div className="clientPage__container_nav__radio">
              <label className="checkbox">
                <input type="checkbox"/>
                <div className="checkbox__text"></div>
              </label>
              <a>Удалить</a>
              <a>Заблокировать</a>
            </div>
            <div className="clientPage__container_content">
              <div className="messageContainer">
                <div className="messageDialogs">
                  {loadingAllRooms ? <div className='offer__placeholder_loader messagePlaceholder'><Loader/></div> :
                      <ChatAllRoom allRooms={allRooms} setData={{setLoadingRoom, setMessageModal}}/>}
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
                        <div className='offer__placeholder_loader messagePlaceholder'><Loader/></div> :
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
                                    {room?.seller_photo ? <img src={`${STATIC_URL}/${room?.seller_photo}`}/> :
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
                              localRoom={localRoom ? {
                                'room': localRoom,
                                'setLocalMessage': setLocalHistoryMessage
                              } : null}
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
  )
}

export default Messages;

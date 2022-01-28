import React, {useEffect, useRef, useState} from 'react';
import {useAuth} from '../../../../lib/Context/AuthCTX'
import router, {useRouter} from 'next/router';
import {useStore} from '../../../../lib/Context/Store';
import axios from 'axios';
import {BASE_URL, CHAT_URL_API, STATIC_URL} from '../../../../lib/constants';
import {socket} from './socket';
import {generateTime} from './chatFunctions';
import {Dialog, TextField, makeStyles} from "@material-ui/core";
// import ChatDefaultAvatar from "../components/ChatDefaultAvatar";
import {ellipsis} from "../../../../lib/services";
import ChatUserMessage from "../components/ChatUserMessage";
import ChatSmile from '../../../../UI/icons/ChatSmile';
// import {useMedia} from "../../../../hooks/useMedia";
// import useMoment from 'moment-timezone'
import dynamic from 'next/dynamic'
import {getTokenDataByPost} from "../../../../lib/fetch";

const NoSsrEmoji = dynamic(() => import('../components/ChatEmoji'), {ssr: false})

const useStyles = makeStyles(() => ({
  noBorder: {
    border: "none",
  },
  inputMessage: {
    height: 'auto',
    margin: '0 8px',
    minHeight: '31px',

    '@media (max-width: 450px)': {
      minHeight: '31px',
    },
    '& .MuiOutlinedInput-multiline': {
      padding: '6px 0 7px',
    }
  }
}));

const Chat = ({usersData, userChatPhoto, userChatName, /** localRoom, */ setLocalMessage}) => {

  const [message, setMessage] = useState('');
  const [msgList, setMsgList] = useState();
  const [messageId, setMessageId] = useState(null)
  const [messageUpdate, setMessageUpdate] = useState(false)
  const [userOnline, setUserOnline] = useState(false)
  const [loading, setLoading] = useState(true)
  const [socketConnect, setSocketConnect] = useState(false)
  const [fullScreenImg, setFullScreenImg] = useState({state: false, src: ''})
  const [historyMessageLength, setHistoryMessageLength] = useState(false)
  const [userTyping, setUserTyping] = useState(false);
  const [internetConnect, setInternetConnect] = useState(true);
  const [smileList, setSmileList] = useState(false);
  const [innerSmileList, setInnerSmileList] = useState(false);
  //! Убрать всё, что како-то связанно с оффлайн сообщениями
  const [offlineMessages, setOfflineMessage] = useState('');

  const refChat = useRef()
  const refInput = useRef()
  const refMessage = useRef()
  const observer = useRef()
  const refMessageChatInput = useRef()

  const {userInfo} = useStore()
  const {query, asPath} = useRouter()
  const {id, token} = useAuth()
  const classes = useStyles()
  // const {matchesMobile, matchesTablet} = useMedia()

  let isFirstParentMessage = false; // флаг для первого сообщения собеседника

  const socketLeave = () => {
    socket.emit('leave', {
      'sender': usersData?.sender,
      'recipient': usersData?.recipient,
      'product': usersData?.product
    })
    socket.disconnect()
  }

  const socketJoin = () => {
    chatHistory()
    socket.emit('join', {
      'sender': usersData?.sender,
      'recipient': usersData?.recipient,
      'product': usersData?.product
    })
  }

  useEffect(() => {
    setOfflineMessage(localStorage.getItem('offlineMessages'))
  }, [])


  useEffect(() => {
    window.addEventListener('offline', () => {
      socketLeave()
      setInternetConnect(false)
      console.log('123')
    })

    window.addEventListener('online', () => {
      socketJoin()
      setInternetConnect(true)
    })
  }, [])

  // при возрастании поля ввода остальные кнопкиотображаем снизу
  const handlerInputChange = (e) => {
    const heightInput =+e.target.scrollHeight;
    refMessageChatInput.current.style.alignItems = 'center'

    if(heightInput > 17 && e.target.value.trim().length && (e.target.value !== '' || e.target.value !== '\n')) {
      refMessageChatInput.current.style.alignItems = 'flex-end'
    }
    if(e.target.value !== '\n') {
      setMessage(e.target.value)
    }
  }

  // Подгружаем конечную историю переписки (Последние 50 сообщений)
  const chatHistory = () => {
    const historyObj = generateChatHistory()

    if (historyObj.companion_id && historyObj.product_id) {
      try {
        getTokenDataByPost(`${CHAT_URL_API}/chat_history`, historyObj, token).then(r => {
          if (userOnline) setUserOnline(false)

          console.log("SOCKET CONNECT")

          setMsgList([...r.data.reverse()])

          if (r.data.length) setMessageId(r.data[0]?.id)

          setSocketConnect(true)
          setLoading(false)
          socket.connect()
        })
      } catch (e) {
        console.log(e);
      }
    }
  }


  //Отслеживаем находится ли пользователь на вкладке с чатом. Если вкалдка не активна (работает в фоновом режиме, то отключаемя от сокета)
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        socketLeave()
      } else {
        socketJoin()
      }
    });
  }, []);

  // Принудительное переподключение к сокету
  useEffect(() => {
    if (socketConnect) {
      socket.emit('leave', {
        'sender': usersData?.sender,
        'recipient': usersData?.recipient,
        'product': usersData?.product
      })
      socket.disconnect()
      socket.emit('join', {
        'sender': usersData?.sender,
        'recipient': usersData?.recipient,
        'product': usersData?.product
      })
      setMessageUpdate(false)
    }
  }, [usersData?.sender])

  // ОТКЛЮЧЕНИЕ ОТ СОКЕТА
  useEffect(() => {
    return (() => {
      if (socketConnect) {
        setUserOnline(false)
        setSocketConnect(false)
        console.log("SOCKET DISCONNECT")
        socket.emit('leave', {
          'sender': usersData?.sender,
          'recipient': usersData?.recipient,
          'product': usersData?.product
        })
        socket.disconnect()
      }
    })
  }, [socketConnect])

  // Функция сделанная для удобства (Пото переместить)
  const generateChatHistory = (messageId = 0) => {
    return {
      "page_limit": 50,
      "last_message_id": messageId,
      "user_id": id,
      "companion_id": +query?.companion_id,
      "product_id": +query?.product_id
    }
  }

  const addOfflineMessages = (sendObj) => {
    if (!internetConnect) {
      if (!offlineMessages) {
        localStorage.setItem('offlineMessages', JSON.stringify([{...sendObj, offline: true}]));
      } else {
        localStorage.setItem('offlineMessages', JSON.stringify([...JSON.parse(offlineMessages), {
          ...sendObj,
          offline: true
        }]));
      }

    }
  }

  // useEffect(() => {
  //   return(() => {
  //     generatePush({message: '2323'})
  //   })
  // }, [window])

  // Пуш уведомления другому пользователю. Срабатывает, когда другой пользователь не находится на сокете
  const generatePush = (sendObj) => {
    const img = sendObj.message.match('images/ch/') ? sendObj.message.match('.webp') ? true : false : false

    console.log(asPath);

    if (usersData?.recipient?.id && userInfo?.name) {

      console.log(asPath.split('?')[1].split('&'))
      console.log(router.query)

      const pushObj = {
        'from_user_id': id,
        'user_id': usersData?.recipient.id,
        'message': ellipsis(img ? 'Вам отправили фото' : sendObj.message, 20),
        'user_name': userInfo.name,
        "image": img ? `${STATIC_URL}/${sendObj.message}` : '',
        "icon": `${BASE_URL}/logo.png`,
        "click_action": `${BASE_URL}/account/${router?.query?.companion_id}?account=5&content=1&companion_id=${id}&product_id=${router?.query?.product_id}`,
      }

      try {
        getTokenDataByPost(`${CHAT_URL_API}/send_push`, pushObj, token)
      } catch (e) {
        console.log(e)
      }
    }
  }

  // Срабатывает когда пользователь зашёл в чат. Вызывает фунцкию, которая подгружает истоию сообщений
  useEffect(() => {
    if (query?.companion_id && query?.product_id && userInfo?.name && id) {
      socket.emit('join', {
        'sender': usersData?.sender,
        'recipient': usersData?.recipient,
        'product': usersData?.product
      })
      chatHistory()
    }
  }, [query, userInfo, id])

  // Скролл чата
  useEffect(() => {
    // Скорлит вниз, когда отправляем сообщение.
    if (refChat.current && !messageUpdate) {
      setTimeout(() => {
        refChat.current.scrollTop = refChat.current.scrollHeight
      }, 500)
    } else {
      // Срабатывает, когда подгружаем историю сообщений (скролл вверх)
      refChat.current.scrollTop = refChat.current.scrollHeight - ((msgList.length - historyMessageLength) * 78)
      return;
    }
    //! Дефолтное срабатывание (На всякий случей)
    refChat.current.scrollTop = refChat.current.scrollHeight
  }, [msgList])

  // Отправка сообщений (Параметр img - говорит если в чат отправляется картинка).
  const handleSend = async (img = false) => {
    if (message.trim().length > 0 || img) {
      let date = new Date()
      const messageDate = {
        "y": date.getFullYear(),
        "mo": date.getMonth() + 1,
        "d": date.getDate(),
        "h": date.getHours(),
        "mi": date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
      }

      const sendObj = {
        'delete': false,
        'message': img ? img : message,
        'messages_is_read': false,
        'recipient': usersData?.recipient,
        'sender': usersData?.sender,
        'sender_id': usersData?.sender.id,
        'product': usersData?.product,
        'time': JSON.stringify(messageDate),
      }


      await socket.emit('text', sendObj)

      addOfflineMessages(sendObj)

      setUserTyping(false);
      setMessage('')
      if (userOnline) setUserOnline(false)

      if (!userOnline && internetConnect) {
        generatePush(sendObj)
      }

    }
  }

  // Срабатывает, когда мы печатаем или отпровляем сообщение
  useEffect(() => {
    if (!loading) {
      socket.on('message', async (data) => {
        switch (data?.msg) {
          case ('user_online'):
            if (!userOnline && data?.user_on !== id) {
              setUserOnline(true)
              // console.log(data.msg);
            }
            break;
          case ('user_join'):
            if (!userOnline && data?.user_jo !== id) setUserOnline(true)
            break;
          case ('user_typing'):
            // console.log(data?.msg)
            setUserTyping(true)
            break;
          case ('msg_to_looooong'):
            break;
          case('user_leave'):
            setUserOnline(false)
            break;
          default: {
            break
          }
        }

        if (!data.msg) {
          if (data.sender?.id != id) {
            socket.emit('online', {
              'sender': usersData?.sender,
              'recipient': usersData?.recipient,
              'product': usersData?.product
            })
          }

          if (!offlineMessages) {
            setMsgList(prev => [...prev, data])
          } else {
            setMsgList(prev => {
              const prevLength = prev.length
              const offlineMessagesArr = JSON.parse(offlineMessages)
              return [...prev.splice(0, prevLength - offlineMessagesArr.length), data, ...offlineMessagesArr]
            })
          }
          // ...JSON.parse(offlineMessages)

          if (router.query?.newRoom == 'true') {
            setLocalMessage(data);
          }
        }
      })
    }
  }, [loading])


  // Подгружаем историю переписки, когда скроллим вверх
  const addChatHistory = () => {
    const objHistory = generateChatHistory(messageId)

    if (objHistory.companion_id && objHistory.companion_id) {
      try {
        getTokenDataByPost(`${CHAT_URL_API}/chat_history`, objHistory, token).then(r => {
          if (r?.data?.length) {
            setMessageId(r.data.reverse()[0]?.id)
            setMessageUpdate(true)
            setHistoryMessageLength(r.data.length)
            setMsgList(prev => [...r.data, ...prev])
          }
        })
      } catch(e) {
        console.log(e)
      }
    }
  }

  // Срабатывает, когда пользователь долистал до первого сообщения
  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    if (refMessage.current && msgList) {
      const callback = function (entries) {
        if (entries[0].isIntersecting) {
          addChatHistory()
        }
      };
      observer.current = new IntersectionObserver(callback);
      observer.current.observe(refMessage.current);
    }
  });

  // Генерирует задний фон сообзениям
  // const generateBackgroundMessage = (senderId, read, offline) => {
  //   if (senderId == id) {

  //     if (offline) {
  //       return '#f23022'
  //     }

  //     if (userOnline) {
  //       return '#e9e9e9'
  //     } else {
  //       if (!read) return '#02bac7'
  //       return '#e9e9e9'
  //     }
  //   }
  // }

  // // Генерирует статус сообщениям
  // const generateMessageStatus = (senderId, read, offline = false) => {
  //   if (senderId == id) {

  //     if (offline) {
  //       return 'Ошибка при отправке'
  //     }

  //     if (userOnline) {
  //       return 'Прочитано'
  //     } else {
  //       if (!read) return 'Доставлено'
  //       return 'Прочитано'
  //     }
  //   }
  // }


  // События нажатия клавиш внутри input
  const handleKeyDown = (e) => {
    socket.emit('typing', {
      'sender': usersData?.sender,
      'recipient': usersData?.recipient,
      'product': usersData?.product
    })
    if (messageUpdate) setMessageUpdate(false)
    if (e.key == 'Enter') {
      handleSend()
    }
  }

  // Открытие скрытого инпута для добовления фоток
  const handleInputClick = () => {
    refInput.current.click()
  }
  // Отправление фоток в чат
  const handleChangeFile = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const image = new Image();

    if (file?.type?.match('image')) {
      reader.onloadend = (e) => {
        const photoData = new FormData();
        photoData.append('files[]', file);

        image.src = e.target.result

        image.onload = () => {
          console.log(image.height)
        }


        axios.post(`${STATIC_URL}/chat/${id}`, photoData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token
          }
        }).then(r => {
          const img = r.data?.images?.photos;
          if (img) handleSend(`${img}`)
        })

      }

      reader.readAsDataURL(file)
    }
  }

  //! ГЕНЕРАЦИЯ ВРЕМЕНИ ДЛЯ КАЖДОГО СООБЩЕНИЯ
  // const generateMessageData = (index) => {
  // 	const currentItem = index
  // 	const prevItem = index + 1

  // 	if (currentItem < msgList.length && prevItem < msgList.length) {
  // 		const currentItemTime = generateTime(0, msgList[currentItem]?.time, true)
  // 		const prevItemTime = generateTime(0, msgList[prevItem]?.time, true)
  // 		const senderMessage = msgList[currentItem].sender_id
  // 		const prevSenderMessage = msgList[prevItem].sender_id

  // 		if (senderMessage !== prevSenderMessage) {
  // 			return true
  // 		}

  // 		return !(prevItemTime == currentItemTime)
  // 	}
  // }

  // const testDate = () => {
  // 	const d1 = new Date(2017, 2, 11, 11, 30);
  // }


  //! ГЕНИРАЦИЯ ДЛЯ ДИАЛОГОВ (СЕГОДНЯ, ВЧЕРА, 17.10.2021)
  const generateDialogData = (index) => {
    const currentIndex = index
    const prevIndex = index - 1
    const date = new Date()
    const today = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    // const timeUTC = date.getTimezoneOffset() / 60
    // console.log(`${date.getUTCHours() - timeUTC}:${date.getUTCMinutes()}`);

    // const moment = useMoment();
    // console.log(moment.tz.guess())
    // console.log(moment.tz("America/Los_Angeles").format())
    // testDate();


    if (prevIndex >= 0) {

      const prevDate = generateTime(0, msgList[prevIndex].time, false, true).split('.')
      const currentDate = generateTime(0, msgList[currentIndex].time, false, true).split('.')
      const messageStringDate = currentDate.join('.')

      // Проверка дня
      if (currentDate[0] !== prevDate[0]) {

        // Проверка месяца
        if (currentDate[1] !== prevDate[1]) {
          return messageStringDate
        }
        // Проверка года
        if (currentDate[2] !== prevDate[2]) {
          return messageStringDate
        }


        if (messageStringDate == today) {
          return 'Сегодня'
        }

        return messageStringDate
      }

    } else {
      const firstMessageTime = generateTime(0, msgList[index].time, false, true)

      if (firstMessageTime == today) {
        return 'Сегодня'
      }

      return firstMessageTime
    }
  }
  // Модальное окно для фоток
  const openImage = (message) => {
    setFullScreenImg({state: true, src: message})
  }

  // Генерация сообщений. Проверка на картинку или текст отправленный пользователем
  // const generateMessage = (message) => {
  //   if (message.match('images/ch')) {
  //     if (message.match('.webp')) {
  //       const altName = message.split('.webp')[0]
  //       return (
  //         <div onClick={() => openImage(message)}>
  //           <img className='chatImg' src={`${STATIC_URL}/${message}`} alt={altName}/>
  //         </div>
  //       )
  //     }
  //   }

  //   return <span>{message}</span>
  // }

  // const onClickOffline = () => {
  //   console.log(1)
  // }

  const handleHoverSmileIcon = (state) => {
    setSmileList(state)
  }

  useEffect(() => {
    if (!innerSmileList) {
      setSmileList(false)
    }
  }, [innerSmileList])

  useEffect(() => {
    // console.log(userTyping);
  }, [userTyping])


  return (
    <>
      <div ref={refChat} className="messageChats">
        {msgList?.map((item, index) => {
          const myMessage = item?.sender_id == id
          const key = id?.id ? id?.id : index
          // исходный
          const morePartnerMessage = msgList[index ? index - 1 : index]?.sender_id == item.sender_id
          // новый
          // const morePartnerMessage = Boolean(index ? index - 1 : index)
          item.messages_is_read = userOnline ? true : item.messages_is_read

          // const messageData = index == msgList.length - 1 ? true : generateMessageData(index)
          const dialogData = generateDialogData(index);
          let firstPartnerMessage = false;

          if(!myMessage && !isFirstParentMessage) {
            isFirstParentMessage = true
            firstPartnerMessage = true
          }

          return (
            <ChatUserMessage
              index={index}
              key={key}
              keymsg={key}
              item={item}
              dialogData={dialogData}
              refMessage={refMessage}
              messageId={messageId}
              myMessage={myMessage}
              morePartnerMessage={!morePartnerMessage}
              firstPartnerMessage={firstPartnerMessage}
              userChatPhoto={userChatPhoto}
              userChatName={userChatName}
              openImage={openImage}
              userOnline={userOnline}

            />
          )


          // return (
          //   item?.delete ? null :
          //     <>
          //       {dialogData && <div className='chatDataDialog'>{dialogData}</div>}
          //       <div key={key}
          //            ref={item.id == messageId ? refMessage : null}
          //            onClick={() => item?.offline ? onClickOffline() : null}
          //            className={myMessage ? "chatUser" : "chatCompanion"}>
          //         {myMessage ? null :
          //           morePartnerMessage && index - 1 >= 0 ? <div></div> :
          //             userChatPhoto ? <img src={`${STATIC_URL}/${userChatPhoto}`}/> :
          //               <ChatDefaultAvatar name={userChatName}/>
          //         }
          //         <div style={{
          //           backgroundColor: generateBackgroundMessage(item.sender_id, item.messages_is_read, item?.offline),
          //           transition: '.1s all linear'
          //         }}>
          //           {generateMessage(item?.message)}
          //           <div
          //             className='messageStatus'>{generateMessageStatus(item.sender_id, item.messages_is_read, item?.offline)}</div>
          //         </div>
          //         <div>{generateTime(0, item?.time, true)}</div>
          //       </div>
          //     </>
          // )
        })}
      </div>
      {smileList && <NoSsrEmoji visible={setInnerSmileList} setInput={setMessage}/>}
      <div className="messageChatInput" ref={refMessageChatInput}>
          <div className='messageMoreOptions'>
            <button onClick={handleInputClick} className="messageFile">
              <input
                ref={refInput}
                onChange={(e) => handleChangeFile(e)}
                accept='image/jpeg,image/png,image/jpg'
                type='file' hidden/>
            </button>
            <div
              // onMouseLeave={() => handleHoverSmileIcon(false)}
              onMouseEnter={() => handleHoverSmileIcon(true)}
              className='messageSmileIcon'>
              <ChatSmile/>
            </div>
          </div>
          <TextField
            multiline
            maxRows={9}
            value={message}
            maxLength="1000"
            variant="outlined"
            // className="messageInput"
            onKeyDown={handleKeyDown}
            // classes={classes.inputMessage}
            className={`messageInput ${classes.inputMessage}`}
            placeholder="Написать сообщение"
            onChange={handlerInputChange}
            inputProps={{
              maxLength: 1000,
            }}
            InputProps={{
              disableUnderline: true,
              classes: {notchedOutline:classes.noBorder}
            }}
          />
        <button className="messageSend" onClick={() => handleSend()}></button>
      </div>
      <Dialog
        open={fullScreenImg.state}
        onClose={() => setFullScreenImg({state: false, src: ''})}
        // fullScreen={true}
      >
        <div className='fullScreenImg'>
          {fullScreenImg.src && <img src={`${STATIC_URL}/${fullScreenImg.src}`} alt='fullScreenImg'/>}
        </div>
      </Dialog>
    </>
  )
}

export default Chat;

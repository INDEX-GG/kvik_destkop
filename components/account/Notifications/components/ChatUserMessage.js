import React from 'react';
import {STATIC_URL} from "../../../../lib/constants";
import ChatDefaultAvatar from "./ChatDefaultAvatar";
import {generateTime} from "../tabs/chatFunctions";
import {useAuth} from "../../../../lib/Context/AuthCTX";
// import ChatDefaultAvatar from "./ChatDefaultAvatar";
// import {generateTime} from "../tabs/chatFunctions";
import ChatMessageIsSend from '../../../../UI/icons/ChatMessageIsSend';
import ChatMessageIsRead from '../../../../UI/icons/ChatMessageIsRead';

const ChatUserMessage = (
  {
    keymsg,
    item,
    dialogData,
    refMessage,
    messageId,
    myMessage,
    firstPartnerMessage,
    userChatPhoto,
    userChatName,
    openImage,
    userOnline,
  }
) => {

  const {id} = useAuth();


  // Генерирует статус сообщениям
  const generateMessage = (message) => {
    if (message.match('images/ch')) {
      if (message.match('.webp')) {
        const altName = message.split('.webp')[0]
        return (
          <div onClick={() => openImage(message)}>
            <img className='chatImg' src={`${STATIC_URL}/${message}`} alt={altName}/>
          </div>
        )
      }
    }

    return <div className='chatItem'>{item?.message}</div>
  }

  // Генерирует задний фон сообзениям
  // пока закомментил потому что фон всегда одного цвета.
  //
  const generateBackgroundMessage = (senderId, read, offline) => {
    // только у своих сообщений
    if (senderId === id) {

      if (offline) {
        return 'rgba(208, 237, 239, .5)'
        // return '#f23022'
      }

      if (userOnline) {
        return 'rgba(208, 237, 239, .5)'
      } else {
        if (!read) return 'rgba(233, 233, 233, 0.4)'
        return 'rgba(233, 233, 233, 0.4)'
      }

      // исходный
      // if (offline) {
      //   return '#f23022'
      // }
      // if (userOnline) {
      //   return '#e9e9e9'
      // } else {
      //   if (!read) return 'rgba(208, 237, 239, .5)'
      //   return 'rgba(208, 237, 239, .5)'
      // }
    }
  }

  // Генерирует статус сообщениям
  const generateMessageStatus = (senderId, read, offline = false) => {
    if (senderId == id) {

      if (offline) {
        return 'Ошибка при отправке'
      }
//
      if (userOnline) {
        // return 'Прочитано'
        return <ChatMessageIsRead />
      } else {
        // if (!read) return 'Доставлено'
        if (!read) return <ChatMessageIsSend />
        return <ChatMessageIsRead />
      }
    }
  }

  // возвращает сообщение (текст сообщения, время и статус)
  const renderMessage = (item) => {
    return (
      <div style={{
        backgroundColor: generateBackgroundMessage(item.sender_id, item.messages_is_read, item?.offline),
        transition: '.1s all linear'
      }}
      className="chatMessage"
      >
        {generateMessage(item?.message)}
        <div className="messageAdditInfo">
          <div className='messageStatus'>
            {generateMessageStatus(item.sender_id, item.messages_is_read, item?.offline)}
            <div className="messageTime">
              {generateTime(0, item?.time, true)}
            </div>
          </div>
        </div>
        {/* <div>
          {generateTime(0, item?.time, true)}
        </div> */}
      </div>
    )
  }


  return (
    <>
      {dialogData && <div className='chatDataDialog'>{dialogData}</div>}
      {myMessage
        ? (
          <div
              key={keymsg}
              ref={item.id == messageId ? refMessage : null}
              className={myMessage ? "chatUser" : "chatCompanion"}
            >
            {renderMessage(item)}
          </div>
        ):(
          <div className="chatWrapper">
            {/* изначальные условия на отображение аватарки собеседника */}
            {/* {myMessage ? null :
                morePartnerMessage && index - 1 >= 0 ? <div></div> :
            // userChatPhoto ? <img src={`${STATIC_URL}/${userChatPhoto}`}/> :
              userChatPhoto ? <></> :
              <ChatDefaultAvatar name={userChatName}/>
             } */}
            {myMessage
                ? null
                // : morePartnerMessage && Boolean(index >= 0)
                // : morePartnerMessage && index - 1 >= 0
                : firstPartnerMessage
                  ? (
                    userChatPhoto
                      ? <img className="chatCompanionAvatar" src={`${STATIC_URL}/${userChatPhoto}`}/>
                      : <ChatDefaultAvatar name={userChatName}/>
                  ) : <div style={{marginRight: '46px'}}></div>
              }
            <div
                key={keymsg}
                ref={item.id == messageId ? refMessage : null}
                className={myMessage ? "chatUser" : "chatCompanion"}
              >
              {renderMessage(item)}
            </div>
        </div>
        )
      }

    </>
  )
};

export default ChatUserMessage;

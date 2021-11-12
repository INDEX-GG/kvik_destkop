import React from 'react';
import {STATIC_URL} from "../../../../lib/constants";
import ChatDefaultAvatar from "./ChatDefaultAvatar";
import {generateTime} from "../tabs/chatFunctions";
import {useAuth} from "../../../../lib/Context/AuthCTX";
// import ChatDefaultAvatar from "./ChatDefaultAvatar";
// import {generateTime} from "../tabs/chatFunctions";

const ChatUserMessage = (
  {
    index,
    key,
    item,
    dialogData,
    refMessage,
    messageId,
    myMessage,
    morePartnerMessage,
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

    return <div>{item?.message}</div>
  }

  // Генерирует задний фон сообзениям
  const generateBackgroundMessage = (senderId, read, offline) => {
    if (senderId === id) {

      if (offline) {
        return '#f23022'
      }

      if (userOnline) {
        return '#e9e9e9'
      } else {
        if (!read) return '#02bac7'
        return '#e9e9e9'
      }
    }
  }

  // Генерирует статус сообщениям
  const generateMessageStatus = (senderId, read, offline = false) => {
    if (senderId == id) {

      if (offline) {
        return 'Ошибка при отправке'
      }

      if (userOnline) {
        return 'Прочитано'
      } else {
        if (!read) return 'Доставлено'
        return 'Прочитано'
      }
    }
  }

  console.log(1);

  return (
    <>
      {dialogData && <div className='chatDataDialog'>{dialogData}</div>}
      <div key={key}
           ref={item.id == messageId ? refMessage : null}
           className={myMessage ? "chatUser" : "chatCompanion"}>
        {myMessage ? null :
          morePartnerMessage && index - 1 >= 0 ? <div></div> :
            userChatPhoto ? <img src={`${STATIC_URL}/${userChatPhoto}`}/> :
              <ChatDefaultAvatar name={userChatName}/>
        }
        <div style={{
          backgroundColor: generateBackgroundMessage(item.sender_id, item.messages_is_read, item?.offline),
          transition: '.1s all linear'
        }}>
          {generateMessage(item?.message)}
          <div
            className='messageStatus'>{generateMessageStatus(item.sender_id, item.messages_is_read, item?.offline)}</div>
        </div>
        <div>{generateTime(0, item?.time, true)}</div>
      </div>
    </>
  )
};

export default ChatUserMessage;
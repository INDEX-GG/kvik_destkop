import React, {useEffect, useState} from "react";
// import Develop from '../../../../../components/inDev/Develop';
import { Dialog } from "@material-ui/core";
import { ModalMessage } from "../../../Modals";
import { useMedia } from "../../../../hooks/useMedia"
import Chat from "./Chat";
import { useRouter } from "next/router";
import { useAuth } from "../../../../lib/Context/AuthCTX";
import { CHAT_URL } from "../../../../lib/constants";
import axios from "axios";
import { useStore } from "../../../../lib/Context/Store";

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
  const [messageHistory, setMessageHistory] = useState([])
  const {query} = useRouter()
  const router = useRouter()
  const {id} = useAuth()
  const {userInfo} = useStore()
  const {matchesTablet, matchesMobile} = useMedia()

  useEffect(() => {
	if (id, query?.product_id && query?.seller_id) {

		const obj = {
			"page_limit": 15, 
			"last_message_id": 0, 
			"user_id": id, 
			"companion_id": +query?.seller_id, 
			"product_id": +query?.product_id
		}

		axios.post(`${CHAT_URL}/chat_history`, obj).then(r => {
			setRoom(r.data.room)
			setMessageHistory(r.data.data)
		})
 	 }
  }, [id, query])

  useEffect(() => {
	if (query?.seller_id && query?.product_id && id && userInfo?.name) {
		const sender = {"id": id, "name": userInfo?.name}
		const recipient = {"id": +query?.seller_id}
		const product = {"id": +query?.product_id}
		setChatUsers({sender, recipient, product})
	}
  }, [query, id, userInfo])

  useEffect(() => {
	if (id) {
		axios.post(`${CHAT_URL}/chat_last_messages`, {"user_id": id})
		  .then(r => setAllRooms(r.data.data))
	}
  }, [id])


  function changeModal() {
    setMessageModal(!messageModal)
  }

  useEffect(() => {
	console.log(1)
  }, [query])

  const generateTime = (UTC, time) => {
	console.log(time)
  }

  const changeChat = (data) => {
	  console.log(data)
	  router.push({
			pathname: `/account/${id}`,
			query: {
				account: 5,
				content: 1,
				seller_id: data?.seller_id,
				customer_id: id,
				product_id: data?.product_id
			}
		})
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
	false
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
			  {allRooms.length ? 
			  	allRooms.map((item, i) => {
					generateTime('+2', item.time)
					return (
						<a key={i} className="messageDialog" 
						  onClick={() => {
							matchesMobile || matchesTablet ? changeModal() : null
							changeChat(allRooms[i])
						  }
						}>
							<div className="messageOffer small">
							<div className="messageDiaCheck">
								<label className="checkbox">
								<input type="checkbox" />
								<div className="checkbox__text"></div>
								</label>
							</div>
							<img src={`${item.product_photo}?${item.product_id}`} />
							<div>{item.product_price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</div>
							<div>{ellipsis(item.product_name, 12)}</div>
							</div>
							<div className="messageUser small">
							<div className="messageUserBlock">
								<img src={`${item.seller_photo}?${item.seller_id}`} />
								<div>
								<div>{item.seller_name}</div>
								<div className="light">{item.time}</div>
								</div>
							</div>
							<div className="light">{item?.message}</div>
							</div>
						</a>
					)
				  })
			   : null
			  }
              {/* {data.data.map((item, i) => {
                return (
						<a key={i} className="messageDialog" onClick={() => {matchesMobile || matchesTablet ? changeModal() : null}}>
							<div className="messageOffer small">
								<div className="messageDiaCheck">
									<label className="checkbox">
									<input type="checkbox" />
									<div className="checkbox__text"></div>
									</label>
								</div>
								<img src={`${item.offerImg}?${item.id}`} />
								<div>{item.offerPrice.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</div>
								<div>{ellipsis(item.offerTitle, 12)}</div>
							</div>
							<div className="messageUser small">
							<div className="messageUserBlock">
								<img src={`${item.userPic}?${item.id}`} />
								<div>
								<div>{item.userName}</div>
								<div className="light">{item.date}</div>
								</div>
							</div>
							<div className="light">{item.message}</div>
							</div>
						</a>
                );
              })} */}
            </div>
            <div className="messageWindow">
              {room?.seller_id ?
				<div className="messageHeader small">
                <img src={room?.product_photo}/>
                <div>
                  <div>
                    <div>
                      <div>{room?.seller_name}</div>
                      <div className="light">00.00.00 00:00</div>
                    </div>
                    <img src={room?.seller_photo} />
                  </div>
                  <div>{room?.product_price} ₽</div>
                  <div>{room?.product_name}</div>
                </div>
              </div> : null} 
			  {chatUsers?.product && chatUsers?.recipient && chatUsers?.sender && <Chat usersData={chatUsers} messageData={messageHistory}/>}
            </div>
          </div>
        </div>
        <Dialog open={messageModal || false} onClose={() => setMessageModal(!messageModal)} fullScreen={true}>
          <ModalMessage modal={changeModal}/>
        </Dialog>
      </div>
    )
  );
}

export default Messages;

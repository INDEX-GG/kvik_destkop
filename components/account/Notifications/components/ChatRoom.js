import React from 'react';
import {STATIC_URL} from "../../../../lib/constants";
import {generateProductPhoto} from "../tabs/chatFunctions";
import ChatDefaultAvatar from "./ChatDefaultAvatar";
import {useAuth} from "../../../../lib/Context/AuthCTX";
import {useRouter} from "next/router";

const ChatRoom = ({roomData, children, mobile = false}) => {


    const {id} = useAuth();
    const router = useRouter();


    const handleUserClick = () => {
        if (id && roomData.seller_id) {
            if (id === roomData.seller_id) {
                // console.log(roomData.customer_id)
            } else {
                router.push(`/user/${roomData.seller_id}`)
            }
        }
    }

    const handleProductClick = () => {
        router.push(`/product/${roomData.product_id}`)
    }

    return (
        <div className={mobile ? 'messageMobile' : 'messageWindow'}>
            {roomData?.seller_id ?
                <div className="messageHeader small">
                    <img
                      className='chatRoomImage'
                      src={`${STATIC_URL}/${generateProductPhoto(roomData?.product_photo)}`}
                      onClick={handleProductClick}
                    />
                    <div>
                        <div>
                            <div>
                                <div className='chatRoomTitle' onClick={handleUserClick}>{roomData?.seller_name}</div>
                                <div className="light">00.00.00 00:00</div>
                            </div>
                            {roomData?.seller_photo ?
                                <img onClick={handleUserClick}
                                     className='chatRoomImage'
                                     src={`${STATIC_URL}/${roomData?.seller_photo}`}/> :
                                <ChatDefaultAvatar name={roomData?.seller_name} clickAvatar={handleUserClick}/>}
                        </div>
                        <div>{roomData?.product_price} ₽</div>
                        <div onClick={handleProductClick} className='chatRoomTitle'>{roomData?.product_name}</div>
                    </div>
                </div> : null}
            {children}
        </div>
    );
};

export default ChatRoom;
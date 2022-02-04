import React from 'react';
import {STATIC_URL} from "../../../../lib/constants";
import {generateProductPhoto} from "../tabs/chatFunctions";
import ChatDefaultAvatar from "./ChatDefaultAvatar";
import {useAuth} from "../../../../lib/Context/AuthCTX";
import {useRouter} from "next/router";
import { Divider } from '@material-ui/core';

const ChatRoom = ({roomData, children, mobile = false}) => {


    const {id} = useAuth();
    const router = useRouter();
    //  показываться будут всегда имя и фотография собеседника в шапке чата
    const chatRoom_photo = (id === roomData?.seller_id) ? roomData?.customer_photo : roomData?.seller_photo
    const chatRoom_name = (id === roomData?.seller_id) ? roomData?.customer_name : roomData?.seller_name

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
                <div className="messageHeader small" style={{height: '51px'}}>
                    {/* фотка обьявления */}
                    <img
                      className='chatRoomImage'
                      src={`${STATIC_URL}/${generateProductPhoto(roomData?.product_photo)}`}
                      onClick={handleProductClick}
                      style={{width: '50px', height: '50px', minWidth: '50px'}}
                    />
                    <div>
                        <div style={{alignSelf: 'flex-start'}}>{roomData?.product_price} ₽</div>
                        <div onClick={handleProductClick} className='chatRoomTitle'>{roomData?.product_name}</div>
                    </div>
                    </div> : null}
                <Divider style={{margin: '2px 10px'}} />
            {children}
        </div>
    );
};

export default ChatRoom;

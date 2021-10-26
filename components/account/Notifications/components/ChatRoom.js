import React from 'react';
import {STATIC_URL} from "../../../../lib/constants";
import {generateProductPhoto} from "../tabs/chatFunctions";
import ChatDefaultAvatar from "./ChatDefaultAvatar";

const ChatRoom = ({roomData, children}) => {
    return (
        <div className="messageWindow">
            {roomData?.seller_id ?
                <div className="messageHeader small">
                    <img src={`${STATIC_URL}/${generateProductPhoto(roomData?.product_photo)}`}/>
                    <div>
                        <div>
                            <div>
                                <div>{roomData?.seller_name}</div>
                                <div className="light">00.00.00 00:00</div>
                            </div>
                            {roomData?.seller_photo ? <img src={`${STATIC_URL}/${roomData?.seller_photo}`}/> :
                                <ChatDefaultAvatar name={roomData?.seller_name}/>}
                        </div>
                        <div>{roomData?.product_price} ₽</div>
                        <div>{roomData?.product_name}</div>
                    </div>
                </div> : null}
            {children}
        </div>
    );
};

export default ChatRoom;
import React from 'react';
import {STATIC_URL} from "../../../../lib/constants";
import {generateProductPhoto} from "../tabs/chatFunctions";
import ChatDefaultAvatar from "./ChatDefaultAvatar";
import {useAuth} from "../../../../lib/Context/AuthCTX";
import {useRouter} from "next/router";
import { Divider } from '@material-ui/core';
// import {useProduct} from '../../../../hooks/useProduct'

const ChatRoom = ({roomData, children, mobile = false}) => {

    // TODO: добавить проверку на удаленный товар и аккаунт
    // const productInfo = useProduct(roomData?.product_id)
    const isDeletedOffer = false//productInfo.status в будущем если объявление удалено, рисуем это объявление удалено и не даем перейти на него
    const isDeletedProfile = false // в будущем если профиль удален, рисуем этот аккаунт удален

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
        // на удаленные объявление нельзя будет кликнуть
        if(!isDeletedOffer) router.push(`/product/${roomData.product_id}`)
    }

    return (
        <div className={mobile ? 'messageMobile' : 'messageWindow'}>
            {roomData?.seller_id ?
                <div className="messageHeader small">
                    {/* фотка обьявления */}
                    <img
                      className='chatRoomImage'
                      src={`${STATIC_URL}/${generateProductPhoto(roomData?.product_photo)}`}
                      onClick={handleProductClick}
                    />
                    <div>
                        <div>
                            <div>
                                <div className='chatRoomTitle' onClick={handleUserClick}>{isDeletedProfile ? 'Аккаунт удален' : chatRoom_name}</div>
                                <div className="light">00.00.00 00:00</div>
                            </div>
                            {/* {roomData?.seller_photo ? */}
                            {chatRoom_photo ?
                                <img onClick={handleUserClick}
                                    className='chatRoomImage'
                                    src={`${STATIC_URL}/${chatRoom_photo}`}/> :
                                <ChatDefaultAvatar name={roomData?.seller_name} clickAvatar={handleUserClick}/>}
                        </div>
                        {isDeletedOffer && (
                            <div className='deletedOffer'>
                                Объявление удалено
                            </div>
                        )}
                        {!isDeletedOffer && (
                            <>
                                <div>{roomData?.product_price} ₽</div>
                                <div onClick={handleProductClick} className='chatRoomTitle'>{roomData?.product_name}</div>
                             </>
                        )}

                    </div>
                </div> : null}
                <Divider />
            {children}
        </div>
    );
};
export default ChatRoom;

import {useCustomRouter} from "../../../hook/globalHooks/useCustomRouter";
import {useState} from "react";
import {useAuth} from "#lib/Context/AuthCTX";
import {CHAT_URL_API} from "#lib/constants";
import {getTokenDataByPost} from "#lib/fetch";
import {useProductContext} from "../../../context/ProductContext";
import {useStatistics} from "#lib/Context/StatisticsCTX";

export const useProductConnection = () => {
    const {id: userId, token} = useAuth();
    const {pushTo} = useCustomRouter();
    const {setProductInfo, productData: {id: productId}} = useProductContext()
    const {addContactClick} = useStatistics()

    const [activeModal, setActiveModal] = useState(false);
    const [callModal, setCallModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleChangeAd = (id) => {
        return () => {
            pushTo(`/editPage/${id}`)
        }
    }

    const handleChangeModal = (state, setState, callback = null) => {
        return () => {
            setState(!state)
            if (state && callback) {
                callback()
            }
        }
    }

    const successCallback = (status) => {
        if (setProductInfo) {
            setProductInfo((prevState) => (
                {
                    ...prevState,
                    status
                }
            ))
        }
    }


    const handleSendMessage = async (sellerId, productId, isMobile) => {
        const isRoomCreate = sellerId && userId && productId
        if (isRoomCreate) {
            try {
                const roomCreateObj = {
                    'seller_id': sellerId,
                    'customer_id': userId,
                    'product_id': productId,
                }

                // Создание комнаты
                await getTokenDataByPost(
                    `${CHAT_URL_API}/make_room`,
                    roomCreateObj,
                    token
                )
                    .then(data => {
                        const {message} = data
                        if (message === 'room created' || message === 'room already exist') {
                            const routerObj = {
                                account: 5,
                                content: 1,
                                userId,
                                companion_id: sellerId,
                                product_id: productId,
                                isMobile,
                            }
                            if (isMobile) routerObj.mobile = 'on'
                            pushTo(`/account/${userId}`, routerObj)
                        }
                    })
            } catch (e) {
                console.log(e)
            }
        }
    }

    return {
        callModal,
        removeModal,
        activeModal,
        deleteModal,
        handleChangeAd,
        handleSendMessage,
        successCallback,
        handleChangeActiveModal: handleChangeModal(activeModal, setActiveModal),
        handleChangRemoveModal : handleChangeModal(removeModal, setRemoveModal),
        handleChangeCallModal: handleChangeModal(callModal, setCallModal, addContactClick(productId)),
        handleChangeDeleteModal: handleChangeModal(deleteModal, setDeleteModal),
    }
}

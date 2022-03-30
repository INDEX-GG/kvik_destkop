import React, {useContext} from 'react';
import {Box} from "@material-ui/core";
import clsx from 'clsx'

import LoginModal from "../../AnyPage/LoginModal/LoginModal"
import { LoginDrawerCTX } from "#lib/Context/DialogCTX"
import PhoneIcon from "../../../UI/UIicon/PhoneIcon";
import MessageIcon from "../../../UI/UIicon/MessageIcon";
import {useProductConnection} from "./useProductConnection";
import ProductPhoneDialog from "./ProductPhoneDialog/ProductPhoneDialog";
import ProductMyAdButtons from "./ProductMyAdButtons/ProductMyAdButtons";
import ProductConnectionButton from "../../AnyPage/ProductConnectionButtons/ProductConnectionButton";

import {useProductConnectionStyles} from "./style";

const ProductConnection = ({isMobile, isAuth, productData}) => {
    const classes = useProductConnectionStyles();

    const {
        id : productId,
        user_id,
        status, isActive, isNoActive, isBanned, isTimeLimit, isOpacity,
        isMyAd,
        isMessage,
        isPhone,
    } = productData;

    const {
        callModal,
        handleSendMessage,
        handleChangeCallModal
    } = useProductConnection();

    const {
        setModalState,
        openRegForm, setOpenRegForm,
        openLoginForm, setOpenLoginForm,
        isAlreadyExistForm, setIsAlreadyExistForm
    } = useContext(LoginDrawerCTX)

    const handleCreateChat = () => {
        if(!isAuth) {
            isMobile ? setModalState({left: true}) : setOpenLoginForm(true)
        }else{
            handleSendMessage(user_id, productId, isMobile)
        }
    }

    return (
        <>
            {/* чтобы кнопки показывались даже на снятом объявлении убрать/добавить isStatusOk */}
            {productId ? (
                <Box
                    className={clsx(
                        classes.buttonsContainer, {
                            [classes.buttonsContainerMB0] : isMobile && isBanned || isOpacity
                        })
                    }
                >
                    {isMyAd ? (
                        <ProductMyAdButtons
                            productId={productId}
                            status={status}
                            isActive={isActive}
                            isNoActive={isNoActive}
                            isBanned={isBanned}
                            isTimeLimit={isTimeLimit}
                            isOpacity={isOpacity}
                        />
                    ) : (
                        isActive &&
                            <>
                                {isMessage && (
                                    // РАБОТАЕМ
                                    <ProductConnectionButton
                                        onClick={handleCreateChat}
                                        title='Написать сообщение'
                                        icon={MessageIcon}
                                    />
                                )}
                                {isPhone && (
                                    <ProductConnectionButton
                                        onClick={handleChangeCallModal}
                                        title='Показать номер'
                                        icon={PhoneIcon}
                                    />
                                )}
                            </>
                    )}
                    <ProductPhoneDialog
                        open={callModal}
                        isMobile={isMobile}
                        onClose={handleChangeCallModal}
                    />
                    <LoginModal
                        openRegForm={openRegForm}
                        setOpenRegForm={setOpenRegForm}
                        openLoginForm={openLoginForm}
                        setOpenLoginForm={setOpenLoginForm}
                        isAlreadyExistForm={isAlreadyExistForm}
                        setIsAlreadyExistForm={setIsAlreadyExistForm}
                    />
                </Box>
            ) : <></> }
        </>
    );
};

export default React.memo(ProductConnection);

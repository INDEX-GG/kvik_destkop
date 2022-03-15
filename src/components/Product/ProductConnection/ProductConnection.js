import React from 'react';
import {Box} from "@material-ui/core";
import clsx from 'clsx'

import PhoneIcon from "../../../UI/UIicon/PhoneIcon";
import MessageIcon from "../../../UI/UIicon/MessageIcon";
import {useProductConnection} from "./useProductConnection";
import ProductPhoneDialog from "./ProductPhoneDialog/ProductPhoneDialog";
import ProductMyAdButtons from "./ProductMyAdButtons/ProductMyAdButtons";
import ProductConnectionButton from "../../AnyPage/ProductConnectionButtons/ProductConnectionButton";

import {useProductConnectionStyles} from "./style";

const ProductConnection = ({isMobile, productData}) => {
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

    const handleCreateChat = () => handleSendMessage(user_id, productId, isMobile)

    return (
        <>
            {/* чтобы кнопки показывались даже на снятом объявлении убрать/добавить isStatusOk */}
            {productId ? (
                <Box
                    className={clsx(
                        classes.buttonsContainer, {
                            [classes.buttonsContainerMB0] : isMobile && isBanned
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
                </Box>
            ) : <></> }
        </>
    );
};

export default React.memo(ProductConnection);

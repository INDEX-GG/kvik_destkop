import React from 'react';
import {useProductConnectionStyles} from "./style";
import {Box} from "@material-ui/core";
import ProductConnectionButton from "./ProductConnectionButtons/ProductConnectionButton";
import MessageIcon from "../../../UI/UIicon/MessageIcon";
import PhoneIcon from "../../../UI/UIicon/PhoneIcon";
import {useProductConnection} from "./useProductConnection";
import ProductPhoneDialog from "./ProductPhoneDialog/ProductPhoneDialog";
import ProductAdStatusChangeDialog from "./ProductAdStatusChangeDialog/ProductAdStatusChangeDialog";

const ProductConnection = (
    {
        productId,
        sellerId,
        isMyAd,
        isMessage,
        isMobile,
        isPhone
    }
) => {
    const classes = useProductConnectionStyles();
    const {
        callModal,
        removeModal,
        handleChangeAd,
        handleSendMessage,
        handleChangRemoveModal,
        handleChangeCallModal
    } = useProductConnection();

    const handleCreateChat = () => handleSendMessage(sellerId, productId, isMobile)

    return (
        productId ? (
            <Box className={classes.buttonsContainer}>
                {isMyAd ? (
                    <>
                        <ProductConnectionButton
                            onClick={handleChangeAd(productId)}
                            title='Редактировать'
                            isMyAd={true}
                        />
                        <ProductConnectionButton
                            onClick={handleChangRemoveModal}
                            title='Снять с публикации'
                            isMyAd={true}
                        />
                    </>
                ) : (
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
                    onClose={handleChangeCallModal}
                />
                <ProductAdStatusChangeDialog
                    open={removeModal}
                    onClose={handleChangRemoveModal}
                />
            </Box>
        ) : <></>
    );
};

export default React.memo(ProductConnection);

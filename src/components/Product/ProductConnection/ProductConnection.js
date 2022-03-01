import React from 'react';
import {useProductConnectionStyles} from "./style";
import {Box} from "@material-ui/core";
import ProductConnectionButton from "../../AnyPage/ProductConnectionButtons/ProductConnectionButton";
import MessageIcon from "../../../UI/UIicon/MessageIcon";
import PhoneIcon from "../../../UI/UIicon/PhoneIcon";
import {useProductConnection} from "./useProductConnection";
import ProductPhoneDialog from "./ProductPhoneDialog/ProductPhoneDialog";
import ProductMyAdButtons from "./ProductMyAdButtons/ProductMyAdButtons";

const ProductConnection = ({productData}) => {
    const classes = useProductConnectionStyles();

    const {
        id : productId,
        sellerId,
        status,
        isMyAd,
        isMessage,
        isMobile,
        isPhone
    } = productData;

    const {
        callModal,
        handleSendMessage,
        handleChangeCallModal
    } = useProductConnection();

    const handleCreateChat = () => handleSendMessage(sellerId, productId, isMobile)


    return (
        productId ? (
            <Box className={classes.buttonsContainer}>
                {isMyAd ? (
                    <>
                        <ProductMyAdButtons
                            productId={productId}
                            status={status}
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
            </Box>
        ) : <></>
    );
};

export default React.memo(ProductConnection);

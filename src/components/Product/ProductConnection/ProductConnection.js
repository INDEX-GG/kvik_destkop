import React, {useMemo} from 'react';
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
        status,
        isMyAd,
        isMessage,
        isPhone
    } = productData;

    const {
        callModal,
        handleSendMessage,
        handleChangeCallModal
    } = useProductConnection();


    const handleCreateChat = () => handleSendMessage(user_id, productId, isMobile)
    const isStatusOk = useMemo(() => status === 'ok', [status])
    // const isStatusNoActive = useMemo(() => status === 'no_active', [status])
    const isStatusBanned = useMemo(() => status === 'banned', [status])

    return (
        <>
            {/* чтобы кнопки показывались даже на снятом объявлении убрать/добавить isStatusOk */}
            {productId ? (
                <Box
                    className={clsx(
                        classes.buttonsContainer, {
                            [classes.buttonsContainerMB0] : isMobile && isStatusBanned
                        })
                    }
                >
                    {isMyAd ? (
                        <ProductMyAdButtons
                            productId={productId}
                            status={status}
                        />
                    ) : (
                        isStatusOk &&
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
            ) : <></> }
        </>
    );
};

export default React.memo(ProductConnection);

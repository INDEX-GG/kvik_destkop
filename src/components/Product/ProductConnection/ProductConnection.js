import React from 'react';
import {useProductConnectionStyles} from "./style";
import {Box} from "@material-ui/core";
import ProductConnectionButton from "./ProductConnectionButtons/ProductConnectionButton";
import MessageIcon from "../../../UI/UIicon/MessageIcon";
import PhoneIcon from "../../../UI/UIicon/PhoneIcon";

const ProductConnection = ({id, isMyAd}) => {
    const classes = useProductConnectionStyles();

    return (
        id ? (
            <Box className={classes.buttonsContainer}>
                {isMyAd ? (
                    <>
                        <ProductConnectionButton
                            title='Редактировать'
                            isMyAd={true}
                        />
                        <ProductConnectionButton
                            title='Снять с публикации'
                            isMyAd={true}
                        />
                    </>
                ) : (
                    <>
                        <ProductConnectionButton
                            title='Написать сообщение'
                            icon={MessageIcon}
                        />
                        <ProductConnectionButton
                            title='Показать номер'
                            icon={PhoneIcon}
                        />
                    </>
                )}
            </Box>
        ) : null
    );
};

export default React.memo(ProductConnection);

import React from "react";
import {Box} from "@material-ui/core";
import {useProductPhoneDialogUserInfoStyles} from './style';
import ProductUserMiniature from "../../../../ProductUser/ProductUserMiniature/ProductUserMiniature";
import {useProductContext} from "../../../../../../context/ProductContext";
import {STATIC_URL} from "#lib/constants";
import ProductPhoneDialogNumber from "../ProductPhoneDialogNumber/ProductPhoneDialogNumber";
import {useCryptoData} from "../../../../../../hook/globalHooks/useCryptoData";

const ProductPhoneDialogUserInfo = () => {

    const {
        productData: {
            user_id,
            user_name,
            user_raiting,
            user_photo,
            user_phone
        }
    } = useProductContext()

    const {decrypt} = useCryptoData()

    const classes = useProductPhoneDialogUserInfoStyles()
    const userPhoto = `${STATIC_URL}/${user_photo}`
    const normalPhone = decrypt(user_phone)


    return (
        <Box className={classes.userInfoContainer}>
            <Box className={classes.user}>
                <ProductUserMiniature
                    userId={user_id}
                    userName={user_name}
                    userRating={user_raiting}
                    userPhoto={userPhoto}
                    viewSubscribe={false}
                />
            </Box>
            <ProductPhoneDialogNumber
                phone={normalPhone}
                x={0} y={25}
            />
        </Box>
    )
}

export default React.memo(ProductPhoneDialogUserInfo);

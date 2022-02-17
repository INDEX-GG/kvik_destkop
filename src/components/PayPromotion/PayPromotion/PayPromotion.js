import React from 'react';
import {Box} from "@material-ui/core";
import PayPromotionItem from "../PayPromotionItem/PayPromotionItem";
import {useForm, Controller, FormProvider} from "react-hook-form";
import PayPromotionInfo from "../PayPromotionInfo/PayPromotionInfo";
import {getTrueItemInObj} from "../../../services/services";
import {useAuth} from "#lib/Context/AuthCTX";
import {fetchPromotionAd} from "../../../fetch/fetch";
import {BASE_URL} from "#lib/constants";
import {usePayPromotionStyles} from "./style";
import promotionArr from './PayPromotionData.json'
import CustomSwitchUI from "../../../UI/UIcomponent/CustomSwitchUI";
import {useMedia} from "#hooks/useMedia";



const PayPromotion = ({postId, handleContinue}) => {

    const classes = usePayPromotionStyles();
    const methods = useForm();
    const {id, token} = useAuth();
    const {matchesMobile, matchesTablet} = useMedia();

    const isMobile = matchesMobile | matchesTablet;
    const {control, handleSubmit, reset, getValues, watch} = methods;

    const handleSendData = (arr) => {
        const sendObj = {
            user_id: id,
            actions: arr.map(item => item.action),
            post_id: postId,
            return_url: `${BASE_URL}/?success=true`,
            fail_url: `${BASE_URL}/?success=false`
        }
        return sendObj;
    }


    const onSubmit = async (data) => {
        const sendData = handleSendData(getTrueItemInObj(data));
        if (sendData.actions[0]) {
            const callback = await fetchPromotionAd(sendData, token)
            const payUrl = callback?.form_url
            if (payUrl) {
                window.location = payUrl
            }
        } else {
            handleContinue()
        }
    };

    return (
        <Box className={classes.container}>
            <Box className={classes.title} component='h5'>
                Продвижение  объявления
            </Box>
            <FormProvider {...methods}>
                <Box component='form' className={classes.content} onSubmit={handleSubmit(onSubmit)}>
                    <Box className={classes.list}>
                        {promotionArr.map(promotion => (
                            <Controller
                                key={promotion.name}
                                control={control}
                                name={promotion.name}
                                render={({field: {value}}) => (
                                    <PayPromotionItem
                                        promotion={promotion}
                                        formValues={getValues()}
                                        active={value}
                                        reset={reset}
                                        isMobile={isMobile}
                                    />
                                )}
                            />
                        ))}
                    </Box>
                    <PayPromotionInfo watchForm={watch()}/>
                </Box>
            </FormProvider>
        </Box>
    );
};

export default React.memo(PayPromotion);

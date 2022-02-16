import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import PayPromotionItem from "./PayPromotionItem";
import {useForm, Controller, FormProvider} from "react-hook-form";
import PayPromotionInfo from "./PayPromotionInfo";
import {getTrueItemInObj} from "../../services/services";
import {useAuth} from "#lib/Context/AuthCTX";
import {fetchPromotionAd} from "../../fetch/fetch";
import {BASE_URL} from "#lib/constants";


const promotionArr = [
    {
        name: 'up',
        action: 2,
        title: 'Поднятие вверх',
        subtitle: 'Разовое поднятие, которое позволит вашему объявлению быть в начале списка своей категории',
        value: 19,
        img: '/img/promotionColor.png'
    },
    {
        name: 'xl',
        action: 4,
        title: 'XL объявление',
        subtitle: 'На протяжении 7 дней ваше объявление занимает место 2х обычных объявлений',
        value: 39,
        img: '/img/promotionCombo.png'
    },
    {
        name: 'select',
        action: 3,
        title: 'Выделить объявление',
        subtitle: 'В течение недели ваше объявление будет выделено ярким цветом, что делает его \n заметнее в поиске. Размер остается прежним',
        value: 39,
        img: '/img/promotionUP.png'
    },
    {
        name: 'combo',
        action: 5,
        title: 'Комбо продвижение',
        subtitle: 'Комплексное подключение всех услуг продвижения. При этом поднятие вверх \n остается единоразовым. Это выгоднее, чем покупать каждую услугу по отдельности.',
        value: 59,
        img: '/img/promotionXL.png'
    },
    {
        name: 'none',
        title: 'Без продвижения',
    },
]


const PayPromotion = ({postId, handleContinue}) => {

    const classes = useStyles();
    const methods = useForm();
    const {id, token} = useAuth();
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

    console.log(`${BASE_URL}?success=true`);

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
                <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                    <Box className={classes.list}>
                        {promotionArr.map(promotion => (
                            <Controller
                                key={promotion.name}
                                control={control}
                                name={promotion.name}
                                render={({field: {value}}) => (
                                    <PayPromotionItem
                                        active={value}
                                        formValues={getValues()}
                                        reset={reset}
                                        promotion={promotion}
                                    />
                                )}
                            />
                        ))}
                        <PayPromotionInfo watchForm={watch()}/>
                    </Box>
                </Box>
            </FormProvider>
        </Box>
    );
};

const useStyles = makeStyles(() => ({
    container: {
        padding: '30px 30px 25px 30px',
    },
    title: {
        textAlign: 'center',
        fontSize: '18px',
        lineHeight: '21.09px',
        marginBottom: 15,
        color: '#000000',
        fontWeight: 400,
    },
    list: {
        '& > *:last-child': {
            marginBottom: 0
        }
    }
}));

export default React.memo(PayPromotion);

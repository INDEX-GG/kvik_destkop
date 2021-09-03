import { Button, Dialog, Box, makeStyles } from "@material-ui/core"
import { useForm, FormProvider } from 'react-hook-form';
import { useAuth } from "../../lib/Context/AuthCTX";
import MobileContact from "./MobileContacts";
import MobileLocation from "./MobileLocation";
import MobilePrice from "./MobilePrice/MobilePrice"
import MobileProduct from "./MobileProduct";
import { useState } from "react";
import axios from "axios";
import Promotion from "./Promotion";
import { BASE_URL, STATIC_URL } from "../../lib/constants";

const useStyles = makeStyles(() => ({
    buttonSend: {
        position: "absolut",
        left: "50%",
        width: "100%",
        maxWidth: "460px",
        margin: "32px 0px",
        height: "32px",
        transform: "translateX(-50%)",
    },
    buttonContainer: {
        padding: "0 10px",
        position: "relative"
    },
    plaseOfferTitle: {
        fontSize: '14px',
        textAlign: "center",
        padding: "16px 0px 12px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        marginBottom: "24px"
    },
    plaseOfferSubTitle: {
        paddingTop: "5px",
        color: "#8F8F8F",
        textAlign: "center"
    },
    plaseOfferBox: {
        width: "100%",
        padding: "0 12px",
        backgroundColor: "#ffff",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)"
    },
})) 

export default function ContentPlaseOffer({dialog, title, backFunc}) {
    const {id} = useAuth();
    const classes = useStyles();
    const [promotionProduct, setPromotionProduct] = useState({})
    const [promotion, setPromotion] = useState(false)
    const methods = useForm();
    let photoes = [];
    const photoesCtx = (obj) => {
        return photoes = obj;
    }

    const onSubmit = data => {
		console.log(data);
		console.log(photoes)
        data.price = data.price.replace(/\D+/g, '');
		const alias = [...title.split(",")]
		let postId = 0;

        const sendData = new FormData;
		const photoData = new FormData;
		data.user_id = id;
		delete data.photoes;
		data.alias = alias.join(',')
        sendData.append('user_id', id);
        sendData.append('title', data.title);
		sendData.append('alias', alias);
        sendData.append('description', data.description);
        sendData.append('price', data.price);
        sendData.append('trade', data.trade);
        sendData.append('safedeal', data.safedeal);
        sendData.append('delivery', data.delivery);
        sendData.append('address', data.location);
        sendData.append('byphone', data.byphone);
        sendData.append('bymessage', data.bymessages);
        if (photoes.length > 1) {
            photoes.forEach(photo => photoData.append('files[]', photo));
        } else if (photoes.length === 1) {
            photoData.append('files[]', photoes[0]);
        }

        axios.post(`${BASE_URL}/api/setPosts`, data,)
        	.then(r => {
			postId = r?.data?.id;
			axios.post(`${STATIC_URL}/post/${r?.data?.id}`, photoData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}).then((r) => {
                setPromotionProduct({title: data.title, price: data.price, id: postId, photo: `${STATIC_URL}/${r?.data.images.photos[0]}`})
                setPromotion(true)
            })
		})
    }
    return(
        promotion ? (
            <Promotion dialog={promotion} setDialog={setPromotion} product={promotionProduct}/>
        ) : 
        <Dialog open={dialog || false} fullScreen={true}>
                <div className="modal__wrapper_md">
                    <div className="modal__block__top accountTop">
                        <>
                            <div onClick={() => backFunc()} className="accountArrowLeft"></div>
                            <div className={classes.plaseOfferTitle}>
                                <h6 className="modal__block__top_title">Новое объявление</h6>
                                <div className={classes.plaseOfferSubTitle}>2/2</div>
                            </div>
                        </>
                        <Box className={classes.plaseOfferContent}>
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onSubmit)}>
                                    <MobileProduct ctx={photoesCtx}/>
                                    <MobilePrice/>
                                    <MobileLocation/>
                                    <MobileContact/>
                                    <div className={classes.buttonContainer}>
                                        <Button className={classes.buttonSend} color='primary'
                                        type="submit" variant='contained'>Продолжить</Button>
                                    </div>
                                </form>
                            </FormProvider>
                        </Box>
                    </div>
                </div>
        </Dialog>
    )
}
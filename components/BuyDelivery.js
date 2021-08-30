import React, { useState } from "react"
import { makeStyles, Collapse, Dialog, Button } from "@material-ui/core"
import theme from "../UI/theme"
import SelectBuy from "./SelectBuy"
import { useMedia } from "../hooks/useMedia"
import DeliveryBuyerForm from "./DeliveryBuyerForm"
import BuyDeleveryItem from "./BuyDeleveryItem"

const useStyles = makeStyles(() => ({
    buyDilevery: {
        marginBottom: "32px",
        width: "100%",
        // maxWidth: "976px",
    },
    buyDileveryBox: {
        padding: "4px 0",
        borderRadius: "8px",
        position: "relative",
        cursor: "pointer",
        transition: ".2s all linear",
        "&:hover": {
            backgroundColor: "#E9E9E9"
        }
    },
    buyDeliveryName: {
        display: "flex",
        position: "relative"
    },
    buyDileveryInf: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buyDileveryCircle: {
        position: "absolute",
        left: "12px",
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        border: "1px solid #000",
    },
    buyDileveryTitle: {
        fontWeight: "500",
        color: "#2C2C2C",
        fontSize: "18px",
        position: "relative",
        marginLeft: "38px",
        [theme.breakpoints.down("410")]: {
            fontSize: "16px"
        },
        [theme.breakpoints.down("375")]: {
            fontSize: "14px"
        }
    },
    buyDileveryPrice: {
        color: "#00A0AB",
        fontWeight: "500",
        fontSize: "18px",
        marginRight: "5px",
        [theme.breakpoints.down("410")]: {
            fontSize: "15px"
        },
    },
    buyDileverySubtitle: {
        fontSize: "12px",
        color: "#8F8F8F",
        margin: "8px 0 0 12px"
    },
    buyDileveryDesc: {
        color: "#00A0AB",
        textDecoration: "underline"
    },
    buyDileverySend: {
        marginTop: "24px",
        position: "relative"
    },
    buyDileveryOneTitle: {
        color: "#8F8F8F",
        fontSize: "14px",
        fontWeight: "500",
		marginBottom: '24px'
    },
    buyDileveryOneAdressBlock: {
        display: "flex",
        justifyContent: "space-between",
        // alignItems: "center",
        flexWrap: "wrap"
    },
    buyDileveryOneAdressBox: {
		'& > *:nth-of-type(2)': {
			marginBottom: '16px'
		}
    },
    buyDileveryOneAdress: {
        color: "#2C2C2C",
        fontSize: "18px",
        marginBottom: "8px"
    },
    buyDileveryOneAdressInf: {
        color: "#C7C7C7",
        fontSize: "14px",
    },
    buyDileveryOneParagraph: {
        color: "#00A0AB",
        fontSize: "14px",
        textDecoration: "underline",
        margin: "40px 0 32px",
        cursor: "pointer"
    },
    buyDileveryMap :{
        backgroundColor: "#2C2C2C",
        maxWidth: "488px",
        width: "100%",
        height: "164px",
        borderRadius: "8px",
        marginBottom: "20px"
    },
    buyDileveryPickupDesc: {
        color: "#C7C7C7",
		maxWidth: '950px',
        fontSize: "14px",
        marginTop: "8px"
    },
    mt24: {
        marginTop: "32px"
    },
    paragraph: {
        height: "585px",
        padding: "8px 12px",
        [theme.breakpoints.down("xs")]: {
            height: "100vh",
            // width: "100%",
            // maxWidth: "500px"
        }
    },
    paragraphTitle: {
        color: "#2C2C2C",
        fontSize: "18px",
        fontWeight: "500",
        borderBottom: "1px solid #E9E9E9",
        paddingBottom: '10px',
		marginBottom: '12px'

    },
    paragraphMenu: {
        display: "flex",
        marginBottom: "32px"
    },
    paragraphMenuItem: {
        width: "100%",
        textAlign: "center",
        paddingBottom: "8px",
        borderBottom: "2px solid #E9E9E9",
        borderRadius: "2px"
    },
    paragraphMenuItemActive: {
        borderBottom: "4px solid #FFF6A5"
    },
    paragraphBox: {
        display: "flex",
    },
    paragraphList: {
        width: "100%",
        marginRight: "12px",
		maxHeight: '522px',
		overflow: 'scroll',
		[theme.breakpoints.down(600)]: {
			maxHeight: 'none',
		}
    },
    paragraphItem: {
        fontSize: "12px",
        color: "#8F8F8F",
        width: "194px",
        height :"98px",
        borderRadius: "8px",
		marginRight: '40px',
        padding: "8px",
        transition: ".2s all linear",
        "&:hover": {
            backgroundColor: "#E9E9E9"
        },
        [theme.breakpoints.down("xs")]: {
            width: "100%"
        }
    },
    paragraphAdress: {
        color: "#2C2C2C",
        fontWeight: "500"
    },
    paragraphMap: {
        width: "362px",
        height: "522px",
        backgroundColor: "#2C2C2C",
        borderRadius: "8px",
		[theme.breakpoints.down(660)]: {
			width: '300px'
		},
        [theme.breakpoints.down("xs")] : {
            width: "100%",
            height: "400px",
            marginBottom: "24px",
        }
    },
    buyPaymentButton: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#00A0AB",
        color: "#fff",
        fontWeight: "500",
        "&:hover": {
            backgroundColor: "#00A0AB"
        }
    },
    dialogTitle: {
        textAlign: "center",
        padding: "16px 0px 12px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        marginBottom: "24px"
    },
    paragraphNumber: {
        marginBottom: "4px"
    },
    containerMap: {
        [theme.breakpoints.down(600)]: {
            padding: "0 24px"
        }
    },
    paragraphContainer: {
        padding: "8px 12px 12px"
    }
}))

function BuyDelivery() {
    const [deliveryOther, setDeliveryOther] = useState(false)
    const [deliveryCourier, setDeliveryCourier] = useState(false)
    const [deliveryPickup, setDeliveryPickup] = useState(false)
    const [modalParagraph, setModalParagraph] = useState (false)
    const [paragraphContent, setParagraphContent] = useState(true)

    const {matchesMobile} = useMedia()

    const classes = useStyles()


    function paragraphBox(map = false, xs = false, buttonName = matchesMobile ? "Перейти к оплате" : "Выбрать этот пункт") {
        return (
        <div className={`${classes.paragraphBox} ${matchesMobile ? classes.paragraphContainer : ""}`}>
            <div className={classes.paragraphList}>
                <div className={classes.paragraphItem}>
                    <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                    <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                    <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                    {xs ? <Button className={classes.buyPaymentButton} type="submit">{buttonName}</Button> : null}
                </div>
                <div className={classes.paragraphItem}>
                    <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                    <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                    <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                </div>
				<div className={classes.paragraphItem}>
                    <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                    <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                    <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                </div>
				<div className={classes.paragraphItem}>
                    <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                    <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                    <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                </div>
				<div className={classes.paragraphItem}>
                    <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                    <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                    <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                </div>
				<div className={classes.paragraphItem}>
                    <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                    <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                    <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                </div>
				<div className={classes.paragraphItem}>
                    <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                    <div className={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                    <div className={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                </div>
            </div>
            {map ? 
            <div className={classes.containerMap}>
                <div className={classes.paragraphMap}></div>
            </div> : null}
        </div>
        )
    }

    function paragraphMap() {
        return (
            <>
                <div className={classes.paragraphContainer}>
                    <div className={classes.paragraphMap}></div>
                </div>
                {paragraphBox(false, true, "Выбрать этот пункт")}
            </>
        ) 
    }

	// <Dialog open={modalParagraph || false} fullScreen={matchesMobile ? true : false} onClose={() => setModalParagraph(!modalParagraph)}>
    //                     <div className={matchesMobile ? "modal__block__top accountTop" : classes.paragraphContainer } >
    //                         {matchesMobile ? 
    //                         <>
    //                             <div className="accountArrowLeft"></div>
    //                             <div className={classes.dialogTitle}>
    //                                 <h6 className="modal__block__top_title">Выбор пункта самовызова товара</h6>
    //                             </div>
    //                         </> : <div className={classes.paragraphTitle}>Выбор пункта самовызова товара</div>}
    //                         {matchesMobile ? <div className={classes.paragraphMenu}>
    //                             <div 
    //                             className={`${classes.paragraphMenuItem} ${paragraphContent ? classes.paragraphMenuItemActive : null}`} onClick={() => setParagraphContent(!paragraphContent)}>Список</div>
    //                             <div 
    //                             className={`${classes.paragraphMenuItem} ${paragraphContent ?  null : classes.paragraphMenuItemActive}`} 
    //                             onClick={() => {
    //                                 setParagraphContent(!paragraphContent)
    //                             }}>Карта</div>
    //                             </div> : null }
    //                         {matchesMobile ? paragraphContent ? paragraphBox(false, true) : paragraphMap() :  paragraphBox(true)}
    //                     </div>
    //             </Dialog>

    return (
        <>
            <BuyDeleveryItem title='Доставка номер один' subtitle='От двух до 7 рабочих дней. Примерное время доставки, и цена рассчитаны для вашего города' price='500'>
				<div className={classes.buyDileverySend}>
					<div className={classes.buyDileveryOneAdressBlock}>
						<div className={classes.buyDileveryOneAdressBox}>
							<h4 className={classes.buyDileveryOneTitle}>Пункт самомывоза</h4>
							<div className={classes.buyDileveryOneAdress}>Челябинск, ул. Елькина, 92в</div>
							<div className={classes.buyDileveryOneAdressInf}>Расписание пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
							<div className={classes.buyDileveryOneAdressInf}>Номер для связи +7 (000) 000-00-00</div>
							<div className={classes.buyDileveryOneParagraph}onClick={() => setModalParagraph(!modalParagraph)}>Выбрать другой пункт из 00 в вашем городе</div>
						</div>
						<div className={classes.buyDileveryMap}></div>
					</div>
					<DeliveryBuyerForm/>
                </div>
			</BuyDeleveryItem>
            <BuyDeleveryItem title='Доставка номер два (курьером например)' subtitle='Доставка будет осуществляться в течении 00 дней из расчета по вашему городу' price='1000'>
				<div className={classes.buyDileverySend}> 
					<DeliveryBuyerForm courier/>
                </div>
			</BuyDeleveryItem>
			<BuyDeleveryItem title='Заберу сам у продавца' subtitle='Договоритесь об условиях самовызова с продавцом по телефону или в чате самостоятельно'>
				<p className={classes.buyDileveryPickupDesc}>Договаривайтесь с продавцом о месте и времени передачи товара самостоятельно. Деньги за оплату товара продавец получит только после того, как вы подтвердите успешное получение товара. А в случае возникновения спорной ситуации, уладить возникшие разногласия поможет сервис «Безопасная сделка».</p>
			</BuyDeleveryItem>
            <SelectBuy/>
        </>
    )
}

export default BuyDelivery
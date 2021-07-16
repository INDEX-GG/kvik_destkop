import React, { useState } from "react"
import { makeStyles, Collapse, TextField, Dialog } from "@material-ui/core"
import theme from "../UI/theme"
import SelectBuy from "./SelectBuy"
import { textAlign, width } from "@material-ui/system"
import { useMedia } from "../hooks/useMedia"

const useStyles = makeStyles(() => ({
    buyDilevery: {
        marginBottom: "32px",
        width: "100%",
        maxWidth: "976px",
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
        marginLeft: "38px"
    },
    buyDileveryPrice: {
        color: "#00A0AB",
        fontWeight: "500",
        fontSize: "18px",
        marginRight: "5px",
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
        fontWeight: "500"
    },
    buyDileveryOneAdressBlock: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"
    },
    buyDileveryOneAdressBox: {
        marginTop: "24px",
    },
    buyDileveryOneAdress: {
        color: "#2C2C2C",
        fontSize: "18px",
        marginBottom: "8px"
    },
    buyDileveryOneAdressInf: {
        color: "#7C7C7C",
        fontSize: "14px"
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
    buyDileveryInputTitel: {
        color: "#2C2C2C",
        fontSize: "14px",
        fontWeight: "500",
        marginBottom: "12px"
    },
    buyDileveryInputBox: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
    },
    buyDileveryInputItem: {
        width: "33.33%",
        paddingLeft: "24px",
        marginBottom: "16px",
        [theme.breakpoints.down("sm")] : {
            width: "50%",
        },
        [theme.breakpoints.down("xs")] : {
            width: "100%",
        },
    },
    buyDileveryInput: {
        width: "100%",
    },
    buyDileveryInputDesc: {
        color: "#C7C7C7",
    },
    buyDileveryPickupDesc: {
        color: "#C7C7C7",
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
        marginBottom: "12px",
        [theme.breakpoints.down("xs")]: {
            textAlign: "center",
            padding: "16px 0 27px"
        }

    },
    paragraphMenu: {
        display: "flex",
        marginBottom: "32px"
    },
    paragraphMenuItem: {
        width: "250px",
        textAlign: "center",
        paddingBottom: "8px",
        borderBottom: "2px solid gray",
        borderRadius: "2px"
    },
    paragraphMenuItemActive: {
        borderBottom: "4px solid #FFF6A5"
    },
    paragraphBox: {
        display: "flex",
    },
    paragraphList: {
        marginRight: "10px",
        [theme.breakpoints.down("xs")]: {
            maxWidth: "500px",
            width: "100%",
        }
    },
    paragraphItem: {
        fontSize: "12px",
        color: "#8F8F8F",
        width: "194px",
        height :"98px",
        borderRadius: "8px",
        padding: "8px",
        transition: ".2s all linear",
        "&:hover": {
            backgroundColor: "#E9E9E9"
        },
        [theme.breakpoints.down("xs")]: {
            maxWidth: "500px",
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
        [theme.breakpoints.down("xs")] : {
            margin: "0 auto",
            width: "100%",
            maxWidth: "500px",
            height: "400px",
            marginBottom: "24px"
        }
    },
    buyPaymentButton: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#00A0AB",
        padding: "8px 20px",
        color: "#fff",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "500",
        transition: ".2s all linear",
        "&:hover": {
            backgroundColor: "#087474"
        }
    }
}))

function BuyDelivery() {
    const [deliveryOther, setDeliveryOther] = useState(false)
    const [deliveryCourier, setDeliveryCourier] = useState(false)
    const [deliveryPickup, setDeliveryPickup] = useState(false)
    const [modalParagraph, setModalParagraph] = useState (false)
    const [paragraphContent, setParagraphContent] = useState(true)

    const {matchesMobile} = useMedia()


    function paragraphBox(map = false, xs = false, buttonName = "Перейти к оплате") {
        return (
        <div className={classes.paragraphBox}>
            <div className={classes.paragraphList}>
                <div className={classes.paragraphItem}>
                    <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                    <div calssName={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                    <div calssName={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                    {xs ? <button className={classes.buyPaymentButton} type="submit">{buttonName}</button> : null}
                </div>
                <div className={classes.paragraphItem}>
                    <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                    <div calssName={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                    <div calssName={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                </div>
                <div className={classes.paragraphItem}>
                    <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                    <div calssName={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                    <div calssName={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                </div>
                <div className={classes.paragraphItem}>
                    <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                    <div calssName={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                    <div calssName={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                </div>
                <div className={classes.paragraphItem}>
                    <div className={classes.paragraphAdress}>Челябинск, ул. Елькина, 92в</div>
                    <div calssName={classes.paragraphDate}>пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                    <div calssName={classes.paragraphNumber}>+7 (000) 000-00-00</div>
                </div>
            </div>
            {map ? <div className={classes.paragraphMap}></div> : null}
        </div>
        )
    }

    function paragraphMap() {
        return (
            <>
                <div className={classes.paragraphMap}></div>
                {paragraphBox(false, true, "Выбрать этот пункт")}
            </>
        ) 
    }


    const classes = useStyles()
    return (
        <>
            <section className={classes.buyDilevery}>
                <div className={classes.buyDileveryBox} style={{backgroundColor: deliveryOther ? "#E9E9E9" : null}} onClick={() => setDeliveryOther(!deliveryOther)}>
                    <div className={classes.buyDileveryInf}>
                        <div className={classes.buyDeliveryName}>
                            <div className={classes.buyDileveryCircle} style={{backgroundColor: deliveryOther ? "#00A0AB" : null}}></div>
                            <div className={classes.buyDileveryTitle}>Доставка номер один</div>
                        </div>
                        <div className={classes.buyDileveryPrice}>500&nbsp;&#8381;</div>
                    </div>
                    <p className={classes.buyDileverySubtitle}>От двух до 7 рабочих дней. Примерное время доставки, и цена рассчитаны <a href="/" className={classes.buyDileveryDesc}>для вашего города</a></p>
                </div>
                <Collapse in={deliveryOther} timeout="auto" unmountOnExit >
                    <div className={classes.buyDileverySend}>
                        <h4 className={classes.buyDileveryOneTitle}>Пункт самомывоза</h4>
                        <div className={classes.buyDileveryOneAdressBlock}>
                            <div className={classes.buyDileveryOneAdressBox}>
                                <div className={classes.buyDileveryOneAdress}>Челябинск, ул. Елькина, 92в</div>
                                <div className={classes.buyDileveryOneAdressInf}>Расписание пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                                <div className={classes.buyDileveryOneAdressInf}>Номер для связи +7 (000) 000-00-00</div>
                                <div className={classes.buyDileveryOneParagraph}onClick={() => setModalParagraph(!modalParagraph)}>Выбрать другой пункт из 00 в вашем городе</div>
                            </div>
                            <div className={classes.buyDileveryMap}></div>
                        </div>
                        <h3 className={classes.buyDileveryInputTitel}>Данные покупателя для получения заказа</h3>
                        <form className={classes.buyDileveryInputBox}>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Имя'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    Данные как в паспорте, посылку выдадут только лично вам
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Фамилия'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    ....
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Отчество'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    ...
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Телефон'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    На указанный номер телефона будут приходить SMS сообщения о статусе доставки и оплаты
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Почта'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    На этот адрес придёт чек
                                </p>
                            </div>
                        </form>
                    </div>
                </Collapse>
                <Dialog open={modalParagraph} onClose={() => setModalParagraph(!modalParagraph)}>
                    <div className={classes.paragraph}>
                        <div className={classes.paragraphTitle}>Выбор пункта самовызова товара</div>
                        {matchesMobile ? <div className={classes.paragraphMenu}>
                            <div className={`${classes.paragraphMenuItem} ${paragraphContent ? classes.paragraphMenuItemActive : null}`} onClick={() => setParagraphContent(!paragraphContent)}>Список</div>
                            <div className={`${classes.paragraphMenuItem} ${paragraphContent ?  null : classes.paragraphMenuItemActive}`} onClick={() => {
                                setParagraphContent(!paragraphContent)
                            }}>Карта</div>
                        </div> : null }
                        {matchesMobile ? paragraphContent ? paragraphBox(false, true) : paragraphMap() :  paragraphBox(true)}
                    </div>
                </Dialog>
            </section>
            <section className={classes.buyDilevery}>
                <div className={classes.buyDileveryBox} style={{backgroundColor: deliveryCourier ? "#E9E9E9" : null}} onClick={() => setDeliveryCourier(!deliveryCourier)}>
                    <div className={classes.buyDileveryInf}>
                        <div className={classes.buyDeliveryName}>
                            <div className={classes.buyDileveryCircle} style={{backgroundColor: deliveryCourier ? "#00A0AB" : null}}></div>
                            <div className={classes.buyDileveryTitle}>Доставка номер два (курьером например)</div>
                        </div>
                        <div className={classes.buyDileveryPrice}>1000&nbsp;&#8381;</div>
                    </div>
                    <p className={classes.buyDileverySubtitle}>Доставка будет осуществляться в течении 00 дней из расчета <a href="/"  className={classes.buyDileveryDesc}>по вашему городу</a></p>
                </div>
                <Collapse in={deliveryCourier} timeout="auto" unmountOnExit >
                    <div className={classes.buyDileverySend}> 
                        <h3 className={classes.buyDileveryInputTitel}>Данные покупателя для получения заказа</h3>
                        <form className={classes.buyDileveryInputBox}>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Имя'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    Данные как в паспорте, посылку выдадут только лично вам
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Фамилия'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    ....
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Отчество'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    ...
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Телефон'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    На указанный номер телефона будут приходить SMS сообщения о статусе доставки и оплаты
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Почта'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    На этот адрес придёт чек
                                </p>
                            </div>
                        </form>
                        <h3 className={`${classes.buyDileveryInputTitel} ${classes.mt24}`}>Адрес доставки для курьера</h3>
                        <form className={classes.buyDileveryInputBox}>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Улица'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    Данные как в паспорте, посылку выдадут только лично вам
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Номер дома'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    ....
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <TextField className={classes.buyDileveryInput} label='Квартира/Офис'variant='outlined' size='small' type="text"/>
                                 <p className={classes.buyDileveryInputDesc}>
                                    ...
                                </p>
                            </div>
                        </form>
                    </div>
                </Collapse>
            </section>
            <section className={classes.buyDilevery}>
                <div className={classes.buyDileveryBox} style={{backgroundColor: deliveryOther ? "#E9E9E9" : null}} onClick={() => setDeliveryPickup(!deliveryPickup)}>
                    <div className={classes.buyDileveryInf}>
                        <div className={classes.buyDeliveryName}>
                            <div className={classes.buyDileveryCircle} style={{backgroundColor: deliveryPickup ? "#00A0AB" : null}}></div>
                            <div className={classes.buyDileveryTitle}>Заберу сам у продавца</div>
                        </div>
                        <div className={classes.buyDileveryPrice}>Бесплатно</div>
                    </div>
                    <p className={classes.buyDileverySubtitle}>Договоритесь об условиях самовызова с продавцом по телефону или в чате самостоятельно</p>
                </div>
                <Collapse in={deliveryPickup} timeout="auto" unmountOnExit >
                    <p className={classes.buyDileveryPickupDesc}>Договаривайтесь с продавцом о месте и времени передачи товара самостоятельно. Деньги за оплату товара продавец получит только после того, как вы подтвердите успешное получение товара. А в случае возникновения спорной ситуации, уладить возникшие разногласия поможет сервис «Безопасная сделка».</p>
                </Collapse>
            </section>
            <SelectBuy/>
        </>
    )
}

export default BuyDelivery
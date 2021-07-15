import React, { useState } from "react"
import { makeStyles, Collapse } from "@material-ui/core"

const useStyles = makeStyles(() => ({
    buyDilevery: {
        marginBottom: "32px",
    },
    buyDileveryBox: {
        padding: "4px 0",
        backgroundColor: "#E9E9E9",
        borderRadius: "8px",
        position: "relative",
        cursor: "pointer"
    },
    buyDileveryInf: {
        display: "flex",
        alignItems: "center",
        marginLeft: "12px"
    },
    buyDileveryCircle: {
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: "#fff",
        border: "1px solid #000",
        marginRight: "12px"
    },
    buyDileveryTitle: {
        fontWeight: "500",
        color: "#2C2C2C",
        fontSize: "18px"
    },
    buyDileveryPrice: {
        position: "absolute",
        top: "4px",
        right: "12px",
        color: "#00A0AB",
        fontWeight: "500",
        fontSize: "18px"
    },
    buyDileverySubtitle: {
        fontSize: "14px",
        color: "#8F8F8F",
        margin: "8px 0 0 12px"
    },
    buyDileveryDesc: {
        color: "#00A0AB",
        textDecoration: "underline"
    },
    buyDileveryOne: {
        marginTop: "24px"
    },
    buyDileveryOneTitle: {
        color: "#8F8F8F",
        fontSize: "14px",
        fontWeight: "500"
    },
    buyDileveryOneAdressBox: {
        marginTop: "24px",
        marginBottom: "32px"
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
        marginTop: "40px"
    },
    buyDileveryInputTitel: {
        color: "#2C2C2C",
        fontSize: "14px",
        fontWeight: "500"
    }
}))

function BuyDelivery({other, courier, pickup}) {

    const [dilevery, setDelivery] = useState(false)

    const classes = useStyles()
    if (other) {
        return (
            <div className={classes.buyDilevery}>
                <div className={classes.buyDileveryBox} onClick={() => setDelivery(!dilevery) }>
                    <div className={classes.buyDileveryInf}>
                        <span className={classes.buyDileveryCircle}></span>
                        <div className={classes.buyDileveryTitle}>Доставка номер один</div>
                    </div>
                    <div className={classes.buyDileveryPrice}>500 &#8381;</div>
                    <p className={classes.buyDileverySubtitle}>От двух до 7 рабочих дней. Примерное время доставки, и цена рассчитаны <span className={classes.buyDileveryDesc}>для вашего города</span></p>
                </div>
                <Collapse in={dilevery} timeout="auto" unmountOnExit >
                    <div className={classes.buyDileveryOne}>
                        <h5 className={classes.buyDileveryOneTitle}>Пункт самомывоза</h5>
                        <div className={classes.buyDileveryOneAdressBox}>
                            <div className={classes.buyDileveryOneAdress}>Челябинск, ул. Елькина, 92в</div>
                            <div className={classes.buyDileveryOneAdressInf}>Расписание пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                            <div className={classes.buyDileveryOneAdressInf}>Номер для связи +7 (000) 000-00-00</div>
                            <div className={classes.buyDileveryOneParagraph}>Выбрать другой пункт из 00 в вашем городе</div>
                        </div>
                        <div className={classes.buyDileveryMap}></div>
                        <div className={classes.buyDileveryInputTitel}>Данные покупателя для получения заказа</div>
                        <form className={classes.buyDileveryInputBox}>
                            <div className={classes.buyDileveryInputItem}>
                                <input type="text" placeholder="Имя" className={classes.buyDileveryInput}/>
                                <p className={classes.buyDileveryInputDesc}>
                                    Данные как в паспорте, посылку выдадут только лично вам
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <input type="text" placeholder="Имя" className={classes.buyDileveryInput}/>
                                <p className={classes.buyDileveryInputDesc}>
                                    Данные как в паспорте, посылку выдадут только лично вам
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <input type="text" placeholder="Имя" className={classes.buyDileveryInput}/>
                                <p className={classes.buyDileveryInputDesc}>
                                    Данные как в паспорте, посылку выдадут только лично вам
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <input type="text" placeholder="Имя" className={classes.buyDileveryInput}/>
                                <p className={classes.buyDileveryInputDesc}>
                                    Данные как в паспорте, посылку выдадут только лично вам
                                </p>
                            </div>
                            <div className={classes.buyDileveryInputItem}>
                                <input type="text" placeholder="Имя" className={classes.buyDileveryInput}/>
                                <p className={classes.buyDileveryInputDesc}>
                                    Данные как в паспорте, посылку выдадут только лично вам
                                </p>
                            </div>
                        </form>
                    </div>
                </Collapse>
            </div>
        )
    }

    if (courier) {
        return (
            <div className={classes.buyDilevery}>
                <div className={classes.buyDileveryBox}>
                    <div className={classes.buyDileveryInf}>
                        <span className={classes.buyDileveryCircle}></span>
                        <div className={classes.buyDileveryTitle}>Доставка номер два (курьером например)</div>
                    </div>
                    <div className={classes.buyDileveryPrice}>1000 &#8381;</div>
                    <p className={classes.buyDileverySubtitle}>Доставка будет осуществляться в течении 00 дней из расчета <span  className={classes.buyDileveryDesc}>по вашему городу</span></p>
                </div>
                <Collapse in={dilevery} timeout="auto" unmountOnExit >
                    <h1>Test</h1>
                </Collapse>
            </div>
        )
    }

    if (pickup) {
        return (
            <div className={classes.buyDilevery}>
                <div className={classes.buyDileveryBox}>
                    <div className={classes.buyDileveryInf}>
                        <span className={classes.buyDileveryCircle}></span>
                        <div className={classes.buyDileveryTitle}>Заберу сам у продавца</div>
                    </div>
                    <div className={classes.buyDileveryPrice}>Бесплатно</div>
                    <p className={classes.buyDileverySubtitle}>Договоритесь об условиях самовызова с продавцом по телефону или в чате самостоятельно</p>
                </div>
                <Collapse in={true} timeout="auto" unmountOnExit >
                    <p>Договаривайтесь с продавцом о месте и времени передачи товара самостоятельно. Деньги за оплату товара продавец получит только после того, как вы подтвердите успешное получение товара. А в случае возникновения спорной ситуации, уладить возникшие разногласия поможет сервис «Безопасная сделка».</p>
                </Collapse>
            </div>
        )
    }
}

export default BuyDelivery
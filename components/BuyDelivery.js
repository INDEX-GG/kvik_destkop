import React from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
    buyDilevery: {
        marginBottom: "32px",
        padding: "4px 0",
        backgroundColor: "#E9E9E9",
        borderRadius: "8px",
        position: "relative",
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
    }
}))

function BuyDelivery({other, courier, pickup}) {
    const classes = useStyles()
    if (other) {
        return (
        <div className={classes.buyDilevery}>
            <div className={classes.buyDileveryInf}>
                <span className={classes.buyDileveryCircle}></span>
                <div className={classes.buyDileveryTitle}>Доставка номер один</div>
            </div>
            <div className={classes.buyDileveryPrice}>500 &#8381;</div>
            <p className={classes.buyDileverySubtitle}>От двух до 7 рабочих дней. Примерное время доставки, и цена рассчитаны <span className={classes.buyDileveryDesc}>для вашего города</span></p>
        </div>
        )
    }

    if (courier) {
        return (
            <div className={classes.buyDilevery}>
                <div className={classes.buyDileveryInf}>
                    <span className={classes.buyDileveryCircle}></span>
                    <div className={classes.buyDileveryTitle}>Доставка номер два (курьером например)</div>
                </div>
                <div className={classes.buyDileveryPrice}>1000 &#8381;</div>
                <p className={classes.buyDileverySubtitle}>Доставка будет осуществляться в течении 00 дней из расчета <span  className={classes.buyDileveryDesc}>по вашему городу</span></p>
            </div>
        )
    }
}

export default BuyDelivery
import React, { useState } from "react";
import {makeStyles} from "@material-ui/core";
import Card from "../UI/icons/Card"
import theme from "../UI/theme";

const useStyles = makeStyles(() => ({
    buyPayment: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    buyPaymentPrice: {
        color: "#00A0AB",
        fontSize: "30px",
        fontWeight: "700",
        [theme.breakpoints.down("sm")] : {
            color: "#2C2C2C"
        }
    },
    buyPaymentDil: {
        color: "#00A0AB",
        fontSize: "14px",
        fontWeight: "500",
    },
    buyPaymentWay: {
        margin: "28px 0 40px",
        width: "264px",
        position: "relative"
    },
    buyPaymentChoice: {
        color: "#2C2C2C",
        fontSize: "14px",
        marginBottom: "16px"
    },
    buyPaymentList: {
        display: "block",
        width: "100%",
        height: "32px",
        borderRadius: "8px",
        fontSize: "14px",
        color:"#2C2C2C",
    },
    buyPaymentRules: {
        margin: "16px 0 56px",
        textAlign: "center",
        "& > a": {
            color: "#00A0AB",
            textDecoration: "underline"
        }
    },
    test: {
        position: "absolute",
        top: "36px",
        left: "16px"
    },
    buyPaymentButton: {
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
function SelectBuy() {

    const classes = useStyles()

    const [selectImg, setSelectImg] = useState(false)

    function changePayMethod(e) {

        if (e.target.value == 0) {
            setSelectImg(false)
        }
        if (e.target.value == 1) {
            setSelectImg(<Card/>)
        }
        if (e.target.value == 2) {
            setSelectImg("Image 2")
        }
        if (e.target.value == 3) {
            setSelectImg("Image 3")
        }
    }

   return (
   <div className={classes.buyPayment}>
        <h2 className={classes.buyPaymentPrice}>1500 &#8381;</h2>
        <h3 className={classes.buyPaymentDil}>С учетом стоимости доставки 500 &#8381;</h3>
        <div className={classes.buyPaymentWay}>
            <div className={classes.buyPaymentChoice}>Выбор способ оплаты</div>
            <select className={classes.buyPaymentList} style={{paddingLeft: selectImg ? "65px": "16px", color: selectImg ? null : "#C7C7C7"}} onChange={(e) => changePayMethod(e)}>
                <option className={classes.buyPaymentItem} value={0}>Выберите спопсоб оплаты</option>
                <option className={classes.buyPaymentItem} value={1}>Банковская карта</option>
                <option className={classes.buyPaymentItem} value={2}>Вариант 2</option>
                <option className={classes.buyPaymentItem} value={3}>Вариант 3</option>
            </select>
            <div className={classes.test}>{selectImg}</div>
        </div>
        <button className={classes.buyPaymentButton} type="submit">Перейти к оплате</button>
        <div className={classes.buyPaymentRules}>Оплачивая заказ вы соглашаетесь с <a href="/">Правилами сервиса</a> и офертой <a href="/">Службы доставки</a></div>
    </div>
    )
}

export default SelectBuy
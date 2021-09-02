import React, { useState } from "react"
import { makeStyles, /* Collapse, */ } from "@material-ui/core"
import SelectBuy from "./SelectBuy"
import DeliveryBuyerForm from "./DeliveryBuyerForm"
import BuyDeliveryItem from "./BuyDeliveryItem"
import BuyDeliveryMap from "./BuyDeliveryMap"

const useStyles = makeStyles(() => ({
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
        flexWrap: "wrap"
    },
    buyDileveryOneAdressBox: {
		marginRight: '10px',
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
    buyDileveryMap: {
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
    }
}))

function BuyDelivery() {
	const [dialogMap, setDialogMap] = useState(false);
    const classes = useStyles()

	const mapAddress = [{
		id: '1',
		adress: 'Челябинск, ул. Елькина, 92в',
		time: 'пн-пт: 8:00-20:00, сб: 9:00-16:00',
		phone: '+7 (000) 000-00-00',
		have: true
	}, {
		id: '2',
		adress: 'Челябинск, ул. Елькина, 92в',
		time: 'пн-пт: 8:00-20:00, сб: 9:00-16:00',
		phone: '+7 (000) 000-00-00',
		have: false
	},
	{	
		id: '3',
		adress: 'Челябинск, ул. Елькина, 92в',
		time: 'пн-пт: 8:00-20:00, сб: 9:00-16:00',
		phone: '+7 (000) 000-00-00',
		have: true
	},
	{
		id: '4',
		adress: 'Челябинск, ул. Елькина, 92в',
		time: 'пн-пт: 8:00-20:00, сб: 9:00-16:00',
		phone: '+7 (000) 000-00-00',
		have: true
	},
	{
		id: '5',
		adress: 'Челябинск, ул. Елькина, 92в',
		time: 'пн-пт: 8:00-20:00, сб: 9:00-16:00',
		phone: '+7 (000) 000-00-00',
		have: true
	},
	{
		id: '6',
		adress: 'Челябинск, ул. Елькина, 92в',
		time: 'пн-пт: 8:00-20:00, сб: 9:00-16:00',
		phone: '+7 (000) 000-00-00',
		have: false
	}]

    return (
        <>
            <BuyDeliveryItem title='Доставка номер один' subtitle='От двух до 7 рабочих дней. Примерное время доставки, и цена рассчитаны для вашего города' price='500'>
                <div className={classes.buyDileverySend}>
                    <div className={classes.buyDileveryOneAdressBlock}>
                        <div className={classes.buyDileveryOneAdressBox}>
                            <h4 className={classes.buyDileveryOneTitle}>Пункт самомывоза</h4>
                            <div className={classes.buyDileveryOneAdress}>Челябинск, ул. Елькина, 92в</div>
                            <div className={classes.buyDileveryOneAdressInf}>Расписание пн-пт: 8:00-20:00, сб: 9:00-16:00</div>
                            <div className={classes.buyDileveryOneAdressInf}>Номер для связи +7 (000) 000-00-00</div>
                            <div className={classes.buyDileveryOneParagraph} onClick={() => setDialogMap(true)}>Выбрать другой пункт из 00 в вашем городе</div>
                        </div>
                        <div className={classes.buyDileveryMap}></div>
                    </div>
                    <DeliveryBuyerForm />
                </div>
            </BuyDeliveryItem>
            <BuyDeliveryItem title='Доставка номер два (курьером например)' subtitle='Доставка будет осуществляться в течении 00 дней из расчета по вашему городу' price='1000'>
                <div className={classes.buyDileverySend}>
                    <DeliveryBuyerForm courier />
                </div>
            </BuyDeliveryItem>
            <BuyDeliveryItem title='Заберу сам у продавца' subtitle='Договоритесь об условиях самовызова с продавцом по телефону или в чате самостоятельно'>
                <p className={classes.buyDileveryPickupDesc}>Договаривайтесь с продавцом о месте и времени передачи товара самостоятельно. Деньги за оплату товара продавец получит только после того, как вы подтвердите успешное получение товара. А в случае возникновения спорной ситуации, уладить возникшие разногласия поможет сервис «Безопасная сделка».</p>
            </BuyDeliveryItem>
            <SelectBuy />
			<BuyDeliveryMap addressArr={mapAddress} dialog={dialogMap} setDialog={setDialogMap} />
        </>
    )
}

export default BuyDelivery
import MainLayout from "../../layout/MainLayout"
import User from "../../components/User/User";
import { Avatar, Box, Container, makeStyles } from "@material-ui/core";
import Image from "next/image"
import StarRating from "../../components/StarRating"
import { borderTop, fontSize, fontWeight } from "@material-ui/system";
import BuyDelivery from "../../components/BuyDelivery";

const useStyles = makeStyles(() => ({
    buyContainer: {
        display: "flex"
    },
    buyProduct: {
        flexGrow: 1,
        paddingRight: "48px"
    },
    buyAd: {
        display: "flex",
        flexDirection: "column",
        width: "224px"
    },
    buyTitle: {
        fontWeight: "500",
        fontSize: "18px",
        textAlign: "center",
        color: "#2C2C2C"
    },
    buyItem: {
        display: "flex",
        borderTop: "1px solid #E9E9E9",
        borderBottom: "1px solid #E9E9E9",
        padding: "4px 0",
        fontSize: "14px",
        color: "#8F8F8F",
        position: "relative",
        margin: "24px 0 32px"
    },
    buyItemImg: {
        borderRadius: "2px"
    },

    buyItemInf: {
        marginLeft: "12px"
    },
    buyItemPrice: {
        color: "#2C2C2C",
        fontWeight: "500",
        marginBottom: "4px"
    },
    buyItemName: {
        color: "#2C2C2C",
        fontWeight: 500,
        marginBottom: "14px"
    },
    buyItemDate: {
        marginBottom: "4px"
    },
    buyOwner: {
        position: "absolute",
        right: "0",
        top: "4px"
    },
    buyOwnerBox: {
        display: "flex",
        alignItems: "center",
        marginBottom: "18px",
        justifyContetn: "flex-end"
    },
    buyOwnerInf: {
        display: "flex",
        flexDirection: "column",
        marginRight: "8px"
    },
    buyOwnerDate: {
        alignSelf: "flex-end"
    },
    buyOwnerImg: {
        width: "32px",
        height: "32px"
    },
    buyOwnerRaiting: {
        display: "flex",
        alignItems: "center",
        marginLeft: "25px"
    },
    buyGetTitle: {
        textAlign: "center",
        color: "#2C2C2C",
        fontWeight: "400",
        fontSize: "14px",
        marginBottom: "20px"
    },
    buyPayment: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    buyPaymentPrice: {
        color: "#00A0AB",
        fontSize: "30px",
        fontWeight: "700"
    },
    buyPaymentDil: {
        color: "#00A0AB",
        fontSize: "14px",
        fontWeight: "500"
    },
    buyPaymentWay: {
        margin: "28px 0 16px",
        width: "264px",
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
    },
    buyPaymentRules: {
        margin: "16px 0 56px"
    }
}))


function Buy() {
    const raiting = 4
    const classes = useStyles()
    return (
        <MainLayout>
            <Container className={classes.buyContainer}>
                <Box className={classes.buyProduct}>
                    <h1 className={classes.buyTitle}>Оформление и оплата</h1>
                    <section className={classes.buyItem}>
                        <Image className={classes.buyItemImg} src="/offersImage/25374offer-28374.webp" alt="Img-product" width={88} height={88}/>
                        <div className={classes.buyItemInf}>
                            <div className={classes.buyItemPrice}>1000 &#8381;</div>
                            <div className={classes.buyItemName}>Test12345</div>
                            <div className={classes.buyItemDate}>Дата публикации 00.00.00.00.00</div>
                            <div className={classes.buyItemCity}>Челябинск</div>
                        </div>
                        <div className={classes.buyOwner}>
                            <div className={classes.buyOwnerBox}>
                                <div className={classes.buyOwnerInf}>
                                    <div className={classes.buyOwnerName}>Имя пользователя</div>
                                    <div className={classes.buyOwnerDate}>00.00.00 00.00</div>
                                </div>
                                <Avatar className={classes.buyOwnerImg} alt="owner"/>
                            </div>
                            <div className={classes.buyOwnerRaiting}>
                                <div className={classes.buyOwnerRaitingNumber}>{raiting}.0</div>
                                <StarRating rating={raiting}/>
                            </div>
                        </div>
                    </section>
                    <h2 className={classes.buyGetTitle}>Выберите способ получения</h2>
                    <BuyDelivery other={true}/>
                    <BuyDelivery courier={true}/>
                    <BuyDelivery pickup={true}/>
                    <div className={classes.buyPayment}>
                        <h2 className={classes.buyPaymentPrice}>1500 &#8381;</h2>
                        <h3 className={classes.buyPaymentDil}>С учетом стоимости доставки 500 &#8381;</h3>
                        <div className={classes.buyPaymentWay}>
                            <div className={classes.buyPaymentChoice}>Выбор способ оплаты</div>
                            <select className={classes.buyPaymentList}>
                                <option className={classes.buyPaymentItem}>Вариант 1</option>
                                <option className={classes.buyPaymentItem}>Вариант 2</option>
                                <option className={classes.buyPaymentItem}>Вариант 3</option>
                            </select>
                        </div>
                        <button className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" type="submit">Перейти к оплате</button>
                        <div className={classes.buyPaymentRules}>Оплачивая заказ вы соглашаетесь с <a href="/">Правилами сервиса</a> и офертой <a href="/">Службы доставки</a></div>
                    </div>
                </Box>
                <aside className={classes.buyAd}>
                    <Image src='/img/joker1.png' width={224} height={480} placeholder="blur" blurDataURL='default'/>
                    <Image src='/img/joker2.png' width={224} height={480} placeholder="blur" blurDataURL='default'/>
                </aside>
            </Container>
        </MainLayout>
    )
}

export default Buy
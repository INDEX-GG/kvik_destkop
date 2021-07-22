import React from "react";
import MetaLayout from "../../layout/MainLayout"
import User from "../../components/User/User";
import { Avatar, Box, Container, makeStyles } from "@material-ui/core";
import Image from "next/image"
import StarRating from "../../components/StarRating"
import BuyDelivery from "../../components/BuyDelivery";
import Card from "../../UI/icons/Card"
import SelectBuy from "../../components/SelectBuy";
import theme from "../../UI/theme"
import { useMedia } from "../../hooks/useMedia";

const useStyles = makeStyles(() => ({
    buyContainer: {
        display: "flex",
        [theme.breakpoints.down("xs")]: {
            padding: "0 12px"
        }
    },
    buyProduct: {
        flexGrow: 1,
        paddingRight: "48px",
        [theme.breakpoints.down("sm")]: {
            paddingRight: "0px"
        }
    },
    buyAd: {
        display: "flex",
        flexDirection: "column",
        width: "224px",
        "& > div": {
            marginBottom: "24px"
        },
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
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
        marginLeft: "12px",
        [theme.breakpoints.down("sm")]: {
            position: "absolute",
            left: "80px",
            bottom: "4px"
        }
    },
    buyItemPrice: {
        color: "#2C2C2C",
        fontWeight: "500",
        marginBottom: "4px"
    },
    buyItemName: {
        color: "#2C2C2C",
        fontWeight: 500,
        marginBottom: "14px",
        [theme.breakpoints.down("sm")]: {
            marginBottom: "0"
        }
    },
    buyItemDate: {
        marginBottom: "4px",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    buyItemCity: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
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
    buyOwnerName: {
        color: "#2C2C2C",
        fontWeight: "500"
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
        marginLeft: "20px"
    },
    buyOwnerRaitingNumber: {
        marginRight: "4px"
    },
    buyGetTitle: {
        textAlign: "center",
        color: "#2C2C2C",
        fontWeight: "400",
        fontSize: "14px",
        marginBottom: "20px"
    },
}))


function Buy() {

    const raiting = 4
    const classes = useStyles()

    return (  
        <MetaLayout>
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
                    <BuyDelivery/>
                </Box>
                <aside className={classes.buyAd}>
                    <div className={classes.buyAdItem}>
                        <Image src='/img/joker1.png' width={224} height={480} placeholder="blur" blurDataURL='default'/>
                    </div>
                    <div className={classes.buyAdItem}>
                        <Image src='/img/joker2.png' width={224} height={480} placeholder="blur" blurDataURL='default'/>
                    </div>
                </aside>
            </Container>
        </MetaLayout>
    )
}

export default Buy
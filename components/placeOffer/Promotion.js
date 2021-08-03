import { Box, Button, makeStyles, Dialog } from "@material-ui/core";
import { useState } from "react";
import SelectBuy from "../SelectBuy";
import { useMedia } from "../../hooks/useMedia";
import router, { useRouter } from "next/dist/client/router";
import Image from "next/image"
import { route } from "next/dist/next-server/server/router";

const useStyles = makeStyles(theme => ({
    promotionContainer: {
        maxWidth: "711px",
        width: "100%",
        margin: "0 auto"
    },
    promotionTitle: {
        fontSize: "18px",
        color: "#2C2C2C",
        margin: "24px 0 11px",
    },
    promotionContent: {
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "0 32px",
        marginBottom: "32px",
        [theme.breakpoints.down("sm")]: {
            boxShadow: "none"
        },
        [theme.breakpoints.down("xs")]: {
            padding: "0 10px"
        },

    },
    promotionListTitle: {
        fontSize: "18px",
        color: "#2C2C2C",
        padding: "32px 0",
        textAlign: "center"
    },
    promotionItem: {
        borderRadius: "8px",
        margin: "0 0px 24px",
        padding: "8px 16px 10px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#E9E9E9"
        }
    },
    propmtionItemBox: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px"
    },
    promotionItemCheck: {
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        border: "1px solid black"
    },
    promotionItemTitle: {
        flexGrow: "1",
        marginLeft: "12px",
        color: "#2C2C2C",
        fontWeight: "500"
    },
    promotionItemPrice: {
        color: "#00A0AB",
        fontSize: "18px",
        fontWeight: "500"
    },
    promotionItemDesc: {
        color: "#8F8F8F",
        fontSize: "12px",
    },
    promotionPayment: {
        display: "flex",
        justifyContent: 'flex-end',
        [theme.breakpoints.between("0", "450")]: {
            justifyContent: 'center',
            flexWrap: "wrap",
        }
    },
    promotionSelectPay: {
        marginRight: "48px",
        [theme.breakpoints.between("0", "480")]: {
           marginRight: "15px"
        }
    },
    promotionPrice: {
        color: "#00A0AB",
        fontWeight: "500",
        fontSize: "18px",
        marginBottom: "4px",
        textAlign: "right",
        [theme.breakpoints.between("0", "450")]: {
            textAlign: "center",
        }
    },
    promotionSale: {
        color: "#00A0AB",
        fontWeight: "500",
        marginBottom: "20px",
    },
    buttonNext: {
        border: 0,
        height: "32px",
        minWidth: "132px",
        fontFamily: "inherit",
        color: "#fff",
        marginLeft: "10px",
        "&:hover": {
            backgroundColor :"#00A0AB"
        }
    },
    promotionFree: {
        paddingBottom: "192px",
        display: "flex",
        justifyContent: "flex-end"
    },
    promotionMobileTitel: {
        textAlign: "center",
        padding: "16px 0px 12px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        marginBottom: "24px"
    },
    promotionMobileSubTitle: {
        paddingTop: "5px",
        color: "#8F8F8F",
        textAlign: "center"
    },
    productContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    productImg: {
        width: "88px",
        height: "88px",
        objectFit: "cover",
        padding: "3px 3px 2px",
    },
    productPrice: {
        color: "#2C2C2C",
        fontSize: "12px",
        fontWeight: "500"
    },
    productName: {
        color: "#2C2C2C",
        fontSize: "12px",
        fontWeight: "500"
    },
    productCard: {
        width: "94px",
        height : "126px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "1px",
        margin: "35px 0 16px",
        display: 'flex',
        flexDirection: "column",
        alignItems: "center"
    },

    productUrl: {
        color: "#00A0AB",
        fontWeight :"500",
        textDecoration: "underline",
        margin: "0 60px 24px"
    },
    productPublished: {
        fontSize: "18px",
        fontWeight: "500",
        color: "#2C2C2C",
        textAlign: "center",
        marginBottom: "24px"
    },
    productButton: {
        border: 0,
        color: "#ffff",
        backgroundColor: "#00A0AB",
        width: "92px",
        marginBottom: "32px",
        "&:hover": {
            backgroundColor: "#00A0AB"
        }
    }
}))


export default function Promotion({product}) {

    const [promotion, setPromotion] = useState([false, false, false, false, false, false, false, false, false])
    const [free, setFree] = useState(false)
    const [productModal, setProductModal] = useState(false)
    const [value, setValue] = useState(0)
    const rounter = useRouter()
    const {matchesTablet, matchesMobile} = useMedia()

    const title = ["Выделение цветом", "Поднятие в поиске", "Отметка на карте", "Показ в схожих категориях", "Размещение в других городах", "Защита номера", "VIP-объявление", "Приветственное сообщение", "Без продвижения"]
    
    const desc = ["На месяц выделим ваше объявление цветом, для привлечения внимания", "Ваше объявление сутки будет показываться в верхних строчках при поиске", "Чтобы о ваших товарах и услугах узнало как можно большее количество пользователей", "Показ ваших объявлений пользователям, которые ищут похожие товары ", "Ваше объявление будут видеть пользователи в аналогичной категории других городов", "Защита вашего номера телефона от спама и рассылок, рейтинг и отзывы отображаться не будут", "Включает в себя увеличенный размер фото, выделение цветом, поднятие в поисковой строке", "Приветственное сообщение в диалоге с вашими потенциальными покупателями", null]

    const price = ["00 ₽", "00 ₽", "00 ₽", "00 ₽", "00 ₽", "00 ₽", "00 ₽", "00 ₽", "Бесплатно"]


    function changeValue(str) {
        setValue(str)
        console.log(value)
    }

    function generateArr(index) {
        const ok = []

        if (index === promotion.length - 1) {
            setPromotion([false, false, false, false, false, false, false, false, true])
            setFree(true)
            setValue(0)
            return;
        }

        promotion.map((item, i) => {
            if (index == i) {
                ok.push(!item)
                return;
            }

            if (i == promotion.length - 1) {
                ok.push(false)
                return;
            }
            ok.push(item)
        })

        setPromotion([...ok])
        setFree(false)
    }

    const classes = useStyles()
    return (
        <>
            {matchesMobile || matchesTablet ? 
            <>
                <div className="accountArrowLeft"></div>
                <div className={classes.promotionMobileTitel}>
                    <h6 className="modal__block__top_title">Новое объявление</h6>
                    <div className={classes.promotionMobileSubTitle}>2/2</div>
                </div>
            </> : null}
            <Box className={classes.promotionContainer}>
                {matchesTablet || matchesMobile ? null :<div className={classes.promotionTitle}>Новое объявление</div>}
                <div className={classes.promotionContent}>
                    {matchesTablet || matchesMobile ? null : <div className={classes.promotionListTitle}>Продвижение  объявления </div>}
                    {title.map((item, index) => {
                        return (
                        <div style={{backgroundColor: promotion[index] ? "#E9E9E9" : "#fff"}} className={classes.promotionItem} onClick={() => generateArr(index)}>
                            <div className={classes.propmtionItemBox}>
                                <div style={{backgroundColor: promotion[index] ? "#00A0AB": "#fff"}} className={classes.promotionItemCheck}></div>
                                <div className={classes.promotionItemTitle}>{title[index]}</div>
                                <div className={classes.promotionItemPrice}>{price[index]}</div>
                            </div>
                            <p className={classes.promotionItemDesc}>{desc[index]}</p>
                        </div>
                        )
                    })}
                    {free ? 
                    <div className={classes.promotionFree}>
                        <Button onClick={() => setProductModal(!productModal)} style={{backgroundColor: "#00A0AB" }} className={classes.buttonNext}>Продолжить без продвижения</Button>
                    </div> : 
                    <div className={classes.promotionPayment}>
                        <div className={classes.promotionSelectPay}>
                            <SelectBuy promotion align={matchesMobile ? true : false} value={changeValue}/>
                        </div>
                        <div className={classes.promotionPriceBox}>
                            <div className={classes.promotionPrice}>Итого 00 ₽</div>
                            <div className={classes.promotionSale}>С учётом скидки 00 ₽</div>
                            <Button onClick={() => setProductModal(!productModal)} style={{backgroundColor: +value ? "#00A0AB" : "#A1DCE0" }} disabled={+value ? false : true} className={classes.buttonNext}>Продолжить</Button>
                        </div>
                    </div>}
                </div>
            </Box>
            <Dialog open={productModal} onClose={() => setProductModal(!productModal)}>
                <div className={classes.productContainer}>
                    <div className={classes.productCard}>
                        <img src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" className={classes.productImg} alt="product photo"/>
                        <div className={classes.productPrice}>{product.price} ₽</div>
                        <div className={classes.productName}>{product.title}</div>
                    </div>
                    <div onClick={() => router.push(`/product/${product.id}`)} className={classes.productUrl}>Перейти на страницу объявления</div>
                    <div className={classes.productPublished}>Ваше объявление опубликовано!</div>
                    <Button className={classes.productButton} onClick={() => rounter.push("/")}>Хорошо</Button>
                </div>
                    
            </Dialog>
        </>
    )
}
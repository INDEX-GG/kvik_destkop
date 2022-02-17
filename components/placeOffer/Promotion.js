import {Box, Button, makeStyles, Dialog} from "@material-ui/core";
import {useEffect, useState} from "react";
import SelectBuy from "../SelectBuy";
import { useMedia } from "../../hooks/useMedia";
import  { useRouter } from 'next/router';
import PromotionContent from "./PromotionContent";
// import {STATIC_URL} from "../../lib/constants";

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
		fontWeight: "500",
		[theme.breakpoints.down(350)]: {
			marginLeft: '5px',
			fontSize: '12px'
		}
	},
	promotionItemPrice: {
		color: "#00A0AB",
		fontSize: "18px",
		fontWeight: "500",
		[theme.breakpoints.down(350)]: {
			fontSize: '14px'
		}
	},
	promotionItemDesc: {
		color: "#8F8F8F",
		fontSize: "12px",
	},
	promotionPayment: {
		display: "flex",
		justifyContent: 'flex-end',
		[theme.breakpoints.between("0", "480")]: {
			justifyContent: 'center',
			flexWrap: "wrap",
		}
	},
	promotionSelectPay: {
		marginRight: "48px",
		[theme.breakpoints.down(490)]: {
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
			backgroundColor: "#00A0AB"
		}
	},
	promotionFree: {
		paddingBottom: "192px",
		display: "flex",
		justifyContent: "flex-end"
	},
	promotionMobileTitel: {
		textAlign: "center",
		padding: "16px 0px 27px",
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
		width: "118px",
		height: "136.5px",
		borderRadius: "8px 8px 0 0",
		objectFit: "cover",
		paddingBottom: "5px"
	},
	productPrice: {
		color: "#2C2C2C",
		fontSize: "12px",
		fontWeight: "500",
		paddingLeft: "7px"
	},
	productName: {
		color: "#2C2C2C",
		fontSize: "12px",
		fontWeight: "500",
		padding: "5px 0 0 7px",
	},
	productLocation: {
		color: "#8F8F8F",
		fontSize: "9px",
		fontWeight: "400",
		padding: "7px 0 0 7px",
	},
	productCard: {
		width: "118px",
		height: "205.51px",
		boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
		borderRadius: "8px",
		margin: "15px 0 26px",
		display: 'flex',
		flexDirection: "column",
	},

	productPublished: {
		fontSize: "18px",
		fontWeight: "500",
		margin: "0 50px 0 50px",
		color: "#2C2C2C",
		textAlign: "center",
		marginBottom: "24px",
		width: "250px"
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


export default function Promotion({ dialog = false, setDialog = false, product, editProduct }) {


	const classes = useStyles()
	const [promotion, setPromotion] = useState([false, false, false, false, false, false, false, false, false])
	const [free, setFree] = useState(false)
	const [productModal, setProductModal] = useState(true)

	const [value, setValue] = useState(0)
	// const [autoCloseProductModal, setAutoCloseProductModal] = useState(initState);
	const rounter = useRouter()
	const { matchesTablet, matchesMobile } = useMedia()

	useEffect(() => {
		productModal ? '' : rounter.push("/")
	}, [productModal]);



	const redirectToIndex = () => {
	  return rounter.push("/")
	}

	setTimeout(redirectToIndex, 3000)

	const title = ["Выделение цветом", "Поднятие в поиске", "Отметка на карте", "Показ в схожих категориях", "Размещение в других городах", "Защита номера", "VIP-объявление", "Приветственное сообщение", "Без продвижения"]

	const desc = ["На месяц выделим ваше объявление цветом, для привлечения внимания", "Ваше объявление сутки будет показываться в верхних строчках при поиске", "Чтобы о ваших товарах и услугах узнало как можно большее количество пользователей", "Показ ваших объявлений пользователям, которые ищут похожие товары ", "Ваше объявление будут видеть пользователи в аналогичной категории других городов", "Защита вашего номера телефона от спама и рассылок, рейтинг и отзывы отображаться не будут", "Включает в себя увеличенный размер фото, выделение цветом, поднятие в поисковой строке", "Приветственное сообщение в диалоге с вашими потенциальными покупателями", null]

	const price = ["00 ₽", "00 ₽", "00 ₽", "00 ₽", "00 ₽", "00 ₽", "00 ₽", "00 ₽", "Бесплатно"]


	function changeValue(str) {
		setValue(str)

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

	const promotionAwait = (boolean) => {
		if (boolean) return null;
	
		{matchesMobile || matchesTablet ?
		<>
			<div onClick={() => setDialog(!dialog)} className="accountArrowLeft"/>
			<div className={classes.promotionMobileTitel}>
				<h6 className="modal__block__top_title">Продвижение объявления</h6>
				{/* <div className={classes.promotionMobileSubTitle}>2/2</div> */}
			</div>
		</> : null}
		<Box className={classes.promotionContainer}>
			{matchesTablet || matchesMobile ? null : <div className={classes.promotionTitle}>Новое объявление</div>}
			<div className={classes.promotionContent}>
				{matchesTablet || matchesMobile ? null : <div className={classes.promotionListTitle}>Продвижение  объявления </div>}
				{title.map((item, index) => {
					return (
						<div key={index} style={{ backgroundColor: promotion[index] ? "#E9E9E9" : "#fff" }} className={classes.promotionItem} onClick={() => generateArr(index)}>
							<div className={classes.propmtionItemBox}>
								<div style={{ backgroundColor: promotion[index] ? "#00A0AB" : "#fff" }} className={classes.promotionItemCheck}></div>
								<div className={classes.promotionItemTitle}>{title[index]}</div>
								<div className={classes.promotionItemPrice}>{price[index]}</div>
							</div>
							<p className={classes.promotionItemDesc}>{desc[index]}</p>
						</div>
					)
				})}
				{free ?
					<div className={classes.promotionFree}>
						<Button onClick={() => setProductModal(!productModal)} style={{ backgroundColor: "#00A0AB" }} className={classes.buttonNext}>Продолжить без продвижения</Button>
					</div> :
					<div className={classes.promotionPayment}>
						<div className={classes.promotionSelectPay}>
							<SelectBuy promotion align={matchesMobile ? true : false} value={changeValue} />
						</div>
						<div className={classes.promotionPriceBox}>
							<div className={classes.promotionPrice}>Итого 00 ₽</div>
							<div className={classes.promotionSale}>С учётом скидки 00 ₽</div>
							<Button onClick={() => setProductModal(!productModal)} style={{ backgroundColor: +value ? "#00A0AB" : "#A1DCE0" }} disabled={+value ? false : true} className={classes.buttonNext}>Продолжить</Button>
						</div>
					</div>}
			</div>
		</Box>
	}


	return (
		<PromotionContent dialog={true} setDialog={setDialog}>
			{promotionAwait(true)}
			<Dialog open={/** productModal || false */ productModal}  backdropclick="true" onClose={() => setProductModal(!productModal)}>
				<div className={classes.productContainer}>
					<div className={classes.productCard}>
						{/* !!!!!!!!!! Change */}
						<img src={!editProduct ? product.photo : `${product.photo}`} className={classes.productImg} alt="product photo" />
						<div className={classes.productPrice}>{!editProduct ? product.price : product.price} ₽</div>
						<div className={classes.productName}>{!editProduct ? product.title : product.title}</div>
						<div className={classes.productLocation}>{!editProduct ? product.location : product.location}</div>
					</div>
					{/*<div onClick={() => router.push(`/product/${!editProduct ? product.id : editProduct.id}`)} className={classes.productUrl}>Перейти на страницу объявления</div>*/}
					<div className={classes.productPublished}>{!editProduct ? 'Ваше объявление успешно опубликовано!' : 'Ваше объявление успешно отредактировано!'}</div>
					<Button className={classes.productButton} onClick={() => rounter.push("/")}>Отлично</Button>
				</div>
			</Dialog>
		</PromotionContent>
	)
}

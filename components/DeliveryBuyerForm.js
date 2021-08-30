import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
		// paddingRight: '24px',
		'& > *': {
			paddingRight: '28px'
		},
		'& > *:nth-of-type(3)': {
			paddingRight: '0px'
		},
		[theme.breakpoints.down(768)]: {
			'& > *': {
			paddingRight: '0px'
			}
		}
    },
    buyDileveryInputItem: {
        width: "33.33%",
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
        marginBottom: "16px",
        // [theme.breakpoints.down("sm")] : {
        //     width: "50%",
        // },
        [theme.breakpoints.down(768)] : {
            width: "100%",
			alignItems: 'flex-start',
            paddingLeft: "0",
        },
    },
    buyDileveryInput: {
        width: "100%",
		maxWidth: '270px',
		[theme.breakpoints.down(768)] : {
            maxWidth: 'none'
        }
    },
    buyDileveryInputDesc: {
        color: "#C7C7C7",
		fontSize: '12px',
		maxWidth: '264px',
		alignSelgt: 'flex-start',
		width: '100%',
		[theme.breakpoints.down(768)] : {
            maxWidth: 'none'
        }
    },
}))

const DeliveryBuyerForm = ({courier = false}) => {
	const classes = useStyles();

	return (
		<>
			<h3 className={classes.buyDileveryInputTitel}>Данные покупателя для получения заказа</h3>
			<form className={classes.buyDileveryInputBox}>
				<div className={classes.buyDileveryInputItem}>
					<TextField className={classes.buyDileveryInput} label='Имя'variant='outlined' size='small' type="text"/>
						<p className={classes.buyDileveryInputDesc}>
						Данные как в паспорте, посылку выдадут только лично вам
					</p>
				</div>
				<div className={classes.buyDileveryInputItem}>
					<TextField className={classes.buyDileveryInput} label={courier ? 'Пользователя' : 'Фамилия'} variant='outlined' size='small' type="text"/>
				</div>
				<div className={classes.buyDileveryInputItem}>
					<TextField className={classes.buyDileveryInput} label='Отчество'variant='outlined' size='small' type="text"/>
				</div>
				<div className={classes.buyDileveryInputItem}>
					<TextField className={classes.buyDileveryInput} label='+7 (_ _ _) _ _ _ - _ _ - _ _ 'variant='outlined' size='small' type="text"/>
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
			{courier ? 
			<>
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
				</div>
				<div className={classes.buyDileveryInputItem}>
					<TextField className={classes.buyDileveryInput} label='Квартира/Офис'variant='outlined' size='small' type="text"/>
				</div>
			</form>
			</> : null}
		</>
	)
}

export default DeliveryBuyerForm;
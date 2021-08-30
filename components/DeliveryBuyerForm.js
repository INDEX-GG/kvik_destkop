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
		'& > *:nth-of-type(1)': {
			paddingRight: '30px'
		},
		'& > *:nth-of-type(4)': {
			paddingRight: '30px'
		}
    },
    buyDileveryInputItem: {
        width: "33.33%",
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
        marginBottom: "16px",
        [theme.breakpoints.down("sm")] : {
            width: "50%",
        },
        [theme.breakpoints.down("xs")] : {
            width: "100%",
            paddingLeft: "0",
        },
    },
    buyDileveryInput: {
        width: "100%",
		maxWidth: '264px'
    },
    buyDileveryInputDesc: {
        color: "#C7C7C7",
		fontSize: '12px',
		maxWidth: '264px',
		alignSelgt: 'flex-start'
    },
}))

const DeliveryBuyerForm = () => {
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
					<TextField className={classes.buyDileveryInput} label='Фамилия'variant='outlined' size='small' type="text"/>
				</div>
				<div className={classes.buyDileveryInputItem}>
					<TextField className={classes.buyDileveryInput} label='Отчество'variant='outlined' size='small' type="text"/>
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
		</>
	)
}

export default DeliveryBuyerForm;
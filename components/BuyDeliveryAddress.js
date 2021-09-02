import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	paragraphItem: {
		position: 'relative',
        fontSize: "12px",
        color: "#8F8F8F",
        width: "194px",
        height: "98px",
        borderRadius: "8px",
        marginRight: '10px',
        padding: "8px",
        transition: ".2s all linear",
        "&:hover": {
            backgroundColor: "#E9E9E9"
        },
        [theme.breakpoints.down(960)]: {
            width: "100%",
			marginRight: '0px',
        }
    },
    paragraphAddress: {
        color: "#2C2C2C",
        fontWeight: "500"
    },
	paragraphDate: {
	},
	paragraphNumber: {
		marginBottom: '8px'
	},
	buyPaymentButton: {
        position: "absolute",
        left: "50%",
		width: '171px',
		height: '32px',
        transform: "translateX(-50%)",
        backgroundColor: "#00A0AB",
        color: "#fff",
        fontWeight: "500",
        "&:hover": {
            backgroundColor: "#00A0AB"
        }
    }
}))


const BuyDeliveryAddress = ({post}) => {
	const classes = useStyles();
	const {adress, time, phone} = post
	return (
		<div className={classes.paragraphItem}>
			<div className={classes.paragraphAddress}>{adress}</div>
			<div className={classes.paragraphDate}>{time}</div>
			<div className={classes.paragraphNumber}>{phone}</div>
			{post.have ? <Button className={classes.buyPaymentButton} type="submit">Выбрать этот пункт</Button> : null}
		</div>
	)
}

export default BuyDeliveryAddress;
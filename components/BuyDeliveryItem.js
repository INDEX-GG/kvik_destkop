import React from 'react';
import { Collapse, makeStyles } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
	buyDilevery: {
        marginBottom: "32px",
        width: "100%",
        // maxWidth: "976px",
    },
    buyDileveryBox: {
        padding: "4px 0",
        borderRadius: "8px",
        position: "relative",
        cursor: "pointer",
        transition: ".2s all linear",
        "&:hover": {
            backgroundColor: "#E9E9E9"
        }
    },
    buyDileveryName: {
        display: "flex",
        position: "relative",
    },
    buyDileveryInf: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buyDileveryCircle: {
        position: "absolute",
        left: "12px",
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        border: "1px solid #000",
    },
    buyDileveryTitle: {
        fontWeight: "500",
        color: "#2C2C2C",
        fontSize: "18px",
        position: "relative",
        marginLeft: "38px",
        [theme.breakpoints.down("410")]: {
            fontSize: "16px"
        },
        [theme.breakpoints.down("375")]: {
            fontSize: "14px"
        }
    },
    buyDileveryPrice: {
        color: "#00A0AB",
        fontWeight: "500",
        fontSize: "18px",
        marginRight: "5px",
		whiteSpace: 'nowrap',
        [theme.breakpoints.down("410")]: {
            fontSize: "15px"
        },
    },
    buyDileverySubtitle: {
        fontSize: "12px",
        color: "#8F8F8F",
        margin: "8px 0 0 12px"
    },
    buyDileveryDesc: {
        color: "#00A0AB",
        textDecoration: "underline"
    },
	buyDileveryCircle__active: {
		backgroundColor: "#00A0AB"
	},
	buyDileveryBox__active: {
		backgroundColor: '#E9E9E9'
	}
	
}));

const BuyDeleveryItem = ({title, subtitle, price, children}) => {

	const classes = useStyles();

	const [open, setOpen] = useState(false);

	return (
		<section className={classes.buyDilevery}>
                <div className={`${classes.buyDileveryBox} ${open ? classes.buyDileveryBox__active : ''}`} onClick={() => setOpen(!open)}>
                    <div className={classes.buyDileveryInf}>
                        <div className={classes.buyDileveryName}>
                            <div className={`${classes.buyDileveryCircle} ${open ? classes.buyDileveryCircle__active : ''}`}></div>
                            <div className={classes.buyDileveryTitle}>{title}</div>
                        </div>
                        <div className={classes.buyDileveryPrice}>{price ? `${price} ₽` : 'Бесплатно'}</div>
                    </div>
                    <p className={classes.buyDileverySubtitle}>{subtitle}</p>
                </div>
                <Collapse in={open} timeout="auto" unmountOnExit >
                    {children}
                </Collapse>
            </section>
	)
}

export default BuyDeleveryItem;
import React from 'react'
import { makeStyles } from "@material-ui/core";

import Icecream from "../UI/icons/Icecream";
import { InternalLink } from "../components/links/InternalLink";


const useStyles = makeStyles({
	block: {
		height: "100%",
		display: "grid",
		gridTemplate: `
			"header" auto
			"body" auto
			"footer" auto / 100%
		`,
		alignContent: "center",
		justifyItems: "center",
		alignItems: "center",
		gap: "1em",
		fontFamily: "Roboto",
		fontSize: "14px",
		fontWeight: "500",
		color: "hsl(0, 0%, 20%)",
	},
	image: {
		gridArea: "header",
		position: "relative",
	},
	image__text: {
		position: "absolute",
		fontWeight: "500",
		fontSize: "24px",
		top: "30px",
		left: "-45px",
		'@media (max-width:450px)': {
			fontSize: "18px",
			top: "15px",
			left: "-30px",
		}
	},
	image__icon: {
		'& svg': {
			'@media (max-width:450px)': {
				width: "87px",
				height: "120px",
			}
		}
	},
	message: {
		gridArea: "body",
		textAlign: "center",
	},
	heading: {
		fontSize: "36px",
		'@media (max-width:450px)': {
			fontSize: "20px",
		}
	},
	text: {
		fontSize: "24px",
		'@media (max-width:450px)': {
			fontSize: "14px",
		}
	},
	button__container: {
		gridArea: "footer",
		marginTop: "2em",
	},
	reload: {
		display: "inline-block",
		minWidth: "230px",
		textAlign: "center",
		color: "white",
		background: "#00A0AB",
		borderRadius: "8px",
		border: "1px solid #00A0AB",
		padding: "0.75em",
		cursor: "pointer",
	}
})

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <header className={classes.image}>
        <p className={classes.image__text}>OOPS</p>
        <div className={classes.image__icon}><Icecream/></div>
      </header>

      <section className={classes.message}>
        <h1 className={classes.heading}>Что-то пошло не так.</h1>
        <p className={classes.text}>
          Мы знаем о проблеме и уже работаем.<br/>
          Пожалуйста попробуйте обновить страницу.
        </p>
      </section>

      <footer className={classes.button__container}>
        <InternalLink className={classes.reload} href="/">
          Обновить
        </InternalLink>
      </footer>
    </div>
  )
}

export default NotFound

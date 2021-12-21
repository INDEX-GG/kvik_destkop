import React from "react";
import { withStyles, createStyles } from "@material-ui/core";
import Icecream from "../UI/icons/Icecream";


const useStyles = createStyles({
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
	},
	image: {
		gridArea: "header",
		position: "relative",
	},
	image__text: {
		position: "absolute",
		fontWeight: "500",
		fontSize: "24px",
		color: "#5A5A5A",
		top: "30px",
		left: "-45px",
	},
	image__icon: {},
	message: {
		gridArea: "body",
		textAlign: "center",
	},
	heading: {
		fontSize: "36px",
		color: "#5A5A5A",
	},
	text: {
		fontSize: "24px",
		color: "#8F8F8F",
	},
	button__container: {
		gridArea: "footer",
		marginTop: "2em",
	},
	reload: {
		minWidth: "230px",
		boxSizing: "border-box",
		color: "white",
		background: "#00A0AB",
		borderRadius: "8px",
		border: "1px solid #00A0AB",
		padding: "0.75em",
		cursor: "pointer",
	}
})

class ReactErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	/**
	 * Update state so the next render will show the fallback UI.
	 */
	static getDerivedStateFromError() {
		return { hasError: true };
	}

	/**
	 * You can also log the error to an error reporting service
	 * @param {*} error 
	 * @param {*} errorInfo 
	 */
	componentDidCatch(error, errorInfo) {
		console.error(error, errorInfo);
	}

	/**
	 * You can render any custom fallback UI
	 */
	render() {
		const { classes } = this.props;
		// переключить перед пушем
		if (this.state.hasError) {
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
						<button 
							type="button" 
							className={classes.reload}
							onClick={()=> {location.reload()}}
						>
							Обновить
						</button>
					</footer>
				</div>
			)
		}
		
		return this.props.children;
	}
}

export const ErrorBoundary = withStyles(useStyles)(ReactErrorBoundary)
import React from "react";
import { withStyles, createStyles } from "@material-ui/core";
import Icecream from "../UI/icons/Icecream";
import { InternalLink } from "./links/InternalLink";


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
	},
	image__icon: {},
	message: {
		gridArea: "body",
		textAlign: "center",
	},
	heading: {
		fontSize: "36px",
	},
	text: {
		fontSize: "24px",
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
		const { classes, children } = this.props;
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
						<InternalLink className={classes.reload} href="/">
							Обновить
						</InternalLink>
					</footer>
				</div>
			)
		}
		
		return children;
	}
}

export const ErrorBoundary = withStyles(useStyles)(ReactErrorBoundary)
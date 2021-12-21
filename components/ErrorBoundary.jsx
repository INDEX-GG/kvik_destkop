import React from "react";
import { withStyles, createStyles } from "@material-ui/core";

const useStyles = createStyles({
	block: {
		height: "100%",
		display: "grid",
		gridTemplate: `
			"header" 40px
			"body" 40px
			"footer" 40px / 100%
		`,
		alignContent: "center",
		justifyItems: "center",
		alignItems: "center",
		gap: "1em",
		fontFamily: "Roboto",
		fontSize: "14px",
	},
	image: {
		gridArea: "header"
	},
	image__text: {},
	image__icon: {},
	message: {
		gridArea: "body"
	},
	heading: {},
	text: {},
	button__container: {
		gridArea: "footer",
		marginTop: "1em",
	},
	reload: {
		display: "grid",
		alignItems: "center",
		width: "257px",
		height: "38px",
		boxSizing: "border-box",
		color: "white",
		background: "#00A0AB",
		borderRadius: "8px",
		border: "1px solid #00A0AB",
		padding: "1em"
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
		if (!this.state.hasError) {
			return (
				<div className={classes.block}>
					<header className={classes.image}>
						<p className={classes.image__text}>OOPS</p>
						<div className={classes.image__icon}>Icon</div>
					</header>

					<section className={classes.message}>
						<h1 className={classes.heading}>Что-то пошло не так.</h1>
						<p className={classes.text}>Мы знаем о проблеме и уже работаем. Пожалуйста попробуйте обновить страницу.</p>
					</section>

					<footer className={classes.button__container}>
						<button className={classes.reload}>Обновить</button>
					</footer>
				</div>
			)
		}

		return this.props.children;
	}
}
export const ErrorBoundary = withStyles(useStyles)(ReactErrorBoundary)
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
// import { Controller } from "react-hook-form";

const useStyles = makeStyles({
	block: {
		boxSizing: "border-box",
		minWidth: "44px",
		minHeight: "44px",
		width: "100%",
		fontFamily: "inherit",
		fontSize: "100%",
		borderRadius: "4px",
		border: "1px solid #C7C7C7",
		padding: "0 1em",
		margin: 0,
	}
});



/**
 * @typedef Helper
 *
 * @typedef {React.ComponentPropsWithoutRef<"input">} BaseInputProps
 */

/**
 * Не использовать, пока не разобрались с контроллерами.
 * @param {BaseInputProps} props
 */
export const BaseInput = ({ className, ...inputProps }) => {
	const classes = useStyles();
	const blockClass = clsx(classes.block, className);

	return (
		<input className={blockClass} {...inputProps} />
	)
}
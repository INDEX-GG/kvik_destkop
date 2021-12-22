import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	block: {
		boxSizing: "border-box",
		minWidth: "44px",
		minHeight: "44px",
		width: "100%",
		fontFamily: "inherit",
		fontSize: "100%",
		borderRadius:"4px",
		border: "1px solid #C7C7C7",
		padding: 0,
		margin: 0,
	}
});

/**
 * @typedef {React.ComponentPropsWithoutRef<"input">} BaseInputProps
 */

/**
 * @param {BaseInputProps} props
 */
export const BaseInput = ({ className, ...inputProps}) => {
	const classes = useStyles();
	const blockClass = [
		classes.block,
		className ? className : ""
	].join("").trim();

	return (
		<input className={blockClass} {...inputProps}/>
	)
}
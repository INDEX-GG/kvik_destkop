import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	block: {
		display: "inline-block",
		cursor: "pointer"
	}
});

/**
 * @typedef {React.ComponentPropsWithoutRef<"label">} LabelProps
 */

/**
 * @param {LabelProps} props
 */
export const Label = ({ className, children, ...labelProps }) => {
	const classes = useStyles();
	const blockClass = [
		classes.block,
		className ? className : ""
	].join("").trim();

	return (
		<label className={blockClass} {...labelProps}>
			{children}
		</label>
	)
}
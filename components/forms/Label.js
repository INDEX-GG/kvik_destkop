import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

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
	const blockClass = clsx(classes.block, className)

	return (
		<label className={blockClass} {...labelProps}>
			{children}
		</label>
	)
}
import { makeStyles } from "@material-ui/core"
import clsx from "clsx";

const useStyles = makeStyles({
	block: {
		// width: "100%"
	}
});

/**
 * @typedef {React.ComponentPropsWithoutRef<"div">} FormSectionProps
 */

/**
 * @param {FormSectionProps} props
 */
export const FormSection = ({ className, children, ...divProps }) => {
	const classes = useStyles();
	const blockClass = clsx(classes.block, className);

	return (
		<div className={blockClass} {...divProps}>
			{children}
		</div>
	)
}
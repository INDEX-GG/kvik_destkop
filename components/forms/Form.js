import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
	block: {}
});

/**
 * @typedef {React.ComponentPropsWithoutRef<"form">} FormProps
 */

/**
 * @param {FormProps} props
 */
export const Form = ({ className, children, ...formProps }) => {
	const classes = useStyles();
	const blockClass = clsx(classes.block, className)

	return (
		<form className={blockClass} {...formProps}>
			{children}
		</form>
	)
}
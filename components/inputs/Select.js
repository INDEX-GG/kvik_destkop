import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
	block: {}
});

/**
 * @typedef {React.ComponentPropsWithoutRef<"select">} SelectProps
 */

/**
 * @param {SelectProps} props
 */
export const Select = ({ className, children, ...formProps }) => {
	const classes = useStyles();
	const blockClass = clsx(classes.block, className)

	return (
		<select className={blockClass} {...formProps}>
			{children}
		</select>
	)
}
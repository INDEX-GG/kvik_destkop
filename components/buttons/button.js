import { makeStyles } from "@material-ui/core";
import { BaseButton } from "./BaseButton";
import clsx from "clsx";

const useStyles = makeStyles({
	block: {}
});

/**
 * @typedef {import("./BaseButton").BaseButtonProps} ButtonProps
 */

/**
 * Кнопка с `type="button"`.
 * @param {ButtonProps} props
 */
export const Button = ({ className, children, ...buttonProps }) => {
	const classes = useStyles();
	const blockClass = clsx(classes.block, className);

	return (
		<BaseButton className={blockClass} {...buttonProps} type="button">
			{children}
		</BaseButton>
	)
}
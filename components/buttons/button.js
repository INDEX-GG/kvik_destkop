import { makeStyles } from "@material-ui/core";
import { BaseButton } from "./BaseButton";
import clsx from "clsx";

const useStyles = makeStyles({
	block: {
		borderColor: "#C7C7C7",
		backgroundColor: "#ffffff",
	}
});

/**
 * Реактовский колбэк на клик.
 * @callback ClickCallback
 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
 * @returns {void}
 */

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
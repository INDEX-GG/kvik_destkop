import { makeStyles } from "@material-ui/core";
import { BaseButton } from "./base-button";
const useStyles = makeStyles({
	block: {}
});

/**
 * @typedef {BaseButtonProps} BaseButtonProps
 */

/**
 * Кнопка с `type="button"`.
 * @param {BaseButtonProps} props
 */
export const Button = ({ className, children, ...buttonProps }) => {
	const classes = useStyles();
	const blockClass = [
		classes.block,
		className ? className : ""
	].join("").trim();

	return (
		<BaseButton className={blockClass} {...buttonProps} type="button">
			{children}
		</BaseButton>
	)
}
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
	block: {
		boxSizing: "border-box",
		display: "inline-block",
		cursor: "pointer",
		minWidth: "44px",
		minHeight: "44px",
		width: "100%",
		fontFamily: "inherit",
		fontSize: "100%",
		borderRadius: "4px",
		border: "1px solid #C7C7C7",
		padding: 0,
		margin: 0,
		"&:disabled": {
			opacity: "0.5",
			cursor: "not-allowed"
		}
	}
});

/**
 * @typedef {React.ComponentPropsWithoutRef<"button">} BaseButtonProps
 */

/**
 * Базовая кнопка.
 * Использовать только как часть другого кнопко-компонента, 
 * который как минимум задаёт неперезаписываемый аттрибут `type`.
 * @example
 * ```javascript
 * const SuperButton = ({ children, ...buttonProps }) => {
 * 	return (
 * 		<BaseButton {...buttonProps} type="button">
 * 			{children}
 * 		</BaseButton>
 * 	)
 * }
 * ```
 * @param {BaseButtonProps} props
 */
export const BaseButton = ({ className, children, ...buttonProps }) => {
	const classes = useStyles();
	const blockClass = clsx(classes.block, className);

	return (
		<button className={blockClass} {...buttonProps}>
			{children}
		</button>
	)
}
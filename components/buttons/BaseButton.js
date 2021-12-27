import { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

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
	}
});

/**
 * @callback HandlerButtonClick
 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
 * @returns {void}
 */

/**
 * @typedef {React.ComponentPropsWithRef<"button">} BaseButtonProps
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
export const BaseButton = ({ onClick, className, children, ...buttonProps }) => {
	const classes = useStyles();
	const [isDebouncing, changeDebounceState] = useState(false);
	const blockClass = clsx(classes.block, className);

	/**
	 * @type {HandlerButtonClick}
	 */
	const handlerDelayedClick = (event) => {
		if (!onClick || isDebouncing) {
			return;
		}

		onClick(event)
		changeDebounceState(true)
		setTimeout(() => {
			changeDebounceState(false)
		}, 250)
	}

	return (
		<button className={blockClass} onClick={handlerDelayedClick} {...buttonProps}>
			{children}
		</button>
	)
}

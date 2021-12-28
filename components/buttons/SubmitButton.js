import { makeStyles } from "@material-ui/core";
import { BaseButton } from "./BaseButton";
import clsx from "clsx";

const useStyles = makeStyles({
	block: {
		width: "auto",
		color: "#00A0AB",
		backgroundColor: "transparent",
		borderRadius: "0",
		border: "none",
	}
});

/**
 * @typedef {import("./BaseButton").BaseButtonProps} SubmitButtonProps
 */

/**
 * Кнопка с `type="submit"`.
 * @param {SubmitButtonProps} props
 */
export const SubmitButton = ({ className, children, ...buttonProps }) => {
	const classes = useStyles();
	const blockClass = clsx(classes.block, className);

	return (
		<BaseButton className={blockClass} {...buttonProps} type="submit">
			{children}
		</BaseButton>
	)
}
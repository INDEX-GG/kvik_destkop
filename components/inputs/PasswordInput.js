import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { BaseInput } from "./BaseInput";

const useStyles = makeStyles({
	block: {
	}
});

/**
 * @typedef {import("#components/inputs/BaseInput").BaseInputProps} PasswordInputProps
 */

/**
 * @typedef {import("#components/inputs/BaseInput").BaseInputProps} PasswordInputProps
 */

/**
 * @param {PasswordInputProps} props
 */
export const PasswordInput = ({ className, ...baseInputProps }) => {
	const classes = useStyles();
	const blockClass = clsx(classes.block, className);

	return (
		<BaseInput type="password" className={blockClass} {...baseInputProps} />
	)
}
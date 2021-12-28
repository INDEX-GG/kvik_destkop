import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { BaseInput } from "./BaseInput";

const useStyles = makeStyles({
	block: {
	}
});

/**
 * @typedef {import("#components/inputs/BaseInput").BaseInputProps} TextInputProps
 */

/**
 * @param {TextInputProps} props
 */
export const TextInput = ({ className, ...baseInputProps }) => {
	const classes = useStyles();
	const blockClass = clsx(classes.block, className);

	return (
		<BaseInput className={blockClass} {...baseInputProps} type="text" />
	)
}
import { makeStyles } from "@material-ui/core"
import clsx from "clsx";
import { Label } from "#components/forms/Label";
import { PasswordInput } from "#components/inputs/PasswordInput";
import { Button } from "#components/buttons/Button";

const useStyles = makeStyles({
	block: {
		display: "grid",

	},
	password: {
		position: "relative"
	},
	button: {}
});

/**
 * @typedef Helper
 * @property {} 
 * @typedef {import("#components/forms/FormSection").FormSectionProps} PasswordSectionProps
 */

/**
 * @param {PasswordSectionProps} props
 */
export const PasswordSection = ({ id, className, children, inputProps, ...formSectionProps }) => {
	const classes = useStyles();
	const blockClass = clsx(classes.block, className);

	/**
	 * @param {import("#components/buttons/Button").ClickCallback} event 
	 */
	const handlerVisibility = (event) => {
		console.log(event);
	}

	return (
		<PasswordSection className={blockClass} {...formSectionProps}>
			<Label htmlFor={id}>{children}</Label>
			<div className={classes.password}>
				<PasswordInput id={id} {...inputProps} />
				<Button className={classes.button} onClick={handlerVisibility}>
					HideIcon
				</Button>
			</div>
		</PasswordSection>
	)
}
import { useState } from "react";
import { makeStyles } from "@material-ui/core"
import clsx from "clsx";
import { Label } from "#components/forms/Label";
import { PasswordInput } from "#components/inputs/PasswordInput";
import { Button } from "#components/buttons/Button";

const useStyles = makeStyles({
	block: {
		display: "grid",
		gridTemplate: `
		"label password" auto / auto 1fr
		`
	},
	label: {
		gridArea: "label"
	},
	password: {
		gridArea: "password",
		position: "relative",
	},
	button: {
		position: "absolute",
		right: "1em"
	},
	icon: {}
});

/**
 * @typedef Helper
 * @property {} 
 * @typedef {import("#components/forms/FormSection").FormSectionProps} PasswordSectionProps
 */

/**
 * TODO: вешает браузер при рендере
 * @param {PasswordSectionProps} props
 */
export const PasswordSection = ({ id, className, inputProps, children, ...formSectionProps }) => {
	const classes = useStyles();
	const [isVisible, changeVisibility] = useState(false);
	const blockClass = clsx(classes.block, className);

	/**
	 * @type {import("#components/buttons/Button").ClickCallback} event 
	 */
	const handlerVisibility = () => {
		changeVisibility(!isVisible)
	}

	return (
		<PasswordSection className={blockClass} {...formSectionProps}>
			<Label htmlFor={id}>{children}</Label>
			<div className={classes.password}>
				<PasswordInput 
					{...inputProps}
					id={id}
					type={isVisible ? "text" : "password"}
				/>
				<Button className={classes.button} onClick={handlerVisibility}>
					{isVisible ? "Hide" : "Show"}
				</Button>
			</div>
		</PasswordSection>
	)
}
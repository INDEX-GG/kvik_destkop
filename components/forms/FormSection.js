import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
	block: {
		width: "100%"
	}
});

/**
 * @typedef {React.ComponentPropsWithoutRef<"div">} FormSectionProps
 */

/**
 * @param {FormSectionProps} props
 */
export const FormSection = ({ className, children, ...divProps }) => {
	const classes = useStyles();
	const blockClass = [
		classes.block,
		className ? className : ""
	].join("").trim();

	return (
		<div className={blockClass} {...divProps}>
			{children}
		</div>
	)
}
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	block: {
		width: "100%",
		borderBottom: "1px solid hsl(0, 0%, 91%)",
	}
})

/**
 * @typedef {React.ComponentPropsWithoutRef<"section">} PersonalDataSectionProps
 */

/**
 * @param {PersonalDataSectionProps} props
 */
export const PersonalDataSection = ({ className, children, ...sectionProps }) => {
	const classes = useStyles();
	const sectionClass = [
		classes.block, className && className
	].join(" ").trim();

	return (
		<section className={sectionClass} {...sectionProps} >
			{children}
		</section>
	)
}
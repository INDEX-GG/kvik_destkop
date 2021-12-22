import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	block: {
		width: "100%",
		borderBottom: "1px solid hsl(0, 0%, 91%)",
	}
})

/**
 * Секция в списке.
 * @param {object} props
 * @param {JSX.Element} [props.children]
 * @param {string} props.className `className`, добавляющийся к корневому элементу как `Element.classList.add()`.
 * @param {any} props.sectionProps `props` `<section>` тэга
 */
export const PersonalDataSection = ({ className = undefined, children, ...sectionProps }) => {
	const classes = useStyles()
	const sectionClass = [classes.block, className && className].join(" ").trim();
	return (
		<section className={sectionClass} {...sectionProps} >
			{children}
		</section>
	)
}
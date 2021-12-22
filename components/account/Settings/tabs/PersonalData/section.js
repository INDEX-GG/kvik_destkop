/**
 * Секция в списке.
 * @param {object} props
 * @param {JSX.Element} [props.children]
 * @param {string} props.className `className`, добавляющийся к корневому элементу как `Element.classList.add()`.
 * @param {any} props.sectionProps `props` `<section>` тэга
 */
export const PersonalDataSection = ({ className = undefined, children, ...sectionProps }) => {
	const sectionClass = ["user-info__section", className && className].join(" ");
	return (
		<section className={sectionClass} {...sectionProps} >
			{children}
		</section>
	)
}
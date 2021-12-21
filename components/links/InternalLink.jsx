import NextLink from "next/link";

/**
 * @typedef HelperProps
 * @property {string} className
 * 
 * @typedef {React.PropsWithChildren<import("next/link").LinkProps> & HelperProps} InternalLinkProps
 */

/**
 * Обёртка над `next/link`.
 * @link https://nextjs.org/docs/api-reference/next/link
 * @param {InternalLinkProps} props
 * @param props.className `className` `<a>` тэга
 */
export const InternalLink = ({ href, className, children, ...NextLinkProps }) => {
	return (
		<NextLink href={href} {...NextLinkProps}>
			<a className={className}>
				{children}
			</a>
		</NextLink>
	)
}
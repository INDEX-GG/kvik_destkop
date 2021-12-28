import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Button } from "./Button";

const useStyles = makeStyles({
	block: {
		display: "flex",
		flexFlow: "row nowrap",
		alignItems: "center",
		gap: "1em",
		width: "auto",
	},
	arrow: {
		justifySelf: "flex-end"
	}
})

/**
 * @typedef {React.ComponentPropsWithoutRef<"button">} NavigationButtonProps
 */

/**
 * 
 * @param {NavigationButtonProps} props 
 */
export const NavigationButton = ({ className, children, ...props }) => {
	const classes = useStyles();
	const blockClass = clsx(classes.block, className);
	
	return (<Button className={blockClass} {...props}>
		{children} <span className={classes.arrow}>{"->"}</span> 
	</Button>)
}

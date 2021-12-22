import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
	block: {
		width: "100%"
	}
});

export const FormSection = ({ children, ...props }) => {
	const classes = useStyles();

	return (
		<div className={classes.block} {...props}>
			{children}
		</div>
	)
}
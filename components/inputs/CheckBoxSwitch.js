import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	block: {
		position: "relative",
		display: "grid",
		width: "26px",
		height: "14px",
		borderRadius: "5px",
		border: "1px solid #00A0AB",
		
	},
	check: {
		position: "absolute",
		width: "1px",
		height: "1px",
		appearance: "none",
		"&:checked+label span": {
			transform: "translateX(100%)"
		}
	},
	label: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		height: "100%",
		cursor: "pointer",
	},
	ball: {
		display: "block",
		width: "12px",
		height: "12px",
		lineHeight: "1.15",
		borderRadius: "50%",
		background: "#00A0AB",
		cursor: "pointer",
		transitionDuration: "250ms",
		transitionProperty: "transform"
	},
});

/**
 * @typedef CheckBoxSwitchProps
 * @property {string} checkID
 */

/**
 * @param {CheckBoxSwitchProps} props
 */
// eslint-disable-next-line no-unused-vars
export const CheckBoxSwitch = ({ checkID, name }) => {
	const classes = useStyles();

	return (
		<span className={classes.block}>
			<input id={checkID} className={classes.check} type="checkbox" name={name}  />
			<label className={classes.label} htmlFor={checkID}>
				<span className={classes.ball} ></span>
			</label>
		</span>
	)
};
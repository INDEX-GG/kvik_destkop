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
		appearance: "none",
		"&:checked+label span": {
			right: "0"
		}
	},
	label: {
		position: "relative",
		display: "block",
		width: "100%",
		height: "100%",
		cursor: "pointer",
	},
	ball: {
		position: "absolute",
		top: "50%",
		display: "block",
		width: "11px",
		height: "11px",
		lineHeight: "1.15",
		borderRadius: "50%",
		background: "#00A0AB",
		cursor: "pointer",
		transitionDuration: "250ms",
		transitionProperty: "position"
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
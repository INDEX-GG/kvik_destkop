import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	block: {
		position: "relative",
		display: "grid",
		width: "26px",
		height: "14px",
		borderColor: "transparent",
	},
	check: {
		position: "absolute",
		width: "1px",
		height: "1px",
		appearance: "none",
		"&:checked+label": {
			borderColor: "#00A0AB",
		},
		"&:checked+label span": {
			backgroundColor: "#00A0AB",
			transform: "translateX(123%)"
		}
	},
	label: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		height: "100%",
		border: "1px solid #C4C4C4",
		cursor: "pointer",
		transitionDuration: "250ms",
		transitionProperty: "border-color"
	},
	ball: {
		display: "block",
		width: "12px",
		height: "12px",
		lineHeight: "1.15",
		background: "#C4C4C4",
		cursor: "pointer",
		transitionDuration: "250ms",
		transitionProperty: "transform, background-color"
	},
});

/**
 * @typedef CheckBoxSwitchProps
 * @property {string} checkID
 * @property {string} name
 * @property {string} borderRadius
 * @property {string} checkboxBorderRadius
 */

/**
 * @param {CheckBoxSwitchProps} props
 */
export const CheckBoxSwitch = ({ 
	borderRadius = "5px" , 
	checkboxBorderRadius = "50%", 
	checkID, 
	name 
}) => {
	const classes = useStyles();

	return (
		<span className={classes.block} >
			<input 
				id={checkID} 
				className={classes.check} 
				type="checkbox" 
				name={name}  
			/>
			<label 
				className={classes.label} 
				htmlFor={checkID} 
				style={{ borderRadius: borderRadius }} 
			>
				<span className={classes.ball} style={{ borderRadius: checkboxBorderRadius }}></span>
			</label>
		</span>
	)
};
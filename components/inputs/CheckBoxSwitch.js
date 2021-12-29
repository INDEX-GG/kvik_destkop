import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

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
	check_mobile: {
		"&:checked+label span": {
			transform: "translateX(100%)"
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
 * @property {string} width
 * @property {string} height
 * @property {string} checkboxSize
 * @property {string} checkID
 * @property {string} name
 * @property {string} borderRadius
 * @property {string} checkboxBorderRadius
 * @property {boolean} isMobile
 */

/**
 * @param {CheckBoxSwitchProps} props
 */
export const CheckBoxSwitch = ({ 
	width = "26px",
	height = "14px",
	checkboxSize = "12px",
	borderRadius = "5px" , 
	checkboxBorderRadius = "50%", 
	checkID, 
	name,
	isMobile = undefined
}) => {
	const classes = useStyles();
	const checkClass = clsx(classes.check, isMobile && classes.check_mobile)

	return (
		<span className={classes.block} style={{ width: width, height: height }}>
			<input 
				id={checkID} 
				className={checkClass} 
				type="checkbox" 
				name={name}  
			/>
			<label 
				className={classes.label} 
				htmlFor={checkID} 
				style={{ borderRadius: borderRadius }} 
			>
				<span 
					className={classes.ball} 
					style={{ 
						borderRadius: checkboxBorderRadius, 
						width: checkboxSize, 
						height: checkboxSize 
					}}
				>
				</span>
			</label>
		</span>
	)
};
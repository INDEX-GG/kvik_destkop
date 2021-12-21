import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	block: {
		borderRadius: "5px",
		border: "1px solid #00A0AB",
	},
	check: {},

});

/**
 * @typedef CheckBoxSwitchProps
 * @property {string} checkID
 */

/**
 * @param {CheckBoxSwitchProps} props
 */
// eslint-disable-next-line no-unused-vars
const CheckBoxSwitch = ({ checkID, name }) => {
	const classes = useStyles();

	return (
		<span className={classes.block}>
			<input id={checkID} className={classes.block} type="checkbox" name={name}  />
			<label htmlFor={checkID}></label>
		</span>
	)
};

export default CheckBoxSwitch;
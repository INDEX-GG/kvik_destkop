import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";
import { Checkbox, FormControlLabel, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
		checkbox: {
			color: "#C7C7C7",
			alignItems: "flex-end",
			paddingRight: 5,
			paddingTop: 2,
			'&>span': {
				fontSize: "12px",
			}
		},
}));

const SearchCheckbox = ({checked, changeChecked, label}) => {
	const classes = useStyles();

  return (
    <FormControlLabel
      className={classes.checkbox}
      tabIndex={0}
      control={
        <Checkbox
        style={{fontSize: 16, padding: 2}}
        color="primary"
        checked={checked}
        onChange={e => changeChecked(e.target.checked)}
        icon={<OutlinedIcon  fontSize="inherit" color="disabled"/>}
        checkedIcon={<Filledicon fontSize="inherit" />}
        // value={item2}
        />
      }
      label={label}
    />
  )
}

export default SearchCheckbox

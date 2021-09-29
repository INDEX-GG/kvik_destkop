import {
  Box,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";

const useStyles = makeStyles(() => ({
  formBox: {
    margin: "24px 0",
  },
  formInputField: {
    display: "flex",
  },
  formTitle: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 14,
    color: "#2C2C2C",
  },
  input: {
    margin: "8px",
    "&:last-child": {
      marginLeft: 0,
    },
  },
  checkboxes: {
    display: 'flex',
    padding: "0 8px 8px 8px"
  },
  check:{
    marginLeft: 0,
    marginRight: 0,
    flexBasis: "50%",
    '&>.MuiFormControlLabel-label': {
      fontSize: 12,
      color: "#C7C7C7"
    },
    '&:last-child': {
      marginLeft: 10,
    }
  },
  checkbox: {
    color: "#C7C7C7",
    padding: "4px 4px 4px 0",
    fontSize: 18,
  }
}));

const FilterTwoFieldsTwoRadio = ({
  firstAlias,
  secondAlias,
  firstPlaceholder,
  secondPlaceholder,
  title,
}) => {
  const classes = useStyles();
  const methods = useFormContext();
  return (
    <Box className={classes.formBox}>
      <Typography className={classes.formTitle}>{title}</Typography>
      <Box className={classes.formInputField}>
        <Controller
          name={firstAlias}
          control={methods.control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              className={classes.input}
              variant="outlined"
              value={value}
              placeholder={firstPlaceholder}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name={secondAlias}
          control={methods.control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              className={classes.input}
              variant="outlined"
              value={value}
              placeholder={secondPlaceholder}
              onChange={onChange}
            />
          )}
        />
      </Box>
      <Box className={classes.checkboxes}>
       <Controller
              name="notFirst"
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  className={classes.check}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  control={
                    <Checkbox
                    className={classes.checkbox}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onChange(e.target.value);
                        } else {
                          onChange(null);
                        }
                      }}
                      color="primary"
                      icon={<OutlinedIcon color="inherit" fontSize="inherit" />}
                      checkedIcon={<Filledicon fontSize="inherit" />}
                      value="Не послений"
                    />
                  }
                  label="Не послений"
                />
              )}
            />
       <Controller
              name="notLast"
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  className={classes.check}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  control={
                    <Checkbox
                    className={classes.checkbox}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onChange(e.target.value);
                        } else {
                          onChange(null);
                        }
                      }}
                      color="primary"
                      icon={<OutlinedIcon fontSize="inherit" />}
                      checkedIcon={<Filledicon fontSize="inherit" />}
                      value="Не первый"
                    />
                  }
                  label="Не первый"
                />
              )}
            />
      </Box>
    </Box>
  );
};

export default FilterTwoFieldsTwoRadio;

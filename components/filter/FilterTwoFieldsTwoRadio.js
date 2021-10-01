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
import { OnlyNumbersMask } from "../../lib/onlyNumbersMask";

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
    "&:last-of-type": {
      marginLeft: 0,
    },
    "& .MuiOutlinedInput-input": {
      paddingLeft: 8,
    },
  },
  inputActuve: {
    "& .MuiOutlinedInput-input": {
      paddingLeft: 28,
      maxWidth: 139,
    },
  },
  tooltip: {
    position: "absolute",
    top: 9,
  },
  checkboxes: {
    display: 'flex',
    padding: "0 8px"
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
  },
  
}));

const FilterTwoFieldsTwoRadio = ({
  data
}) => {
  const classes = useStyles();
  const methods = useFormContext();
  return (
    <Box className={classes.formBox}>
      <Typography className={classes.formTitle}>{data.title}</Typography>
      <Box className={classes.formInputField}>
      <Box style={{ position: "relative", maxWidth: "50%", margin: 8 }}>
          <Controller
            name={data.firstAlias}
            control={methods.control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <>
                <TextField
                  className={`${classes.input} ${
                    value ? classes.inputActuve : ""
                  }`}
                  variant="outlined"
                  value={value}
                  placeholder="от"
                  onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                />
                {value?.length && value.length < 10 ? (
                  <span className={classes.tooltip} style={{ left: 8 }}>
                    от
                  </span>
                ) : null}
              </>
            )}
          />
        </Box>
        <Box style={{ position: "relative", maxWidth: "50%",  margin: "8px 8px 8px 0" }}>
          <Controller
            name={data.secondAlias}
            control={methods.control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <>
                <TextField
                  className={`${classes.input} ${
                    value ? classes.inputActuve : ""
                  }`}
                  variant="outlined"
                  value={value}
                  placeholder="до"
                  onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                />
                {value?.length && value.length < 10 ? (
                  <span className={classes.tooltip} style={{ left: 8 }}>
                    до
                  </span>
                ) : null}
              </>
            )}
          />
        </Box>
      </Box>
      <Box className={classes.checkboxes}>
       <Controller
              name="notFirst"
              defaultValue={null}
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
                      checked={value}
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
              defaultValue={null}
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
                      checked={value}
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

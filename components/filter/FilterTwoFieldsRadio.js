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
    top: 8,
  },
  checkboxes: {
    display: 'flex',
    flexDirection: "column",
    padding: "0 8px"
  },
  check:{
    marginLeft: 0,
    '&>.MuiFormControlLabel-label': {
      fontSize: 14,
    }
  },
  checkbox: {
    padding: "4px 4px 4px 0",
    fontSize: 18
  }
}));

const FilterTwoFieldsRadio = ({
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
                {value?.length && value.length < 8 ? (
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
                  placeholder="До"
                  onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                />
                {value?.length && value.length < 8 ? (
                  <span className={classes.tooltip} style={{ left: 8 }}>
                    До
                  </span>
                ) : null}
              </>
            )}
          />
        </Box>
      </Box>
      <Box className={classes.checkboxes}>
        {data.fields.map((item, i) => {
          return <Controller
              key={i}
              name={item.alias}
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
                      icon={<OutlinedIcon fontSize="inherit" />}
                      checkedIcon={<Filledicon fontSize="inherit" />}
                      value={item.value}
                    />
                  }
                  label={item.value}
                />
              )}
            />
        }
        )}
      </Box>
    </Box>
  );
};

export default FilterTwoFieldsRadio;

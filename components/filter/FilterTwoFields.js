import { Box, makeStyles, TextField, Typography } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";

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
      maxWidth: 140,
    },
  },
  tooltip: {
    position: "absolute",
    top: 9,
  },
}));

const FilterTwoFields = ({ firstAlias, secondAlias, title }) => {
  const classes = useStyles();
  const methods = useFormContext();

  return (
    <Box className={classes.formBox}>
      <Typography className={classes.formTitle}>{title}</Typography>
      <Box className={classes.formInputField}>
        <Box style={{ position: "relative", maxWidth: "50%", margin: 8 }}>
          <Controller
            name={firstAlias}
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
                  onChange={onChange}
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
            name={secondAlias}
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
                  onChange={onChange}
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
    </Box>
  );
};

export default FilterTwoFields;

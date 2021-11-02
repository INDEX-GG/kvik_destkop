import { Box, makeStyles, TextField, Typography } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
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
}));

const FilterTwoFields = ({ data, unmount }) => {
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
            shouldUnregister={unmount}
            render={({ field: { onChange, value } }) => (
              <>
                <TextField
                  className={`${classes.input} ${
                    value?.length && value.length < 8 ? classes.inputActuve : ""
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
            shouldUnregister={unmount}
            control={methods.control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <>
                <TextField
                  className={`${classes.input} ${
                    value?.length && value.length < 8 ? classes.inputActuve : ""
                  }`}
                  variant="outlined"
                  value={value}
                  placeholder="до"
                  onChange={(e) => onChange(OnlyNumbersMask(e, "num"))
                  }
                />
                {value?.length && value.length < 8 ? (
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

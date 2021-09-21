import React from "react";
import {
  Box,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { OnlyNumbersMask } from "../../../lib/onlyNumbersMask";

const useStyles = makeStyles((theme) => ({
  formElem: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing(3),
  },
  formTitleField: {
    fontSize: "14px",
    flexGrow: 1,
    padding: "4px 0",
  },
  formInputField: {
    width: "490px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    "&>p": {
      marginBottom: theme.spacing(2),
    },
    "&>*:last-child": {
      marginBottom: 0,
    },
  },
  input: {
    width: "264px",
  },
  tooltip: {
    position: "absolute",
    top: 9,
  }
}));

export default function ChargersPowerSupplies({ data }) {
  const methods = useFormContext();
  const classes = useStyles();
  return (
    <>
      {data.map((item, idx) => {
        switch (item.type) {
          case "list":
            return (
              <Box key={idx} className={classes.formElem}>
                <Typography className={classes.formTitleField} style={{maxWidth: item.alias === "size_page_mfps_and_scanners" ? 158 : null}}>
                  {item.name}
                </Typography>
                <Box className={classes.formInputField}>
                  <Controller
                    name={item.alias}
                    control={methods.control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        select
                        className={classes.input}
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : " "}
                      >
                        {item.fields.map((option, i) => (
                          <MenuItem key={i} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Box>
              </Box>
            );
            case "text":
              return <Box className={classes.formElem}>
              <Typography className={classes.formTitleField}>{item.name}</Typography>
              <Box className={classes.formInputField}>
                <Controller
                  name={item.alias}
                  control={methods.control}
                  rules={{
                    min: {
                      value: 1,
                      message: "От 1 Вт"
                    },
                    max: {
                      value: 2000,
                      message: "До 2000 Вт"
                    },
                    pattern: /[0-9]{1,4}/
                  }}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                    <TextField
                      className={classes.input}
                      variant="outlined"
                      onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                      value={value}
                      error={!!error}
                      helperText={error ? error.message : " "}
                    />
                    {value.length ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> Вт</span> : null}
                    </>
                  )}
                />
              </Box>
            </Box>
        }
      })}
    </>
  );
}

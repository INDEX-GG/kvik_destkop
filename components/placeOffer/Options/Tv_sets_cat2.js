import React from "react";
import {
  Box,
  makeStyles,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";

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
    display: "flex",
    flexDirection: "column",
    "&>*": {
      marginBottom: theme.spacing(2),
    },
    "&>*:last-child": {
      marginBottom: 0,
    },
  },
  input: {
    width: "264px",
  },
}));

export default function TvSetCat2({ data }) {
  const methods = useFormContext();
  const classes = useStyles();
  console.log("odgs ++++>", data);
  return (
    <>
      {data.map((item, idx) => {
        switch (item.type) {
          case "list":
            return (
              <Box key={idx} className={classes.formElem}>
                <Typography className={classes.formTitleField}>
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
                  max: {
                  value: 2021,
                  message: 'Некоректный год'
                }, min: {
                  value: 1950,
                  message: 'Позднее 1950 года'
                }}}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : " "}
                  />
                )}
              />
            </Box>
          </Box>
          case "slider":
            return <Box className={classes.formElem}>
            <Typography className={classes.formTitleField}>{item.name}</Typography>
            <Box className={classes.formInputField}>
              <Controller
                name={item.alias}
                control={methods.control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Slider
                    className={classes.input}
                    valueLabelDisplay="auto"
                    defaultValue={10}
                    step={1}
                    min={item.fields[0]}
                    max={item.fields[1]}
                    value={value}
                    onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
                    error={!!error}
                    helperText={error ? error.message : " "}
                  />
                )}
              />
            </Box>
          </Box>
        }
      })}
    </>
  );
}

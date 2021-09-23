import React from 'react'
import {
    Box,
    makeStyles,
    MenuItem,
    TextField,
    Typography,
  } from "@material-ui/core";
  import { Controller, useFormContext } from "react-hook-form";
  
  const useStyles = makeStyles((theme) => ({
    formElem: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: theme.spacing(3),
  },
  formTitleField: {
      fontSize: '14px',
      flexGrow: 1,
      padding: '4px 0',
  },
  formInputField: {
      width: '490px',
      display: 'flex',
      flexDirection: 'column',
      '&>*': {
          marginBottom: theme.spacing(2),
      },
  '&>*:last-child': {
    marginBottom: 0,
  },
  },
  input: {
      width: '264px',
  },
  }));

export default function VideoSurveillance({data}) {
    const methods = useFormContext();
  const classes = useStyles();
  console.log("odgs ++++>", data);
  return (
    <Box className={classes.formElem}>
      <Typography className={classes.formTitleField}>{data[0].name}</Typography>
      <Box className={classes.formInputField}>
        <Controller
          name={data[0].alias}
          control={methods.control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              select
              className={classes.input}
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : " "}
            >
              {data[0].fields.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
          rules={{ required: "Выберете Тип" }}
        />
      </Box>
    </Box>
  );
}

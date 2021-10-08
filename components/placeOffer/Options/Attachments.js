import React, { useMemo, useState } from "react";
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
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing(3),
  },
  formTitleField: {
    fontSize: "14px",
    flexGrow: 1,
    padding: "4px 5px 4px 0",
    maxWidth: 158,
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
  formInputMainField_checkbox: {
    display: "flex",
  },
  formInputFieldCheck: {
    width: "490px",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "16px",
    padding: "4px 0",
  },
  check: {
    width: "48%",
    margin: "0",
    alignItems: "start",
    height: "50px",
    "& span": {
      padding: "0",
      fontSize: "14px",
      display: "flex",
      marginRight: "4px",
    },
  },
  tooltip: {
    position: "absolute",
    top: 9,
  },
}));

export default function Attachments({ data }) {
  const methods = useFormContext();
  const classes = useStyles();
  const [make, setMake] = useState(null);
  const [type, setType] = useState(null);
  
  const typeData = useMemo(() => {
    methods.setValue('make', '')
    return data?.find((el) => el.value === type)?.children;
  }, [type])
  const makeData = useMemo(() => {
    methods.setValue('model', '')
    return typeData?.find((el) => el.value === make)?.children;
  }, [make]);

  return (
    <>
      
      <Box className={classes.formElem}>
        <Typography className={classes.formTitleField}>Тип техники</Typography>
        <Box className={classes.formInputField}>
          <Controller
            name={data[0].alias}
            control={methods.control}
            rules={{ required: "Выберите Марку" }}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                select
                className={classes.input}
                variant="outlined"
                value={value}
                onChange={(e) => {
                  onChange(e);
                  setType(e.target.value);
                  setMake()
                }}
                error={!!error}
                helperText={error ? error.message : " "}
              >
                {data.map((option, i) => (
                  <MenuItem key={i} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
      </Box>
      {(type && typeData) && (
        <Box className={classes.formElem}>
          <Typography className={classes.formTitleField}>Марка</Typography>
          <Box className={classes.formInputField}>
            <Controller
              name={typeData[0].alias}
              rules={{ required: "Выберите Модель" }}
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
                  onChange={(e) => {
                    onChange(e);
                    setMake(e.target.value);
                  }}
                  error={!!error}
                  helperText={error ? error.message : " "}
                >
                  {typeData.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </Box>
      )}
      {(make && makeData && type && typeData) && (
        <Box className={classes.formElem}>
          <Typography className={classes.formTitleField}>Модель</Typography>
          <Box className={classes.formInputField}>
            <Controller
              name={makeData[0].alias}
              rules={{ required: "Выберите Модель" }}
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
                  onChange={(e) => {
                    onChange(e);
                  }}
                  error={!!error}
                  helperText={error ? error.message : " "}
                >
                  {makeData.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </Box>
      )}
     
    </>
  );
}

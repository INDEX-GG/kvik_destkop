import React, { useMemo, useState } from "react";
import {
  Box,
  // Checkbox,
  // FormControlLabel,
  makeStyles,
  MenuItem,
  // Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
// import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
// import Filledicon from "@material-ui/icons/Brightness1";
// import { OnlyNumbersMask } from "../../../lib/onlyNumbersMask";

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

export default function Bulldozers({ data }) {
  const methods = useFormContext();
  const classes = useStyles();
  const [make, setMake] = useState(null)
  const [model, setModel] = useState(null)
  const makeData = useMemo(() => {
    return data.find((el) => el.value === make)?.children
  }, [make])
  const modelData = useMemo(() => {
    return makeData?.find((el) => el.value === model)?.children
  }, [model])
  
  return (
    <>
          <Box className={classes.formElem}>
            <Typography
              className={classes.formTitleField}
            >
              Марка
            </Typography>
            <Box className={classes.formInputField}>
              <Controller
                name={data[0].alias}
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
                      onChange(e)
                      setMake(e.target.value)
                      setModel()
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
          {make && 
            <Box className={classes.formElem}>
            <Typography
              className={classes.formTitleField}
            >
              Модель
            </Typography>
            <Box className={classes.formInputField}>
              <Controller
                name={makeData[0].alias}
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
                      onChange(e)
                      setModel(e.target.value)
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
          }
          {(make && model) && 
            <Box className={classes.formElem}>
            <Typography
              className={classes.formTitleField}
            >
              Тип
            </Typography>
            <Box className={classes.formInputField}>
              <Controller
                name={modelData[0].alias}
                control={methods.control}
                defaultValue=""
                render={({
                field: { onChange },
                fieldState: { error },
                }) => (
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    value={modelData[0].value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : " "}
                    InputProps={{
                      readOnly: true
                    }}
                  >
                  </TextField>
                )}
              />
            </Box>
          </Box>
          }
        
      
    </>
  );
}

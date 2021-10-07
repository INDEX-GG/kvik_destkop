import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";

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
}));

export default function SmartWatches({ data }) {
  const methods = useFormContext();
  const classes = useStyles();
  return (
    <>
      {data.map((item, idx) => {
        switch (item.type) {
          case "list":
            return (
              <Box key={idx} className={classes.formElem}>
                <Typography
                  className={classes.formTitleField}
                  style={{
                    maxWidth:
                      item.alias === "number_of_memory_slots" ? 158 : null,
                  }}
                >
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
          case "listRec":
            return (
              <Box key={idx} className={classes.formElem}>
                <Typography
                  className={classes.formTitleField}
                  style={{
                    maxWidth:
                      item.alias === "number_of_memory_slots" ? 158 : null,
                  }}
                >
                  {item.name}
                </Typography>
                <Box className={classes.formInputField}>
                  <Controller
                    name={item.alias}
                    control={methods.control}
                    defaultValue={item.alias === 'choosing_a_gadget' ? 'смартчасы' : ''}
                    rules={{
                      required: item.alias === 'choosing_a_gadget' ? item.name : "Выберите " + item.name,
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <Select
                        className={classes.input}
                        variant="outlined"
                        displayEmpty
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
                      </Select>
                    )}
                  />
                </Box>
              </Box>
            );
          case "checkbox":
            return (
              <Box
                key={item.name}
                className={classes.formInputMainField_checkbox}
              >
                <Typography className={classes.formTitleField}>
                  {item.name}
                </Typography>
                <Box className={classes.formInputFieldCheck}>
                  {item.fields.map((item2, i) => {
                    return (
                      <Controller
                        key={i}
                        render={({ field: { onChange, value } }) => (
                          <FormControlLabel
                            className={classes.check}
                            value={value}
                            // onChange={(e) => onChange(e.target.value)}
                            control={
                              <Checkbox
                              onChange={(e) =>{
                                if (e.target.checked){
                                  onChange(e.target.value)
                                }else{
                                  onChange(null)
                                }
                              }}
                                color="primary"
                                icon={<OutlinedIcon />}
                                checkedIcon={<Filledicon />}
                                value={item2}
                              />
                            }
                            label={item2}
                          />
                        )}
                        name={item.alias + [i]}
                        control={methods.control}
                      />
                    );
                  })}
                </Box>
              </Box>
            );
        }
      })}
    </>
  );
}

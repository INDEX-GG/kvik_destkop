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

export default function Vacancies({ data }) {
  const methods = useFormContext();
  const classes = useStyles();
  console.log("odgs ++++>", data);
  return (
    <>
      <Box className={classes.formElem}>
        <Typography className={classes.formTitleField}>{data[0].name}</Typography>
        <Box className={classes.formInputField}>
          <Controller
            name={data[0].alias}
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.input}
                variant="outlined"
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error ? error.message : " "}
              />
            )}
            rules={{ required: "Ввидите Название вакансии" }}
          />
        </Box>
      </Box>
      <Box className={classes.formElem}>
        <Typography className={classes.formTitleField}>{data[1].name}</Typography>
        <Box className={classes.formInputField}>
          <Controller
            name={data[1].alias}
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.input}
                variant="outlined"
                value={value}
                onChange={(e) => onChange(OnlyNumbersMask(e, 'Владельцев по ПТС'))}
                error={!!error}
                helperText={error ? error.message : " "}
              />
            )}
          />
        </Box>
      </Box>
      <Box className={classes.formElem}>
        <Typography className={classes.formTitleField}>{data[2].name}</Typography>
        <Box className={classes.formInputField}>
          <Controller
            name={data[2].alias}
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
              <TextField
                className={classes.input}
                variant="outlined"
                value={value}
                onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                error={!!error}
                helperText={error ? error.message : " "}
              />
              {value.length ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> р.</span> : null}
              </>
            )}
          />
        </Box>
      </Box>
      <Box className={classes.formElem}>
        <Typography className={classes.formTitleField}>
          {data[3].name}
        </Typography>
        <Box className={classes.formInputField}>
          <Controller
            name={data[3].alias}
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
                {data[3].fields.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
      </Box>
      <Box className={classes.formElem}>
        <Typography className={classes.formTitleField}>
          {data[4].name}
        </Typography>
        <Box className={classes.formInputField}>
          <Controller
            name={data[4].alias}
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
                {data[4].fields.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
            rules={{ required: "Выберите Специализацию" }}
          />
        </Box>
      </Box>
    </>
  );
}

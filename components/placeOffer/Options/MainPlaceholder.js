import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  makeStyles,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";
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
  }
}));

export default function MainPlaceholder({ data }) {
  const methods = useFormContext();
  const classes = useStyles();


  return (
    <>
      {data.map((item, idx) => {
        // console.log('(item.type====>',item.type)
         if (
          item.alias === "truck_enginesize" 
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                          <TextField
                            className={classes.input}
                            variant="outlined"
                            value={value}
                            onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                            error={!!error}
                            helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? (
                            <span
                              className={classes.tooltip}
                              style={{ left: 20 + value.length * 8 }}
                            >
                              {" "}
                              ??????
                            </span>
                          ) : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <TextField
                            className={classes.input}
                            variant="outlined"
                            value={value}
                            onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                            error={!!error}
                            helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? (
                            <span
                              className={classes.tooltip}
                              style={{ left: 20 + value.length * 8 }}
                            >
                              {" "}
                              ??????
                            </span>
                          ) : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
         if (
          item.alias === "vine" 
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "VIN"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                          inputProps={
                            {maxlength:  17}
                          }
                        />
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "VIN"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                        />
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "truck_power" 
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                          <TextField
                            className={classes.input}
                            variant="outlined"
                            value={value}
                            onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                            error={!!error}
                            helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? (
                            <span
                              className={classes.tooltip}
                              style={{ left: 20 + value.length * 8 }}
                            >
                              {" "}
                              ??.??.
                            </span>
                          ) : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <TextField
                            className={classes.input}
                            variant="outlined"
                            value={value}
                            onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                            error={!!error}
                            helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? (
                            <span
                              className={classes.tooltip}
                              style={{ left: 20 + value.length * 8 }}
                            >
                              {" "}
                              ??.??.
                            </span>
                          ) : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "carrying" 
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                          <TextField
                            className={classes.input}
                            variant="outlined"
                            value={value}
                            onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                            error={!!error}
                            helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? (
                            <span
                              className={classes.tooltip}
                              style={{ left: 20 + value.length * 8 }}
                            >
                              {" "}
                              ????
                            </span>
                          ) : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <TextField
                            className={classes.input}
                            variant="outlined"
                            value={value}
                            onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                            error={!!error}
                            helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? (
                            <span
                              className={classes.tooltip}
                              style={{ left: 20 + value.length * 8 }}
                            >
                              {" "}
                              ????
                            </span>
                          ) : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "body_volume" 
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                          <TextField
                            className={classes.input}
                            variant="outlined"
                            value={value}
                            onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                            error={!!error}
                            helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? (
                            <span
                              className={classes.tooltip}
                              style={{ left: 20 + value.length * 8, top: 8  }}
                            >
                              {" "}
                              ????
                            </span>
                          ) : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                          <TextField
                            className={classes.input}
                            variant="outlined"
                            value={value}
                            onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                            error={!!error}
                            helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? (
                            <span
                              className={classes.tooltip}
                              style={{ left: 20 + value.length * 8, top: 8  }}
                            >
                              {" "}
                              ????
                            </span>
                          ) : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (item.alias === "trailer_mileage") {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                          <TextField
                            className={classes.input}
                            variant="outlined"
                            value={value}
                            onChange={(e) =>
                              onChange(OnlyNumbersMask(e, "num"))
                            }
                            error={!!error}
                            helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? (
                            <span
                              className={classes.tooltip}
                              style={{ left: 20 + value.length * 8 }}
                            >
                              {" "}
                              ????.
                            </span>
                          ) : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (item.alias === "year_of_issue") {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                          <TextField
                            className={classes.input}
                            variant="outlined"
                            value={value}
                            onChange={(e) =>
                              onChange(OnlyNumbersMask(e, "num"))
                            }
                            error={!!error}
                            helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? (
                            <span
                              className={classes.tooltip}
                              style={{ left: 20 + value.length * 8}}
                            >
                              {" "}
                              ??.
                            </span>
                          ) : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (item.alias === "full_mass") {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                          <TextField
                            className={classes.input}
                            variant="outlined"
                            value={value}
                            onChange={(e) =>
                              onChange(OnlyNumbersMask(e, "num"))
                            }
                            error={!!error}
                            helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? (
                            <span
                              className={classes.tooltip}
                              style={{ left: 20 + value.length * 8 }}
                            >
                              {" "}
                              ????.
                            </span>
                          ) : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "cadastral_number" ||
          item.alias === "room_count" ||
          item.alias === "room_number" ||
          item.alias === "electric_power"
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                        />
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                        />
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "build_year" ||
          item.alias === "tire_year"
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                        />
                        {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ??.</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ??.</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "profile_height" 
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                        />
                        {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ????</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ????</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "floor_home" ||
          item.alias === "number_of_storeys" ||
          item.alias === "storey"          
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                        />
                        {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ????.</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ????.</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "home_area" ||
          item.alias === "area" ||
          item.alias === "land_area"
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                        />
                        {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ????</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ????</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "ceiling_height"
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "meter"))}
                          error={!!error}
                          helperText={error ? error.message : "???????????? ?? ????????????"}
                        />
                        {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ??.</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "meter"))}
                          error={!!error}
                          helperText={error ? error.message : "???????????? ?? ????????????"}
                          />
                          {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ??.</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (

          item.alias === "pledge" ||
          item.alias === "security_payment" ||
          item.alias === "communal_payments" ||
          item.alias === "commission"
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      shouldUnregister
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                        />
                        {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ???</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      shouldUnregister
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name, maxLength: 10 }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ???</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "price"
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      shouldUnregister
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                        />
                        {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ???</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      shouldUnregister
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ???</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "distance_to_city"
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                        />
                        {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ????.</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ????.</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "the_weight"
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                        />
                        {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ??.</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ??.</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        if (
          item.alias === "total_ram"||
          item.alias === "total_hard_drives"||
          item.alias === "total_ssd"
        ) {
          switch (item.type) {
            case "text":
              return (
                <Box className={classes.formElem}>
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
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                        />
                        {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ????</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
            case "textRec":
              return (
                <Box className={classes.formElem}>
                  <Typography className={classes.formTitleField}>
                    {item.name}
                  </Typography>
                  <Box className={classes.formInputField}>
                    <Controller
                      name={item.alias}
                      control={methods.control}
                      defaultValue=""
                      rules={{ required: "?????????????? " + item.name }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <>
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(OnlyNumbersMask(e, "num"))}
                          error={!!error}
                          helperText={error ? error.message : " "}
                          />
                          {value.length && value.length < 20 ? <span className={classes.tooltip} style={{left: 20 + value.length * 8 }}> ????</span> : null}
                        </>
                      )}
                    />
                  </Box>
                </Box>
              );
          }
        }
        switch (item.type) {
          case "list":
            return (
              <Box key={idx} className={classes.formElem}>
                <Typography
                  className={classes.formTitleField}
                  style={{
                    maxWidth:
                      item.alias === "battery_life" ||
                      item.alias === "builtin_memory"
                        ? 158
                        : null,
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
                <Typography className={classes.formTitleField}>
                  {item.name}
                </Typography>
                <Box className={classes.formInputField}>
                  <Controller
                    name={item.alias}
                    control={methods.control}
                    defaultValue=""
                    rules={{
                      required: "???????????????? " + item.name,
                    }}
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
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    onChange(e.target.value);
                                  } else {
                                    onChange(null);
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
          case "text":
            return (
              <Box className={classes.formElem}>
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
            );
          case "textRec":
            return (
              <Box className={classes.formElem}>
                <Typography className={classes.formTitleField}>
                  {item.name}
                </Typography>
                <Box className={classes.formInputField}>
                  <Controller
                    name={item.alias}
                    control={methods.control}
                    defaultValue=""
                    rules={{ required: "?????????????? " + item.name }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
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
            );
            case "slider":
              return <Box className={classes.formElem}>
              <Typography className={classes.formTitleField}>{item.name}</Typography>
              <Box className={classes.formInputField}>
                <Controller
                  name={item.alias}
                  defaultValue=""
                  control={methods.control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Slider
                      className={classes.input}
                      valueLabelDisplay="auto"
                      step={1}
                      marks={[
                        {
                          value: item.fields[0],
                          label: item.fields[0] 
                        },
                        {
                          value: item.fields[1],
                          label: item.fields[1] 
                        },
                      ]}
                      min={item.fields[0]}
                      max={item.fields[1]}
                      value={value}
                      onChange={(_, value) => onChange(value)}
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

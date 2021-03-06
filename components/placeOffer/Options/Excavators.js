import React, { useMemo, useState } from "react";
import {
  Box,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import trucks from "../../../public/subcategories/excavators_data.json";
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
  },
}));

export default function Excavators({ data }) {
  const trucksData = trucks["excavators"];
  const methods = useFormContext();
  const classes = useStyles();
  const [model, setModel] = useState(null)
  const [make, setMake] = useState(null);



  const makeData = useMemo(() => {
    methods.setValue('model', '')
    methods.setValue('typeofvehicle', '')
    return trucksData?.find((el) => el.value === make)?.children
  }, [make])
  
  const modelData = useMemo(() => {
    methods.setValue('typeofvehicle', '')
    return makeData?.find((el) => el.value === model)?.children
  }, [model])
  
  const bodyType = useMemo(() => {
    methods.setValue("typeofvehicle", modelData?.[0].value)
    return modelData?.[0].value
  }, [model])


  return (
    <>
      {data?.[0] && (
        <Box className={classes.formElem}>
        <Typography className={classes.formTitleField}>
          {data[0].name}
        </Typography>
        <Box className={classes.formInputField}>
          <Controller
            name={data[0].alias}
            control={methods.control}
            defaultValue=""
            rules={{
              required: "???????????????? " + data[0].name,
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
                {data[0].fields?.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
      </Box>
      )}
      {data?.[1] && (
        <Box className={classes.formElem}>
        <Typography className={classes.formTitleField}>
          {data[1].name}
        </Typography>
        <Box className={classes.formInputField}>
          <Controller
            name={data[1].alias}
            control={methods.control}
            defaultValue=""
            rules={{ required: "?????????????? " + data[1].name }}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <TextField
                className={classes.input}
                variant="outlined"
                value={value}
                onChange={e => onChange(OnlyNumbersMask(e, "VIN"))}
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
      )}
            <Box className={classes.formElem}>
        <Typography className={classes.formTitleField}>??????????</Typography>
        <Box className={classes.formInputField}>
          <Controller
            name={trucksData[0].alias}
            control={methods.control}
            defaultValue=""
            rules={{ required: "???????????????? ??????????" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                select
                className={classes.input}
                variant="outlined"
                value={value}
                onChange={(e) => {
                  onChange(e);
                  setMake(e.target.value);
                  setModel()
                }}
                error={!!error}
                helperText={error ? error.message : " "}
              >
                {trucksData.map((option, i) => (
                  <MenuItem key={i} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
      </Box>
      {make && (
        <Box className={classes.formElem}>
          <Typography className={classes.formTitleField}>????????????</Typography>
          <Box className={classes.formInputField}>
            <Controller
              name={makeData[0].alias}
              control={methods.control}
              defaultValue=""
              rules={{ required: "???????????????? ????????????" }}
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
                    setModel(e.target.value)
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
      {(make && model) && 
            <Box className={classes.formElem}>
            <Typography
              className={classes.formTitleField}
            >
              ?????? ??????????????
            </Typography>
            <Box className={classes.formInputField}>
              <Controller
                shouldUnregister
                name={modelData[0].alias}
                control={methods.control}
                
                defaultValue={""}
                render={({
                field: { onChange },
                  fieldState: { error },
                }) => (
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    value={bodyType ?? ""}
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

      {data?.slice(2).map((item, idx) => {
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
                              style={{ left: 20 + value.length * 8 }}
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
        }
      })}
    </>
  );
}

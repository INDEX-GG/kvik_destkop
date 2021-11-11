import { Box, makeStyles, MenuItem, TextField, Typography } from "@material-ui/core"
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const useStyles = makeStyles(() => ({
  formBox: {
    margin: '24px 0'
  },
  formInputField: {
    display: 'flex',
  },
  formTitle:{
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 14,
    color: "#2C2C2C"
  },
  input: {
    margin: '8px',
    width: '100%',
    '&:last-child':{
      marginLeft: 0
    },
    '& .MuiSelect-selectMenu': {
      paddingLeft: 8
    }
  }
}));

const FilterAutoYears = ({data }) => {
  const classes = useStyles();
  const methods = useFormContext();
  const [fromYear, setFromYear] = useState(null)
  const [toYear, setToYear] = useState(null)

  return (
    <Box className={classes.formBox}>
      <Typography className={classes.formTitle}>
          {data.title}
      </Typography>
      <Box className={classes.formInputField}>
        <Controller
          name={data.firstAlias}
          control={methods.control}
          defaultValue=""
          render={({
            field: { onChange, value },
          }) => (
            <TextField
            select
            className={classes.input}
            variant="outlined"
            value={value}
            onChange={(e) => {
              if (e.target.value <= toYear || !toYear){
                onChange(e)
                setFromYear(e.target.value)
              }
            }}
          >
            {data.fields.map((option, i) => (
              <MenuItem key={i} value={option}>
                {`от ${option}`}
              </MenuItem>
            ))}
          </TextField>
          )}
        />
        <Controller
          name={data.secondAlias}
          control={methods.control}
          defaultValue=""
          render={({
            field: { onChange, value },
          }) => (
            <TextField
            select
            className={classes.input}
            variant="outlined"
            value={value}
            onChange={(e) => {
              if (e.target.value >= fromYear || !fromYear){
                onChange(e)
                setToYear(e.target.value)
              }
            }}
          >
            {data.fields.map((option, i) => (
              <MenuItem key={i} value={option}>
                {`До ${option}`}
              </MenuItem>
            ))}
          </TextField>
          )}
        />
      </Box>
    </Box>
  )
}

export default FilterAutoYears

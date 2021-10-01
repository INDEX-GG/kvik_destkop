import { Box, makeStyles, MenuItem, TextField, Typography } from "@material-ui/core"
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

const FilterTwoFieldsSelect = ({firstAlias, secondAlias, firstSelect, secondSelect, title, }) => {
  const classes = useStyles();
  const methods = useFormContext();

  return (
    <Box className={classes.formBox}>
      <Typography className={classes.formTitle}>
          {title}
      </Typography>
      <Box className={classes.formInputField}>
        <Controller
          name={firstAlias}
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
            onChange={onChange}
          >
            {firstSelect.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          )}
        />
        <Controller
          name={secondAlias}
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
            onChange={onChange}
          >
            {secondSelect.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          )}
        />
      </Box>
    </Box>
  )
}

export default FilterTwoFieldsSelect

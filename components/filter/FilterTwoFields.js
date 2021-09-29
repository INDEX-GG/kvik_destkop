import { Box, makeStyles, TextField, Typography } from "@material-ui/core"
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
    '&:last-child':{
      marginLeft: 0
    }
  }
}));

const FilterTwoFields = ({firstAlias, secondAlias, firstPlaceholder, secondPlaceholder, title}) => {
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
              className={classes.input}
              variant="outlined"
              value={value}
              placeholder={firstPlaceholder}
              onChange={onChange}
            />
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
              className={classes.input}
              variant="outlined"
              value={value}
              placeholder={secondPlaceholder}
              onChange={onChange}
            />
          )}
        />
      </Box>
    </Box>
  )
}

export default FilterTwoFields

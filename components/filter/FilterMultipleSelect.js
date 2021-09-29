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
  }
}));

const FilterMultipleSelect = ({alias,  selectData, title, }) => {
  const classes = useStyles();
  const methods = useFormContext();
  const [selectValue, setSelectValue] = useState([])

  const handleSelectValue = (e, onChange) => {
    setSelectValue([...e.target.value])
    onChange([...e.target.value])
  }
  
  return (
    <Box className={classes.formBox}>
      <Typography className={classes.formTitle}>
          {title}
      </Typography>
      <Box className={classes.formInputField}>
        <Controller
          name={alias}
          control={methods.control}
          defaultValue=""
          render={({
            field: { onChange },
          }) => (
            <TextField
            select
            className={classes.input}
            variant="outlined"
            SelectProps={{
              multiple: true,
              value: selectValue,
              onChange: (e) =>  {handleSelectValue(e, onChange);}
            }}
          >
            {selectData.map((option, i) => (
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

export default FilterMultipleSelect

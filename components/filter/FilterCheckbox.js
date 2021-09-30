import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";
import { useEffect, useState } from "react";

const useStyles = makeStyles(() => ({
  formBox: {
    margin: "24px 0",
  },
  formInputField: {
    display: "flex",
  },
  formTitle: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 14,
    color: "#2C2C2C",
  },
  input: {
    margin: "8px",
    "&:last-child": {
      marginLeft: 0,
    },
  },
  checkboxes: {
    display: 'flex',
    flexDirection: "column",
    padding: "0 8px"
  },
  check:{
    marginLeft: 0,
    '&>.MuiFormControlLabel-label': {
      fontSize: 14,
    }
  },
  checkbox: {
    padding: "4px 4px 4px 0",
    fontSize: 18
  }
}));

const FilterCheckbox = ({
  data
}) => {
  const classes = useStyles();
  const methods = useFormContext();
  const [checkboxes, setCheckboxes] = useState([])

  const handleClick = (value, onChange) => {
    setCheckboxes(col => {
      if (col.includes(value)){
        onChange (col.filter(el => el !== value))
        return col.filter(el => el !== value)
      }
      onChange([...col, value])
      return [...col, value]
    })
  }

  useEffect(() => {
    if (methods.watch(data.alias) === undefined){
      setCheckboxes([])
    }
  },[methods.watch(data.alias)])
  

  return (
    <Box className={classes.formBox}>
      <Typography className={classes.formTitle}>{data.title}</Typography>
      <Box className={classes.checkboxes}>
          <Controller
              name={data.alias}
              control={methods.control}
              defaultValue={[]}
              render={({ field: { onChange, value } }) => (
                <FormGroup
                value={value}
                // onChange={() => {onChange([...checkboxes])}}
                >
                  {data.fields?.map((item, i) => (
                    <FormControlLabel
                    key={i}
                    className={classes.check}
                    value={value}
                    control={
                      <Checkbox
                      className={classes.checkbox}
                        onChange={(e) => {
                          handleClick(e.target.value, onChange)
                        }}
                        color="primary"
                        icon={<OutlinedIcon fontSize="inherit" />}
                        checkedIcon={<Filledicon fontSize="inherit" />}
                        checked={checkboxes.includes(`${item}`)}
                        value={item}
                      />
                  
                  }
                    label={item}
                  />
                  ))}
                </FormGroup>
               
              )}
            />
      </Box>
    </Box>
  );
};

export default FilterCheckbox;

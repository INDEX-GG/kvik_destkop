import React from 'react';
import {makeStyles, MenuItem, TextField} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";


const useStyles = makeStyles(() => ({
    input: {
        width: "264px",
    },
}));

const AdditionalFieldTextList = ({fieldData}) => {

    const classes = useStyles();
    const {text_list_values, required, alias, default_value} = fieldData
    const {control} = useFormContext();

    return (
        <Controller
            name={alias}
            control={control}
            defaultValue={default_value}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField
                    select
                    className={classes.input}
                    variant='outlined'
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : ' '}>
                    {text_list_values.map((itemList, i) => (
                        <MenuItem key={itemList + i} value={itemList}>
                            {itemList}
                        </MenuItem>
                    ))}
                </TextField>
            )}
            rules={{required: required.state ? required.value : false}}
        />
    )
};

export default AdditionalFieldTextList;
import React from 'react';
import {makeStyles, TextField} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";


const useStyles = makeStyles(() => ({
    input: {
        width: "264px",
    },
}));

const AdditionalFieldText = ({fieldData}) => {

    const classes = useStyles();

    const {text_max_len, required, alias, default_value} = fieldData;
    const {control} = useFormContext();


    return (
        <>
            <Controller
                name={alias}
                control={control}
                defaultValue={default_value}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        className={classes.input}
                        variant='outlined'
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : ' '}
                        inputProps={{maxLength: text_max_len}}
                    />
                )}
                rules={{ required: required.state ? required.value : false }}
            />
        </>
    );
};

export default AdditionalFieldText;
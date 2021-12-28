import React from 'react';
import {makeStyles, TextField} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";


const useStyles = makeStyles(() => ({
    input: {
        width: "264px",
    },
}));

const AdditionalFieldText = ({fieldData, defaultValue}) => {

    const classes = useStyles();

    const {text_max_len, required, alias, default_value, title, type} = fieldData;
    const {control} = useFormContext();

    return (
        <AdditionalWrapper title={title} type={type}>
            <Controller
                name={alias}
                control={control}
                defaultValue={defaultValue ? defaultValue : default_value}
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
        </AdditionalWrapper>
    );
};

export default AdditionalFieldText;
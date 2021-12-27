import React from 'react';
import {makeStyles, TextField} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";


const useStyles = makeStyles(() => ({
    input: {
        width: "264px",
    },
}));

const AdditionalFieldBoolean = ({fieldData}) => {

    const classes = useStyles();
    const {control} = useFormContext();

    const {alias, required, default_value} = fieldData;

    return (
        <AdditionalWrapper title={fieldData.title} type={fieldData.type}>
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
                        helperText={error ? error.message : ' '}/>
                )}
                rules={{required: required.state ? required.value : false}}
            />
        </AdditionalWrapper>
    )
};

export default AdditionalFieldBoolean;
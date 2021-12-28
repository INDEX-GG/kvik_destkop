import React from 'react';
import {Box, makeStyles, TextField} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";


const useStyles = makeStyles(() => ({
    input: {
        width: "264px",
        '& input[type=number]': {
            '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        }
    },
    numberDesignation: {
        position: 'absolute',
        top: '12px',
        pointerEvents: 'none'
    }
}));


const AdditionalFieldNumber = ({fieldData}) => {

    const classes = useStyles();
    const {setError, clearErrors, control, getValues} = useFormContext();
    const {
        alias,
        number_min_value,
        number_max_value,
        number_unit_of_measure,
        required,
        default_value,
        placeholder,
    } = fieldData


    const valueLength = getValues(alias)?.length ? getValues(alias)?.length : 0;

    const handlerChangeInput = (event, onChange) => {
        const inputValue = event.target.value

        if (inputValue > number_max_value) {
            setError(alias, {type: 'string', message: `Маскимальное значение: ${number_max_value}`})
            return;
        } else if (inputValue < number_min_value) {
            setError(alias, {type: 'string', message: `Минимальное значение: ${number_min_value}`})
            onChange('');
            return;
        } else {
            clearErrors(alias);
        }

        onChange(inputValue);
    };


    return (
        <AdditionalWrapper title={fieldData.title} type={fieldData.type}>
            <Controller
                name={alias}
                control={control}
                defaultValue={default_value}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                    <TextField
                        value={value}
                        onChange={(e) => handlerChangeInput(e, onChange)}
                        className={classes.input}
                        variant='outlined'
                        type='number'
                        placeholder={`${placeholder}`}
                        error={!!error}
                        helperText={error ? error.message : ' '}/>
                )}
                rules={{required: required.state ? required.value : false}}
            />
            {!!valueLength && (<Box className={classes.numberDesignation} style={{left: `${28 + (7 * valueLength)}px`}}>{number_unit_of_measure}</Box>)}
        </AdditionalWrapper>
    );
};

export default AdditionalFieldNumber;
import React from 'react';
import {makeStyles, TextField} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import {num} from "#lib/regulars";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";


const useStyles = makeStyles(() => ({
    input: {
        width: "264px",
    },
}));


const AdditionalFieldNumber = ({fieldData}) => {

    const classes = useStyles();
    const {setError, clearErrors, control} = useFormContext();

    const {
        alias,
        number_min_value,
        number_max_value,
        number_unit_of_measure,
        required,
        default_value,
        placeholder
    } = fieldData

    const handlerChangeInput = (event, onChange) => {
        const inputValue = +event.target.value.replace(num(), '')

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


        if (inputValue) {
            onChange(inputValue + ` ${number_unit_of_measure}`);
        }
    };


    const cursorReplace = (e, value, onChange) => {
        if (e.key === 'Backspace' && value) {
            const inputValue = value.replace(num(), '')
            const onlyNumber = inputValue.substr(0, inputValue.length - 1)

            if (!onlyNumber) {
                onChange('')
                return
            }

            onChange(onlyNumber + ` ${number_unit_of_measure}`)
        }
    }


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
                        onKeyDown={(e) => cursorReplace(e, value, onChange)}
                        className={classes.input}
                        variant='outlined'
                        placeholder={`${placeholder} ${number_unit_of_measure}`}
                        error={!!error}
                        helperText={error ? error.message : ' '}/>
                )}
                rules={{required: required.state ? required.value : false}}
            />
        </AdditionalWrapper>
    );
};

export default AdditionalFieldNumber;
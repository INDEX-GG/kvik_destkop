import React from 'react';
import {makeStyles, TextField, useMediaQuery} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";
import {handleKeyDownInput} from "#components/placeOffer/newPlaceOffer/AdditionalServices";


const useStyles = makeStyles((theme) => ({
    input: {
        width: "264px",
        [theme.breakpoints.down(960)]: {
            width: '100%',
            height: '48px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',

            '& > .Mui-error': {
                borderWidth: 1,
                borderRadius: '0'
            },

            '& > .MuiInputBase-multiline': {
                paddingLeft: '0px'
            },

            '& > div': {
                height: '100%',
                '&  > input': {
                    padding: '0 0 0 10px',
                    height: '100%',
                    color: '#8F8F8F',
                    fontSize: '16px',
                    "&::placeholder": {
                        opacity: '1 !important'
                    },
                },

                '&  > textarea': {
                    padding: '0 0 0 10px',
                    height: '100%',
                    color: '#8F8F8F',
                    fontSize: '14px',
                    "&::placeholder": {
                        opacity: '1 !important'
                    },
                },

                '& > fieldset': {
                    borderRadius: 0,
                    border: 0
                },
            },


            '& > div.Mui-error': {
                '& > fieldset': {
                    border: '1px solid red !important'
                },
            },

            '& > p': {
                display: 'none',
                margin: '0',
            },
        }

    },
}));

const AdditionalFieldText = ({fieldData, defaultValue}) => {

    const classes = useStyles();

    const {text_max_len, required, alias, default_value, title, type} = fieldData;
    const {control} = useFormContext();
    const placeholder = useMediaQuery('(max-width: 960px)') ? title : '';

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
                        placeholder={placeholder}
                        onKeyDown={handleKeyDownInput}
                        error={!!error}
                        helperText={error ? error.message : ' '}
                        inputProps={{maxLength: text_max_len, readOnly: required?.readOnly}}
                    />
                )}
                rules={{ required: required.state ? required.value : false }}
            />
        </AdditionalWrapper>
    );
};

export default AdditionalFieldText;
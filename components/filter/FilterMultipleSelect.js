import {Box, makeStyles, MenuItem, TextField, Typography, useMediaQuery} from "@material-ui/core"
import {Controller, useFormContext} from "react-hook-form";
import AdditionalFieldModal from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldModal";
import React from "react";

const useStyles = makeStyles(() => ({
    formBox: {
        margin: '24px 0'
    },
    formInputField: {
        display: 'flex',
    },
    formTitle: {
        fontWeight: 500,
        fontSize: 14,
        color: "#2C2C2C"
    },
    input: {
        width: '100%',
    }
}));

const FilterMultipleSelect = ({data}) => {


    const classes = useStyles();
    const methods = useFormContext();
    const media960 = useMediaQuery('(max-width: 960px)')
    const {title, alias, default_filter_arr} = data



    const handleSelectValue = (e, onChange) => {
        console.log(e.target.value);
        onChange([...e.target.value])
    }


    const generateValue = (value) => {
        if (Array.isArray(value)) return  value
        if (value) return  [value]
        return []
    }

    return (
        media960 ? (
            <AdditionalFieldModal
                jsonData={data}
                dataItems={default_filter_arr}
                getValues={methods.getValues}
                setValue={methods.setValue}
                propsType='check_list'
            />
        ) : (
            <Box className={classes.formBox}>
                <Typography className={classes.formTitle}>
                    {title}
                </Typography>
                <Box className={classes.formInputField}>
                    <Controller
                        name={alias}
                        control={methods.control}
                        defaultValue={[]}
                        render={({field: {onChange, value},}) => (
                            <TextField
                                select
                                className={classes.input}
                                variant="outlined"
                                SelectProps={{
                                    multiple: true,
                                    value: generateValue(value),
                                    onChange: (e) => {
                                        handleSelectValue(e, onChange);
                                    }
                                }}
                            >
                                {default_filter_arr.map((option, i) => (
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
    )
}

export default FilterMultipleSelect

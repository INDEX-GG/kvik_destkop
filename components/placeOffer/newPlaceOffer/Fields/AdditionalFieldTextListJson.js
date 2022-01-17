import React from 'react';
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";
import {Controller, useFormContext} from "react-hook-form";
import {TextField, MenuItem} from "@material-ui/core";

const AdditionalFieldTextListJson = ({fieldObj}) => {
    const {control} = useFormContext();
    const {alias, type, title, default_filter_arr, filter_title} = fieldObj


    return (
        <AdditionalWrapper title={filter_title ? filter_title : title} type={type}>
            <Controller
                name={alias}
                control={control}
                render={({field: {onChange, value}}) => (
                    <TextField
                        select
                        // className={classes.input}
                        variant='outlined'
                        value={value}
                        onChange={onChange}>
                        {Array.isArray(default_filter_arr) && (
                            default_filter_arr.map(item => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))
                        )}
                    </TextField>
                )}
            />
        </AdditionalWrapper>
    );
};

export default AdditionalFieldTextListJson;
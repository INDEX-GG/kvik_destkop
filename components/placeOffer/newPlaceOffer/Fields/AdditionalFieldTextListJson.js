import React from 'react';
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";
import {Controller, useFormContext} from "react-hook-form";
import {TextField, MenuItem, useMediaQuery} from "@material-ui/core";
import AdditionalLabelGroup from "#components/placeOffer/newPlaceOffer/Fields/AdditionalLabelGroup";
import AdditionalFieldModal from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldModal";

const AdditionalFieldTextListJson = ({fieldObj, filters}) => {
    const {control, getValues, setValue} = useFormContext();
    const {alias, type, title, default_filter_arr, filter_title} = fieldObj
    const media960 = useMediaQuery('(max-width: 960px)');

    return (
        <AdditionalWrapper title={filter_title ? filter_title : title} type={type} filters={filters}>
            {media960 ? (
                    default_filter_arr?.length > 4 ? (
                        <AdditionalFieldModal
                            jsonData={fieldObj}
                            dataItems={default_filter_arr}
                            getValues={getValues}
                            setValue={setValue}
                        />
                    ) : (
                        <AdditionalLabelGroup
                            alias={alias}
                            dataItems={default_filter_arr}
                        />
                    )
                )
                : (
                <Controller
                    name={alias}
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <TextField
                            select
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
            )}
        </AdditionalWrapper>
    );
};

export default AdditionalFieldTextListJson;
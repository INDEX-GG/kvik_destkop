import React, {useEffect, useState} from 'react';
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";
import {Controller, useFormContext} from "react-hook-form";
import {makeStyles, MenuItem, TextField, useMediaQuery} from "@material-ui/core";
import moment from 'moment'
import {generateTextListDataArr} from "#components/placeOffer/newPlaceOffer/AdditionalServices";
import AdditionalFieldModal from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldModal";


const useStyles = makeStyles(() => ({
    input: {
        width: "264px",
    },
}));

const AdditionalFieldTextListData = ({fieldData}) => {

    const classes = useStyles();
    const {control, getValues, setValue} = useFormContext();
    const media960 = useMediaQuery('(max-width: 960px)');

    const [quarterArr, setQuarterArr] = useState([1, 2]);
    const {title, type, alias, default_value, required} = fieldData



    useEffect(() => {
        const stateArr = generateTextListDataArr(moment)
        if (Array.isArray(stateArr)) {
            setQuarterArr(stateArr);
        }
    }, [])


    return (
        <AdditionalWrapper title={title} type={type}>
            {media960 ? (
                <AdditionalFieldModal
                    jsonData={fieldData}
                    dataItems={quarterArr}
                    getValues={getValues}
                    setValue={setValue}
                />
            ) : (
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
                            {quarterArr.map((itemList, i) => (
                                <MenuItem key={itemList + i} value={itemList}>
                                    {itemList}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    rules={{required: required.state ? required.value ? required.value : false : false}}
                />
            )}
        </AdditionalWrapper>
    );
};

export default AdditionalFieldTextListData;
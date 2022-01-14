import React, {useEffect, useState} from 'react';
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";
import {Controller, useFormContext} from "react-hook-form";
import {makeStyles, MenuItem, TextField, useMediaQuery} from "@material-ui/core";
import {searchItemInArray} from "#components/placeOffer/newPlaceOffer/AdditionalServices";
import AdditionalFieldModal from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldModal";



const useStyles = makeStyles(() => ({
    input: {
        width: "264px",
    },
}));

// Пропс yearsData (это объект в котором есть children с нужными нам данными) - передаётся только в AdditionalView (React.cloneElement)
const AdditionalFieldPeriod = ({fieldData, yearsData}) => {

    const {control, getValues, setValue} = useFormContext();
    const classes = useStyles();
    const media960 = useMediaQuery('(max-width: 960px');


    const [yearsArray, setYearsArr] = useState([]);
    const {title, type, alias, default_value, dependencies, required} = fieldData


    const generateYears = (obj) => {
        if (Array.isArray(obj?.children)) {

            const childrenArray = obj.children

            if (Array.isArray(childrenArray)) {
                // Минимальный год (2013)
                const minValue = childrenArray.find(item => item.alias === 'yearfrom')?.value
                // Максимальный год (2020)
                const maxValue = childrenArray.find(item => item.alias === 'yearto')?.value

                const newArr = []


                for (let i = 0; i <= maxValue - minValue; i++) {
                    newArr.push(+minValue + i);
                }

                if (Array.isArray(newArr)) {
                    setYearsArr(newArr)
                }

                return newArr
            }
        }
    };

    useEffect(() => {
        if (Array.isArray(yearsData)) {
            const arrayItem = searchItemInArray(yearsData, getValues(dependencies.reverse()[0]), 'value')
            generateYears(arrayItem)
        } else if (typeof yearsData === 'object') {
            generateYears(yearsData)
        }
    }, [yearsData])



    console.log(yearsData);


    return (
        <AdditionalWrapper title={title} type={type}>
            {media960 ? (
                <AdditionalFieldModal
                    jsonData={fieldData}
                    dataItems={yearsArray}
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
                            {yearsArray.map((itemList, i) => (
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

export default AdditionalFieldPeriod;
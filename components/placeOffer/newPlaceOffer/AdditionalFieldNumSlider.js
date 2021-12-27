import React from 'react';
import {Slider} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";

const AdditionalFieldNumSlider = ({fieldData}) => {

    const {control} = useFormContext();
    const {alias} = fieldData

    const valuetext = (value) => {
        return `${value}°C`;
    }

    const handleChange = (event, newValue, onChange) => {
        onChange(newValue);
    };

    return (
        <AdditionalWrapper title={fieldData.title} type={fieldData.type}>
            <Controller
                name={alias}
                control={control}
                defaultValue={[0, 100]}
                render={({field: {onChange, value}}) => (
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        step={1}
                        min={1}
                        max={100}
                        value={value ? value : [1, 100]}
                        onChange={(e, newValue) => handleChange(e, newValue, onChange)}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                )}
            />
        </AdditionalWrapper>
    );
};

export default AdditionalFieldNumSlider;
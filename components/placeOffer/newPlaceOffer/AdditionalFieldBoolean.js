import React from 'react';
import {Checkbox} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";



const AdditionalFieldBoolean = ({fieldData}) => {

    const {control} = useFormContext();

    const {alias, required, default_value} = fieldData;

    const handlerCheckboxChange = (e, onChange) => {
        if (e.target.checked) {
            onChange(e.target.value);
        } else {
            onChange(null);
        }
    }


    return (
        <AdditionalWrapper title={fieldData.title} type={fieldData.type}>
            <Controller
                name={alias}
                control={control}
                defaultValue={default_value}
                render={({field: {onChange, value}}) => (
                    <Checkbox
                        onChange={(e) => handlerCheckboxChange(e, onChange)}
                        color="primary"
                        icon={<OutlinedIcon />}
                        checkedIcon={<Filledicon />}
                        value={value}
                    />
                )}
                rules={{required: required.state ? required.value : false}}
            />
        </AdditionalWrapper>
    )
};

export default AdditionalFieldBoolean;
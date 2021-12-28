import React from 'react';
import {Checkbox} from "@material-ui/core";
import {Controller, useFormContext} from "react-hook-form";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";



const AdditionalFieldBoolean = ({fieldData}) => {

    const {control} = useFormContext();

    /** required **/
    const {alias, default_value} = fieldData;


    return (
        <AdditionalWrapper title={fieldData.title} type={fieldData.type}>
            <Controller
                name={alias}
                control={control}
                defaultValue={!!default_value}
                render={({field: {onChange, value}}) => (
                    <Checkbox
                        onChange={(e) => onChange(e.target.checked)}
                        color="primary"
                        icon={<OutlinedIcon />}
                        checkedIcon={<Filledicon />}
                        value={value}
                    />
                )}
                // rules={{required: required.state ? required.value ? required.value : false : false}}
            />
        </AdditionalWrapper>
    )
};

export default AdditionalFieldBoolean;
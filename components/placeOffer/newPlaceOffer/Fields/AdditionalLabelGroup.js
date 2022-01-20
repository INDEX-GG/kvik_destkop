import React from 'react';
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";
import {Controller, useFormContext} from "react-hook-form";

const AdditionalLabelGroup = ({alias, dataItems}) => {

    const {control} = useFormContext();


    return (
        <Controller
            name={alias}
            control={control}
            defaultValue=""
            render={({field: {onChange, value}}) => (
                <RadioGroup
                    // className={classes.check}
                    value={value}
                    defaultValue={value}
                    onChange={(e) => onChange(e.target.value)}>
                    {dataItems.map((item) => (
                        <FormControlLabel
                            key={alias}
                            label={item}
                            value={item}
                            // className={classes.item}
                            control={
                                <Radio
                                    checked={value == item}
                                    // className={classes.checkbox}
                                    color="primary"
                                    icon={<OutlinedIcon fontSize="inherit"/>}
                                    checkedIcon={<Filledicon fontSize="inherit"/>}
                                />
                            }
                        />
                    ))}
                </RadioGroup>
            )}
            rules={{required: ''}}
        />
    );
};

export default AdditionalLabelGroup;
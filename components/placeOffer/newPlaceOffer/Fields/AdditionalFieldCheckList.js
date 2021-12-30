import React from 'react';
import {Checkbox, makeStyles} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";
import {Controller, useFormContext} from "react-hook-form";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";


const useStyles = makeStyles(() => ({
    check: {
        width: '48%',
        margin: '0',
        alignItems: 'start',
        height: '50px',
        '& span': {
            padding: '0',
            fontSize: '14px',
            display: "flex",
            marginRight: '4px',
        }
    },
}));


const AdditionalFieldCheckList = ({fieldData}) => {

    const classes = useStyles();
    const {control} = useFormContext();

    /** required **/
    const {alias, default_value, check_list_values} = fieldData;


    return (
        <AdditionalWrapper title={fieldData.title} type={fieldData.type}>
            {check_list_values.map((checkItem, index) => (
                <Controller
                    key={alias + index}
                    name={alias + (index + 1)}
                    control={control}
                    defaultValue={!!default_value}
                    render={({ field: { onChange, value } }) => (
                        <FormControlLabel
                            className={classes.check}
                            value={value}
                            // onChange={(e) => onChange(e.target.value)}
                            control={
                                <Checkbox
                                    onChange={(e) => onChange(e.target.checked)}
                                    color="primary"
                                    icon={<OutlinedIcon />}
                                    checkedIcon={<Filledicon />}
                                    value={checkItem}
                                />
                            }
                            label={checkItem}
                        />
                    )}
                    // rules={{required: required.state ? required.value ? required.value : false : false}}
                />
            ))}
        </AdditionalWrapper>
    )
};

export default AdditionalFieldCheckList;
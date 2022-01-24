import React from 'react';
import {Checkbox, makeStyles, useMediaQuery} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import OutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import Filledicon from "@material-ui/icons/Brightness1";
import {Controller, useFormContext} from "react-hook-form";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";
import AdditionalFieldModal from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldModal";


const useStyles = makeStyles((theme) => ({
    check: {
        width: '48%',
        margin: '0',
        alignItems: 'start',
        height: '50px',

        [theme.breakpoints.down(960)]: {
            width: '100%',
            maxWidth: 'none',
            padding: 0
        },

        '& span': {
            padding: '0',
            fontSize: '14px',
            display: "flex",
            marginRight: '4px',
        },
    },
}));


const AdditionalFieldCheckList = ({fieldData}) => {

    const classes = useStyles();
    const {control, getValues, setValue} = useFormContext();
    const media960 = useMediaQuery('(max-width: 960px');

    /** required **/
    const {alias, default_value, check_list_values} = fieldData;

    // console.log(alias, 'alias')
    // console.log(getValues())

    return (
        <AdditionalWrapper title={fieldData.title} type={fieldData.type}>
            {media960 ? (
                <AdditionalFieldModal
                    jsonData={fieldData}
                    dataItems={check_list_values}
                    getValues={getValues}
                    setValue={setValue}
                />
            ) : (
                check_list_values.map((checkItem, index) => {
                    const autoCheck = getValues(alias+ (index + 1))
                    const defaultChecked = autoCheck ? true : false

                    return (
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
                                        // checked={defaultChecked}
                                        defaultChecked={defaultChecked}
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
                )})
            )}
        </AdditionalWrapper>
    )
};

export default AdditionalFieldCheckList;
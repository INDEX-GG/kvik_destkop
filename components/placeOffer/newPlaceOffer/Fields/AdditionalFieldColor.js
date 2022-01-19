import React, {useEffect} from 'react';
import RadioGroup from "@material-ui/core/RadioGroup";
import {Box, makeStyles, Tooltip, useMediaQuery} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Controller, useFormContext} from "react-hook-form";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";
import AdditionalFieldModal from "#components/placeOffer/newPlaceOffer/Fields/AdditionalFieldModal";

const useStyles = makeStyles(() => ({
    formColorMain: {
        width: '490px',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    tooltip: {
        border: "#8F8F8F solid 1px",
        background: "#FFFFFF",
        color: "#5A5A5A",
        fontSize: "12px",
    },
    arrow: {
        color: '#FFFFFF',
        "&:before": {
            border: "#8F8F8F solid 1px",
        }
    },
    formColorWrapperActive: {
        border: '1px solid #5A5A5A',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2px',
    },
    formColorWrapper: {
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2px',
    },
    formRadioColor: {
        opacity: '0',
        padding: '0',
    },
    formError: {
        color: '#F44545',
        marginLeft: '14px',
        marginRight: '14px',
    },
    formColor: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        cursor: 'pointer',
    },
}));

const AdditionalFieldColor = ({fieldData}) => {

    const classes = useStyles();
    const {control, getValues, setValue} = useFormContext();
    const {text_list_values, required} = fieldData
    const media960 = useMediaQuery('(max-width: 960px)');

    // console.log(text_list_values)
    // console.log(getValues().color)
    const currentTarget = getValues().color



    useEffect(()=> {
        if(currentTarget) {
            setValue('color', parseInt(currentTarget))
        }
    }, [currentTarget])

    return (
        <AdditionalWrapper title={fieldData.title} type={fieldData.type}>
            {media960 ? (
                <AdditionalFieldModal
                    jsonData={fieldData}
                    dataItems={text_list_values}
                    getValues={getValues}
                    setValue={setValue}
                />
            ) : (
                <Controller
                    name="color"
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <RadioGroup
                            variant='outlined'
                            value={value}
                            error={!!error}
                            className={classes.formColorMain}
                            // onChange={(e) => onChange(e.target.value)}
                        >
                            {text_list_values.map((item, i) => (
                                <Tooltip key={i} arrow placement="top" title={item.name} classes={{tooltip: classes.tooltip, arrow: classes.arrow}}>
                                    <Box className={value === i ? classes.formColorWrapperActive : classes.formColorWrapper}>
                                        <Box className={classes.formColor} onClick={() => onChange(i)} style={{ background: item.value, border: item.value === '#FFFFFF' ? '1px solid #5A5A5A' : '' }} ><Radio className={classes.formRadioColor} value={item.id}></Radio></Box>
                                    </Box>
                                </Tooltip>
                            ))}
                            <FormHelperText className={classes.formError}>{error ? error.message : ' '}</FormHelperText>
                        </RadioGroup>
                    )}
                    rules={{ required: required.state ? required.value : false }}
                />
            )}
        </AdditionalWrapper>
    );
};

export default AdditionalFieldColor;
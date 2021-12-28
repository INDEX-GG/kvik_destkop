import React from 'react';
import RadioGroup from "@material-ui/core/RadioGroup";
import {Box, makeStyles, Tooltip} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Controller, useFormContext} from "react-hook-form";
import AdditionalWrapper from "#components/placeOffer/newPlaceOffer/AdditionalWrapper";

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
    const {control} = useFormContext();
    const {text_list_values, required} = fieldData

    return (
        <AdditionalWrapper title={fieldData.title} type={fieldData.type}>
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
        </AdditionalWrapper>
    );
};

export default AdditionalFieldColor;
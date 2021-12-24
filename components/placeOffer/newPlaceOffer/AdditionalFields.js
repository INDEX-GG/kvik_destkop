import React from 'react';
import {Box, makeStyles, Typography} from "@material-ui/core";
import AdditionalFieldText from "#components/placeOffer/newPlaceOffer/AdditionalFieldText";
import AdditionalFieldNumber from "#components/placeOffer/newPlaceOffer/AdditionalFieldNumber";
import AdditionalFieldBoolean from "#components/placeOffer/newPlaceOffer/AdditionalFieldBoolean";
import AdditionalFieldCheckList from "#components/placeOffer/newPlaceOffer/AdditionalFieldCheckList";
import AdditionalFieldTextList from "#components/placeOffer/newPlaceOffer/AdditionalFieldTextList";
import AdditionalFieldColor from "#components/placeOffer/newPlaceOffer/AdditionalFieldColor";


const useStyles = makeStyles((theme) => ({
    formElem: {
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(3),
    },
    formTitleField: {
        fontSize: "14px",
        flexGrow: 1,
        padding: "4px 5px 4px 0",
        maxWidth: 158,
    },
    formInputField: {
        width: "490px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        "&>p": {
            marginBottom: theme.spacing(2),
        },
        "&>*:last-child": {
            marginBottom: 0,
        },
    },
    formInputMainField_checkbox: {
        display: "flex",
    },
    formInputFieldCheck: {
        width: "490px",
        display: "flex",
        flexWrap: "wrap",
        marginBottom: "16px",
        padding: "4px 0",
    },
    check: {
        width: "48%",
        margin: "0",
        alignItems: "start",
        height: "50px",
        "& span": {
            padding: "0",
            fontSize: "14px",
            display: "flex",
            marginRight: "4px",
        },
    },
    tooltip: {
        position: "absolute",
        top: 9,
    }
}));


const generateFields = (fieldData) => {

    const {text_list_rendering_type} = fieldData;

    switch (fieldData.type) {
        case 'text':
            return (
                <AdditionalFieldText
                    fieldData={fieldData}
                />
            )
        case 'text_list':
            // Цвет
            if (text_list_rendering_type == 1) {
                return (
                    <AdditionalFieldColor
                        fieldData={fieldData}
                    />
                )
            } else {
                return (
                    <AdditionalFieldTextList
                        fieldData={fieldData}
                    />
                )
            }
        case 'number':
            return (
                <AdditionalFieldNumber
                    fieldData={fieldData}
                />
            )
        case 'boolean':
            return (
                <AdditionalFieldBoolean
                    fieldData={fieldData}
                />
            )
        case 'check_list':
            return (
                <AdditionalFieldCheckList
                    fieldData={fieldData}
                />
            )
    }
}


const AdditionalFields = ({fieldData}) => {

    const classes = useStyles();
    const wrapper = fieldData.type === 'check_list' ? classes.formInputFieldCheck : classes.formTitleField

    return (
        <Box className={classes.formElem}>
            <Typography className={classes.formTitleField}>
                {fieldData.title}
            </Typography>
            <Box className={wrapper}>
                {generateFields(fieldData)}
            </Box>
        </Box>
    );
};

export default AdditionalFields;
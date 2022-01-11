import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import FieldInput from "#components/placeOffer/newPlaceOffer/FieldsMobile/FieldInput";


const useStyles = makeStyles(() => ({
    formInputBox: {

    },
    formInputIcon: {

    }
}));


const FieldInputIcon = ({icon, ...props}) => {

    const classes = useStyles();
    const Icon = icon;

    return (
        <Box className={classes.formInputBox}>
            <FieldInput
                {...props}
            />
            {icon && (
                <Box className={classes.formInputIcon}>
                    <Icon/>
                </Box>
            )}
        </Box>
    );
};

export default FieldInputIcon;
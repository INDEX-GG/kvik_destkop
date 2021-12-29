import React from 'react';
import {Box, makeStyles, Typography} from "@material-ui/core";

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
        position: 'relative'
    },
    formInputFieldCheck: {
        width: "490px",
        display: "flex",
        flexWrap: "wrap",
        marginBottom: "16px",
        padding: "4px 0",
    },
    paddingTitle: {
        paddingTop: '10px'
    }
}));

const AdditionalWrapper = ({title, type, children}) => {

    const classes = useStyles();
    const wrapper = type === 'check_list' ? classes.formInputFieldCheck : classes.formTitleField
    const classNameTitle = type !== 'check_list' ? `${classes.formTitleField} ${classes.paddingTitle}` : `${classes.formTitleField}`

    return (
        <Box className={classes.formElem}>
            <Typography className={classNameTitle}>
                {title}
            </Typography>
            <Box className={wrapper}>
                {children}
            </Box>
        </Box>
    );
};

export default AdditionalWrapper;
import React from 'react';
import {Box, makeStyles} from "@material-ui/core";

const ContainerCustom = ({children}) => {

    const classes = useStyles()

    return (
        <Box className={classes.root}>
            {children}
        </Box>
    );
};

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        flexDirection: 'column',
        alignItems: 'center',
        padding: "9px 12px 25px 12px",
        display: 'flex',
        background: "#FFFFFF",
        "&>*": {
            margin: "0 12px",
        },
        "&>*:first-child": {
            marginLeft: 0,
        },
        "&>*:last-child": {
            marginRight: 0,
        },
    },
}));

export default ContainerCustom;

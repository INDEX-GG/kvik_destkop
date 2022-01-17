import React from 'react';
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    title: {
        fontSize: '14px',
        marginBottom: '8px',
        color: '#2C2C2C',
        fontWeight: '500'
    }
}));

const NewFilterItem = ({title, type, children}) => {

    const classes = useStyles();

    console.log(type);

    return (
        type === 'check_list'
            ? null : (
            <Box>
                <Box className={classes.title}>{title}</Box>
                {children}
            </Box>
        )
    );
};

export default NewFilterItem;
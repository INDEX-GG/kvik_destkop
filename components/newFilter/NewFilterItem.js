import React from 'react';
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: '14px',
        marginBottom: '8px',
        color: '#2C2C2C',
        fontWeight: '500'
    },
    mobile: {
        [theme.breakpoints.down(960)]: {
            display: 'none'
        }
    }
}));

const NewFilterItem = ({title, type, children}) => {

    const classes = useStyles();


    return (
        type === 'check_list'
            ? null : (
            <Box>
                <Box className={`${classes.title} ${classes.mobile}`}>{title}</Box>
                {children}
            </Box>
        )
    );
};

export default NewFilterItem;
import React from 'react';
import EyeIcon from "../../../../UI/UIicon/EyeIcon";
import {Box} from "@mui/material";
import {makeStyles} from "@material-ui/core";

const ProductView = ({allViewingCount, lastDayViewingCount}) => {

    const classes = useStyles();

    return (
        <Box className={classes.statistics}>
            <Box className={classes.count}>
                {allViewingCount} + {lastDayViewingCount}
            </Box>
            <EyeIcon/>
        </Box>
    );
};

const useStyles = makeStyles(() => ({
    statistics: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '15px',
        zIndex: '1',
    },
    count: {
        marginRight: '4px',
        paddingTop: '3px',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '16px',
        color: '#5A5A5A'
    }
}));

export default React.memo(ProductView);

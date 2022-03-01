import React from 'react';
import PhoneStatisticsIcon from "../../../../UI/UIicon/PhoneStatisticsIcon";
import {Box} from "@mui/material";
import {makeStyles} from "@material-ui/core";

const ProductCall = ({allContactCount, lastDayContactCount, isMyAd}) => {

    const classes = useStyles();

    return (
        isMyAd ? (
            <Box className={classes.statistics}>
                <Box className={classes.count}>
                    {allContactCount} + {lastDayContactCount}
                </Box>
                <PhoneStatisticsIcon/>
            </Box>
        ) : null
    );
};

const useStyles = makeStyles(() => ({
    statistics: {
        display: 'flex',
        alignItems: 'center'
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

export default ProductCall;

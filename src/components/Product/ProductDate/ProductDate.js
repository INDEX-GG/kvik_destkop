import React from 'react';
import {Box} from "@material-ui/core";
import {ToRusDate} from "#lib/services";
import {useProductDateStyles} from "./style";

const ProductDate = ({date, dayBefore, isMyAd}) => {
    const classes = useProductDateStyles()
    const isDayBefore = dayBefore && isMyAd
    return (
        date ? (
            <>
                <Box className={classes.date}>
                    Размещено {ToRusDate(date)}
                </Box>
                {isDayBefore && (
                    <Box className={classes.beforeDay}>
                        Осталось {dayBefore} дней
                    </Box>
                )}
            </>
        ) : <></>
    );
};

export default React.memo(ProductDate);

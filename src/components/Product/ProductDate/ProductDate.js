import React from 'react';
import {Box} from "@material-ui/core";
import clsx from 'clsx'

import {ToRusDate} from "#lib/services";
import {useProductDateStyles} from "./style";

const ProductDate = ({date, dayBefore, isMyAd, status}) => {
    const classes = useProductDateStyles()
    const isDayBefore = dayBefore && isMyAd
    return (
        date ? (
            <>
                <Box className={clsx(
                    classes.date, {
                        [classes.dateOpacity]: status === 'no_active',
                    }
                )}>
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

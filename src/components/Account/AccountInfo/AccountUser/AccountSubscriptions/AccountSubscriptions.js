import React from "react";
import {Box} from "@material-ui/core";
import {useAccountSubscriptionsStyles} from './style';
import {wordAutoEnding} from "../../../../../services/services";
import CustomButtonUI from "../../../../../UI/UIcomponent/CustomButtonUI/CustomButtonUI";

const AccountSubscriptions = ({subscriptionsCount}) => {

    const classes = useAccountSubscriptionsStyles()

    return (
        <CustomButtonUI customRoot={classes.button}>
            <Box className={classes.subscriptions}>
                <Box className={classes.subscriptionsCount}>
                    {subscriptionsCount}
                </Box>
                <Box className={classes.subscriptionsName}>
                    {wordAutoEnding(
                        'Подпис',
                        subscriptionsCount,
                        ['ок', 'ка', 'ки', 'ок'],
                        [0, 1, 2, 5],
                        true
                    )}
                </Box>
            </Box>
        </CustomButtonUI>
    )
}

export default React.memo(AccountSubscriptions);

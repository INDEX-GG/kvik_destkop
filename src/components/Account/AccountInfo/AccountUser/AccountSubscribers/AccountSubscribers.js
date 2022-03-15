import React from "react";
import {Box} from "@material-ui/core";
import {useAccountSubscribersStyles} from './style';
import {wordAutoEnding} from "../../../../../services/services";
import CustomButtonUI from "../../../../../UI/UIcomponent/CustomButtonUI/CustomButtonUI";

const AccountSubscribers = ({subscribersCount = 0}) => {

    const classes = useAccountSubscribersStyles()

    return (
        <CustomButtonUI customRoot={classes.button}>
            <Box className={classes.subscribers}>
                <Box component='span' className={classes.subscribersCount}>
                    {subscribersCount}
                </Box>
                <Box component='span' className={classes.subscribersName}>
                    {wordAutoEnding(
                        'Подписчик',
                        subscribersCount,
                        ['ов', '', 'а', 'ов'],
                        [0, 1, 2, 5],
                        true
                    )}
                </Box>
            </Box>
        </CustomButtonUI>
    )
}

export default React.memo(AccountSubscribers);

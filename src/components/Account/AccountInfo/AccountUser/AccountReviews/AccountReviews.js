import React from "react";
import {Box} from "@material-ui/core";
import {useAccountReviewsStyles} from './style';
import {wordAutoEnding} from "../../../../../services/services";
import CustomTooltipUI from "../../../../../UI/UIcomponent/CustomTooltip/CustomTooltipUI";
import CustomButtonUI from "../../../../../UI/UIcomponent/CustomButtonUI/CustomButtonUI";

const AccountReviews = ({raiting = 0}) => {

    const classes = useAccountReviewsStyles()

    return (
        <CustomButtonUI customRoot={classes.button}>
            <CustomTooltipUI title='В разработке'>

                <Box className={`${classes.reviews} ${classes.disabled}`}>
                    <Box className={classes.reviewsCount}>
                        0
                    </Box>
                    <Box className={classes.reviewsName}>
                        {wordAutoEnding(
                            'Отзыв',
                            raiting,
                            ['ов', '', 'а', 'ов'],
                            [0, 1, 2, 5],
                            true
                        )}
                    </Box>
                </Box>
            </CustomTooltipUI>
        </CustomButtonUI>
    )
}

export default React.memo(AccountReviews);

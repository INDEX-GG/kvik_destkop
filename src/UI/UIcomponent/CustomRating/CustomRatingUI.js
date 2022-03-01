import React from "react";
import {Box} from "@material-ui/core";
import {useCustomRatingUIStyles} from './style';
import {Rating} from "@mui/material";
import {roundingRating} from "../../../services/services";
import RatingActiveStarIcon from "../../UIicon/RatingActiveStarIcon";
import RatingStartIcon from "../../UIicon/RatingStartIcon";

const CustomRatingUI = (
    {
        name = 'half-rating-read',
        readOnly = true,
        viewNumber = true,
        rating,
    }
) => {

    const classes = useCustomRatingUIStyles()
    const numRating = rating ? rating : 0
    const isViewNumber = rating && viewNumber

    return (
        <Box className={classes.ratingContainer}>
            {isViewNumber && (
                <Box className={classes.ratingNumber}>{rating}</Box>
            )}
            <Rating
                name={name}
                value={numRating}
                precision={0.1}
                icon={<RatingActiveStarIcon/>}
                emptyIcon={<RatingStartIcon/>}
                readOnly={readOnly}
            />
        </Box>
    )
}

export default React.memo(CustomRatingUI);

import React from 'react';
import LikeIcon from "../../../../UI/UIicon/LikeIcon";
import {Box} from "@material-ui/core";
import {useProductLikeStyles} from "./style";
import {useProductLike} from "./useProductLike";
import {checkActiveClass} from "../../../../services/services";

const ProductLike = ({productID}) => {

    const classes = useProductLikeStyles();
    const {isLike, handleChangeLike} = useProductLike(productID)
    const classLike = checkActiveClass(
        isLike,
        classes.like,
        [classes.activeLike]
    )

    return (
        productID ?
            <Box className={classes.likeContainer}>
                <Box
                    className={classLike}
                    onClick={handleChangeLike}
                >
                    <LikeIcon/>
                </Box>
            </Box> : <></>
    );
};

export default React.memo(ProductLike);

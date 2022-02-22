import React from "react";
import {Box} from "@material-ui/core";
import {useProductUserBlockStyles} from './style';
import ComplaintIcon from "../../../../UI/UIicon/ComplaintIcon";
import BlockUserIcon from "../../../../UI/UIicon/BlockUserIcon";

const ProductUserBlock = () => {

    const classes = useProductUserBlockStyles()

    return (
        <>
            <Box className={classes.userComplaint}>
                <Box className={classes.userComplaintText}>
                    Заблокировать пользователя
                </Box>
                <Box className={classes.userComplaintIcon}>
                    <BlockUserIcon/>
                </Box>
            </Box>
            <Box className={classes.userComplaint}>
                <Box className={classes.userComplaintText}>
                    Пожаловаться
                </Box>
                <Box className={classes.userComplaintIcon}>
                    <ComplaintIcon/>
                </Box>
            </Box>
        </>
    )
}

export default React.memo(ProductUserBlock);

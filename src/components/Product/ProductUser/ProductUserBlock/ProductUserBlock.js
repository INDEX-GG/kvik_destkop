import React from "react";
import {Box} from "@material-ui/core";
import {useProductUserBlockStyles} from './style';
import ComplaintIcon from "../../../../UI/UIicon/ComplaintIcon";
// import BlockUserIcon from "../../../../UI/UIicon/BlockUserIcon";
import CustomButtonUI from "../../../../UI/UIcomponent/CustomButtonUI/CustomButtonUI";

const ProductUserBlock = () => {

    const classes = useProductUserBlockStyles()

    return (
        <>
            {/* ПОТОМ */}
            {/*<Box className={classes.userComplaint}>*/}
            {/*    <CustomButtonUI>*/}
            {/*        <Box className={classes.userComplaintText}>*/}
            {/*            Заблокировать пользователя*/}
            {/*        </Box>*/}
            {/*        <Box className={classes.userComplaintIcon}>*/}
            {/*            <BlockUserIcon/>*/}
            {/*        </Box>*/}
            {/*    </CustomButtonUI>*/}
            {/*</Box>*/}
            <Box className={classes.userComplaint}>
                <CustomButtonUI>
                    <Box className={classes.userComplaintText}>
                        Пожаловаться
                    </Box>
                    <Box className={classes.userComplaintIcon}>
                        <ComplaintIcon/>
                    </Box>
                </CustomButtonUI>
            </Box>
        </>
    )
}

export default React.memo(ProductUserBlock);

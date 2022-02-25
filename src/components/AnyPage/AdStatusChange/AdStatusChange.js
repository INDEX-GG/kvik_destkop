import React from "react";
import {Box} from "@material-ui/core";
import {useAdStatusChangeStyles} from './style';

const AdStatusChange = () => {

    const classes = useAdStatusChangeStyles()

    return (
        <Box>
            component
        </Box>
    )
}

export default React.memo(AdStatusChange);

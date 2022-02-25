import React from "react";
import {Box} from "@material-ui/core";
import {useAdBigMiniatureStyles} from './style';

const AdBigMiniature = () => {

    const classes = useAdBigMiniatureStyles()

    return (
        <Box>
            component
        </Box>
    )
}

export default React.memo(AdBigMiniature);

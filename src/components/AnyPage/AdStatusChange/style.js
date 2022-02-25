import React from "react";
import {Box} from "@material-ui/core";
import {useStyleStyles} from './style';

const Style = () => {

    const classes = useStyleStyles()

    return (
        <Box>
            component
        </Box>
    )
}

export default React.memo(Style);

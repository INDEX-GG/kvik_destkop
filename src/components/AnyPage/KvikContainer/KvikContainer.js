import React from 'react';
import {Box} from "@material-ui/core";
import {useKvikContainerStyles} from "./style";

const KvikContainer = ({children}) => {

    const styles = useKvikContainerStyles();

    return (
        <Box className={styles.container}>
            {children}
        </Box>
    );
};

export default React.memo(KvikContainer);

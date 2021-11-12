import React from 'react';
import {Box, Skeleton} from "@mui/material";

const ProductActionPlaceHolder = () => {
    return (
        <Box style={{paddingBottom: "10px"}}>
            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "320px", height: "224px"}} />
            </Skeleton>
        </Box>
    );
};

export default ProductActionPlaceHolder;

import React from 'react';
import {Box, Skeleton} from "@mui/material";

const ProductInformationPlaceHolder = () => {
    return (
        <Box style={{paddingBottom: "10px"}}>
            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "620px", height: "182px"}} />
            </Skeleton>
        </Box>
    );
};

export default ProductInformationPlaceHolder;

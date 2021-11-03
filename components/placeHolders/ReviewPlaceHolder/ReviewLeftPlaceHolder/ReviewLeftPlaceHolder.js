import React from 'react';
import {Box, Container} from "@material-ui/core";
import {Grid, Skeleton} from "@mui/material";



const CardBoxItem = () => {
    return (
        <Grid item container xs={12} spacing={1}>
            {/*левый квадрат*/}
            <Grid item xs={12}>
                <Box>
                    <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                        <div style={{width: "888px", height: "112px"}}/>
                    </Skeleton>
                </Box>
            </Grid>
        </Grid>
    )
}

const CardBigBoxItem = () => {
    return (
        <Grid item container xs={12} spacing={1}>
            {/*левый квадрат*/}
            <Grid item xs={12}>
                <Box>
                    <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                        <div style={{width: "888px", height: "183px"}}/>
                    </Skeleton>
                </Box>
            </Grid>
        </Grid>
    )
}


const ReviewLeftPlaceHolder = () => {
    return (

        <Container>
            <Grid container xs={12}  spacing={2}>
                {/*Обьявления*/}
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={12}>
                        <Box>
                            <Skeleton animation="wave" variant="rectangular"
                                      sx={{bgcolor: '#F2F3F4', borderRadius: '15px'}}>
                                <div style={{width: "106px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>

                    <CardBoxItem />
                    <CardBoxItem />
                    <CardBoxItem />
                    <CardBigBoxItem />

                </Grid>

            </Grid>
        </Container>
    );
};

export default ReviewLeftPlaceHolder;

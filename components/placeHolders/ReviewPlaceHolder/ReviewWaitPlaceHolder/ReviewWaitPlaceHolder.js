import React from 'react';
import {Grid, Skeleton} from "@mui/material";
import {Box, Container} from "@material-ui/core";


const CardBoxItem = () => {
    return (
        <Grid item container xs={12} spacing={1}>
            {/*левый квадрат*/}
            <Grid item xs={6}>
                <Box>
                    <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                        <div style={{width: "210px", height: "184px"}}/>
                    </Skeleton>
                </Box>
            </Grid>
            {/*правые полоски*/}
            <Grid item container xs={6} spacing={1}>
                {/*левые 5 палочек*/}
                <Grid item container xs={8} >
                    <Grid item xs={12}>
                        <Box style={{display: "flex", justifyContent: "flex-end"}}>
                            <Skeleton animation="wave" variant="rectangular"
                                      sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                <div style={{width: "110px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box style={{display: "flex", justifyContent: "flex-end"}}>
                            <Skeleton animation="wave" variant="rectangular"
                                      sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                <div style={{width: "110px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <Skeleton animation="wave" variant="rectangular"
                                      sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                <div style={{width: "110px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <Skeleton animation="wave" variant="rectangular"
                                      sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                <div style={{width: "167px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <Skeleton animation="wave" variant="rectangular"
                                      sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                <div style={{width: "167px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                </Grid>
                {/*правый круг*/}
                <Grid item container xs={4}>
                    <Grid item xs={8}>
                        <Box>
                            <Skeleton animation="wave" variant="circular"
                                      sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                <div style={{width: "34px", height: "34px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                    {/*3 прозрачные*/}
                    <Grid item xs={8}>
                        <Box>
                            <Skeleton animation={false} variant="rectangular"
                                      sx={{bgcolor: 'rgba(199,199,199,0)', borderRadius: '15px'}}>
                                <div style={{width: "180px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box>
                            <Skeleton animation={false} variant="rectangular"
                                      sx={{bgcolor: 'rgba(199,199,199,0)', borderRadius: '15px'}}>
                                <div style={{width: "180px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box>
                            <Skeleton animation={false} variant="rectangular"
                                      sx={{bgcolor: 'rgba(199,199,199,0)', borderRadius: '15px'}}>
                                <div style={{width: "180px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const CardBox = () => {
    return (

        <Grid item container xs={12}>
            <Grid item xs={6}>
                <CardBoxItem/>
            </Grid>
            <Grid item xs={6}>
                <CardBoxItem/>
            </Grid>
        </Grid>
    )
}

const ReviewWaitPlaceHolder = () => {
    return (

        <Container>
            <Grid container xs={12}  spacing={2}>
                {/*Обьявления*/}
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={12}>
                        <Box>
                            <Skeleton animation="wave" variant="rectangular"
                                      sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                <div style={{width: "106px", height: "16px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>

                    <CardBox />
                    <CardBox />
                    <CardBox />

                </Grid>

            </Grid>
        </Container>
    );
};

export default ReviewWaitPlaceHolder;

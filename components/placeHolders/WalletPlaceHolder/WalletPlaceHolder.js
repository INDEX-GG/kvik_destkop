import React from 'react';
import {Container, Grid, Skeleton} from "@mui/material";
import {Box} from "@material-ui/core";

const WalletPlaceHolder = () => {
    return (
        <Container>
            <Grid item container xs={10} spacing={2} style={{paddingTop: "15px"}}>
                <Grid item container xs={12} spacing={1}>
                    <Grid item xs={2}>
                        <Box >
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "112px", height: "24px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box >
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "112px", height: "24px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box >
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "112px", height: "24px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                </Grid>
                {/*длинная тонкая полоска*/}
                <Grid item xs={12}>
                    <Box >
                        <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "952px", height: "2px"}} />
                        </Skeleton>
                    </Box>
                </Grid>



                {/*карточка обьявления*/}
                <Grid item container xs={12} spacing={3}>
                    {/*Первая линия верхние три палочки*/}
                    <Grid item container spacing={1} xs={12}>
                        <Grid item xs={12}>
                            <Box style={{display: "flex", justifyContent: "center"}}>
                                <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                    <div style={{width: "58px", height: "24px"}}/>
                                </Skeleton>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box style={{display: "flex", justifyContent: "center"}}>
                                <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                    <div style={{width: "186px", height: "31px"}}/>
                                </Skeleton>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box style={{display: "flex", justifyContent: "center"}}>
                                <Skeleton animation="wave" variant="rectangular" sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                    <div style={{width: "338px", height: "24px"}}/>
                                </Skeleton>
                            </Box>
                        </Grid>
                    </Grid>
                    {/*вотрая линия */}
                    <Grid item container xs={12} spacing={1}>
                        {/*левый маленкьий квадратик*/}
                            <Grid item xs={4}>
                                <Box>
                                    <Skeleton animation="wave" variant="rectangular"
                                              sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                        <div style={{width: "210px", height: "210px"}}/>
                                    </Skeleton>
                                </Box>
                            </Grid>
                        {/*правый большой прямоугольник*/}
                            <Grid item xs={8}>
                                <Box>
                                    <Skeleton animation="wave" variant="rectangular"
                                              sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                        <div style={{width: "585px", height: "210px"}}/>
                                    </Skeleton>
                                </Box>
                            </Grid>
                    </Grid>
                    {/*третья линия длинный прямоугольник*/}
                    <Grid item xs={12}>
                        <Box>
                            <Skeleton animation="wave" variant="rectangular"
                                      sx={{bgcolor: '#C7C7C780', borderRadius: '15px'}}>
                                <div style={{width: "835px", height: "70px"}}/>
                            </Skeleton>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default WalletPlaceHolder;

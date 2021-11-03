import React from 'react';
import {Box, Container} from "@material-ui/core";
import {Grid, Skeleton} from "@mui/material";
import CardOfferPlaceHolder from "../CardOfferPlaceHolder/CardOfferPlaceHolder";


const MenuItem = () => {
    return (
        <Grid item xs={10}>
            <Box style={{paddingLeft: "10px" }} >
                <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                </Skeleton>
            </Box>
        </Grid>
    )
}

const AccountPlaceHolder = () => {
    return (
        <Container>
            <Box>
                <Grid container  spacing={2} >

                    {/*Колонка пользователя*/}
                    <Grid item container xs={2} style={{height: "538px"}} spacing={1}>
                        <Grid item xs={12} >
                            <Box style={{display: "flex", justifyContent: "center"}}>
                                <Skeleton  animation="wave" variant="circular"    sx={{ bgcolor: '#F2F3F4', width: "80px", height: "80px"}}/>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box style={{display: "flex", justifyContent: "center"}}>
                                <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "134px", height: "16px"}} />
                                </Skeleton>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                                </Skeleton>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box style={{display: "flex", justifyContent: "center"}}>
                                <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "144px", height: "16px"}} />
                                </Skeleton>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box >
                                <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "200px", height: "18px"}} />
                                </Skeleton>
                            </Box>
                        </Grid>

                        {/*многопалочек*/}
                        <Grid item container xs={10} spacing={1}>
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                        </Grid>

                    </Grid>

                    {/*Обьявления*/}
                    <Grid item container xs={10} spacing={2}>
                        <Grid item container xs={12} spacing={1}>
                            <Grid item xs={2}>
                                <Box >
                                    <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "112px", height: "24px"}} />
                                    </Skeleton>
                                </Box>
                            </Grid>
                            <Grid item xs={2}>
                                <Box >
                                    <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "112px", height: "24px"}} />
                                    </Skeleton>
                                </Box>
                            </Grid>
                            <Grid item xs={2}>
                                <Box >
                                    <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "112px", height: "24px"}} />
                                    </Skeleton>
                                </Box>
                            </Grid>
                        </Grid>
                        {/*длинная тонкая полоска*/}
                        <Grid item xs={12}>
                            <Box >
                                <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "952px", height: "2px"}} />
                                </Skeleton>
                            </Box>
                        </Grid>
                        {/*короткая полоса над карточками*/}
                        <Grid item xs={12}>
                            <Box >
                                <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "146px", height: "16px"}} />
                                </Skeleton>
                            </Box>
                        </Grid>
                        {/*карточка обьявления*/}
                        <CardOfferPlaceHolder/>
                        <CardOfferPlaceHolder/>
                        <CardOfferPlaceHolder/>

                    </Grid>

                </Grid>
            </Box>
        </Container>
    );
};

export default AccountPlaceHolder;

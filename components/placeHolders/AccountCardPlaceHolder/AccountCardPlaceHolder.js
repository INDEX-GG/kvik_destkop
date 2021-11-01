import React from 'react';
import {Container, Grid, Skeleton} from "@mui/material";
import {Box} from "@material-ui/core";

const AccountCardPlaceHolder = () => {
    return (
        <Container>
            {/*Колонка пользователя*/}
            <Grid item container xs={2}  spacing={1}>
                <Grid item xs={12} >
                    <Box style={{display: "flex", justifyContent: "center"}}>
                        <Skeleton  animation="wave" variant="circular"    sx={{ bgcolor: '#C7C7C780', width: "80px", height: "80px"}}/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box style={{display: "flex", justifyContent: "center"}}>
                        <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "134px", height: "16px"}} />
                        </Skeleton>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                        </Skeleton>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box style={{display: "flex", justifyContent: "center"}}>
                        <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "144px", height: "16px"}} />
                        </Skeleton>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box >
                        <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "200px", height: "18px"}} />
                        </Skeleton>
                    </Box>
                </Grid>

                {/*многопалочек*/}
                <Grid item container xs={10} spacing={1}>
                    <Grid item xs={10}>
                        <Box style={{paddingLeft: "10px" }} >
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box style={{paddingLeft: "10px" }}>
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box style={{paddingLeft: "10px" }}>
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box style={{paddingLeft: "10px" }}>
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box style={{paddingLeft: "10px" }}>
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box style={{paddingLeft: "10px" }}>
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box style={{paddingLeft: "10px" }}>
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box style={{paddingLeft: "10px" }}>
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box style={{paddingLeft: "10px" }}>
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AccountCardPlaceHolder;

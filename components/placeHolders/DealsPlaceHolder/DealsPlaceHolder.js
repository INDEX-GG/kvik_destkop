import React from 'react';
import {Box} from "@material-ui/core";
import {Container, Grid, Skeleton} from "@mui/material";
import CardOfferPlaceHolder from "../CardOfferPlaceHolder/CardOfferPlaceHolder";

const DealsPlaceHolder = () => {
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
                {/*короткая полоса над карточками*/}
                <Grid item xs={12}>
                    <Box >
                        <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "146px", height: "16px"}} />
                        </Skeleton>
                    </Box>
                </Grid>
                {/*карточка обьявления*/}
                <CardOfferPlaceHolder/>
                <CardOfferPlaceHolder/>
                <CardOfferPlaceHolder/>
            </Grid>
        </Container>
    );
};

export default DealsPlaceHolder;

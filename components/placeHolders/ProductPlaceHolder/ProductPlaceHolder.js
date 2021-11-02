import React from 'react';
import {Grid, Skeleton} from "@mui/material";
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    skeletonMain: {
        display: "flex",
        gap: '10px',
        flexDirection: "column"
    },
    skeletonTitle: {
        display: "flex",
        gap: '20px',
        flexDirection: "column"
    },
    skeletonRow: {
        display: "flex",
        flexDirection: "row",
        gap: '10px',
    },
    skeletonOffer: {
        display: "flex",
        flexDirection: "column",
        gap: '10px',
    },
    skeletonActions: {
        display: "flex",
        flexDirection: "column",
        gap: '10px',
    }
}))

const ProductPlaceHolder = () => {
    const classes = useStyles()
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6} md={8}>
                    <Box className={classes.skeletonTitle}>
                        <Box>
                            <Skeleton animation="wave" variant="rectangular" width="100%" sx={{ bgcolor: '#C7C7C780', borderRadius: '15px' }}/>
                        </Box>
                        <Box>
                            <Skeleton animation="wave" variant="rectangular" width="40%" sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Box></Box>
                    <Box></Box>
                </Grid>
                <Grid item xs={6}>
                    <Box className={classes.skeletonOffer}>
                        <Box>
                            <Skeleton  animation="wave" variant="rectangular"  width="100%" height="50%" sx={{ bgcolor: '#C7C7C780' , borderRadius: '15px'  }}><div style={{ paddingTop: '57%'}} />
                            </Skeleton>
                        </Box>
                        <Box>
                            <Skeleton  animation="wave" variant="rectangular"  width="100%"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}/>
                        </Box>
                        <Box>
                            <Skeleton  animation="wave" variant="rectangular"  width="100%"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ paddingTop: '20%'}} />
                            </Skeleton>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}  >
                    <Box className={classes.skeletonActions}>
                        <Box>
                            <Skeleton  animation="wave" variant="rectangular"  width="50%"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ paddingTop: '60%'}} />
                            </Skeleton>
                        </Box>
                        <Box>
                            <Skeleton  animation="wave" variant="rectangular"  width="50%"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ paddingTop: '20%'}} />
                            </Skeleton>
                        </Box>
                        <Box>
                            <Skeleton  animation="wave" variant="rectangular"  width="50%"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ paddingTop: '8%'}} />
                            </Skeleton>
                        </Box>
                    </Box>
                    <Grid container style={{paddingTop: "30px"}} spacing={1}>
                        {/*круг*/}
                        <Grid item xs={1} >
                            <Box>
                                <Skeleton variant="circular" animation="wave" width={50} height={50} />
                            </Box>
                        </Grid>
                        {/*прямоугольник*/}
                        <Grid item xs={8} >
                            <Box style={{ paddingLeft: "15px"}}>
                                <Skeleton  animation="wave" variant="rectangular"  width="57%"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ paddingTop: '20%'}} />
                                </Skeleton>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container style={{paddingTop: "10px"}} direction="row" spacing={1}>
                        <Grid item  xs={6} md={2}>
                            <Box>
                                <Skeleton  animation="wave" variant="rectangular"  width="90%"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ paddingTop: '100%'}} />
                                </Skeleton>
                            </Box>
                        </Grid>
                        <Grid item  xs={6} md={2}>
                            <Box>
                                <Skeleton  animation="wave" variant="rectangular"  width="90%"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ paddingTop: '100%'}} />
                                </Skeleton>
                            </Box>
                        </Grid>
                        <Grid item  xs={6} md={2}>
                            <Box>
                                <Skeleton  animation="wave" variant="rectangular"  width="90%"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ paddingTop: '100%'}} />
                                </Skeleton>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductPlaceHolder;

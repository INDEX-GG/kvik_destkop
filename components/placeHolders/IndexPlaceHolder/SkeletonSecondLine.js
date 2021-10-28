import React from 'react';
import {Grid, Skeleton} from "@mui/material";
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    secondLineEnd: {
        display: "flex", justifyContent: "flex-end"
    },
    linerPadding: {
        paddingLeft: "11px"
    }
}));

const SkeletonSecondLine = () => {

    const classes = useStyles();
    return (
        <Grid container md={5} spacing={1} >
            <Grid item xs={12}>
                <Box>
                    <Skeleton  animation="wave" variant="rectangular"    sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "480px", height: "263px"}} />
                    </Skeleton>
                </Box>
            </Grid>
            <Grid item container xs={12} direction="row">
                <Grid item container spacing={2} xs={6}>
                    <Grid item xs={12}>
                        <Box className={classes.linerPadding}>
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "200px", height: "19.56px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.linerPadding}>
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "296px", height: "16px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.linerPadding}>
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px'  }}><div style={{ width: "131px", height: "16px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container  alignItems="flex-end"  spacing={2} xs={6}>
                    <Grid item xs={10}>
                        <Box className={classes.secondLineEnd}>
                            <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#C7C7C780', borderRadius: '15px' }}><div style={{ width: "131px", height: "16px"}} />
                            </Skeleton>
                        </Box>
                    </Grid>
                </Grid>

            </Grid>

        </Grid>
    )
}

export default SkeletonSecondLine;

import React from 'react';
import {Grid, Skeleton} from "@mui/material";
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    linerPadding: {
        paddingLeft: "11px"
    }
}));

const SkeletonFirstLine = () => {

    const classes = useStyles();
    return (
        <Grid item container spacing={1} >
            <Grid item xs={12}>
                <Box>
                    <Skeleton  animation="wave" variant="rectangular"  width="86%"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "224px", height: "260px"}} />
                    </Skeleton>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Box className={classes.linerPadding}>
                    <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "148px", height: "19.56px"}} />
                    </Skeleton>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Box className={classes.linerPadding}>
                    <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "148px", height: "16px"}} />
                    </Skeleton>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Box className={classes.linerPadding}>
                    <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ width: "148px", height: "16px"}} />
                    </Skeleton>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SkeletonFirstLine;

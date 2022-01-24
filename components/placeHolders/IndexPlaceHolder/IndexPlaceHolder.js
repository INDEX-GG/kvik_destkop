import React from 'react';
import {Grid, Skeleton} from "@mui/material";
import {Box, makeStyles} from "@material-ui/core";
import SkeletonFirstLine from "./SkeletonFirstLine";
import SkeletonSecondLine from "./SkeletonSecondLine";

import {useMedia} from "../../../hooks/useMedia";
import IndexMobilePlaceHolder from './IndexMobilePlaceHolder';

const useStyles = makeStyles(() => ({
    skeletonSearch: {
        display: "flex",
        gap: '10px',
        flexDirection: "column"
    }
}));

const IndexPlaceHolder = () => {
    const classes = useStyles();
    const {matchesMobile, matchesTablet} = useMedia();

    return (
        <>
            {!matchesMobile
            ? (
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ md: 6 }}>

                    <Grid item xs={6} md={12}>
                        <Box className={classes.skeletonSearch}>
                            <Box>
                                <Skeleton animation="wave" variant="rectangular" width="15%" sx={{ bgcolor: '#F2F3F4', borderRadius: '15px' }}/>
                            </Box>
                            <Box>
                                <Skeleton  animation="wave" variant="rectangular"  sx={{ bgcolor: '#F2F3F4' , borderRadius: '15px'  }}><div style={{ width: "1248px", height: "182px" }} />
                                </Skeleton>
                            </Box>
                        </Box>
                    </Grid>

                    {/*первая линия обьявлений*/}
                    <Grid item md={12}>
                        <Grid item xs={8}>
                            <Box>
                                <Skeleton  animation="wave" variant="rectangular"  width="15%"  sx={{ bgcolor: '#F2F3F4', borderRadius: '15px'  }}><div style={{ paddingTop: '13%'}} />
                                </Skeleton>
                            </Box>
                        </Grid>
                        <Grid item container md={12} style={{paddingTop: "10px"}}  direction="row">
                            <SkeletonFirstLine/>
                            <SkeletonFirstLine/>
                            <SkeletonFirstLine/>
                            <SkeletonFirstLine/>
                        </Grid>
                    </Grid>

                    {/*вторая линия обьявлений*/}
                    <Grid item md={12}>
                        <Grid item container md={12} style={{paddingTop: "10px"}}  direction="row">
                            <SkeletonSecondLine/>
                            <SkeletonFirstLine/>
                            <SkeletonFirstLine/>
                        </Grid>
                    </Grid>

                    {/*третья линия обьявлений*/}
                    <Grid item md={12}>
                        <Grid item container md={12} style={{paddingTop: "10px"}}  direction="row">
                            <SkeletonFirstLine/>
                            <SkeletonFirstLine/>
                            <SkeletonFirstLine/>
                            <SkeletonFirstLine/>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>
            ) : (
                <IndexMobilePlaceHolder />
            )}
        </>
    );
};

export default IndexPlaceHolder;

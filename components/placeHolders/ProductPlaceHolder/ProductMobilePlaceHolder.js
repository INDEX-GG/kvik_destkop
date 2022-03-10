import React from 'react';
import clsx from "clsx";

import {Grid, Skeleton } from "@mui/material";
import {Box, makeStyles, Divider} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  skeletonContainer: {
    width: '100%',
    height: '100%'
  },
  divider: {
    width: '100%',
    backgroundColor: '#F2F3F4',
    borderRadius:  '15px',
  },
  skeletonBase: {
    backgroundColor: '#F2F3F4'
  },
  skeletonBorderR3: {
    borderRadius: '3px'
  },
  skeletonBorderR5: {
    borderRadius: '5px'
  },
  skeletonBorderR8: {
    borderRadius: '8px'
  },
  skeletonBorderR15: {
    borderRadius: '15px'
  },
  skeletonRow: {
    flexDirection: 'row'
  },
  skeletonColumn: {
    flexDirection: 'column'
  },
  skeletonCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

const ProductMobilePlaceHolder = () => {

  const classes = useStyles()

  return (
      <Box className={classes.skeletonContainer}>
        <Grid container rowSpacing={1}>
          <Grid
            container
            className={clsx(classes.skeletonCenter)}
            sx={{padding: '7px 10px'}}
          >
            <Skeleton className={classes.skeletonBase} animation="wave" variant="rectangular" width="100%" height="272px" sx={{borderRadius: '8px 8px 0px 0px'}} />
          </Grid>

          <Grid
            container
            alignItems='flex-start'
            justifyContent='center'
            className={clsx(classes.skeletonColumn)}
            sx={{margin: '18px 9px', gap: '7px'}}
          >
            <Skeleton animation="wave" variant="rectangular" width="143px" height="23px" className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}/>
            <Skeleton animation="wave" variant="rectangular" width="232px" height="23px" className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}/>
          </Grid>

          <Grid item xs={12} md={10} spacing={2}>
            <Box sx={{height: '40%'}}>
                <Skeleton animation="wave" variant="rectangular" width="100%" height="32px" className={classes.skeletonBase}/>
            </Box>
          </Grid>

          <Grid item xs={12} md={10} spacing={2}>
            <Box sx={{height: '40%'}}>
                <Skeleton animation="wave" variant="rectangular" width="100%" height="32px" className={classes.skeletonBase}/>
            </Box>
          </Grid>

          <Grid item xs={12} md={10} spacing={4} sx={{marginLeft: 2, marginBottom: '5px', marginTop: '15px'}}>
            <Box sx={{height: '40%'}}>
                <Skeleton animation="wave" variant="rectangular" width="180px" height="57px" className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}/>
            </Box>
          </Grid>

          <Grid item xs={12} md={12} spacing={4} sx={{marginLeft: 2, marginBottom: '7px'}}>
            <Skeleton animation="wave" variant="rectangular" width="100px" height="23px"className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}/>
          </Grid>

          <Divider className={classes.divider} />

          <Grid
            container
            className={clsx(classes.skeletonCenter)}
            sx={{marginTop: '7px'}}
          >
            <Skeleton animation="wave" variant="rectangular" width="324px" height="57px" className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}/>
          </Grid>

          <Grid
            container
            className={clsx(classes.skeletonCenter)}
          >
            <Skeleton animation="wave" variant="rectangular" width="159px" height="20px" className={clsx(classes.skeletonBase, classes.skeletonBorderR5)} sx={{ marginTop: '3px'}}/>
          </Grid>

          <Grid
            container
            alignItems='center'
            justifyContent='flex-start'
          >
                <Skeleton animation="wave" variant="rectangular" width="116px" height="24px" className={clsx(classes.skeletonBase, classes.skeletonBorderR5)} sx={{margin: '8px 18px 3px' }}/>
          </Grid>

          <Divider className={classes.divider} />

          <Grid sx={{width: '100%', padding: '10px 5px'}}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{width: '100%', padding: '0px 18px'}}
            >
              {[1,2].map((_, i) => (
              <Grid
                key={i}
                container
                className={clsx(classes.skeletonCenter, classes.skeletonColumn)}
                sx={{width: 'auto'}}
              >
                  {[1,2,3].map((_, i) => (
                    <Skeleton key={i} sx={{marginTop: 2}} animation="wave" variant="rectangular" width="153px" height="24px" className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}/>
                  ))}
              </Grid>
              ))}
            </Grid>

            <Grid
              container
              className={clsx(classes.skeletonCenter, classes.skeletonColumn)}
              sx={{marginTop: '21px'}}
            >
              <Skeleton sx={{marginTop: '21px'}} animation="wave" variant="rectangular" width="158px" height="24px" className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}/>
              <Grid
                container
                direction="row"
                className={clsx(classes.skeletonCenter)}
                sx={{width: '100%', margin: '6px 0px', gap: '25px'}}
              >
                {/* // eslint-disable-next-line */}
                {[1,2,3].map((_, i) => (
                  <Skeleton key={i} variant="circular" animation="wave" width={24} height={24} className={classes.skeletonBase} />
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Divider className={classes.divider} />

          <Grid item xs={12} md={10} spacing={6} sx={{padding: '10px'}}>
            <Grid
              item
              xs={1}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{width: '100%', height: '72px', maxWidth: 'none', padding: '0px 5px'}}
            >
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{gap: '11px', width: 'auto'}}
              >
                <Box>
                    <Skeleton variant="circular" animation="wave" width={50} height={50} className={clsx(classes.skeletonBase, classes.skeletonBorderR5)} />
                </Box>

                <Grid
                  container

                  className={clsx(classes.skeletonColumn)}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{width: 'auto', gap: '2px'}}
                >
                  <Box sx={{marginLeft: '5px'}}>
                    <Skeleton variant="rectangular" animation="wave" width={144} height={24} className={clsx(classes.skeletonBase, classes.skeletonBorderR5)} />
                  </Box>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{width: '145px', gap: '2px'}}
                  >
                    {/* // eslint-disable-next-line */}
                    {[1,2,3,4,5,6].map((_, i) => (
                      <Skeleton key={i} variant="rectangular" animation="wave" width={20} height={24} className={clsx(classes.skeletonBase, classes.skeletonBorderR5)} />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                  container
                  className={clsx(classes.skeletonColumn)}
                  justifyContent="center"
                  alignItems="flex-end"
                  sx={{width: 'auto', gap: '2px'}}
              >
                  <Skeleton variant="rectangular" animation="wave" width={27} height={24} className={clsx(classes.skeletonBase, classes.skeletonBorderR5)} />
                  <Skeleton variant="rectangular" animation="wave" width={86} height={15} className={clsx(classes.skeletonBase, classes.skeletonBorderR3)} />
              </Grid>
            </Grid>
          </Grid>

          <Divider className={classes.divider} />

          <Grid
            container
            justifyContent='flex-end'
            sx={{marginLeft: '18px', padding: '10px'}}
          >
            <Skeleton animation="wave" variant="rectangular" width="112px" height="18px" className={clsx(classes.skeletonBase, classes.skeletonBorderR3)}/>
          </Grid>

          <Grid item xs={123} md={10} spacing={2} sx={{ marginLeft: '18px'}}>
            <Box sx={{height: '40%'}}>
                <Box>
                    <Skeleton animation="wave" variant="rectangular" width="232px" height="23px" className={clsx(classes.skeletonBase, classes.skeletonBorderR5)} />
                </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{padding: '10px'}}>
              {[0, 1].map((_, i) => (
                <Skeleton key={i} animation="wave" variant="rectangular" width="48%" height="240px" className={clsx(classes.skeletonBase, classes.skeletonBorderR8)}/>
              ))}
            </Grid>
          </Grid>

        </Grid>
      </Box>
  );
};

export default ProductMobilePlaceHolder;

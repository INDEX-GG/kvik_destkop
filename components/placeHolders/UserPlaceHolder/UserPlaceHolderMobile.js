import React from 'react'
import clsx from "clsx";
import {Grid, Skeleton} from "@mui/material";
import { Box, makeStyles, Divider } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  divider: {
    width: '100%',
    backgroundColor: '#F2F3F4',
    borderRadius:  '15px',
  },
  skeletonSearch: {
    display: "flex",
    gap: '10px',
    flexDirection: "column"
  },
  skeletonBase: {
    backgroundColor: "#F2F3F4",
    borderRadius: '5px'
  },
  skeletonCircle: {
    borderRadius: '50%'
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
}))

const UserPlaceHolderMobile = () => {
  const classes = useStyles();

  return (
    <Box sx={{ width: '100%' }}>
    <Grid container rowSpacing={1} columnSpacing={{ md: 6 }} sx={{padding: '0 10px'}}>
        {/* первая линия */}
        <Grid item sx={{width: '100%', marginTop: '12px'}}>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            sx={{gap: '10px'}}
          >
            {/* круг */}
            <Skeleton variant="circular" animation="wave" width={80} height={80} className={clsx(classes.skeletonBase, classes.skeletonCircle)} />
            <Grid
              container
              flexDirection='column'
              alignItems="center"
              justifyContent='center'
              sx={{gap: '10px'}}
            >
              {/* 2 линия три в столбик */}
              <Skeleton className={classes.skeletonBase} animation="wave" variant="rectangular" width="52px" height="14px" />
              <Skeleton className={classes.skeletonBase} animation="wave" variant="rectangular" width="112px" height="15px" />
              <Skeleton className={classes.skeletonBase} animation="wave" variant="rectangular" width="148px" height="18px" />

              <Grid
                container
                flexDirection='row'
                justifyContent='center'
                sx={{gap: '10px', marginTop: '10px'}}
              >
                {/* 4 линия три в строку */}
                <Skeleton className={classes.skeletonBase} animation="wave" variant="rectangular" width="59px" height="29px" />
                <Skeleton className={classes.skeletonBase} animation="wave" variant="rectangular" width="59px" height="29px" />
                <Skeleton className={classes.skeletonBase} animation="wave" variant="rectangular" width="59px" height="29px" />
              </Grid>

              {/* 5 линия 1 в строку */}
              <Skeleton className={classes.skeletonBase} animation="wave" variant="rectangular" width="147px" height="26px" />

              <Grid
                container
                flexDirection='row'
                justifyContent='center'
                sx={{gap: '120px'}}
              >
                {/* 6 линия 2 в строку */}
                <Skeleton className={classes.skeletonBase} animation="wave" variant="rectangular" width="71px" height="18px" />
                <Skeleton className={classes.skeletonBase} animation="wave" variant="rectangular" width="71px" height="18px" />
              </Grid>

              <Divider className={classes.divider} />

              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{padding: '10px 10px 20px', gap: '10px'}}
              >
                {/* 7 линия 2 обьявления сеткой 2x2 */}
                {[0, 1, 3, 4].map((_, i) => (
                  <Skeleton key={i} animation="wave" variant="rectangular" width="48%" height="240px" className={clsx(classes.skeletonBase, classes.skeletonBorderR8)}/>
                ))}
              </Grid>

            </Grid>
          </Grid>
      </Grid>
    </Grid>
</Box>
  )
}

export default UserPlaceHolderMobile

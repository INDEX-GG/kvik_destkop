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
            <Skeleton variant="circular" animation="wave" width={80} height={80} className={classes.skeletonBase} />
            <Grid
              container
              flexDirection='column'
              alignItems="center"
              justifyContent='center'
              sx={{gap: '10px'}}
            >
              <Skeleton animation="wave" variant="rectangular" width="52px" height="14px" sx={{ borderRadius: '5px'  }} />
              <Skeleton animation="wave" variant="rectangular" width="112px" height="15px" sx={{ borderRadius: '5px'  }} />
              <Skeleton animation="wave" variant="rectangular" width="148px" height="18px" sx={{ borderRadius: '5px'  }} />

              <Grid
                container
                flexDirection='row'
                justifyContent='center'
                sx={{gap: '10px'}}
              >
                <Skeleton animation="wave" variant="rectangular" width="59px" height="29px" sx={{ borderRadius: '5px'  }} />
                <Skeleton animation="wave" variant="rectangular" width="59px" height="29px" sx={{ borderRadius: '5px'  }} />
                <Skeleton animation="wave" variant="rectangular" width="59px" height="29px" sx={{ borderRadius: '5px'  }} />
              </Grid>

              <Skeleton animation="wave" variant="rectangular" width="147px" height="26px" sx={{ borderRadius: '5px'  }} />

              <Grid
                container
                flexDirection='row'
                justifyContent='center'
                sx={{gap: '10px'}}
              >
                <Skeleton animation="wave" variant="rectangular" width="71px" height="18px" sx={{ borderRadius: '5px'  }} />
                <Skeleton animation="wave" variant="rectangular" width="71px" height="18px" sx={{ borderRadius: '5px'  }} />
              </Grid>

              <Divider className={classes.divider} />

              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{padding: '10px', gap: '10px'}}
              >
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

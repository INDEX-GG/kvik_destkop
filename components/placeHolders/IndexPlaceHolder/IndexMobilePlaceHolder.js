import React from 'react'

import {Grid, Skeleton} from "@mui/material";
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  skeletonSearch: {
    display: "flex",
    gap: '10px',
    flexDirection: "column"
  },
  skeletonBase: {
    backgroundColor: "#F2F3F4",
  }
}))

const IndexMobilePlaceHolder = () => {
  const classes = useStyles();

  return (
    <Box sx={{ width: '100%' }}>
    <Grid container rowSpacing={1} columnSpacing={{ md: 6 }} sx={{padding: '0 10px'}}>

        {/* первая линия */}
        <Grid item sx={{width: '100%', marginTop: '12px'}}>
            <Box
              className={classes.skeletonSearch}
            >
                <Box>
                    <Skeleton className={classes.skeletonBase} animation="wave" variant="rectangular" width="auto" height="71px" sx={{ borderRadius: '8px', margin: 'auto' }}/>
                </Box>
                <Grid
                  container
                  flexDirection='row'
                  justifyContent='space-between'

                >
                    <Skeleton animation="wave" variant="rectangular" width="101px" height="20px" sx={{ borderRadius: '5px'  }} />
                    <Skeleton animation="wave" variant="rectangular" width="64px" height="20px" sx={{ borderRadius: '5px'  }} />
                </Grid>
            </Box>
        </Grid>

        {/* таблички обьявлений */}
        <Grid item sx={{width: '100%', height: '100%', marginTop: '20px'}}>
          <Grid
            container
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {[1,2,3,4].map((_, i) => (
              <Skeleton key={i} animation="wave" variant="rectangular" width="48%" height="240px" sx={{ borderRadius: '8px', marginBottom: '12px' }} />
            ))}
          </Grid>
        </Grid>


    </Grid>
</Box>
  )
}

export default IndexMobilePlaceHolder;

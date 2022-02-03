import React from 'react'
import clsx from 'clsx'
import { Grid, Skeleton } from '@mui/material'
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
  offerItemsContent: {
    width: '100%',
    gap: '15px'
  },
  offerItemsWrapper: {
    width: '335px',
    height: '368px',
    background: '#FFFFFF',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '9px',
  },
  offerItemCardsWrapper: {
    padding:'0px 10px',
  },
  offerItemRow: {
    marginTop: '8px',
    gap: '5px'
  },
  offerItemRowBlock: {
    gap: '5px'
  },
  aWidth: {
    width: 'auto'
  }
}))

const OfferItem = () => {
  const classes = useStyles()

  return (
    <Box
      className={classes.offerItemsWrapper}
    >
      <Grid
        container
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={335}
          height={184}
          className={clsx(classes.skeletonBase, classes.skeletonBorderR8)}
        />
        <Grid
          container
          flexDirection="row"
          className={classes.offerItemCardsWrapper}
        >
          {/* 1 строка */}
          <Grid
            container
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            className={classes.offerItemRow}
          >
            <Skeleton
              variant="circle"
              animation="wave"
              width={24}
              height={24}
              className={clsx(classes.skeletonBase, classes.skeletonCircle)}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={107}
              height={20}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}
            />
          </Grid>

          {/* 2 строка */}
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            className={classes.offerItemRow}
          >
            <Grid
              container
              flexDirection="row"
              alignItems="center"
              className={clsx(classes.aWidth, classes.offerItemRowBlock)}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={20}
                height={18}
                className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={107}
                height={18}
                className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}
              />
            </Grid>

            <Grid
              container
              flexDirection="row"
              alignItems="center"
              className={clsx(classes.aWidth, classes.offerItemRowBlock)}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={73}
                height={18}
                className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={28}
                height={23}
                className={clsx(classes.skeletonBase, classes.skeletonBorderR8)}
              />
            </Grid>
          </Grid>

          <Divider className={classes.divider} />

          {/* 3 строка */}
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            className={classes.offerItemRow}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={118}
              height={18}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}
            />
          </Grid>

          {/* 4 строка */}
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            className={classes.offerItemRow}

          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={154}
              height={18}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}
            />
          </Grid>

          {/* 5 строка */}
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            className={classes.offerItemRow}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={93}
              height={18}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}
            />
          </Grid>

          {/* 6 строка */}
          <Grid
            container
            flexDirection="row"
            justifyContent="center"
            className={classes.offerItemRow}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={204}
              height={22}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR8)}
            />
          </Grid>

        </Grid>
      </Grid>
    </Box>
  )
}

const FavoritesOffersPlaceHolderMobile = () => {
  const classes = useStyles()

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        flexDirection="column"
        alignItems="center"
      >

        {/* первая линия */}
        <Grid
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          {[1, 2, 3].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              animation="wave"
              width={106}
              height={20}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR5)}
            />
          ) )}
        </Grid>

        {/* вторая линия */}
        <Divider className={classes.divider} style={{margin: '3px 0px 15px'}} />

        {/* плейсхолдеры чата */}
        <Grid
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          className={classes.offerItemsContent}
        >
          {[1,2,3].map((_, i) => (
            <OfferItem key={i} />
          ))}
        </Grid>

      </Grid>
    </Box>
  )
}

export default FavoritesOffersPlaceHolderMobile

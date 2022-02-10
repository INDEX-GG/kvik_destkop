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
}))

const DialogItem = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      flexDirection="row"
      alignItems="center"
      justifyContent="space-evenly"
      sx={{width: '100%', gap: '3px'}}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={114}
        height={85}
        className={clsx(classes.skeletonBase, classes.skeletonBorderR8)}
      />

      {/* блок справа */}
      <Grid
        container
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{width: 'auto', gap: '3px'}}
      >
        {/* 1 строка справа */}
        <Grid
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          sx={{width: '100%', gap: '3px'}}
        >
          <Skeleton variant="circular" animation="wave" width={25} height={25} className={clsx(classes.skeletonBase, classes.skeletonCircle)} />
          <Grid
            container
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{width: 'auto', gap: '85px'}}
          >
            <Skeleton variant="rectangular" animation="wave" width={63} height={16} className={clsx(classes.skeletonBase, classes.skeletonBorderR3)} />
            <Skeleton variant="rectangular" animation="wave" width={36} height={16} className={clsx(classes.skeletonBase, classes.skeletonBorderR3)} />
          </Grid>
        </Grid>

        {/* 2 строка справа */}
        <Grid
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          sx={{width: 'auto'}}
        >
          <Skeleton variant="rectangular" animation="wave" width={91} height={16} className={clsx(classes.skeletonBase, classes.skeletonBorderR3)} />
        </Grid>

        {/* 3 строка справа */}
        <Grid
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          sx={{width: 'auto'}}
        >
          <Skeleton variant="rectangular" animation="wave" width={136} height={16} className={clsx(classes.skeletonBase, classes.skeletonBorderR3)} />
        </Grid>

        {/* 4 строка справа */}
        <Grid
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          sx={{width: 'auto'}}
        >
          <Skeleton variant="rectangular" animation="wave" width={206} height={16} className={clsx(classes.skeletonBase, classes.skeletonBorderR3)} />
        </Grid>
      </Grid>

      <Divider className={classes.divider} style={{margin: '8px 0'}} />

    </Grid>
  )
}

const AccountChatPlaceHolderMobile = () => {
  const classes = useStyles()

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ md: 6 }}
        sx={{ padding: '0 10px' }}
      >
        <Grid item sx={{ width: '100%' }}>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            sx={{ gap: '10px' }}
          >

            {/* первая линия */}
            <Grid
              container
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              sx={{ gap: '100px' }}
            >
              {[1, 2].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  animation="wave"
                  width={76}
                  height={16}
                  className={clsx(classes.skeletonBase, classes.skeletonBorderR3)}
                />
              ) )}
            </Grid>

            {/* вторая линия */}
            <Divider className={classes.divider} />

            {/* плейсхолдеры чата */}
            <Grid
              container
              flexDirection="column"
              alignItems="center"
              sx={{ gap: '10px' }}
            >
              {[1,2,3,4,5,6,7,8].map((_, i) => (
                <DialogItem key={i} />
              ))}
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AccountChatPlaceHolderMobile

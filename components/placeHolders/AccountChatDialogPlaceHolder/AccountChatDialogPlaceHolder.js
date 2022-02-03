import React from 'react'
import clsx from 'clsx'
import { Grid, Skeleton } from '@mui/material'
import { Box, makeStyles } from '@material-ui/core'

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
  skeletonBorderR8880: {
    borderRadius: '8px 8px 8px 0'
  },
  skeletonBorderR8808: {
    borderRadius: '8px 8px 0 8px'
  }
}))

const AccountChatDialogPlaceHolder = () => {
  const classes = useStyles()

  return (
    <Box style={{ width: '100%', height: '100%', padding: '0px 15px' }}>
      <Grid
        container
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%', height: '100%' }}
      >
        {/* шапка профиля */}
        <Grid
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
          sx={{ gap: '10px' }}
        >
          {/* 1 блок */}
          <Grid
            container
            sx={{width: 'auto'}}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={88}
              height={88}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR3)}
            />
          </Grid>

          {/* 2 блок */}
          <Grid
            container
            flexDirection="column"
            alignItems="flex-start"
            sx={{gap: '5px', width: 'auto', alignSelf: 'flex-end'}}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={39}
              height={16}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR3)}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={91}
              height={16}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR3)}
            />
          </Grid>

          {/* 3 блок */}
          <Grid
            container
            flexDirection="column"
            alignItems="flex-end"
            sx={{gap: '5px', width: 'auto', alignSelf: 'flex-start'}}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={108}
              height={16}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR3)}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={82}
              height={16}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR3)}
            />
          </Grid>

          {/* 4 блок */}
          <Grid
            container
            sx={{width: 'auto', alignSelf: 'flex-start'}}
          >
            <Skeleton
              variant="circular"
              animation="wave"
              width={32}
              height={32}
              className={clsx(classes.skeletonBase, classes.skeletonCircle)}
            />
          </Grid>
        </Grid>

        {/* средний маленкий блок */}
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={47}
          height={16}
          className={clsx(classes.skeletonBase, classes.skeletonBorderR3)}
        />

        {/* сообщения */}
        <Grid
          container
          flexDirection="column"
          alignItems="flex-start"
          sx={{gap: '14px'}}
        >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={280}
              height={62}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR8808)}
              sx={{alignSelf: 'flex-end'}}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={288}
              height={62}
              className={clsx(classes.skeletonBase, classes.skeletonBorderR8880)}
            />
        </Grid>

      </Grid>
    </Box>
  )
}

export default AccountChatDialogPlaceHolder

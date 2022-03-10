import React from 'react'
import {Box, Typography} from "@material-ui/core";

import {useProductNoActiveStyles} from './style'

const ProductNoActive = () => {
  const classes = useProductNoActiveStyles()

  return (
    <Box className={classes.noActiveBlock}>
      <Typography className={classes.labelBlock}>Объявление снято с публикации</Typography>
    </Box>
  )
}

export default React.memo(ProductNoActive)

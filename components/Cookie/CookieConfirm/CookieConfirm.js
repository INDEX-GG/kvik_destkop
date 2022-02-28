import React from 'react'
import { Box, Button, Typography } from '@material-ui/core';

import {CookieConfirmStyles} from './styles'

const CookieConfirm = ({handlerConfirm}) => {
  const styles = CookieConfirmStyles()

  return (
    <Box
      className={styles.root}
    >
      <Box
        className={styles.content}
      >
        <Typography
          className={styles.text}
          noWrap={true}
        >
          Мы используем cookie. Продолжая пользоваться сайтом, вы <Box component='span' className={styles.text__addiitional}>соглашаетесь с использованием файлов cookie</Box>
        </Typography>
        <Button
          variant="contained"
          className={styles.button}
          onClick={handlerConfirm}
        >
          Принять
        </Button>
      </Box>
    </Box>
  )
}

export default React.memo(CookieConfirm)

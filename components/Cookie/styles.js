import {makeStyles} from '@material-ui/core'

export const CookieStyles = () => {
  const useStyles = makeStyles(() => ({
    popper: {
      top: '-10px !important',
    }
  }))

  return useStyles()
}

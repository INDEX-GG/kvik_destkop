import {makeStyles} from '@material-ui/core'

export const CookieStyles = () => {
  const useStyles = makeStyles(() => ({
    popper: {
      position: 'fixed',
      bottom: '10px',
      left: '50%',
      width: '1256px',
      maxWidth: '85vw',
      transform: 'translateX(-50%)'
    }
  }))

  return useStyles()
}

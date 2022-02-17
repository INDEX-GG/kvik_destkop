import {makeStyles} from '@material-ui/core'

export const CookieConfirmStyles = () => {
  const useStyles = makeStyles(() => ({
    root: {
      height: '77px',
      left: '0px',
      top: '0px',
      background: '#52B9C5',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'center',
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '66px',
    },
    text: {
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '16px',
      color: '#fff'
    },
    button: {
      backgroundColor: '#fff',
      borderRadius: '3px',
    }
  }))

  return useStyles()
}

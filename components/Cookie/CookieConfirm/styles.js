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
      justifyContent: 'space-around',
      alignItems: 'center',
      gap: '66px',
      width: '100%',
      padding: '0 60px'
    },
    text: {
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '16px',
      color: '#fff',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    text__addiitional: {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    button: {
      backgroundColor: '#fff',
      borderRadius: '3px',
      width: '110px',
      height: '21px',
      fontWeight: '400',
    }
  }))

  return useStyles()
}

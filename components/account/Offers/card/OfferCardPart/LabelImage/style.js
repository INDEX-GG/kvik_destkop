import {makeStyles} from '@material-ui/core'

export const LabelImageOfferStyles = () => {
  const useStyles = makeStyles((theme) => ({
    pos_abs: {
      position: 'absolute',
      width: '232px',
      minWidth: '60px',
      height: '28px',
      background: 'rgba(44, 44, 44, 0.74)',
      borderRadius: '8px',
      color: 'white',
      top: '150px',
      alignItems: 'center',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    [theme.breakpoints.down(580)]: {
      pos_abs: {
        width: '120px',
      }
    },
    [theme.breakpoints.down(600)]: {
      pos_abs: {
        position: 'absolute',
        width: '60%',
        minWidth: '60px',
        height: '28px',
        background: 'rgba(44, 44, 44, 0.74)',
        borderRadius: '8px',
        color: 'white',
        top: '150px',
        alignItems: 'center',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
      },
    }
  }))

  return useStyles()
}

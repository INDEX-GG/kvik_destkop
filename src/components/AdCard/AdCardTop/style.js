import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card__top: {
      width: '100%',
      height: '260px',
      overflow: 'hidden',
      position: 'relative',

      [theme.breakpoints.down(727)]: {
        overflow: 'hidden',
        maxHeight: '163px',
      },
      [theme.breakpoints.down(430)]: {
        height: '200px',
      },
      [theme.breakpoints.down(350)]: {
        height: '150px',
      },
    },
    sold: {

    },
    card__top_info: {

    },
    card__top_seen: {
      position: 'absolute',
      background: 'rgba(44, 44, 44, 0.74)',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: '400',
      color: '#fff',
      padding: '5px 8px',
      margin: 'auto',
      left: '0',
      top: '12px',
      right: '0',
      width: '94px',
      zIndex: '10',
    },
    card__top_info_right: {
      position: 'absolute',
      bottom: '34px',
      right: '12px',
    },
    card__top_info_left: {
      position: 'absolute',
      left: '12px',
      bottom: '34px',
      display: 'flex',
      transform: 'translateY(100px)',
      transition: '100ms ease-in-out',
    },
    card_like: {
      filter: 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 10))',
    },
    card_comment: {
      display: 'block',
      width: '24px',
      height: '24px',
      background: 'url(/img/notif_dark.svg) center no-repeat',
      marginRight: '12px',
      cursor: 'pointer',

      '&:hover': {
        background: 'url(/img/notif_green.svg) center no-repeat',
      }
    },
    card_call: {
      display: 'block',
      width: '24px',
      height: '24px',
      background: 'url(/img/phone_dark.svg) center no-repeat',
      cursor: 'pointer',

      '&:hover': {
          background: 'url(/img/phone_green.svg) center no-repeat',
      }
    }
}))

export const useAdCardTopStyles = () => useStyles();

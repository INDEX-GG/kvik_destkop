import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down(960)]: {
      margin: '0px 0px 15px',
    }
  },
  navigationBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    margin: '30px 0 0',

    [theme.breakpoints.down(960)]: {
      margin: '0',
    }
  },
  expandButton: {
    [theme.breakpoints.down(960)]: {
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '19px',
      color: '#00A0AB',
    },
  },
  showSmall: {
      maxHeight: '54px',
      overflow: 'hidden',
  },
  showAll: {
      maxHeight: '100%',
  },
  Arrow: {
    width: '24px',
    height: '10px',
    position: 'relative',
    transition: '.2s all linear',
    '&::after': {
        content: '""',
        borderRadius: '10px',
        position: 'absolute',
        left: '0',
        top: '45%',
        width: '12px',
        height: '2px',
        backgroundColor: '#00A0AB',
        transform: 'rotate(48deg) translateY(-45%)'
    },
    '&::before': {
        content: '""',
        borderRadius: '10px',
        position: 'absolute',
        left: '8px',
        top: '45%',
        width: '12px',
        height: '2px',
        backgroundColor: '#00A0AB',
        transform: 'rotate(-48deg) translateY(-45%)'
    }
  },
  ArrowActive: {
    '&::after': {
      transform: 'rotate(130deg) translateY(-45%)'
    },
    '&::before': {
        transform: 'rotate(-130deg) translateY(-45%)'
    }
  },
}))


  export const useProductShowMoreWrapperStyles = () => useStyles();

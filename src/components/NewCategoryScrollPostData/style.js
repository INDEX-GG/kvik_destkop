import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  offersHome: {

  },
  showMore: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '21px',
    textAlign: 'right',
    color: '#00A0AB',

    margin: '31px 0',

    '& span': {
      color: '#00A0AB',

    }
  },
  showMoreButton: {
      [theme.breakpoints.down(960)]: {
        // paddingBottom: '31px',
      }
  },
  locationMapArrow: {
    width: '24px',
    height: '10px',
    position: 'relative',
    transition: '.2s all linear',
    marginLeft: '5px',
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
  locationMapArrowActive: {
    marginLeft: '5px',
      '&::after': {
          transform: 'rotate(130deg) translateY(-45%)'
      },
      '&::before': {
          transform: 'rotate(-130deg) translateY(-45%)'
      }
  },
}));

export const useCategoryScrollPostDataStyle = () => useStyles();

import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  noActiveBlock: {
    width: '969px',
    height: '96px',
    background: '#e9f5f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '15px 0 30px',

    [theme.breakpoints.down(960)]: {
      width: 'auto',
      height: '53px',
      margin: '10px 0 15px',
    }
  },
  labelBlock: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '28px',
    textAlign: 'center',
    color: '#000000',

    [theme.breakpoints.down(960)]: {
      fontSize: '16px',
      lineHeight: '18px',
    }
  }
}));

export const useProductNoActiveStyles = () => useStyles();

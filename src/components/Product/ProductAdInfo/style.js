import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  noActiveWrapper: {
    // order: '2',

    // [theme.breakpoints.down(960)]: {
    //   order: '3',
    //   // marginTop: '12px',
    // }
  }
}));

export const useProductAdInfoStyles = () => useStyles();

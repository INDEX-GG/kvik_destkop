import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  showSmall: {
      maxHeight: '54px',
      overflow: 'hidden',
  },
  showAll: {
      maxHeight: '100%',
  }
}));

export const useProductShowMoreWrapperStyles = () => useStyles();

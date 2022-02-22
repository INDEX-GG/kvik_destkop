import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  card__top_slider: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    zIndex: '0',
    position: 'relative',
  }
}));

export const useAdCardImageStyles = () => useStyles();

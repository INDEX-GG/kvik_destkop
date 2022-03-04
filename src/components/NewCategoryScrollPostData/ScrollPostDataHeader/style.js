import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  similarDataHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '36px',
    alignItems: 'center',
    marginBottom: '8px',
    '& svg:first-child': {
      marginRight: '15px'
    },
    '& svg': {
      // display: 'inline-block'
    }
  }
}));

export const useScrollPostDataHeaderStyle = () => useStyles();

import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridView: {
    display: 'grid',
    gridAutoFlow: 'row dense',
    gridColumnGap: '24px',
    gridRowGap: '24px',
    gridTemplateColumns: 'repeat(4, 1fr)',
    justifySelf: 'left',
    width: '100%',

    [theme.breakpoints.down(1280)]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },

    [theme.breakpoints.down(1030)]: {
      gridColumnGap: '12px',
      gridRowGap: '12px',
    },

    [theme.breakpoints.down(730)]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridColumnGap: '24px',
      gridRowGap: '24px',
    },

    [theme.breakpoints.down(510)]: {
      gridColumnGap: '12px',
      gridRowGap: '12px',
    },
  },
  defaultViewMobile: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  }
}));

export const useRenderCardsStyle = () => useStyles();

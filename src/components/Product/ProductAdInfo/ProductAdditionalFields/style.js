import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  addFields: {
    order: '4',

    [theme.breakpoints.down(960)]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  addFieldsColumn: {
    [theme.breakpoints.down(960)]: {
      order: '2',
    },
  },
  addFieldsDescription: {
    [theme.breakpoints.down(960)]: {
      order: '1',
    },
  },
  addFieldsArr: {
    [theme.breakpoints.down(960)]: {
      order: '3',
    },
  },
}));

export const useProductAddFieldsStyles = () => useStyles();

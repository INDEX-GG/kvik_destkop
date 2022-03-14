import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    modal: {
      width: '344px',
      maxWidth: '436px',
      padding: '24px 26px',
    },
    container: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',

        width: '100%',
    },
}));

export const useProductAdStatusChangeDialogStyles = () => useStyles();

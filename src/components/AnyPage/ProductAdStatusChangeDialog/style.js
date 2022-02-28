import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    modal: {
      width: '100%',
      maxWidth: '436px'
    },
    container: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

export const useProductAdStatusChangeDialogStyles = () => useStyles();

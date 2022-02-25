import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    paper: {
        width: '100%'
    }
}));

export const useProductPhoneDialogStyles = () => useStyles();

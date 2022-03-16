import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    accountBody: {
        // padding: '0 32px',
        padding: '0px 0px 32px',
    },
    accountContent: {
        width: '100%',
        // padding: '0px 32px',
    }
}));

export const useAccountBodyStyles = () => useStyles();

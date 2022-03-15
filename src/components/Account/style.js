import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    accountContainer: {
        marginTop: '73px',
        display: 'flex',
        backgroundColor: 'red',
    },
}));

export const useAccountPageStyles = () => useStyles();

import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    hintItem: {
        width: '50%',
        marginBottom: '64px',
    },
    hintContainer: {
        minWidth: '250px'
    },
    title: {
        color: '#00A0AB',
        fontSize: '25px',
        lineHeight: '29.3px',
        fontWeight: 900,
        marginBottom: '5px',
        whiteSpace: 'pre-line'
    },
    subtitle: {
        color: '#000000',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16.41px',
        whiteSpace: 'pre-line'
    }
}));


export const useBalanceHintItemStyles = () => useStyles();

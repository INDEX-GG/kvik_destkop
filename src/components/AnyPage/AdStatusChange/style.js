import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: '10px',
        textAlign: 'center',
    },
    title: {
        color: '#2c2c2c',
        fontSize: '18px',
        fontWeight: 500,
        marginBottom: '10px'
    },
    confirm: {
        color: '#8F8F8F',
        fontWeight: 500,
        fontSize: '14px',
        marginBottom: '16px'
    },
    buttons: {
        '& > *:last-child': {
            marginBottom: '0px'
        }
    }
}));

export const useAdStatusChangeStyles = () => useStyles();

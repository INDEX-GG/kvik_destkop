import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    button: {
        width: '33%',
        height: '40px',
        margin: '0 5px',
    },
    subscribers: {
        color: '#00a0ab',
        fontWeight: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
    },
    subscribersCount: {
        fontSize: '12px',
        lineHeight: '12px'
    },
    subscribersName: {
        fontSize: '11px',
        lineHeight: '14px'
    }
}));

export const useAccountSubscribersStyles = () => useStyles();

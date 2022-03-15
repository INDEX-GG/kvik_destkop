import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    button: {
        width: '33%',
        height: '40px',
        paddingLeft: '5px',
    },
    subscriptions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#00a0ab',
        cursor: 'pointer',
        fontWeight: 500,
    },
    subscriptionsCount: {
        fontSize: '12px',
        lineHeight: '12px'
    },
    subscriptionsName: {
        fontSize: '11px',
        lineHeight: '14px',
    }
}));

export const useAccountSubscriptionsStyles = () => useStyles();

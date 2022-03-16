import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    notifItemContainer: {
        margin: '12px 0',
        padding: '0 32px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',

        [theme.breakpoints.down(1080)]: {
            padding: '0px 0px',
        }
    },
    notifItemDate: {
        fontSize: '12px',
        color: '#8f8f8f',
        margin: '12px 0',
        alignSelf: 'center',
    },
    notifItemMsg: {
        padding: '12px',
        margin: '12px 0 2px 0',
        borderRadius: '8px',
        transition: 'all 250ms ease-in-out',
        textAlign: 'justify',

        '&:hover': {
            transition: 'all 250ms ease-in-out',
            backgroundColor: 'e9e9e9',
            cursor: 'pointer',
        }
    },
    notifItemTime: {
        fontSize: '12px',
        color: '#8f8f8f',
        marginLeft: '10px',
    }
}));

export const useMessagesNotificationItemStyle = () => useStyles();

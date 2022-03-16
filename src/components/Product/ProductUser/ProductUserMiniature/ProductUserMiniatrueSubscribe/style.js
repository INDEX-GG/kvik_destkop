import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    circle: {
        width: '50px',
        height: '50px'
    },
    icon: {
        width: '24px',
        height: '24px',
        cursor: 'pointer',

        [theme.breakpoints.down(960)]: {
            marginLeft: '4px'
        }
    },
    subscribeBlock: {
        [theme.breakpoints.down(960)]: {
            display: 'flex',
            alignItems: 'center',
        }
    },
    subscribeTitle: {
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '14px',
        textAlign: 'right',
    },
    subscribed: {
        color: '#00A0AB',
    },
    noSubscribed: {
        color: '#8F8F8F',
    }
}));

export const useProductUserMiniatureSubscribeStyles = () => useStyles();

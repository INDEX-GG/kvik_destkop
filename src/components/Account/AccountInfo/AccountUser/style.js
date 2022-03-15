import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    avatar: {
        width: '80px',
        height: '80px',
        marginBottom: '8px'
    },
    userName: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '16px',
        marginBottom: '12px',
    },
    userCreate: {
        fontSize: '12px',
        lineHeight: '14px',
        fontWeight: 500,
        color: '#8F8F8F',
        marginBottom: '8px'
    },
    userRating: {
        marginBottom: '8px'
    },
    userMorInfo: {
        display: 'flex',
        width: '100%'
    }
}));

export const useAccountUserStyles = () => useStyles();

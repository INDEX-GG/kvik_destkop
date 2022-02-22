import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    userMiniature: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: '14px',
        width: '56px',
        height: '56px'
    },
    name: {
        textAlign: 'left',
        fontSize: '14px',
        lineHeight: '14px',
        marginBottom: '10px'
    },
    userInfo: {
        flexGrow: 1
    },
    userSubscribe: {
        width: '24px',
        height: '24px',
        cursor: 'pointer'
    }
}));

export const useProductUserMiniatureStyles = () => useStyles();

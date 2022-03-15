import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    userInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 0 20px #0000001a',
        position: 'sticky',
        top: '100px',
        padding: '21px 10px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        maxWidth: '235px',
        width: '100%'
    },
}));

export const useAccountInfoStyles = () => useStyles();

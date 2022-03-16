import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    paper: {
        width: '100%'
    },
    mobileContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    callButton: {
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '16px',
        textAlign: 'center',
        color: '#00A0AB',

        alignSelf: 'flex-end',
    }
}));

export const useProductPhoneDialogStyles = () => useStyles();

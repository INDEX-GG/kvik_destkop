import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    userInfoContainer: {
        marginBottom: '20px',
    },
    user: {
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        [theme.breakpoints.down(960)]: {
            justifyContent: 'flex-start',
        }
    }
}));

export const useProductPhoneDialogUserInfoStyles = () => useStyles();

import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    userInfoContainer: {
        marginBottom: '20px',
    },
    user: {
        marginBottom: '20px'
    }
}));

export const useProductPhoneDialogUserInfoStyles = () => useStyles();

import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    notifWrapper: {
        paddingRight: '32px',

        [theme.breakpoints.down(1080)]: {
            paddingRight: '0px',
        }
    }
}));

export const useMessagesNotificationsStyle = () => useStyles();

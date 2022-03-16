import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    settingsNotifWrapper: {
        paddingLeft: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 'auto',

        [theme.breakpoints.down(1024)]: {
            paddingLeft: '0',
        }
    },
}));

export const useSettingsNotificationStyles = () => useStyles();

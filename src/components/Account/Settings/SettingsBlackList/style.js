import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    settingsBlackList: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 'auto',
    },
    emptyPlaceHolder: {
        marginBottom: '100px'
    }
}));

export const useSettingsBlackListStyles = () => useStyles();

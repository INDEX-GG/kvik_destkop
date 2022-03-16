import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    notifItem: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottom: '1px solid #e9e9e9',
        marginBottom: '16px',
    },
    notifItemTitle: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        width: '50px',
    },
    title: {
        fontSize: '18px',
        fontWeight: '400',
    },
    subTitle: {
        marginTop: '4px',
        color: '#8f8f8f',
        lineHeight: '1,17',
    },
    checkbox: {
        margin: '0 36px',

        [theme.breakpoints.down(960)]: {
            margin: '0 11px',
        }
    }
}));

export const useSettingsNotifItem = () => useStyles();

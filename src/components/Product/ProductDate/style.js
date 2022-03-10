import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    beforeDay: {
        textAlign: 'left',
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 500,
        marginBottom: '43px',
        color: '#8F8F8F',
    },
    date: {
        textAlign: 'left',
        marginBottom: '12px',
        color: '#2C2C2C',
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 500,
    },
    dateOpacity: {
        opacity: '0.5',
    },
}));

export const useProductDateStyles = () => useStyles();

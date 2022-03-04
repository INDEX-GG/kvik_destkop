import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    button: {
        margin: 0,
        padding: '3px 1px 2px 3px',
    },
    circle: {
        borderRadius: '50%',
        minWidth: 'auto'
    },
    default: {
        margin: '0 0 2px 0',
    },
}));

export const useCustomButtonUIStyles = () => useStyles();

import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    iconWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        maxWidth: '320px'
    },
    myIconWrapper: {
        justifyContent: 'flex-end',
        maxWidth: 'none'
    }
}));

export const useProductOptionsStyles = () => useStyles();

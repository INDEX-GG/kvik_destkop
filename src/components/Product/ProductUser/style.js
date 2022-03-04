import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    userContainer: {
        borderTop: '1px solid #E9E9E9',
        paddingTop: '8px'
    },
    userInfo: {
        marginBottom: '36px'
    },
    adMiniature: {
        marginBottom: '10px'
    }
}));

export const useProductUserStyles = () => useStyles();

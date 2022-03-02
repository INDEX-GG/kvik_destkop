import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    userContainer: {
        borderTop: '1px solid #E9E9E9',
        paddingTop: '8px',

        [theme.breakpoints.down(960)]: {
            width: '100%',
        },
    },
    userInfo: {
        marginBottom: '36px',

        [theme.breakpoints.down(960)]: {
            marginBottom: '11px',
            borderBottom: '1px solid #e9e9e9',
            padding: '10px 0px',
        },
    },
    adMiniature: {
        marginBottom: '10px'
    }
}));

export const useProductUserStyles = () => useStyles();

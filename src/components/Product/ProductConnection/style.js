import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    buttonsContainer: {
        marginTop: '43px',
        marginBottom: '20px',
        '& > *:last-child': {
            marginBottom: '0'
        },

        [theme.breakpoints.down(960)]: {
            marginTop: '0px',
        },
    },
}));

export const useProductConnectionStyles = () => useStyles();

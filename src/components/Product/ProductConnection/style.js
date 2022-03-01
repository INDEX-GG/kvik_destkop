import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    buttonsContainer: {
        marginTop: '43px',
        marginBottom: '20px',
        '& > *:last-child': {
            marginBottom: '0'
        }
    },
}));

export const useProductConnectionStyles = () => useStyles();

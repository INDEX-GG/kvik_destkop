import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        width: '296px',
        marginBottom: '24px',

        [theme.breakpoints.down(960)]: {
            width: 'auto',
        }
    },
}));

export const useAdStatusButtonStyles = () => useStyles();

import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    name: {
        maxWidth: '596px',
        fontSize: '25px',
        width: '100%',
        wordWrap: 'break-word',

        [theme.breakpoints.down(960)]: {
            fontSize: '18px',
            lineHeight: '21px',
        }
    },
    opacityName: {
        opacity: '0.5',
    }
}));

export const useProductNameStyles = () => useStyles();

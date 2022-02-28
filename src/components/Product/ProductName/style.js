import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    name: {
        maxWidth: '596px',
        fontSize: '25px',
        width: '100%',
        wordWrap: 'break-word'
    },
}));

export const useProductNameStyles = () => useStyles();

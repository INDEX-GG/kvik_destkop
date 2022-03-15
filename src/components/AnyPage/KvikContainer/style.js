import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    container: {
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '0 12px'
    }
}));

export const useKvikContainerStyles = () => useStyles();

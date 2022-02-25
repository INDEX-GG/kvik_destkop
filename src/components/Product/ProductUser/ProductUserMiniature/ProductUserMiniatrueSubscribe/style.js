import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    circle: {
        width: '50px',
        height: '50px'
    },
    icon: {
        width: '24px',
        height: '24px'
    }
}));

export const useProductUserMiniatureSubscribeStyles = () => useStyles();

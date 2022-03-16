import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    link: {
        '&:link': {
            color: '#00A0AB',
        },
        '&:visited': {
            color: '#00A0AB',
        },
    }
}));

export const useCustomLinkUIStyles = () => useStyles();

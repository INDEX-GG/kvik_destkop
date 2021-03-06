import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    miniatureContainer: {
        display: 'flex',
        marginBottom: '14px',
        '& > *:last-child': {
            marginRight: '0px'
        },

        [theme.breakpoints.down(960)]: {
            display: 'none',
        },
    },
    allAd: {
        color: '#00A0AB',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '16px',
        textAlign: 'right',
        textDecoration: 'underline',

        [theme.breakpoints.down(960)]: {
            display: 'none',
        },
    }
}));

export const useProductAdMiniatureStyles = () => useStyles();

import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    miniatureContainer: {
        display: 'flex',
        marginBottom: '14px',
        '& > *:last-child': {
            marginRight: '0px'
        }
    },
    allAd: {
        color: '#00A0AB',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '16px',
        textAlign: 'right',
        textDecoration: 'underline',
    }
}));

export const useProductAdMiniatureStyles = () => useStyles();

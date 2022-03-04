import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    container: {
        width: '125px',
        boxShadow: '0px 4px 4px rgb(0 0 0 / 25%)',
        borderRadius: '8px'
    },
    image: {
        width: '125px',
        height: '136px',
        overflow: 'hidden',
        borderRadius: '8px 8px 0 0',
        marginBottom: '8px'
    },
    text: {
        padding: '0 2px 0 6px'
    },
    price: {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: 1.5,
        color: '#2C2C2C',
    },
    title: {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: 1.5,
        color: '#2C2C2C',
        marginBottom: '8px'
    },
    address: {
        fontSize: '10px',
        color: '#8F8F8F',
        fontWeight: 400,
        lineHeight: 1.5,
        marginBottom: '3px',
        wordWrap: 'break-word'
    },
}));

export const useAdBigMiniatureStyles = () => useStyles();

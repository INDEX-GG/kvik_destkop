import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    miniatureContainer: {
        background: '#FFFFFF',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '1px',
        marginRight: '19px',
        padding: '3px 0px 5px 0px',
        width: '94px',
        height: '126px',
        cursor: 'pointer'
    },
    miniatureImage: {
        borderRadius: '2px',
        overflow: 'hidden',
        padding: '0 3px'
    },
    miniaturePrice: {
        fontSize: '12px',
        fontWeight: 500,
        color: '#2C2C2C',
        lineHeight: '13.79px',
    },
    miniatureTitle: {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '13.79px',
        color: '#2C2C2C'
    },
}));

export const useAdMiniatureItemStyles = () => useStyles();

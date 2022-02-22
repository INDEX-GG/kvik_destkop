import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    locationContainer: {
        marginTop: '32px',
        paddingBottom: '18px',
        borderBottom: '1px solid #E9E9E9'
    },
    locationInfoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '5px'
    },
    locationTitle: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '16px',
        color: '#8F8F8F'
    },
    locationAddress: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '16px',
        color: '#2C2C2C',
        maxWidth: '350px',
        wordWrap: 'break-word'
    },
    locationMap: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        color: '#00A0AB',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    locationMapText: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 400,
        marginRight: '5px'
    },
    locationMapArrow: {
        width: '24px',
        height: '10px',
        position: 'relative',
        transition: '.2s all linear',
        '&::after': {
            content: '""',
            borderRadius: '10px',
            position: 'absolute',
            left: '0',
            top: '45%',
            width: '12px',
            height: '2px',
            backgroundColor: '#00A0AB',
            transform: 'rotate(48deg) translateY(-45%)'
        },
        '&::before': {
            content: '""',
            borderRadius: '10px',
            position: 'absolute',
            left: '8px',
            top: '45%',
            width: '12px',
            height: '2px',
            backgroundColor: '#00A0AB',
            transform: 'rotate(-48deg) translateY(-45%)'
        }
    },
    locationMapArrowActive: {
        '&::after': {
            transform: 'rotate(130deg) translateY(-45%)'
        },
        '&::before': {
            transform: 'rotate(-130deg) translateY(-45%)'
        }
    },
}));

export const useProductLocationStyles = () => useStyles();

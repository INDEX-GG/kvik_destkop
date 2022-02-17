import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    item: {
        cursor: 'pointer',
        padding: '14px 25px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        borderRadius: '8px',
        transition: '.2s all linear',
        [theme.breakpoints.down(960)]: {
            padding: '16px 10px 15px',
            marginBottom: '15px',
            border: '1px solid #8F8F8F'
        }
    },
    itemActive: {
        transition: '.2s all linear',
        backgroundColor: 'rgba(208, 237, 239, 0.15)',
        position: 'relative',
        '&::after': {
            transition: '.2s all linear',
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 0,
            width: '100%',
            height: '100%',
            border: '1px solid #00A0AB',
            borderRadius: '8px',
        },
        [theme.breakpoints.down(960)]: {
            backgroundColor: '#D0EDEF'
        }
    },
    img: {
        minWidth: '104px',
        width: '100%',
        height: '96px',
    },
    imgContainer: {
        width: '104px',
        marginRight: '30px',
        [theme.breakpoints.down(960)]: {
            display: 'none',
        }
    },
    text: {
        flexGrow: 1,
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '9px'
    },
    checkbox: {
        [theme.breakpoints.down(960)]: {
            display: 'none'
        }
    },
    name: {
        display: 'flex',
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: '18px',
        fontWeight: 500,
        color: '#2C2C2C',
        lineHeight: '21.09px',
        [theme.breakpoints.down(960)]: {
            fontSize: '16px',
            lineHeight: '18.75px',
        }
    },
    itemSubtitle: {
        whiteSpace: 'pre-line',
        fontSize: '14px',
        lineHeight: '16px',
        color: '#8F8F8F',
        [theme.breakpoints.down(870)]: {
            whiteSpace: 'normal',
        },
        [theme.breakpoints.down(960)]: {
            lineHeight: '16.41px',
        }
    },
    price: {
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '21px',
        color: '#00A0AB'
    }
}));


export const usePromotionItemStyles = () => useStyles();

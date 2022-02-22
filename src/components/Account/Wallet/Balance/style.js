import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    container: {
        margin: '23px 83px 14px',
        backgroundImage: 'url(/img/logoBackground.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        height: '710px',
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '35px',
    },
    balance: {
        fontSize: '36px',
        fontWeight: 700,
        lineHeight: '42.19px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        color: '#00A0AB'
    },
    icon: {
        width: '33px',
        height: '33px',
    },
    button: {
        marginBottom: '20px'
    },
    balanceAdd: {
        width: '14px',
        marginRight: '10px',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '-2px',
            width: '14px',
            height: '3px',
            backgroundColor: '#FFFFFF',
            transform: 'rotate(90deg)',
            borderRadius: '10px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '-2px',
            width: '14px',
            height: '3px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px'
        }
    },
    more: {
        color: '#8F8F8F',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px'
    },
    hints: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: '0 55px',
        '& > *:nth-of-type(2n)': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
        }
    }
}));

export const useBalanceStyles = () => useStyles();

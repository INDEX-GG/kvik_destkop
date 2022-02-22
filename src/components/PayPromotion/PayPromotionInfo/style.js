import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    payInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        [theme.breakpoints.down(960)]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        }
    },
    payPrice: {
        fontSize: '24px',
        lineHeight: '28.13px',
        color: '#00A0AB',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down(960)]: {
            fontSize: '18px',
            lineHeight: '21.09px',
            marginBottom: '5px',
            alignItems: 'flex-start',
        }
    },
    payIcon: {
        width: '24px',
        height: '24px',
        marginLeft: '3px',
        [theme.breakpoints.down(960)]: {
            width: '16px',
            height: '16px',
            marginTop: '2px'
        }
    },
    balanceInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down(960)]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '13px'
        }
    },
    payCheck: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        lineHeight: '16.41px',
        color: '#2C2C2C',
        fontWeight: 500,
        [theme.breakpoints.down(960)]: {
            fontSize: '12px',
            fontWeight: 400,
            color: '#8F8F8F',
            lineHeight: '14.06px',
        }
    },
    payBalance: {
        color: '#00A0AB',
        fontSize: '18px',
        lineHeight: '21px',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down(960)]: {
            fontSize: '12px',
            fontWeight: 400,
            color: '#8F8F8F',
            lineHeight: '14.06px',
        }
    },
    payBalanceIcon: {
        width: '16px',
        height: '16px',
        [theme.breakpoints.down(960)]: {
            width: '14px',
            height: '14px',
        }
    },
    payAddBalance: {
        color: '#8F8F8F',
        fontSize: '10px',
        lineHeight: '12px',
        fontWeight: 500,
        padding: '4px 6px',
        maxWidth: '55px',
        margin: '0 auto',
        [theme.breakpoints.down(960)]: {
            margin: 0,
            fontSize: '12px',
            lineHeight: '14.06px',
            fontWeight: 400,
            maxWidth: '85px',
        }
    },
    confirmButton: {
        [theme.breakpoints.down(960)]: {
            width: '100%',
            borderRadius: 0,
        }
    }
}));

export const usePayPromotionInfoStyles = () => useStyles();

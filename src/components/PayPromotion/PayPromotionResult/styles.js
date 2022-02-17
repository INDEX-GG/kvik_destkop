import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '73px 20px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down(600)]: {
            padding: '31px 61px 47px'
        }
    },
    icon: {
        width: '130px',
        height: '130px',
        marginBottom: '20px',
        [theme.breakpoints.down(600)]: {
            width: '71px',
            height: '71px',
            marginBottom: '15px'
        }
    },
    title: {
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '19px',
        color: '#2C2C2C',
        marginBottom: '33px',
        [theme.breakpoints.down(600)]: {
            fontSize: '14px',
            lineHeight: '16.41px',
            maxWidth: '146px',
            textAlign: 'center',
            marginBottom: '21px'
        }
    }
}));

export const usePayPromotionResultStyles = () => useStyles();

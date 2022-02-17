import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '30px 30px 25px 30px',
        [theme.breakpoints.down(960)]: {
            padding: '15px 0px 0px',
            height: '100%'
        }
    },
    title: {
        textAlign: 'center',
        fontSize: '18px',
        lineHeight: '21.09px',
        marginBottom: 15,
        color: '#000000',
        fontWeight: 400,
        [theme.breakpoints.down(960)]: {
            display: 'none'
        }
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    list: {
        '& > *:last-child': {
            marginBottom: '20px'
        }
    }
}));

export const usePayPromotionStyles = () => useStyles();

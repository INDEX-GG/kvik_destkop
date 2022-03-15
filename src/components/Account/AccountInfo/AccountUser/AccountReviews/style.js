import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    button: {
        width: '33%',
        height: '40px',
    },
    reviews: {
        color: '#00a0ab',
        fontWeight: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
    },
    disabled: {
        color: '#5a5a5a'
    },
    reviewsCount: {
        fontSize: '12px',
        lineHeight: '12px'
    },
    reviewsName: {
        fontSize: '11px',
        lineHeight: '14px'
    }
}));

export const useAccountReviewsStyles = () => useStyles();

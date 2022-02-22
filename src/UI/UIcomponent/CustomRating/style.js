import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    ratingContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    ratingNumber: {
        paddingTop: '2.5px',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '16px',
        marginRight: '4px',
        color: '#5A5A5A'
    }
}));

export const useCustomRatingUIStyles = () => useStyles();

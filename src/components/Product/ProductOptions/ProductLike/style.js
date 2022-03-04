import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    likeContainer: {
        width: '24px',
        height: '24px',
        cursor: 'pointer'
    },
    like: {
        width: '24px',
        height: '24px',
        transition: '.1s all linear',
        '&:hover': {
            transform: 'scale(1.15)'
        }
    },
    activeLike: {
        '& > svg': {
            fill: '#00A0AB',
        }
    }
}));

export const useProductLikeStyles = () => useStyles();

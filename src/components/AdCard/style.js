import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    card: {
        minWidth: '100%',
        width: '100%',
        borderRadius: '8px',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: '1px 1px 6px 1px rgb(0 0 0 / 20%)',
        overflow: 'hidden',
        background: '#fff',

        '&:hover .card__top_info_left_hover': {
            transform: 'translateY(0)',
            transitionDelay: '200ms',
        },
        '&:hover .card__top_info_right_hover': {
            transform: 'translateY(0)',
            transitionDelay: '200ms',
        },
        // '&:hover .card__top_info_left_hover .card_like_hover': {
        //     transform: 'translateY(0)',
        //     transitionDelay: '280ms',
        // }
    },
    card__lg: {
        gridColumnStart: 'span 2',
    },
    card_wrapper: {
        borderRadius: '8px',
        background: '#fff',
    },
    card__wrapperYellow: {
        background: '#D0EDEF',

        // для отрисовки border как в макете
        // borderRadius: '8px',
        // border: '1px solid #00a0ab',
        // borderImage: 'linear-gradient(to top ,#00A0ABFF, #00A0AB17)',
        // borderImageSlice: '1',
    },
    card__wrapper2Yellow: {
        background: '#D0EDEF',
    },
    card__wrapperV2: {
        display: 'grid',
        gridTemplateColumns: '.55fr 1fr',
    },
}));

export const useAdCardStyles = () => useStyles();

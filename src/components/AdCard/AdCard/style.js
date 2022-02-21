import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: '100%',
        width: '100%',
        borderRadius: '8px',
        // filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.1)),
        position: 'relative',
        cursor: 'pointer',
        // box-shadow: 0px 4px 4px rgb(0 0 0 / 25%),
        boxShadow: '1px 1px 6px 1px rgb(0 0 0 / 20%)',
        overflow: 'hidden',
        background: '#fff',
    },
    card__lg: {
        gridColumnStart: 'span 2',
    },
    card_wrapper: {
        borderRadius: '8px',
        background: '#fff',
    },
    card__wrapperYellow: {
        background: '#FFF6A5',
    },
    card__wrapperV2: {
        display: 'grid',
        gridTemplateColumns: '.55fr 1fr',
    },
}));

export const useAdCardStyles = () => useStyles();

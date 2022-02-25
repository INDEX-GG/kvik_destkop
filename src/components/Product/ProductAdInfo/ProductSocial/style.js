import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    share: {
        margin: '15px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '272px',
    },
    shareTitle: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 400,
        color: '#8F8F8F',
        marginRight: '24px'
    },
    shareList: {
        display: 'flex',
        '& > *:last-child': {
            marginRight: '0'
        }
    },
    shareItem: {
        width: '24px',
        height: '24px',
        marginRight: '24px',
        cursor: 'pointer',
    }
}));

export const useProductSocialStyles = () => useStyles();

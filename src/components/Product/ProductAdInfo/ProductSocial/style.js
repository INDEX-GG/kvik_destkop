import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    share: {
        margin: '15px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '272px',
        order: '5',

        [theme.breakpoints.down(960)]: {
            margin: '0 0 15px',
            justifyContent: 'center',
            maxWidth: '100%',
        },
    },
    shareTitle: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 400,
        color: '#8F8F8F',
        marginRight: '24px',
        display: 'block',

        [theme.breakpoints.down(960)]: {
            display: 'none',
        },
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

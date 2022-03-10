import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    userMiniature: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        marginRight: '14px',
        width: '56px',
        height: '56px'
    },
    name: {
        cursor: 'pointer',
        textAlign: 'left',
        fontSize: '14px',
        lineHeight: '14px',
        marginBottom: '10px'
    },
    userInfo: {
        flexGrow: 1
    },
    userSubscribe: {
        marginLeft: '10px',
        width: '24px',
        height: '43px',
        cursor: 'pointer'
    },
    allAd: {
        color: '#00A0AB',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '16px',
        textAlign: 'right',
        textDecoration: 'underline',

        [theme.breakpoints.down(960)]: {
            textDecoration: 'none',
        }

    },
    buttonAllOffers: {
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '14px',
        textAlign: 'right',
        color: '#00A0AB',

        whiteSpace: 'nowrap',
    },
    mobileView: {
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    }
}));

export const useProductUserMiniatureStyles = () => useStyles();

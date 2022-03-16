import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    userMiniature: {
        display: 'flex',
        alignItems: 'center',

        [theme.breakpoints.down(960)]: {
            alignItems: 'flex-start',
        }
    },
    alignItemsCenter: {
        [theme.breakpoints.down(960)]: {
            alignItems: 'center',
        }
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
    raiting: {
        [theme.breakpoints.down(960)]: {
            marginTop: '10px'
        }
    },
    userInfo: {
        flexGrow: 1,
        textAlign: 'left',
    },
    userSubscribe: {
        marginLeft: '10px',
        // width: '24px',
        height: '43px',
        // cursor: 'pointer'

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        justifyContent: 'space-between',

        [theme.breakpoints.down(960)]: {
            height: 'auto',

            '& > div': {
                marginBottom: '11px'
            },
            '& > div:last-child': {
                marginBottom: '0px'
            }
        }
    },
    userComplainBlock: {
        [theme.breakpoints.down(960)]: {
            order: '4'
        }
    },
    userReviews: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '14px',
        textAlign: 'right',
        color: '#00A0AB',

        [theme.breakpoints.down(960)]: {
            order: '1',
        }
    },
    userReviewsLink: {
        '&:link': {
            color: '#00A0AB',
        },
        '&:visited': {
            color: '#00A0AB',
        },
    },
    userMiniatureSubscribe: {
        [theme.breakpoints.down(960)]: {
            order: '3',
        }
    },
    allAd: {
        color: '#00A0AB',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '16px',
        textAlign: 'right',
        textDecoration: 'underline',
        cursor: 'pointer',

        [theme.breakpoints.down(960)]: {
            textDecoration: 'none',
            order: '2'
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

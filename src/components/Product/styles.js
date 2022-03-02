import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    productPageDescription: {
        margin: '0',
        position: 'relative',
        marginRight: '30px',
        overflow: 'hidden',
        maxWidth: '620px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',

        '& > div': {
            padding: '0px 12px',
        },

        [theme.breakpoints.down(1279)]: {
            maxWidth: '100%',
            width: '100%',
        },
    },
    productHeader: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '18px',
        width: '100%'
    },
    productAd: {
        display: 'block',
        paddingBottom: '60px',
        maxWidth: '320px',
        minWidth: '320px',
        padding: '0px 12px',

        [theme.breakpoints.down(959)]: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '0',
            minWidth: '100%',
            paddingBottom: '0',
        },
    },
    productUser: {
        textAlign: 'center',
        position: 'sticky',
        top: '105px',

        [theme.breakpoints.down(960)]: {
            width: '100%',
        },
    },
    productTitle: {
        marginBottom: '18px',
        marginTop: '6px',
        order: '1',

        [theme.breakpoints.down(960)]: {
            width: '100%',
            order: '3'
        },
    },
    productAdButtons: {
        display: 'none',
        order: '3',

        [theme.breakpoints.down(960)]: {
            display: 'block',
            padding: '0px !important',
            '& button': {
                borderRadius: '0 !important',
            }
        }
    },
    productCounts: {
        marginBottom: '18px',

        [theme.breakpoints.down(960)]: {
            display: 'none',
        },
    },
    productDate: {
        [theme.breakpoints.down(960)]: {
            display: 'none',
        },
    },
    productPrice: {
        [theme.breakpoints.down(960)]: {
            display: 'none',
        },
    },
    productPageContent: {
        padding: '0px 12px',

        [theme.breakpoints.down(1279)]: {
            display: 'flex',
        },
    },
    productPageCard: {
        padding: '10px 0px',
        maxWidth: '968px',
        width: '100%',
    },
}));

export const useProductPageStyles = () => useStyles();

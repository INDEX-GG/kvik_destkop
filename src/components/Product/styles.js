import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    productPage: {
        minHeight: '100vh',
        '& .swiper-container': {
            marginBottom: '4px',
            // padding: 0 10px,
            justifyContent: 'center',
            zIndex: '0 !important',
            borderRadius: '2px',
        },

        [theme.breakpoints.down(1060)]: {
            display: 'block',
        }
    },
    productPageContainer: {
        maxWidth: '1280px',
        // padding: 0 '12px',
        margin: 'auto',

        fontWeight: '500',
        fontSize: '14px',
        color: '#2c2c2c',

        [theme.breakpoints.down(1365)]: {
            gridTemplateColumns: '788px 224px',
            margin: 'auto',
            gridColumnGap: '12px',
        },
        [theme.breakpoints.down(1060)]: {
            gridTemplateColumns: '100%',
        }
    },
    productBreadCrumbs: {
        padding: '0 12px',
    },
    productPageDescription: {
        margin: '0',
        position: 'relative',
        marginRight: '30px',
        overflow: 'hidden',
        maxWidth: '620px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',

        '& > div, section, article': {
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
        order: '1',

        [theme.breakpoints.down(960)]: {
            marginTop: '6px',
            width: '100%',
            order: '3',
            marginBottom: '0',
        },
    },
    productAdButtons: {
        display: 'none',
        order: '3',

        [theme.breakpoints.down(960)]: {
            display: 'block',
            marginTop: '12px',
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
        margin: '43px 0px',
        [theme.breakpoints.down(960)]: {
            display: 'none',
            margin: '0',
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
    productNoActive: {
        [theme.breakpoints.down(960)]: {
            padding: '0 !important',
            order: '3',
        },
    },
    productAdInfo: {
        order: '2',

        [theme.breakpoints.down(960)]: {
          order: '3',
        }
    }
}));

export const useProductPageStyles = () => useStyles();
